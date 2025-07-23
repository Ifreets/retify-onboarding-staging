<template>
  <article class="h-full flex flex-col items-center justify-center">
    <header class="flex justify-between items-center w-full px-2">
      <div class="w-18">
        <ArrowLeftIcon class="size-6" @click="back" />
      </div>
      <h3 class="text-2xl font-semibold">
        {{ is_edit ? 'Edit Customer' : 'Customer Details' }}
      </h3>
      <button
        v-if="!is_edit"
        class="w-18 flex items-center gap-1 py-2 justify-center rounded-xl font-medium text-white bg-black"
        @click="openEdit"
      >
        <PencilSquareIcon class="size-4" />
        Edit
      </button>
      <button
        v-else
        class="w-18 flex items-center gap-1 py-2 justify-center rounded-xl font-medium text-white bg-blue-700"
        @click="closeEdit"
      >
        Save
      </button>
    </header>
    <main class="w-full h-full px-2 py-3 gap-5 flex flex-col overflow-auto">
      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <img src="@/assets/image/avatar.png" class="w-11 h-11 rounded-full" />
        <div class="w-full flex flex-col gap-3">
          <div>
            <p class="text-base font-semibold">Sophia Chen</p>
            <p class="text-slate-700">+1 (555) 123-4567</p>
          </div>
          <template v-if="!is_edit">
            <div class="w-full h-px bg-slate-200"></div>
            <div class="font-semibold flex gap-2.5 text-base">
              <button class="flex items-center gap-2 py-2 px-5 rounded-lg border text-slate-700">
                <SolidPhoneIcon class="size-4 text-black flex-shrink-0" />
                Call
              </button>
              <button class="flex items-center gap-2 py-2 px-5 text-white bg-blue-700 rounded-lg">
                <ChatBubbleOvalLeftEllipsisIcon class="size-4" />
                Message
              </button>
            </div>
          </template>
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <UserCircleIcon class="size-8 flex-shrink-0" />
        <div class="w-full flex flex-col gap-3">
          <p class="text-lg font-semibold">Contact Information</p>
          <div class="w-full h-px bg-slate-200"></div>

          <div class="flex gap-3 items-center">
            <PhoneIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Phone</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                value="+1 (555) 123-4567"
              />
            </div>
            <Square2StackIcon v-if="!is_edit" class="size-5 flex-shrink-0 text-blue-700" />
          </div>

          <div class="flex gap-3 items-center">
            <EnvelopeIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Email</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                value="alice@example.com"
              />
            </div>
            <Square2StackIcon v-if="!is_edit" class="size-5 flex-shrink-0 text-blue-700" />
          </div>

          <div class="flex gap-3 items-center">
            <MapPinIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Address</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                value="123 Maple Street, Anytown, CA 90210"
              />
            </div>
            <Square2StackIcon v-if="!is_edit" class="size-5 flex-shrink-0 text-blue-700" />
          </div>

          <div class="flex gap-3 items-center">
            <FacebookCircleIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Facebook</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                value="alice"
              />
            </div>
            <ExternalLinkIcon v-if="!is_edit" class="size-5 flex-shrink-0 text-blue-700" />
          </div>

          <div class="flex gap-3 items-center">
            <InstagramCircleIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Instagram</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                value="alice"
              />
            </div>
            <ExternalLinkIcon v-if="!is_edit" class="size-5 flex-shrink-0 text-blue-700" />
          </div>
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <TagIcon class="size-8 flex-shrink-0" />
        <div class="w-full flex flex-col gap-3">
          <p class="text-lg font-semibold">Preferences & Labels</p>
          <div class="w-full h-px bg-slate-200"></div>
          <ul class="flex gap-3 flex-wrap">
            <li
              v-for="label in LABELS"
              class="flex gap-1 items-center font-medium bg-slate-200 py-0.5 px-2 rounded-md"
            >
              {{ label }}
              <XCircleIcon v-if="is_edit" class="size-4 flex-shrink-0" />
            </li>
          </ul>
          <button
            v-if="is_edit"
            class="py-2 px-5 text-white bg-blue-700 rounded-md w-fit font-medium"
          >
            Add Label
          </button>
        </div>
      </section>

      <ProductList v-show="!is_edit" title="Last Orders" />
    </main>
  </article>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon.vue'
import FacebookCircleIcon from '@/components/icons/FacebookCircleIcon.vue'
import InstagramCircleIcon from '@/components/icons/InstagramCircleIcon.vue'
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  Square2StackIcon,
} from '@heroicons/vue/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PhoneIcon as SolidPhoneIcon,
  TagIcon,
  UserCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/solid'
import ProductList from '@/components/common/ProductList.vue'

const LABELS = ['Vegetarian', 'Nut-Allergy', 'Gluten-Free', 'Spicy Food Lover']

// router
const router = useRouter()

/** chế độ edit */
const is_edit = ref(false)

/** bật chế độ edit */
function openEdit() {
  is_edit.value = true
}

/** tắt chế độ edit */
function closeEdit() {
  is_edit.value = false
}

/** hàm trở lại danh sách khách hàng */
function back() {
  if (is_edit.value) {
    closeEdit()
    return
  }
  router.push('/home/customer')
}
</script>
