<template>
  <li 
    class="flex gap-3 py-2 border-b"
    @click="openContact(contact)"
  >
    <Image
      :url="contact.avatar || ''"
      container_class="w-21 h-21 rounded-full object-contain flex-shrink-0"
    >
      <div
        class="w-21 h-21 flex-shrink-0 rounded-full flex items-center justify-center bg-slate-100"
      >
        <UserIcon class="w-14 h-14 flex-shrink-0 text-slate-700" />
      </div>
    </Image>

    <div class="flex flex-col overflow-hidden">
      <p class="text-lg font-semibold truncate">
        {{ contact.first_name }} {{ contact.last_name }}
      </p>
      <p class="text-base font-medium text-slate-700">
        {{ contact.contact_phones?.[0]?.phone_number }}
      </p>
      <!-- <p
        class="font-medium bg-blue-500 text-white py-0.5 px-2 w-fit rounded-md"
      >
        New Lead
      </p> -->
    </div>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useRouter } from 'vue-router';
import { useContactStore } from '@/stores/contact';

import Image from '@/components/ui/Image.vue'

import { UserIcon } from '@heroicons/vue/24/solid'

import type { Contact } from '@/interfaces'

// props
const $props = defineProps({
  contact: {
    type: Object as PropType<Contact>,
    required: true,
  },
})

// router
const router = useRouter()

// store
const contactStore = useContactStore()

/** mở chi tiết đơn hàng */
function openContact(contact: Contact) {
  // lưu đơn hàng được chọn vào store
  contactStore.selected_contact = contact
  // chuyển router
  router.push('/home/customer/' + contact.identifier_id)
}
</script>
