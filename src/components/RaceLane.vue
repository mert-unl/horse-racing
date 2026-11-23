<script setup lang="ts">
import type { Horse } from '@/types/race'
import horseRun from '@/assets/Horse-Run.png'

defineProps<{
  lane: number
  horse: Horse
  progress: number
  finished: boolean
}>()
</script>

<template>
  <div
    class="flex h-full min-h-0 border-b border-dashed border-[#62503b]/60"
    :data-testid="`lane-${lane}`"
  >
    <!-- Lane number -->
    <div
      class="flex w-8 shrink-0 items-center justify-center border-r border-[#62503b]/60 bg-[#30291f] font-mono text-xs font-bold text-[#d4ad6c]"
    >
      {{ lane }}
    </div>

    <!-- Race track -->
    <div class="relative min-w-0 flex-1">
      <div class="absolute inset-y-0 left-0 right-12">
        <!-- Animated horse -->
        <div
          data-testid="horse"
          class="horse-sprite absolute top-1/2"
          :class="{ 'horse-finished': finished }"
          :style="{
            left: `${progress * 100}%`,
            transform: `translate(-${progress * 64}px, -50%)`,
            backgroundImage: `url(${horseRun})`,
            filter: `drop-shadow(0 2px 4px ${horse.color}80)`,
          }"
          :title="`${horse.name} (${horse.condition})`"
        />

        <!-- Horse color indicator -->
        <div
          class="absolute bottom-1 h-1 w-3 rounded-full"
          :style="{
            left: `calc(${progress * 100}% - ${progress * 64}px + 26px)`,
            backgroundColor: horse.color,
            boxShadow: `0 0 6px ${horse.color}`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.horse-sprite {
  width: 64px;
  height: 64px;

  background-repeat: no-repeat;
  background-size: 384px 64px;
  background-position: 0 0;

  animation: horse-run 0.65s steps(6) infinite;
  image-rendering: auto;

  pointer-events: none;
}

.horse-finished {
  animation: none !important;
  background-position: -320px 0 !important;
}
@keyframes horse-run {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -384px 0;
  }
}
</style>
