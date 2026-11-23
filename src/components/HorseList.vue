<script setup lang="ts">
import { useHorseStore } from '@/stores/horseStore'

const horseStore = useHorseStore()
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
      class="relative flex shrink-0 items-center justify-between border-b border-[#62503b]/70 px-3 py-2.5"
    >
      <div class="flex items-center gap-2.5">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-[#8b704a] bg-[#30291f] text-lg shadow-inner"
        >
          🐎
        </div>

        <div class="min-w-0">
          <h2 class="font-serif text-base font-bold tracking-wide text-[#e8d3a9]">The Stable</h2>
          <p class="text-[9px] uppercase tracking-[0.15em] text-[#93836b]">Racing Horse Registry</p>
        </div>
      </div>

      <div class="flex shrink-0 items-baseline gap-1.5 border-l border-[#62503b] pl-3">
        <span class="font-serif text-xl font-bold text-[#d4ad6c]">
          {{ horseStore.horses.length || 20 }}
        </span>
        <span class="text-[9px] font-semibold tracking-widest text-[#93836b]"> HORSES </span>
      </div>
    </header>

    <!-- Empty state -->
    <div
      v-if="!horseStore.horses.length"
      class="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 text-center"
    >
      <span class="mb-3 text-4xl opacity-50">🐎</span>
      <p class="font-serif text-lg text-[#d4c09b]">An empty stable</p>
      <p class="mt-1 text-xs text-[#93836b]">Generate a race program to summon the horses.</p>
    </div>

    <!-- Horse list -->
    <div
      v-else
      class="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
    >
      <table class="w-full table-fixed border-collapse text-left" data-testid="horse-list">
        <colgroup>
          <col class="w-[55%]" />
          <col class="w-[25%]" />
          <col class="w-[20%]" />
        </colgroup>

        <thead class="sticky top-0 z-10 bg-[#24221d]">
          <tr
            class="border-b border-[#62503b]/70 text-[9px] uppercase tracking-[0.12em] text-[#a99573]"
          >
            <th class="px-2 py-2 font-semibold">Horse</th>
            <th class="px-1 py-2 text-center font-semibold">Condition</th>
            <th class="px-1 py-2 text-center font-semibold">Mark</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(horse, index) in horseStore.horses"
            :key="horse.id"
            class="group border-b border-[#62503b]/25 transition-colors duration-200 hover:bg-[#a17b46]/10"
          >
            <!-- Name -->
            <td class="overflow-hidden px-2 py-2">
              <div class="flex min-w-0 items-center gap-1.5">
                <span class="w-4 shrink-0 font-mono text-[10px] text-[#766b58]">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <span
                  class="truncate font-serif text-[12px] font-semibold text-[#d9c9aa] transition-colors group-hover:text-[#f0cc86]"
                  :title="horse.name"
                >
                  {{ horse.name }}
                </span>
              </div>
            </td>

            <!-- Condition -->
            <td class="px-1 py-2">
              <div class="flex flex-col items-center gap-1">
                <span class="font-mono text-xs tabular-nums text-[#d4bd96]">
                  {{ horse.condition }}
                </span>

                <div class="h-1 w-8 overflow-hidden rounded-full bg-[#39352c]">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-[#8b6236] via-[#c49a55] to-[#e4c27f]"
                    :style="{ width: `${horse.condition}%` }"
                  />
                </div>
              </div>
            </td>

            <!-- Color mark -->
            <td class="px-1 py-2">
              <div class="flex justify-center">
                <span
                  class="flex h-5 w-5 items-center justify-center rounded-full border border-[#c3a77a]/50 bg-[#2c2922] shadow-[0_1px_4px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-110"
                  :title="horse.color"
                >
                  <span
                    class="h-3 w-3 rounded-full ring-1 ring-white/20"
                    :style="{ backgroundColor: horse.color }"
                  />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
