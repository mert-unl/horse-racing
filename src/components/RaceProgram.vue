<script setup lang="ts">
import { useScheduleStore } from '@/stores/scheduleStore'
import { useHorseStore } from '@/stores/horseStore'
import { ordinal } from '@/utils/format'

const scheduleStore = useScheduleStore()
const horseStore = useHorseStore()

const nameOf = (id: number) => horseStore.horsesById[id]?.name ?? '-'
</script>

<template>
  <section class="overflow-hidden rounded border border-stone-300 bg-white">
    <h2 class="bg-blue-500 px-3 py-2 text-center font-bold text-white">Program</h2>
    <div class="h-[640px] overflow-y-auto" data-testid="program">
      <p v-if="!scheduleStore.hasSchedule" class="p-3 text-stone-500">No program yet.</p>
      <div v-for="round in scheduleStore.rounds" :key="round.id" data-testid="program-round">
        <h3 class="bg-orange-400 px-2 py-1 text-xs font-bold uppercase text-white">
          {{ ordinal(round.id) }} Lap - {{ round.distance }}m
        </h3>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="(id, index) in round.horseIds" :key="id" class="border-t border-stone-200">
              <td class="w-10 px-2 py-0.5">{{ index + 1 }}</td>
              <td class="px-2 py-0.5">{{ nameOf(id) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
