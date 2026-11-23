import { onScopeDispose, watch } from 'vue'
import { useRaceStore } from '@/stores/raceStore'

const ROUND_PAUSE_MS = 1500
const MAX_FRAME_SEC = 0.1

export function useRaceLoop() {
    const race = useRaceStore()

    let frameId: number | null = null
    let lastTime = 0
    let pauseTimer: ReturnType<typeof setTimeout> | null = null

    function frame(now: number) {
        const delta = Math.min((now - lastTime) / 1000, MAX_FRAME_SEC)
        lastTime = now
        race.tick(delta)
        frameId = race.isRunning ? requestAnimationFrame(frame) : null
    }

    function startLoop() {
        if (frameId !== null) return
        lastTime = performance.now()
        frameId = requestAnimationFrame(frame)
    }

    function stopLoop() {
        if (frameId !== null) cancelAnimationFrame(frameId)
        frameId = null
    }

    function clearPauseTimer() {
        if (pauseTimer !== null) clearTimeout(pauseTimer)
        pauseTimer = null
    }

    watch(
        () => race.isRunning,
        (running) => {
            if (running) {
                startLoop()
                scheduleNextRoundIfNeeded()
            } else {
                stopLoop()
            }
        },
    )

    function scheduleNextRoundIfNeeded() {
        if (!race.awaitingNextRound || pauseTimer !== null) return
        pauseTimer = setTimeout(() => {
            pauseTimer = null
            if (race.isRunning) race.nextRound()
            else scheduleNextRoundIfNeeded()
        }, ROUND_PAUSE_MS)
    }

    watch(
        () => race.awaitingNextRound,
        (waiting) => {
            if (waiting) scheduleNextRoundIfNeeded()
        },
    )

    watch(
        () => race.status,
        (status) => {
            if (status === 'scheduled') clearPauseTimer()
        },
    )

    onScopeDispose(() => {
        stopLoop()
        clearPauseTimer()
    })
}