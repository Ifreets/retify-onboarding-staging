<template>
  <div>
    <!-- Sử dụng ComboboxRoot với multiple binding -->
    <ComboboxRoot
      multiple
      class="relative"
      v-model="v"
      v-model:open="open"
      :filterFunction="filter"
      @update:model-value="focusInput"
      :resetSearchTermOnSelect="false"
    >
      <ComboboxAnchor
        class="w-full flex justify-between items-start rounded px-3 py-1.5 gap-2 leading-none outline-none border"
      >
        <div
          class="w-full flex flex-col gap-2"
          @click="openList()"
        >
          <ComboboxInput
            v-if="(!v?.length || open) && is_search"
            class="!bg-transparent outline-none"
            :placeholder="placeholder"
            ref="input_ref"
          />
          <ul
            v-if="v && v?.length > 0"
            class="w-full flex gap-2 flex-wrap"
          >
            <li
              v-for="item in v"
              class="px-2 rounded-md bg-slate-100 text-sm font-medium w-fit"
            >
              {{ getLabel(item) }}
            </li>
          </ul>
        </div>
        <ComboboxTrigger class="">
          <ChevronDownIcon class="w-4 h-4" />
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent
        class="absolute z-10 w-full mt-2 bg-white overflow-hidden rounded border"
      >
        <ComboboxViewport class="p-1.5 max-h-[40dvh] overflow-y-auto">
          <ComboboxEmpty class="font-medium text-center py-2">
            No results found
          </ComboboxEmpty>

          <ComboboxItem
            v-for="(option, index) in options"
            :key="index"
            class="leading-none rounded-md flex justify-between items-center relative select-none py-1.5 px-2 cursor-pointer hover:bg-slate-100"
            :value="option?.[value_field]"
          >
            {{ getLabel(option)?.[label_field] }}
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
import { nonAccentVn } from '@/services/format'
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
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
import { watch } from 'vue'
import { computed, nextTick, ref, vModelDynamic, type PropType } from 'vue'

interface OptionType {
  [key: string]: any
}

const $props = defineProps({
  placeholder: {
    type: String,
    default: 'Choose...',
  },
  value_field: {
    type: String,
    default: '',
  },
  label_field: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<OptionType[]>,
    required: true,
  },
  is_search: {
    type: Boolean,
    default: true,
  },
})

/** Các giá trị được chọn */
const selected = defineModel({
  default: [],
  type: Array as PropType<any[]>,
})

/** ẩn hiện combobox */
const open = ref(false)
/** input ref */
const input_ref = ref()

/** wrap lại giá trị của giá trị được chọn để giá trị mặc định nếu chưa có gì luôn là mảng rỗng */
const v = computed({
  get: () => selected.value || [],
  set: v => {
    selected.value = v
  },
})
/** map giá trị - option */
const map_value_data = computed(() => {
  // lấy field chứa giá trị được truyền vào qua props
  const { options, value_field } = $props
  // nếu không truyền vào field giá trị thì thôi
  if (!value_field) return undefined
  // nếu có field giá trị thì tạo map giá trị - option
  return new Map(
    options.map((option: OptionType) => [option?.[value_field], option]),
  )
})

/** mở danh sách lựa chọn */
function openList() {
  open.value = true
  focusInput()
}

/** focus vào input */
function focusInput() {
  nextTick(() => {
    input_ref.value?.$el?.focus()
  })
}

/** hàm lọc theo giá trị label */
function filter(options: OptionType[], term: string) {
  /** từ khóa tìm kiếm */
  const SEARCH = nonAccentVn(term)?.replace(/\s/g, '')
  return options.filter(option =>
    nonAccentVn(getLabel(option))?.replace(/\s/g, '')?.includes(SEARCH),
  )
}

/** lấy label của option */
function getLabel(value: unknown) {
  // lấy field chứa giá trị label được truyền vào qua props
  const { label_field } = $props
  // nếu không có field giá trị label thì trả về giá trị đang chọn
  if (!label_field) return value
  // nếu có thì mấy trong map ra để hiện
  return map_value_data.value?.get(value)?.[label_field] ?? value
}
</script>
