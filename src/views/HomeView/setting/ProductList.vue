<template>
  <div class="flex flex-col overflow-auto h-full">
    <div
      v-for="(item, index) of products"
      class="hover:bg-slate-100 cursor-pointer flex gap-x-2 group w-full px-3"
    >
      <div class="cursor-pointer py-2 flex-shrink-0 min-w-max">
        <img
          v-if="get(item, 'images[0]')"
          :src="get(item, 'images[0]')"
          class="size-12 rounded-lg object-cover"
        />
        <CubeIcon
          v-if="!get(item, 'images[0]')"
          class="size-12 text-cube_green rounded-lg"
        />
      </div>
      <div
        class="overflow-hidden w-full py-2 flex-col flex font-medium group-hover:bg-slate-100"
      >
        <div class="flex items-center gap-2 text-base">
          <p class="truncate">
            {{ item?.name }}
          </p>
        </div>
        <p class="text-sm text-slate-700">
          <span>{{ '#' + item?.product_id }}</span>
        </p>
      </div>
      <div class="py-2 text-right px-2 flex-shrink-0">
        <div>
          <p class="text-base font-medium">
            {{ formatCurrency(item?.cost) || 0 }}
          </p>
          <div class="flex gap-3 justify-end text-xs">
            <p v-if="item?.type === 'product'">
              Stock
              <span
                :class="{
                  'text-red-500':
                    item?.stock_quantity && item.stock_quantity < 0,
                }"
                >{{ item?.stock_quantity }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed top-0 left-0">
      <ProductDetail 
        v-model:product="products[0]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { get } from 'lodash'
import { onMounted, ref } from 'vue'

import {
  CubeIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  ScaleIcon,
} from '@heroicons/vue/24/solid'
import { formatCurrency } from '@/services/format'
import ProductDetail from './ProductDetail.vue'

const products = ref<any[]>([])

onMounted(() => {
  getproduct()
})

async function getproduct() {
  try {
    const res = await $order.getProducts({ skip: 0, limit: 20 })
    products.value = res
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
</script>
