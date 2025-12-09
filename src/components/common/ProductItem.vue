<template>
  <div class="py-2 flex gap-3">
    <Image
      :url="product.images?.[0] || ''"
      container_class="size-20 object-contain border shadow rounded-xl"
    >
      <div
        class="size-20 object-contain border shadow rounded-xl flex items-center justify-center bg-slate-100"
      >
        <CubeIcon class="w-14 h-14 flex-shrink-0 text-slate-700" />
      </div>
    </Image>
    <div class="text-base font-medium flex-1">
      <p>{{ product.product_name }}</p>
      <p>Quantity: {{ product.quantity }}</p>
      <p class="text-lg font-semibold text-blue-700">
        {{ formatCurrency(product.price) }}
      </p>
      <div v-if="product.addons && product.addons.length">
        <div
          v-for="group in product.addons"
          :key="group.id"
          class="mt-1"
        >
          <p
            v-show="!isEmpty(group.addons)"
            class="font-semibold text-sm text-gray-700"
          >
            {{ group.name }}:
          </p>
          <ul class="ml-3 text-sm text-gray-600">
            <li
              v-for="addon in group.addons"
              :key="addon.id"
              class="flex justify-between"
            >
              <span>
                {{ addon.name }}
              </span>
              <span>
                {{ formatCurrency(addon.price) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <p
        v-if="product.note"
        class="text-sm text-slate-500"
      >
        Note: {{ product.note }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/services/format'
import type { PropType } from 'vue'

import Image from '@/components/ui/Image.vue'

import { CubeIcon } from '@heroicons/vue/24/solid'

import type { OrderProduct } from '@/interfaces'
import { isEmpty } from 'lodash'

const $props = defineProps({
  product: {
    type: Object as PropType<OrderProduct>,
    required: true,
  },
})

console.log($props.product, 'checkkkk')
</script>
