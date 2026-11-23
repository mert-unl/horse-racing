<script setup lang="ts">
import type { Horse } from '@/types/race'

defineProps<{
  lane: number
  horse: Horse
  progress: number // 0-1
}>()
</script>

<template>
  <div
    class="flex h-14 border-b border-dashed border-stone-400"
    :data-testid="`lane-${lane}`"
  >
    <div class="flex w-8 shrink-0 items-center justify-center bg-green-700 font-bold text-white">
      {{ lane }}
    </div>
    <!-- right-12 = at genişliği (w-12), böylece at burnu bitiş çizgisinde biter -->
    <div class="relative flex-1">
      <div class="absolute inset-y-0 left-0 right-12">
        <div
          class="absolute top-1/2 flex h-9 w-12 -translate-y-1/2 items-center justify-center rounded-full text-2xl"
          :style="{ left: `${progress * 100}%`, backgroundColor: horse.color }"
          :title="`${horse.name} (${horse.condition})`"
        >
          <span class="-scale-x-100">🐎</span>
        </div>
      </div>
    </div>
  </div>
</template>