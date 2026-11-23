<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/raceStore'

const race = useRaceStore()

const toggleLabel = computed(() => {
  if (race.status === 'running') return 'PAUSE'
  if (race.status === 'paused') return 'RESUME'
  return 'START'
})

const toggleIcon = computed(() => {
  if (race.status === 'running') return 'Ⅱ'
  if (race.status === 'paused') return '▶'
  return '⚑'
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <!-- Generate Program -->
    <button
      data-testid="generate-btn"
      class="group flex items-center justify-center gap-2 rounded-lg border border-[#8b704a] bg-gradient-to-b from-[#493b29] to-[#30271d] px-5 py-2.5 text-xs font-bold tracking-[0.12em] text-[#e8d3a9] shadow-[0_3px_10px_rgba(0,0,0,0.3)] transition-all duration-200 hover:border-[#d4ad6c] hover:from-[#5a472e] hover:to-[#403321] hover:text-[#f5dfb5] active:translate-y-px disabled:cursor-not-allowed disabled:border-[#51483a] disabled:from-[#29251f] disabled:to-[#211f1a] disabled:text-stone-600 disabled:shadow-none"
      :disabled="!race.canGenerate"
      @click="race.generateProgram()"
    >
      <span
        class="text-base text-[#d4ad6c] transition-transform duration-200 group-hover:rotate-12"
      >
        ⚔
      </span>
      GENERATE PROGRAM
    </button>

    <!-- Start / Pause / Resume -->
    <button
      data-testid="toggle-btn"
      class="flex min-w-[125px] items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-xs font-bold tracking-[0.15em] shadow-[0_3px_10px_rgba(0,0,0,0.3)] transition-all duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:border-[#51483a] disabled:bg-[#29251f] disabled:text-stone-600 disabled:shadow-none"
      :class="
        race.status === 'running'
          ? 'border-[#a56d4c] bg-gradient-to-b from-[#633c2e] to-[#43291f] text-[#f0c1a3] hover:border-[#c78a64] hover:from-[#754a37] hover:to-[#543326]'
          : race.status === 'paused'
            ? 'border-[#8b704a] bg-gradient-to-b from-[#493b29] to-[#30271d] text-[#e8d3a9] hover:border-[#d4ad6c] hover:from-[#5a472e] hover:to-[#403321]'
            : 'border-[#718052] bg-gradient-to-b from-[#39432b] to-[#272f20] text-[#c7d6a2] hover:border-[#9bac70] hover:from-[#465434] hover:to-[#303c25]'
      "
      :disabled="!race.canToggle"
      @click="race.toggle()"
    >
      <span class="text-base">{{ toggleIcon }}</span>
      {{ toggleLabel }}
    </button>
  </div>
</template>
