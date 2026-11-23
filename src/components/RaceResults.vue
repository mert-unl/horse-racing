<script setup lang="ts">
import { useRaceStore } from '@/stores/raceStore'
import { useHorseStore } from '@/stores/horseStore'
import { ordinal } from '@/utils/format'

const race = useRaceStore()
const horseStore = useHorseStore()

const nameOf = (id: number) => horseStore.horsesById[id]?.name ?? '-'
</script>

<template>
  <section class="overflow-hidden rounded border border-stone-300 bg-white">
    <h2 class="bg-green-500 px-3 py-2 text-center font-bold text-white">Results</h2>
    <div class="h-[640px] overflow-y-auto" data-testid="results">
      <p v-if="!race.results.length" class="p-3 text-stone-500">Results appear after each lap.</p>
      <div v-for="result in race.results" :key="result.roundId" data-testid="result-round">
        <h3 class="bg-orange-400 px-2 py-1 text-xs font-bold uppercase text-white">
          {{ ordinal(result.roundId) }} Lap - {{ result.distance }}m
        </h3>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="(id, index) in result.ranking" :key="id" class="border-t border-stone-200">
              <td class="w-10 px-2 py-0.5">{{ index + 1 }}</td>
              <td class="px-2 py-0.5">{{ nameOf(id) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
