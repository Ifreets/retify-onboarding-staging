<template>
  <div class="flex flex-col overflow-y-auto h-full w-full overflow-x-hidden">
    <div
      v-for="(item, index) of products"
      class="hover:bg-slate-100 cursor-pointer flex gap-x-2 group w-full px-3"
      @click="chooseProduct(item, index)"
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
            {{ formatCurrency(item?.price) || 0 }}
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
    <div 
      class="absolute top-0 left-0 w-full h-full transition-all duration-500"
      :class="{
        'translate-x-0 opacity-100': !isEmpty(product),
        'translate-x-full opacity-0': isEmpty(product),
      }"
    >
      <ProductDetail 
        v-model:product="product"
        v-model:product_index="product_index"
        @update="updateProduct"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { formatCurrency } from '@/services/format'
import { get, isEmpty } from 'lodash'
import { onMounted, ref } from 'vue'

import ProductDetail from '@/views/HomeView/setting/ProductDetail.vue'

import { CubeIcon } from '@heroicons/vue/24/solid'

import type { Product } from '@/interfaces'

/** danh sách sản phẩm */
const products = ref<Product[]>([])
/** dữ liệu của sản phẩm */
const product = ref<Product>({})
/** index của sản phẩm */
const product_index = ref(-1)

onMounted(() => {
  getProduct()
})

/** Lấy danh sách sản phẩm */
async function getProduct() {
  try {
    /** danh sách sản phẩm */
    const RES = await $order.getProducts({ skip: 0, limit: 20 })
    // lưu lại danh sách
    products.value = RES
  } catch (e) {
    console.log(e)
  }
}

/** hàm chọn sản phẩm */
function chooseProduct(item: Product, index: number) {
  product.value = item
  product_index.value = index
}

/** cập nhật sản phẩm trong danh sách */
function updateProduct() {
  products.value[product_index.value] = product.value
}
</script>
