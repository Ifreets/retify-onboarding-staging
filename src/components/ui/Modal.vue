<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="is_open"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
          :class="container_class"
          @click.stop
        >
          <!-- Close button -->
          <button
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            @click="close()"
          >
            ✕
          </button>

          <!-- Modal content slot -->
          <div>
            <slot />
          </div>

          <!-- Footer slot -->
          <div
            v-if="$slots.footer"
            class="mt-4"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
const $props = defineProps({
  container_class: {
    type: String,
    default: ''
  }
})  

/** đóng mở modal */
const is_open = defineModel<boolean>('is_open', {
  type: Boolean,
  default: false,
})

function close() {
  is_open.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
