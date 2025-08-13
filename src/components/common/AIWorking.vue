<template>
  <div
    v-if="(route.path?.includes('order') || route.path?.includes('customer'))"
    class="text-blue-700 border border-blue-700 rounded-lg py-3 px-4 flex gap-3 bg-blue-50"
  >
    <SparklesIcon class="size-6 flex-shrink-0" />
    <div>
      <p class="text-base font-semibold">AI Retify is working</p>
      <p>
        Retify is currently generating your Selling Page and AI Agent. This
        message will disappear automatically once the process is complete.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import { SparklesIcon } from '@heroicons/vue/24/solid';
// router
const route = useRoute()
</script>
