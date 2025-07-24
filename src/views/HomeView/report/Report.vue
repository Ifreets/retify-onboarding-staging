<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-center w-full px-2 text-2xl font-semibold">
      Analytics Dashboard
    </header>
    <main class="w-full h-full flex flex-col overflow-auto py-3">
      <div class="px-2 flex flex-col gap-5">
        <section class="border border-slate-200 rounded-lg p-3 flex flex-col gap-3">
          <p class="text-base font-semibold">Action Items</p>
          <div class="bg-slate-200 h-px"></div>
          <div class="flex gap-3 text-red-500 font-semibold border bg-red-50 p-3 border-red-500 rounded-lg">
            <ExclamationCircleIcon class="size-6 flex-shrink-0" />
            <p class="flex-grow overflow-hidden">2 New Negative Feedbacks!</p>
            <button class="py-1 px-2 rounded bg-red-500 text-white flex-shrink-0 h-fit">Review</button>
          </div>
          <div class="flex gap-3 text-red-500 font-semibold border bg-red-50 p-3 border-red-500 rounded-lg">
            <ExclamationCircleIcon class="size-6 flex-shrink-0" />
            <p class="flex-grow overflow-hidden">3 New Orders Need Confirmation</p>
            <button class="py-1 px-2 rounded bg-red-500 text-white flex-shrink-0 h-fit">Confirm</button>
          </div>
          <div class="flex gap-3 text-blue-700 font-semibold border bg-blue-50 p-3 border-blue-700 rounded-lg">
            <LightBulbIcon class="size-6 flex-shrink-0" />
            <p class="flex-grow overflow-hidden">3 New Orders Need Confirmation</p>
            <button class="py-1 px-2 rounded bg-blue-700 text-white flex-shrink-0 h-fit">Confirm</button>
          </div>
        </section>
        <ul class="flex flex-col gap-5 mx-3">
          <li class="flex gap-3 py-2 px-3 bg-slate-100 rounded-lg items-center">
            <div class="bg-slate-200 rounded-lg p-2">
              <ChatBubbleLeftRightIcon class="size-5 flex-shrink-0 text-slate-700" />
            </div>
            <div class="flex flex-col flex-grow">
              <p class="font-medium">Total Messages</p>
              <p class="text-base font-semibold">10.927</p>
            </div>
          </li>
          <li class="flex gap-3 py-2 px-3 bg-slate-100 rounded-lg items-center">
            <div class="bg-slate-200 rounded-lg p-2">
              <FaceFrownIcon class="size-5 flex-shrink-0 text-red-500" />
            </div>
            <div class="flex flex-col flex-grow">
              <div class="font-medium flex gap-2">
                <p class="flex-grow truncate">Number of negative messages</p>
                <ExternalLinkIcon class="size-4 flex-shrink-0 text-blue-700" />
              </div>
              <p class="text-base font-semibold text-red-500">16.482</p>
            </div>
          </li>
          <li class="flex gap-3 py-2 px-3 bg-slate-100 rounded-lg items-center">
            <div class="bg-slate-200 rounded-lg p-2">
              <FaceSmileIcon class="size-5 flex-shrink-0 text-blue-700" />
            </div>
            <div class="flex flex-col flex-grow">
              <div class="font-medium flex gap-2">
                <p class="flex-grow truncate">Number of active messages</p>
                <ExternalLinkIcon class="size-4 flex-shrink-0 text-slate-500" />
              </div>
              <p class="text-base font-semibold text-blue-700">16.482</p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </article>
</template>

<script setup lang="ts">
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon.vue';
import LightBulbIcon from '@/components/icons/LightBulbIcon.vue';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { ChatBubbleLeftRightIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/vue/24/solid';
</script>
