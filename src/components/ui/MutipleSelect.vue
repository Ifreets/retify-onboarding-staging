<template>
  <div>
    <!-- Sử dụng ComboboxRoot với multiple binding -->
    <ComboboxRoot
      v-model="selected"
      v-model:open="open"
      multiple
      class="relative"
    >
      <ComboboxAnchor
        class="w-full flex justify-between items-start rounded px-3 py-1.5 gap-2 leading-none outline-none border"
      >
        <div class="w-full flex flex-col gap-2 py-1">
          <ComboboxInput
            class="!bg-transparent outline-none"
            placeholder="Select multiple items..."
          />
          <ul class="w-full flex gap-2 flex-wrap">
            <li
              v-for="item in selected"
              class="px-2 rounded-md bg-slate-100 text-sm font-medium w-fit"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <ComboboxTrigger class="py-1.5">
          <ChevronDownIcon class="w-4 h-4" />
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent
        class="absolute z-10 w-full mt-2 bg-white overflow-hidden rounded border"
      >
        <ComboboxViewport class="p-1.5">
          <ComboboxEmpty class="font-medium text-center py-2">
            No results found
          </ComboboxEmpty>

          <ComboboxItem
            v-for="(fruit, index) in fruits"
            :key="index"
            class="leading-none rounded-md flex justify-between items-center relative select-none py-1.5 px-2 cursor-pointer hover:bg-slate-100"
            :value="fruit"
          >
            {{ fruit }}
            <ComboboxItemIndicator>
              <CheckCircleIcon class="size-4 text-blue-700" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'radix-vue'
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

// Sử dụng ref với mảng rỗng để lưu nhiều giá trị
const selected = ref<any[]>([])

const fruits = [
  'Apple',
  'Banana',
  'Blueberry',
  'Grapes',
  'Pineapple',
  'Aubergine',
  'Broccoli',
  'Carrot',
  'Courgette',
  'Leek',
]

const open = ref(false)

</script>
