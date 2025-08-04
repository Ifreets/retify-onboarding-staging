<template>
  <button>
    <LoadingIcon v-if="$props.is_loading" :class="class_icon"/>
    <slot ></slot>
  </button>
</template>

<script setup lang="ts">
import LoadingIcon from '@/components/icons/LoadingIcon.vue';

const $props = defineProps({
  is_loading: {
    type: Boolean,
    default: false
  },
  class_icon: {
    type: String,
    default: 'text-white fill-blue-700 size-5'
  }
})
</script>