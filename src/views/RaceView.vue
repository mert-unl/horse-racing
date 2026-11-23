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
  <div
    class="min-h-dvh overflow-x-hidden bg-[#090a09] p-4 text-sm text-[#e8ddc7]"
    style="
      background-image:
        radial-gradient(ellipse at 50% 0%, rgba(75, 61, 43, 0.08), transparent 55%),
        linear-gradient(180deg, #0d0e0c 0%, #080908 100%);
    "
  >
    <!-- Main Header -->
    <header
      class="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#62503b] bg-[#24221d] px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#8b704a] bg-[#30291f] text-2xl shadow-inner"
        >
          🏇
        </div>

        <div>
          <h1 class="font-serif text-xl font-bold tracking-wide text-[#e8d3a9]">Horse Racing</h1>
          <p class="text-[9px] uppercase tracking-[0.2em] text-[#93836b]">Mert's Horse Racing</p>
        </div>
      </div>

      <RaceControls />
    </header>

    <!-- Main Dashboard -->
    <main
      class="mt-4 grid min-h-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)_30rem]"
    >
      <!-- Horse Registry -->
      <HorseList />

      <!-- Race Track -->
      <RaceTrack />

      <!-- Program & Results -->
      <div class="grid min-h-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <RaceProgram />
        <RaceResults />
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="mt-4 border-t border-[#62503b]/40 pt-3 text-center text-[9px] tracking-[0.18em] text-[#766b58] uppercase"
    >
      Mert's Horse Racing · Official Race Management
    </footer>
  </div>
</template>
