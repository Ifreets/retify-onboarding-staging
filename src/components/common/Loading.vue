<template>
  <Transition
    name="fade-up"
    mode="out-in"
  >
    <div
      v-if="loading"
      class="absolute bottom-10 left-0 right-0 m-auto bg-white rounded-full p-1 shadow-xl shadow-blue-500 w-fit"
    >
      <LoadingIcon class="text-slate-300 fill-blue-700 size-7" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import LoadingIcon from '@/components/icons/LoadingIcon.vue'

const $props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped>
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-enter-active {
  transition: all 0.2s ease-in;
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-active {
  transition: all 0.2s ease-out;
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
