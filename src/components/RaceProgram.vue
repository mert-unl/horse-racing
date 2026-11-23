<script setup lang="ts">
import { useScheduleStore } from '@/stores/scheduleStore'
import { useHorseStore } from '@/stores/horseStore'
import { ordinal } from '@/utils/format'

const scheduleStore = useScheduleStore()
const horseStore = useHorseStore()

const nameOf = (id: number) => horseStore.horsesById[id]?.name ?? '-'
</script>

<template>
  <section
    class="relative flex h-[calc(100dvh-180px)] min-h-0 flex-col overflow-hidden rounded-xl border border-[#62503b] bg-[#171714] text-[#e8ddc7] shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
  >
    <!-- Background -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,173,108,0.09),transparent_65%)]"
    />

    <!-- Header -->
    <header
      class="relative z-10 flex shrink-0 items-center justify-between border-b border-[#62503b]/70 px-4 py-3"
    >
      <div>
        <h2 class="text-sm font-bold tracking-[0.18em] text-[#d4ad6c] uppercase">Program</h2>
        <p class="mt-1 text-[10px] tracking-wider text-stone-500 uppercase">
          Official Racing Schedule
        </p>
      </div>

      <div class="rounded-md border border-[#62503b] bg-[#29251e] px-3 py-1.5 text-center">
        <span class="block text-lg leading-none font-bold text-[#e8ddc7]">
          {{ scheduleStore.rounds.length }}
        </span>
        <span class="mt-1 block text-[9px] tracking-wider text-[#b49a72] uppercase"> Rounds </span>
      </div>
    </header>

    <!-- Empty State -->
    <div
      v-if="!scheduleStore.hasSchedule"
      class="relative flex min-h-0 flex-1 items-center justify-center p-6 text-center"
      data-testid="program"
    >
      <div>
        <div class="mb-3 text-3xl opacity-40">📜</div>
        <p class="text-sm font-medium text-stone-400">No program yet.</p>
        <p class="mt-1 text-xs text-stone-600">Generate a program to see the race schedule.</p>
      </div>
    </div>

    <!-- Scrollable Schedule -->
    <div
      v-else
      class="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
      data-testid="program"
    >
      <div
        v-for="round in scheduleStore.rounds"
        :key="round.id"
        data-testid="program-round"
        class="border-b border-[#62503b]/50 last:border-b-0"
      >
        <!-- Round Header -->
        <h3
          class="sticky top-0 z-[1] flex items-center justify-between border-b border-[#62503b]/40 bg-[#29251e]/95 px-3 py-2 text-xs font-bold tracking-wider text-[#d4ad6c] uppercase backdrop-blur-sm"
        >
          <span>{{ ordinal(round.id) }} Lap</span>
          <span class="text-[11px] text-stone-400"> {{ round.distance }}m </span>
        </h3>

        <!-- Horses -->
        <table class="w-full table-fixed text-xs">
          <tbody>
            <tr
              v-for="(id, index) in round.horseIds"
              :key="id"
              class="border-b border-[#62503b]/20 transition-colors last:border-b-0 hover:bg-[#d4ad6c]/5"
            >
              <td class="w-10 px-3 py-2 text-center font-mono text-stone-500">
                {{ String(index + 1).padStart(2, '0') }}
              </td>

              <td class="truncate px-2 py-2 font-medium text-[#d8cbb4]">
                {{ nameOf(id) }}
              </td>

              <td class="w-16 px-3 py-2 text-right text-[10px] tracking-wide text-stone-600">
                LANE {{ index + 1 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
