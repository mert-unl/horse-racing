import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Horse, Round } from '@/types/race'
import { generateSchedule } from '@/utils/scheduleGenerator'
import { getGameRng } from '@/utils/random'

export const useScheduleStore = defineStore('schedule', () => {
    const rounds = ref<Round[]>([])

    const hasSchedule = computed(() => rounds.value.length > 0)

    function generate(horses: Horse[]) {
        rounds.value = generateSchedule(horses, getGameRng())
    }

    return { rounds, hasSchedule, generate }
})