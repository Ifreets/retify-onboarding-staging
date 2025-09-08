<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { $contact, $merchant } from '@/api'
import { useAppStore, useContactStore } from '@/stores';

import type { Label } from '@/interfaces';

// store
const appStore = useAppStore()
const contactStore = useContactStore()

onMounted(() => {
  // lấy danh sách nhãn
  getLabels()
  // lấy danh sách nhân sự
  getEmployees()
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

/** lấy danh sách nhân sự */
async function getEmployees() {
  try {
    /** danh sách nhân sự */
    const RES = await $merchant.getEmployees()

    // lưu lại danh sách dạng object có key là _id
    RES?.forEach((item: any) => {
      if(!item._id) return
      appStore.employees_obj[item._id] = item
    })
    
  } catch (e) {
    console.log(e);
  }
}

</script>