<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { $contact } from '@/api'
import { useContactStore } from '@/stores/contact'

import type { Label } from '@/interfaces';

// store
const contactStore = useContactStore()

onMounted(() => {
  // lấy danh sách nhãn
  getLabels()
})

/** lấy danh sách nhãn */
async function getLabels() {
  try {
    /** danh sách nhãn */
    const RES = await $contact.getLabel()

    /** map ánh xạ id và dữ liệu nhãn */
    let labels: { [index: string]: Label } = {}
    /** map ánh xạ id và dữ liệu nhãn */
    RES?.forEach((item: Label) => {
      labels[item.label_id?.toString() as string] = item
    })

    // lưu lại vào store
    contactStore.labels_obj = labels
  } catch (e) {
    console.log(e);
  }
}

</script>