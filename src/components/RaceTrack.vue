<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/raceStore'
import { useHorseStore } from '@/stores/horseStore'
import { ordinal } from '@/utils/format'
import RaceLane from './RaceLane.vue'

const race = useRaceStore()
const horseStore = useHorseStore()

const lanes = computed(() => {
  const round = race.currentRound
  const state = race.raceState
  if (!round || !state) return []

  return round.horseIds.flatMap((id, index) => {
    const horse = horseStore.horsesById[id]
    if (!horse) return []
    const progress = (state.positions[id] ?? 0) / round.distance
    return [{ lane: index + 1, horse, progress }]
  })
})

const label = computed(() =>
  race.currentRound ? `${ordinal(race.currentRound.id)} Lap - ${race.currentRound.distance}m` : '',
)
</script>

<template>
  <section class="rounded border border-stone-300 bg-stone-200">
    <div v-if="!lanes.length" class="flex h-[640px] items-center justify-center text-stone-500">
      Generate a program to start racing.
    </div>
    <template v-else>
      <div class="relative">
        <RaceLane
          v-for="item in lanes"
          :key="item.horse.id"
          :lane="item.lane"
          :horse="item.horse"
          :progress="item.progress"
        />
        <div class="absolute inset-y-0 right-0 w-0.5 bg-red-600" />
      </div>
      <div class="flex justify-between px-3 py-2 font-bold" data-testid="lap-label">
        <span class="text-red-700">{{ label }}</span>
        <span class="text-red-700">FINISH</span>
      </div>
    </template>
  </section>
</template>
