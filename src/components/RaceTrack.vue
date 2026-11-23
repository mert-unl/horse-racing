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
    const finished = state.finishOrder.includes(id)

    return [
      {
        lane: index + 1,
        horse,
        progress,
        finished,
      },
    ]
  })
})

const label = computed(() =>
  race.currentRound ? `${ordinal(race.currentRound.id)} Lap - ${race.currentRound.distance}m` : '',
)
</script>

<template>
  <section
    data-testid="race-track"
    class="relative flex h-[calc(100dvh-180px)] min-h-0 flex-col overflow-hidden rounded-xl border border-[#62503b] bg-[#171714]"
  >
    <!-- Header -->
    <header
      class="relative flex shrink-0 items-center justify-between border-b border-[#62503b]/70 px-4 py-3"
    >
      <div>
        <h2 class="text-sm font-bold tracking-[0.18em] text-[#d4ad6c] uppercase">Race Track</h2>
        <p class="mt-1 text-[10px] tracking-wider text-stone-500 uppercase">The Racing Grounds</p>
      </div>

      <div class="rounded-md border border-[#62503b] bg-[#29251e] px-3 py-1.5 text-center">
        <span class="block text-lg leading-none font-bold text-[#e8ddc7]">
          {{ lanes.length }}
        </span>
        <span class="mt-1 block text-[9px] tracking-wider text-[#b49a72] uppercase"> Lanes </span>
      </div>
    </header>

    <!-- Track -->
    <div class="relative min-h-0 flex-1 overflow-hidden bg-[#121a13]">
      <template v-if="lanes.length">
        <!-- Track background -->
        <div
          class="absolute inset-0"
          style="
            background:
              repeating-linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.015) 0px,
                rgba(255, 255, 255, 0.015) 1px,
                transparent 1px,
                transparent 10%
              ),
              linear-gradient(90deg, #172019 0%, #1b241a 50%, #172019 100%);
          "
        />

        <!-- Finish line -->
        <div
          class="absolute inset-y-0 right-[56px] z-[2] w-2 opacity-80"
          style="
            background: conic-gradient(#d4c6a5 25%, #29251e 0 50%, #d4c6a5 0 75%, #29251e 0) 0 0 /
              8px 8px;
          "
        />

        <!-- 10 equal lanes -->
        <div
          class="relative z-[1] grid h-full"
          style="grid-template-rows: repeat(10, minmax(0, 1fr))"
        >
          <RaceLane
            v-for="item in lanes"
            :key="item.horse.id"
            :lane="item.lane"
            :horse="item.horse"
            :progress="item.progress"
            :finished="item.finished"
          />
        </div>
      </template>

      <!-- Empty state -->
      <div v-else class="flex h-full flex-col items-center justify-center gap-3 text-center">
        <span class="text-5xl opacity-30">🏇</span>
        <p class="text-xs tracking-widest text-[#93836b] uppercase">Waiting for the race</p>
        <p class="text-[10px] text-stone-600">Generate a program to prepare the track</p>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="flex shrink-0 items-center justify-between border-t border-[#62503b]/70 bg-[#24221d] px-4 py-2"
    >
      <span
        data-testid="lap-label"
        class="text-[10px] font-semibold tracking-widest text-[#d4ad6c] uppercase"
      >
        {{ label || 'Race Track' }}
      </span>

      <span class="text-[9px] tracking-widest text-stone-500 uppercase"> Finish Line </span>
    </footer>
  </section>
</template>
