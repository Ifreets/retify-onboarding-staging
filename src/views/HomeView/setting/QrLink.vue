<template>
  <div
    class="h-full px-4 w-full"
  >
    <LinkAndQRCode :page_id="onBoardingStore.selected_data.page_id" />
  </div>
</template>

<script setup lang="ts">
import { useOnBoardingStore } from '@/stores';

import LinkAndQRCode from '@/components/common/LinkAndQRCode.vue';

const onBoardingStore = useOnBoardingStore()
</script>
