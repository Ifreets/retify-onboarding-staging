<template>
  <iframe 
    v-if="url"
    :src="url"
    className="w-dvw h-dvh"
    title="Embedded Content"
    sandbox="allow-scripts allow-same-origin"
  />
</template>

<script setup lang="ts">
import { ENV } from '@/env';
import type { IEnv } from '@/interfaces';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const url = ref("")

onMounted(() => {
  /** Đường dẫn host của merchant */
  const $HOST: IEnv = ENV[import.meta.env.VITE_APP_ENV || 'development']

  /** id page */
  const ID = route.params.id as string;

  /** Validate ID */
  if (!ID || !/^[a-zA-Z0-9_-]+$/.test(ID)) {
    console.log('ID khong hop le');
  }

  /** Iframe URL */
  const IFRAME_URL = $HOST.iframe_url;

  /** IFRAME SOURCE */
  url.value = `${IFRAME_URL}/view-screen?page_id=${encodeURIComponent(ID)}`;
})
</script>
