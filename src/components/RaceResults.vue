<script setup lang="ts">
import { useRaceStore } from '@/stores/raceStore'
import { useHorseStore } from '@/stores/horseStore'
import { ordinal } from '@/utils/format'

const race = useRaceStore()
const horseStore = useHorseStore()

const nameOf = (id: number) => horseStore.horsesById[id]?.name ?? '-'
</script>

<template>
  <section
    class="relative flex h-[calc(100dvh-180px)] min-h-0 flex-col overflow-hidden rounded-xl border border-[#62503b] bg-[#171714] text-[#e8ddc7] shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
  >
    <!-- Subtle painted background -->
    <div
      class="pointer-events-none absolute inset-0 opacity-30"
      style="
        background:
          radial-gradient(ellipse at 10% 0%, #756044 0%, transparent 55%),
          radial-gradient(ellipse at 100% 100%, #403b2c 0%, transparent 50%);
      "
    />

    <!-- Header -->
    <header
      class="relative flex shrink-0 items-center justify-between border-b border-[#62503b]/70 px-4 py-3"
    >
      <div>
        <h2 class="text-sm font-bold tracking-[0.18em] text-[#d4ad6c] uppercase">Results</h2>
        <p class="mt-1 text-[10px] tracking-wider text-stone-500 uppercase">
          Official Race Rankings
        </p>
      </div>

      <div class="rounded-md border border-[#62503b] bg-[#29251e] px-3 py-1.5 text-center">
        <span class="block text-lg leading-none font-bold text-[#e8ddc7]">
          {{ race.results.length }}
        </span>
        <span class="mt-1 block text-[9px] tracking-wider text-[#b49a72] uppercase"> Laps </span>
      </div>
    </header>

    <!-- Empty state -->
    <div
      v-if="!race.results.length"
      class="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 text-center"
      data-testid="results"
    >
      <span class="mb-3 text-4xl opacity-40">🏆</span>
      <p class="font-serif text-lg text-[#d4c09b]">No results yet</p>
      <p class="mt-1 text-xs text-[#93836b]">Results appear after each lap.</p>
    </div>

    <!-- Scrollable results -->
    <div
      v-else
      class="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
      data-testid="results"
    >
      <div
        v-for="result in race.results"
        :key="result.roundId"
        data-testid="result-round"
        class="border-b border-[#62503b]/50 last:border-b-0"
      >
        <!-- Round heading -->
        <h3
          class="sticky top-0 z-[1] flex items-center justify-between border-b border-[#62503b]/40 bg-[#29251e]/95 px-3 py-2 text-xs font-bold tracking-wider text-[#d4ad6c] uppercase backdrop-blur-sm"
        >
          <span>{{ ordinal(result.roundId) }} Lap</span>
          <span class="text-[11px] text-stone-400"> {{ result.distance }}m </span>
        </h3>

        <!-- Rankings -->
        <table class="w-full table-fixed text-xs">
          <tbody>
            <tr
              v-for="(id, index) in result.ranking"
              :key="id"
              class="border-b border-[#62503b]/20 transition-colors last:border-b-0 hover:bg-[#d4ad6c]/5"
            >
              <!-- Position -->
              <td class="w-10 px-3 py-2 text-center">
                <span
                  :class="[
                    'font-mono font-bold',
                    index === 0
                      ? 'text-[#e4c27f]'
                      : index === 1
                        ? 'text-[#c0b9a8]'
                        : index === 2
                          ? 'text-[#b9855b]'
                          : 'text-stone-500',
                  ]"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </td>

              <!-- Horse name -->
              <td class="truncate px-2 py-2 font-medium text-[#d8cbb4]">
                {{ nameOf(id) }}
              </td>

              <!-- Position label -->
              <td class="w-16 px-3 py-2 text-right text-[9px] tracking-wider text-stone-600">
                {{ index === 0 ? 'WINNER' : index === 1 ? '2ND' : index === 2 ? '3RD' : '' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
