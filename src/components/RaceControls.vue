<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/raceStore'

const race = useRaceStore()

const toggleLabel = computed(() => {
  if (race.status === 'running') return 'PAUSE'
  if (race.status === 'paused') return 'RESUME'
  return 'START'
})
</script>

<template>
  <div class="flex gap-3">
    <button
      data-testid="generate-btn"
      class="rounded border border-stone-400 bg-white px-4 py-2 font-semibold hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="!race.canGenerate"
      @click="race.generateProgram()"
    >
      GENERATE PROGRAM
    </button>
    <button
      data-testid="toggle-btn"
      class="rounded border border-stone-400 bg-white px-4 py-2 font-semibold hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="!race.canToggle"
      @click="race.toggle()"
    >
      {{ toggleLabel }}
    </button>
  </div>
</template>