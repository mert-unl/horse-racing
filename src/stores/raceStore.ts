import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RaceState, RaceStatus, RoundResult } from '@/types/race'
import { advanceRace, createRaceState, isRaceFinished } from '@/utils/raceSim'
import { getGameRng } from '@/utils/random'
import { useHorseStore } from './horseStore'
import { useScheduleStore } from './scheduleStore'

export const useRaceStore = defineStore('race', () => {
    const horseStore = useHorseStore()
    const scheduleStore = useScheduleStore()

    const status = ref<RaceStatus>('idle')
    const currentRoundIndex = ref(0)
    const raceState = ref<RaceState | null>(null)
    const results = ref<RoundResult[]>([])
    const awaitingNextRound = ref(false)

    const currentRound = computed(() => scheduleStore.rounds[currentRoundIndex.value] ?? null)
    const isRunning = computed(() => status.value === 'running')
    const canGenerate = computed(() => status.value !== 'running')
    const canToggle = computed(() => ['scheduled', 'running', 'paused'].includes(status.value))

    function generateProgram() {
        if (!canGenerate.value) return
        horseStore.generate()
        scheduleStore.generate(horseStore.horses)

        const firstRound = scheduleStore.rounds[0]
        if (!firstRound) return

        results.value = []
        currentRoundIndex.value = 0
        awaitingNextRound.value = false
        raceState.value = createRaceState(firstRound)
        status.value = 'scheduled'
    }
    function toggle() {
        if (status.value === 'scheduled' || status.value === 'paused') status.value = 'running'
        else if (status.value === 'running') status.value = 'paused'
    }

    function tick(deltaSec: number) {
        const round = currentRound.value
        if (!isRunning.value || awaitingNextRound.value || !raceState.value || !round) return

        raceState.value = advanceRace(
            raceState.value, round, horseStore.horsesById, deltaSec, getGameRng(),
        )
        if (isRaceFinished(raceState.value, round)) completeRound()
    }

    function completeRound() {
        const round = currentRound.value
        if (!round || !raceState.value) return

        results.value.push({
            roundId: round.id,
            distance: round.distance,
            ranking: [...raceState.value.finishOrder],
        })

        if (currentRoundIndex.value >= scheduleStore.rounds.length - 1) {
            status.value = 'finished'
        } else {
            awaitingNextRound.value = true
        }
    }

    function nextRound() {
        if (!awaitingNextRound.value) return

        const next = scheduleStore.rounds[currentRoundIndex.value + 1]
        if (!next) return

        currentRoundIndex.value += 1
        raceState.value = createRaceState(next)
        awaitingNextRound.value = false
    }

    return {
        status, currentRoundIndex, raceState, results, awaitingNextRound,
        currentRound, isRunning, canGenerate, canToggle,
        generateProgram, toggle, tick, nextRound,
    }
})