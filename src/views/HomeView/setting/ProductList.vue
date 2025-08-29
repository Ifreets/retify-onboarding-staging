<template>
  <section class="flex flex-col h-full overflow-hidden">
    <header class="px-3 pb-3 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search products..."
        class="w-full border rounded-md px-3 py-2 outline-none placeholder:text-slate-400"
        v-model="search"
        @input="searchProduct"
      />
      <ul class="flex gap-2 overflow-auto w-full">
        <li
          class="min-w-max px-3 py-1 border border-slate-200 rounded-full cursor-pointer"
          :class="{
            'bg-blue-700 text-white': !category_selected,
          }"
          @click="selectCategory()"
        >
          All
        </li>
        <li
          v-for="item of categories"
          class="min-w-max px-3 py-1 border border-slate-200 rounded-full cursor-pointer"
          :class="{
            'bg-blue-700 text-white': category_selected === item.category_id,
          }"
          @click="selectCategory(item)"
        >
          {{ item?.name }}
        </li>
      </ul>
    </header>
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
          'translate-x-0 opacity-100': product.product_id,
          'translate-x-full opacity-0': !product.product_id,
        }"
      >
        <ProductDetail
          v-model:product="product"
          v-model:product_index="product_index"
          @update="updateProduct"
          :categories="categories"
        />
      </div>
    </div>

    <div class="flex items-center justify-end gap-2 flex-shrink-0 pt-3 px-4">
      <button
        class="bg-white border size-7 flex justify-center items-center rounded hover:bg-slate-100"
        :class="{
          '!bg-slate-200 pointer-events-none': page <= 0,
        }"
        @click="changePage(page - 1)"
      >
        <ChevronDownIcon class="w-5 h-5 text-slate-500 rotate-90" />
      </button>
      <button
        class="bg-blue-700 py-0.5 px-2.5 rounded-md text-white w-max text-base"
      >
        {{ page + 1 }}
      </button>
      <button
        class="bg-white border size-7 flex justify-center items-center rounded hover:bg-slate-100"
        :class="{
          '!bg-slate-200 pointer-events-none': !(products.length === PAGE_SIZE),
        }"
        @click="changePage(page + 1)"
      >
        <ChevronDownIcon class="w-5 h-5 text-slate-500 -rotate-90" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { formatCurrency } from '@/services/format'
import { debounce, get } from 'lodash'
import { onMounted, ref } from 'vue'

import ProductDetail from '@/views/HomeView/setting/ProductDetail.vue'

import { ChevronDownIcon, CubeIcon } from '@heroicons/vue/24/solid'

import { type Category, type Product } from '@/interfaces'

/** danh sách sản phẩm */
const products = ref<Product[]>([])
/** dữ liệu của sản phẩm */
const product = ref<Product>({})
/** index của sản phẩm */
const product_index = ref(-1)
/** số trang hiện tại */
const page = ref(0)
/** số bản ghi một lần lấy */
const PAGE_SIZE = 25
/** Từ khóa tìm kiếm */
const search = ref<string>('')
/** Danh mục được chọn */
const category_selected = ref<string>('')
/** danh sách danh mục */
const categories = ref<Category[]>([])

onMounted(() => {
  getProduct()
  getCategories()
})

/** debounce search sản phẩm */
const searchProduct = debounce(() => {
  page.value = 0
  getProduct()
}, 300)

/** Lấy danh sách sản phẩm */
async function getProduct() {
  try {
    /** danh sách sản phẩm */
    const RES = await $order.getProducts({
      ...(search.value ? { search: search.value } : {}),
      ...(category_selected.value
        ? { category_id: category_selected.value }
        : {}),
      skip: page.value * PAGE_SIZE,
      limit: PAGE_SIZE,
    })
    // lưu lại danh sách
    products.value = RES
  } catch (e) {
    console.log(e)
  }
}

/** hàm lấy danh sách danh mục */
async function getCategories(skip: number = 0) {
  try {
    /** danh sách danh mục api trả về */
    const RES = await $order.getCategories({
      skip,
      limit: 20,
    })

    // nếu là trang đầu tiên thì ghi đè
    if (skip === 0) categories.value = RES
    // nếu là các trang tiếp theo thì thêm vào cuối danh sách
    else categories.value = [...categories.value, ...RES]

    // nếu nhỏ hơn 20 bản ghi thì là đã lấy hết
    if (RES.length < 20) return
    // nếu chưa hết thì lấy trang tiếp
    getCategories(skip + 20)
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

/** chuyển trang */
function changePage(value: number) {
  page.value = value
  getProduct()
}

/** chuyển danh mục */
function selectCategory(item?: Category) {
  category_selected.value = item?.category_id || ''
  page.value = 0
  getProduct()
}
</script>
