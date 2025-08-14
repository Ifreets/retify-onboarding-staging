<template>
  <div class="w-full h-full gap-4 flex flex-col overflow-auto">
    <!-- <section class="px-3 flex flex-col gap-2">
      <p class="text-lg font-semibold sticky top-0 bg-white">Integrations</p>
      <ul class="flex flex-col gap-4">
        <li>
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <ShoppingBagIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">POS System</p>
                <p>Connect with Clover, Square, and more</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li>
        <li>
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <ChatBubbleLeftRightIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">Messaging Platforms</p>
                <p>Connect with Clover, Square, and more</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li>
      </ul>
    </section> -->

    <section class="px-3 flex flex-col gap-2">
      <p class="text-lg font-semibold sticky top-0 bg-white">
        Merchant Information
      </p>
      <ul class="flex flex-col gap-4">
        <!-- <li>
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <BriefcaseIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">Business Profile</p>
                <p>
                  Operating hours, contact info, legal details, Parking info
                </p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li> -->
        <li @click="$emit('open-view', 'product')">
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <CubeIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">Product Information</p>
                <p>Product listing information for customers and AI training</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li>
      </ul>
    </section>

    <section class="px-3 flex flex-col gap-2">
      <p class="text-lg font-semibold sticky top-0 bg-white">AI & QR Code</p>
      <ul class="flex flex-col gap-4">
        <!-- <li>
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <SparklesIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">AI Agent</p>
                <p>Setting AI Agento</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li> -->
        <li @click="$emit('open-view', 'qr_link')">
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <QrCodeIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">QR Code</p>
                <p>Download QR for AI customer chat</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li>
      </ul>
    </section>

    <!-- <section class="px-3 flex flex-col gap-2">
      <p class="text-lg font-semibold sticky top-0 bg-white">Legal & Support</p>
      <ul class="flex flex-col gap-4">
        <li>
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <LockClosedIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">Privacy Policy</p>
                <p>View the application's privacy policy</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li>
        <li>
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <DocumentTextIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">Terms of Service</p>
                <p>Read the terms and conditions of service</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li>
        <li>
          <div class="flex gap-3 items-center">
            <div class="p-2 rounded-full bg-blue-100 w-fit h-fit">
              <LifebuoyIcon class="size-5 text-blue-700" />
            </div>
            <div class="flex-grow flex gap-6 items-center">
              <div class="text-base flex-grow">
                <p class="font-semibold">Get Support</p>
                <p>Get Support</p>
              </div>
              <ChevronRightIcon class="size-5 text-slate-500 flex-shrink-0" />
            </div>
          </div>
          <div class="ml-12 border-b h-4 border-slate-200"></div>
        </li>
      </ul>
    </section> -->

    <!-- <section class="px-3 flex flex-col gap-2">
        <button
          class="text-base bg-red-100 rounded-md px-3 py-2 text-red-500 font-semibold"
          @click="handleResetOnboarding()"
        >
          Reset Onboarding
        </button>
      </section> -->
    
    <div class="flex-1"></div>

    <section class="px-3 flex flex-col gap-2">
      <button
        class="text-base bg-red-100 rounded-md px-3 py-2 text-red-500 font-semibold"
        @click="logout()"
      >
        Logout
      </button>
    </section>
    
    <p class="w-full text-center py-3 text-slate-500">
      Version 1.0.0 (Build 20240726)
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import axios from 'axios'

import QrCodeIcon from '@/components/icons/QrCodeIcon.vue'
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  CubeIcon,
  DocumentTextIcon,
  LifebuoyIcon,
  LockClosedIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from '@heroicons/vue/24/solid'

// emit
const $emit = defineEmits(['open-view'])

// store
const appStore = useAppStore()

/**  xử lý reset onboarding */
async function handleResetOnboarding() {
  try {
    handleDisableOnboarding()
  } catch (e) {
    console.log(e)
  }
}

/** tắt cờ onboarding */
async function handleDisableOnboarding() {
  try {
    await axios.post(
      'https://chatbox-service-v3.botbanhang.vn/app/chatbot_user/update_setup_status',
      { is_setup_completed: false },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: appStore.chatbot_token,
        },
      },
    )
  } catch (e) {
    throw e
  }
}

/** hàm đăng xuất */
function logout() {
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: 'page.logout', payload: {} }),
  )
}
</script>
