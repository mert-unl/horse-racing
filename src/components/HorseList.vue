<script setup lang="ts">
import { useHorseStore } from '@/stores/horseStore'

const horseStore = useHorseStore()
</script>

<template>
  <section class="overflow-hidden rounded border border-stone-300 bg-white">
    <h2 class="bg-yellow-300 px-3 py-2 font-bold">
      Horse List (1-{{ horseStore.horses.length || 20 }})
    </h2>
    <div class="h-[640px] overflow-y-auto">
      <p v-if="!horseStore.horses.length" class="p-3 text-stone-500">
        Generate a program to see the horses.
      </p>
      <table v-else class="w-full text-left" data-testid="horse-list">
        <thead class="sticky top-0 bg-stone-100">
          <tr>
            <th class="px-3 py-1">Name</th>
            <th class="px-3 py-1">Cond.</th>
            <th class="px-3 py-1">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horseStore.horses" :key="horse.id" class="border-t border-stone-200">
            <td class="px-3 py-1">{{ horse.name }}</td>
            <td class="px-3 py-1">{{ horse.condition }}</td>
            <td class="px-3 py-1">
              <span
                class="inline-block h-4 w-8 rounded border border-stone-400"
                :style="{ backgroundColor: horse.color }"
                :title="horse.color"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>