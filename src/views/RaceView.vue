<script setup lang="ts">
import { useRaceLoop } from '@/composables/useRaceLoop'
import RaceControls from '@/components/RaceControls.vue'
import HorseList from '@/components/HorseList.vue'
import RaceTrack from '@/components/RaceTrack.vue'
import RaceProgram from '@/components/RaceProgram.vue'
import RaceResults from '@/components/RaceResults.vue'

useRaceLoop()
</script>

<template>
  <div class="min-h-screen bg-stone-100 p-4 text-sm text-stone-800">
    <header class="flex items-center justify-between rounded bg-rose-300 px-4 py-3">
      <h1 class="text-lg font-bold">Horse Racing</h1>
      <RaceControls />
    </header>

    <main class="mt-4 grid grid-cols-[17rem_1fr_30rem] items-start gap-4">
      <HorseList />
      <RaceTrack />
      <div class="grid grid-cols-2 gap-2">
        <RaceProgram />
        <RaceResults />
      </div>
    </main>
  </div>
</template>
