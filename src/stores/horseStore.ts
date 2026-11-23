import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Horse } from '@/types/race'
import { generateHorses } from '@/utils/horseGenerator'
import { getGameRng } from '@/utils/random'

export const useHorseStore = defineStore('horses', () => {
    const horses = ref<Horse[]>([])

    const horsesById = computed(
        () => Object.fromEntries(horses.value.map((h) => [h.id, h])) as Record<number, Horse>,
    )

    function generate() {
        horses.value = generateHorses(getGameRng())
    }

    return { horses, horsesById, generate }
})