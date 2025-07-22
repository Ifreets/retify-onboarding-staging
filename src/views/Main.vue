<template>
  <main class="h-dvh w-dvw max-w-md mx-auto linear-gradient px-3 py-10 text-sm">
    <article class="bg-white h-full rounded-xl py-5 px-3 flex flex-col gap-3">
      <Tabs :current_tab="current_step" :total_tabs="3" />
      <div class="relative h-full overflow-hidden">
        <Transition :name="transition_name" mode="out-in">
          <component
            :is="STEPS[current_step - 1]"
            :key="current_step"
            @next="nextStep"
            @back="backStep"
          />
        </Transition>
      </div>
    </article>
  </main>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

import Tabs from '@/views/OnBoarding/Tabs.vue'
import Step1 from '@/views/OnBoarding/Step1.vue'
import Step2 from '@/views/OnBoarding/Step2.vue'
import Step3 from '@/views/OnBoarding/Step3.vue'

/** danh sách các các bước */
const STEPS = [Step1, Step2, Step3]
/** bước hiện tại */
const current_step = ref(1)
const transition_name = ref('slide-left')

watch(current_step, (newVal, oldVal) => {
  transition_name.value = newVal > oldVal ? 'slide-left' : 'slide-right'
})

/** tăng bước */
function nextStep() {
  if (current_step.value < STEPS.length) {
    current_step.value++
  }
}

/** giảm bước */
function backStep() {
  if (current_step.value > 1) {
    current_step.value--
  }
}
</script>
<style scoped>
.linear-gradient {
  background: linear-gradient(to right, #fdefe3, #f3f4f3, #dce5ff);
}

.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

/* Slide left */
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-left-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide right */
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-right-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
