<template>
  <ComboboxRoot
    v-model="v"
    class="relative"
    :filterFunction="filter"
    :displayValue="getLabel"
    v-model:open="open"
    v-model:searchTerm="search"
  >
    <ComboboxAnchor
      class="flex items-center justify-between w-full rounded leading-none gap-1.5 bg-white outline-none border"
    >
      <ComboboxInput
        v-if="is_search"
        class="!bg-transparent outline-none h-full placeholder:text-slate-500 w-full px-3 py-1.5"
        :placeholder="placeholder"
        @focus="
          (e: FocusEvent) => {
            ;(e.target as HTMLInputElement).select()
            open = true
          }
        "
      />
      <ComboboxTrigger
        :class="[
          !is_search && 'w-full flex items-center justify-between px-3 py-1.5',
          is_search && 'mr-3',
        ]"
      >
        <p
          v-if="!is_search"
          class="text-sm"
        >
          {{ getLabel(v) || placeholder }}
        </p>
        <ChevronDownIcon class="w-4 h-4" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="absolute z-10 w-full mt-2 bg-white overflow-hidden rounded-md border border-slate-200"
    >
      <ComboboxViewport class="p-1.5 max-h-[40dvh] overflow-y-auto">
        <ComboboxEmpty
          class="text-mauve8 text-xs font-medium text-center py-2"
        />
        <ComboboxItem
          v-for="(option, index) in options"
          :key="index"
          class="relative leading-none rounded flex items-center px-3 py-2 select-none data-[highlighted]:bg-slate-100 cursor-pointer"
          :value="value_field ? option?.[value_field] : option"
        >
          <ComboboxItemIndicator
            class="absolute right-2 w-fit inline-flex items-center justify-center"
          >
            <CheckCircleIcon class="size-4 text-blue-700" />
          </ComboboxItemIndicator>
          <span>
            {{ label_field ? option?.[label_field] : option }}
          </span>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<script setup lang="ts">
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
import { nonAccentVn } from '@/services/format'
import { computed, ref, type PropType } from 'vue'

import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

interface OptionType {
  [key: string]: any
}

// props
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
    default: false,
  },
})

/** giá trị đã chọn */
const v = defineModel<any>({
  default: undefined,
})

/** ẩn hiện dropdown */
const open = ref(false)

/** từ khóa tìm kiếm */
const search = ref('')

/** map giá trị - option */
const MAP_VALUE_DATA = computed(() => {
  // lấy field chứa giá trị được truyền vào qua props
  const { options, value_field } = $props
  // nếu không truyền vào field giá trị thì thôi
  if (!value_field) return undefined
  // nếu có field giá trị thì tạo map giá trị - option
  return new Map(
    options.map((option: OptionType) => [option?.[value_field], option]),
  )
})

/** lấy label của option */
function getLabel(value: unknown) {
  // lấy field chứa giá trị label được truyền vào qua props
  const { label_field } = $props
  // nếu không có field giá trị label thì trả về giá trị đang chọn
  if (!label_field) return value
  // nếu có thì mấy trong map ra để hiện
  return MAP_VALUE_DATA.value?.get(value)?.[label_field] ?? value
}

/** hàm lọc theo giá trị label */
function filter(options: OptionType[], term: string) {
  /** từ khóa tìm kiếm */
  const SEARCH = nonAccentVn(term)?.replace(/\s/g, '')
  return options.filter(option =>
    nonAccentVn(getLabel(option))?.replace(/\s/g, '')?.includes(SEARCH),
  )
}
</script>
