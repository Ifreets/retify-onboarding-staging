<template>
  <section class="flex flex-col h-full overflow-hidden">
    <!-- header -->
    <ProductHeader
      v-model="filter_param"
      :categories="categories"
      :get-data-filter="getDataFilter"
    />
    <!-- Danh sách sản phẩm -->
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
            <!-- <span class="pr-2">{{ '#' + item?.product_id }}</span> -->
            <span
              v-if="item?.category_id"
              class="text-xs px-2 py-0.5 rounded-full border"
              >{{ map_value_category.get(item?.category_id)?.name }}</span
            >
          </p>
        </div>
        <div class="py-2 text-right px-2 flex-shrink-0">
          <div>
            <p class="text-base font-medium">
              {{ formatCurrency(item?.price) || 0 }}
            </p>
            <p class="text-xs">
              <span>Unit: {{ formatCurrency(item?.cost) }}</span>
              |
              <span>Sale: {{ formatCurrency(item?.price) }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Phân trang -->
    <Pagination
      class="pt-2"
      v-model:page="page"
      :total="total_product"
      :sibling-count="1"
      :items-per-page="PAGE_SIZE"
      :change-page="getProduct"
    />
    <!-- Nút tạo mới -->
    <div class="absolute bottom-14 right-5">
      <button
        class="rounded-full flex justify-center items-center bg-blue-700 text-white px-4 py-2 font-medium gap-2"
        @click="addProduct()"
      >
        <PlusIcon class="size-5" />
        Add New
      </button>
    </div>
    <!-- Chi tiết sản phẩm -->
    <div
      class="absolute top-0 left-0 w-full h-full transition-all duration-500"
      :class="{
        'translate-x-0 opacity-100': view !== 'list',
        'translate-x-full opacity-0': view == 'list',
      }"
    >
      <ProductDetail
        v-model:view="view"
        v-model:product="product"
        v-model:product_index="product_index"
        :create="createProduct"
        :update="updateProduct"
        :delete="deleteProduct"
        :categories="categories"
        :labels="labels"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { $order } from '@/api'
import { formatCurrency } from '@/services/format'
import { get } from 'lodash'
import { computed, onMounted, ref } from 'vue'

import Pagination from '@/components/ui/Pagination.vue'
import ProductDetail from '@/views/HomeView/setting/product/ProductDetail.vue'
import ProductHeader from '@/views/HomeView/setting/product/ProductHeader.vue'

import { CubeIcon, PlusIcon } from '@heroicons/vue/24/solid'

import { type Category, type Product, type ProductLabel } from '@/interfaces'

/** màn hình hiển thị */
const view = ref<'form' | 'list'>('list')

/** tổng số sản phẩm */
const total_product = ref(0)
/** danh sách sản phẩm */
const products = ref<Product[]>([])
/** dữ liệu của sản phẩm */
const product = ref<Product>({})
/** index của sản phẩm */
const product_index = ref(-1)
/** số trang hiện tại */
const page = ref(1)
/** số bản ghi một lần lấy */
const PAGE_SIZE = 25
/** danh sách danh mục */
const categories = ref<Category[]>([])
/** danh sách label */
const labels = ref<ProductLabel[]>([])

/** filter param */
const filter_param = ref<{
  search: string
  category_selected?: string
  status?: string[]
  sort?: Record<string, 'asc' | 'desc'>
}>({
  /** Từ khóa tìm kiếm */
  search: '',
})

/** map id danh mục - danh mục */
const map_value_category = computed(() => {
  // nếu có field giá trị thì tạo map giá trị - option
  return new Map(
    categories.value.map((category: Category) => [
      category?.category_id,
      category,
    ]),
  )
})

onMounted(() => {
  getDataFilter()
  getCategories()
  getLabels()
})

/** hàm lấy dữ liệu khi có lọc */
function getDataFilter() {
  page.value = 1
  getProduct()
  getTotalProduct()
}

/** Lấy danh sách sản phẩm */
async function getProduct() {
  try {
    const { search, category_selected, status, sort } = filter_param.value

    /** danh sách sản phẩm */
    const RES = await $order.getProducts({
      ...(search
        ? { search }
        : {
            ...(category_selected ? { category_id: category_selected } : {}),
            ...(status?.length ? { include_status: status } : {}),
          }),
      sort: sort || undefined,
      skip: (page.value - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
    })
    // lưu lại danh sách
    products.value = RES
  } catch (e) {
    console.log(e)
  }
}

/** lấy tổng số sản phẩm */
async function getTotalProduct() {
  try {
    const { search, category_selected, status } = filter_param.value

    /** dữ liệu số lượng sản phẩm trả về */
    const RES = await $order.countProducts({
      ...(search ? { search } : {}),
      ...(category_selected ? { category_id: category_selected } : {}),
      ...(status?.length ? { include_status: status } : {}),
    })

    // lưu lại tổng số sản phẩm
    total_product.value = RES?.count || 0
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

/** hàm lấy danh sách nhãn */
async function getLabels() {
  try {
    /** dữ liệu cơ bản trả về */
    const RES = await $order.getLabels()
    // lưu lại danh sách
    labels.value = RES
  } catch (e) {
    console.log(e)
  }
}

/** hàm chọn sản phẩm */
function chooseProduct(item: Product, index: number) {
  product.value = item
  product_index.value = index
  view.value = 'form'
}

/** thêm mới sản phẩm vào danh sách */
function createProduct(product: Product) {
  products.value = [product, ...products.value]
}

/** cập nhật sản phẩm trong danh sách */
function updateProduct() {
  products.value[product_index.value] = product.value
}

/** xóa sản phẩm trong danh sách */
function deleteProduct(index: number) {
  products.value = products.value.filter((item, i) => i !== index)
}

/** Chuyển sang màn thêm mới sản phẩm */
function addProduct() {
  product.value = {}
  view.value = 'form'
}
</script>
