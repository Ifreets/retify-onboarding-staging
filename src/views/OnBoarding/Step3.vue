<template>
  <section class="flex flex-col gap-3 text-base overflow-auto h-full">
    <header class="flex flex-col gap-1 bg-white">
      <p
        class="rounded-full font-semibold bg-blue-700 w-8 h-8 flex items-center justify-center text-white"
      >
        3
      </p>
      <p class="font-semibold">Connect Your Audience</p>
      <p class="text-slate-700">
        Select the platforms where your customers can easily connect with your business.
      </p>
    </header>

    <section class="flex flex-col gap-3 p-3 border rounded-lg">
      <div class="flex gap-2 items-center">
        <img :src="GlobalIcon" class="size-7" />
        <p class="text-base font-semibold">Link connect your Audience</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex gap-1 w-full">
          <p class="flex-1 font-medium py-2 px-3 bg-slate-100 rounded truncate">
            https://corner-cafe.retify.ai
          </p>
          <button
            class="py-1.5 px-6 border border-blue-700 rounded-md font-semibold text-blue-700 bg-blue-100"
          >
            Copy
          </button>
        </div>
        <img :src="QRImage" class="w-52 h-52" />
        <button
          class="py-1.5 px-12 border border-blue-700 rounded-md font-semibold text-blue-700 bg-blue-100"
        >
          Save QR Code
        </button>
      </div>
    </section>

    <section class="flex gap-2 items-center">
      <div class="flex-1 h-px bg-slate-200"></div>
      <p>OR</p>
      <div class="flex-1 h-px bg-slate-200"></div>
    </section>

    <ul class="flex flex-col gap-2">
      <li v-for="item in SOCIALS" class="py-1 px-3 flex justify-between font-semibold">
        <div class="flex gap-2.5 items-center">
          <div class="p-3 rounded-full bg-gray-100">
            <component :is="item.icon" />
          </div>
          <p>{{ item.name }}</p>
        </div>
        <button class="text-blue-700">Connect</button>
      </li>
    </ul>

    <div class="w-full h-px bg-slate-200 flex-shrink-0"></div>

    <footer class="flex justify-between font-semibold">
      <button @click="back" class="py-1.5 px-10 rounded-md bg-slate-200 text-slate-700">
        Back
      </button>
      <button
        @click="next"
        class="py-1.5 px-10 rounded-md bg-blue-700 text-white disabled:bg-blue-200 disabled:text-blue-700"
      >
        Finish
      </button>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

import QRImage from '@/assets/image/qr.png'
import GlobalIcon from '@/assets/icons/global.png'
import WhatsappIcon from '@/components/icons/WhatsappIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'
import WebsiteIcon from '@/components/icons/WebsiteIcon.vue'

const $emit = defineEmits(['next', 'back'])

const router = useRouter()

const SOCIALS = [
  {
    name: 'Whatsapp',
    icon: WhatsappIcon,
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
  },
  {
    name: 'Tiktok',
    icon: TiktokIcon,
  },
  {
    name: 'Your Website',
    icon: WebsiteIcon,
  },
]

/** tiến trước */
function next() {
  // $emit('next')
  router.push('/home')
}

/** quay lại */
function back() {
  $emit('back')
}
</script>
