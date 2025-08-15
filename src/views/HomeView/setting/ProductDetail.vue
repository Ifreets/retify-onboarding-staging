div
<template>
  <div class="w-full h-full flex flex-col bg-white overflow-hidden">
    <!-- header -->
    <div
      class="w-full flex justify-between items-center px-3 py-2 border-b bg-white"
    >
      <button
        @click="closeForm()"
        class="flex items-center text-sm"
      >
        <ChevronDownIcon class="text-sky-600 w-4 rotate-90" />
        <span class="text-blue-500">Back</span>
      </button>
      <p class="font-medium">#{{ product.product_id }}</p>
      <div class="w-14"></div>
    </div>

    <!-- body -->
    <div
      class="bg-slate-100 text-sm flex flex-col gap-4 p-2 h-full overflow-auto"
    >
      <div class="grid grid-cols-2 gap-3">
        <!-- Left -->
        <div class="col-span-2 rounded-lg bg-white p-3 flex flex-col gap-2">
          <div>
            <p class="mb-1">
              Product name
              <span class="text-red-500">*</span>
            </p>
            <input
              v-model="product.name"
              type="text"
              placeholder="Product name"
              class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <p class="mb-1">Product ID</p>
              <input
                v-model="product.product_id"
                type="text"
                placeholder="Product ID"
                class="border px-3 py-1.5 w-full rounded-md focus:outline-none cursor-not-allowed"
                readonly
              />
            </div>
            <div class="relative">
              <p class="mb-1">BarCode</p>
              <input
                v-model="product.barcode"
                type="text"
                placeholder="BarCode"
                class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
              />
              <PlusCircleIcon
                v-if="!product.barcode"
                @click="createBarcode(product.id || '')"
                class="absolute bottom-1.5 right-3 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
          <div
            v-if="!product.variant_options"
            class="grid grid-cols-2 gap-2"
          >
            <div>
              <p class="mb-1">Import price</p>
              <InputMoney
                class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                placeholder="Import price"
                :min="0"
                v-model="product.cost"
              />
            </div>
            <div v-if="product.type !== 'gmv'">
              <p class="mb-1">Selling price</p>
              <InputMoney
                class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                placeholder="Selling price"
                :min="0"
                v-model="product.price"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <template v-if="!product.variant_options">
              <div>
                <p class="mb-1">Minimum inventory</p>
                <input
                  :min="0"
                  type="number"
                  v-model="product.min_inventory_quantity"
                  placeholder="0"
                  class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                />
              </div>
              <div>
                <p class="mb-1">Maximum inventory</p>
                <input
                  :min="0"
                  type="number"
                  v-model="product.max_inventory_quantity"
                  placeholder="0"
                  class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                />
              </div>
            </template>
          </div>
          <div>
            <p class="mb-1">Description</p>
            <textarea
              v-model="product.description"
              placeholder="Enter description"
              class="border px-3 py-1.5 w-full h-14 rounded-md focus:outline-none"
            ></textarea>
          </div>
          <div>
            <p class="mb-1">Internal note</p>
            <textarea
              v-model="product.internal_note"
              placeholder="Enter notes"
              class="border px-3 py-1.5 w-full h-14 rounded-md focus:outline-none"
            ></textarea>
          </div>
          <div>
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="product.sold_when_quantity_runs_out"
              />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"
              ></div>
              <span
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Allow sale when quantity runs out
              </span>
            </label>
          </div>
        </div>

        <!-- Right -->
        <div class="col-span-2 flex flex-col gap-3">
          <!-- Ảnh -->
          <div class="rounded-lg bg-white p-3">
            <p class="mb-2">Image</p>
            <div
              v-if="product.images"
              class="mb-2 flex gap-2 flex-wrap"
            >
              <div
                v-for="(img, index) in product.images"
                class="relative w-fit group border-2 border-white rounded-lg"
                :key="index"
              >
                <img
                  :src="img"
                  class="rounded-md w-16 h-16 object-cover"
                />
                <XCircleIcon
                  @click="removeImage(index)"
                  class="w-5 absolute -top-1 -right-1 cursor-pointer text-red-500"
                />
              </div>
            </div>
            <button
              @click="selectFile"
              class="rounded-lg border border-slate-500 border-dashed flex gap-2 px-3 py-2 bg-slate-100 text-xs text-gray-500"
            >
              <img :src="ImageUpload" />
              Upload smaller image (5mb)
            </button>
          </div>
          <!-- Ảnh -->
        </div>
      </div>
    </div>

    <!-- footer -->
    <div
      class="flex items-center gap-2 w-full border-t p-3 text-sm text-gray-700 bg-white justify-between font-medium"
    >
      <button
        class="flex items-center bg-red-100 py-1.5 px-4 w-1/2 rounded-md justify-center gap-2 text-red-500"
        @click="is_open = true"
      >
        <TrashIcon class="size-5" />
        Delete
      </button>
      <button
        @click="updateAnProduct()"
        class="bg-black text-white py-1.5 px-4 whitespace-nowrap rounded-md w-1/2"
      >
        Save
      </button>
    </div>

    <Modal
      v-model:is_open="is_open"
    >
      <div class="flex flex-col gap-3 items-center font-medium">
        <QuestionMarkCircleIcon class="size-20" />
        <p class="text-2xl text-center">Are you sure you want to confirm delete this product?</p>
        <div class="flex justify-between gap-2 w-full pt-4">
          <button class="px-7 py-2 bg-red-100 text-red-500 rounded-md"
            @click="is_open = false"
          >
            Cancel
          </button>
          <button class="px-7 py-2 bg-blue-100 text-blue-700 rounded-md"
          @click="deleteAnProduct()"
            >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { $merchant, $order } from '@/api'
import { useToast } from '@/composables/useToast'
import { get, isArray } from 'lodash'
import { ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'

import ImageUpload from '@/assets/icons/image-upload.svg'
import { PlusCircleIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import {
  ChevronDownIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/vue/24/solid'

import type { Product } from '@/interfaces'
import InputMoney from '@/components/ui/InputMoney.vue'

const $props = defineProps({
  update: {
    type: Function,
    default: () => {},
  },
})

/** dữ liệu sản phẩm đã chọn */
const product = defineModel<Product>('product', {
  default: {},
})
/** index của sản phẩm được chọn trong danh sách */
const product_index = defineModel<number>('product_index', {
  default: -1,
})

/** đóng mở modal */
const is_open = ref(false)

// composable
const { notify } = useToast()

/** đóng form */
function closeForm() {
  product.value = {}
  product_index.value = -1
}

/** Tạo barcode cho sản phẩm */
async function createBarcode(id: string) {
  /** dữ liệu sản phẩm sau khi tạo barcode  */
  const NEW_PRODUCT = await $order.updateBarcode(id)
  // lưu lại barcode mới
  product.value.barcode = NEW_PRODUCT.barcode
  //cập nhật dữ liệu trong mảng
  $props.update()
}

/** Chọn file để upload */
function selectFile() {
  /**input upload file */
  const INPUT = document.createElement('input')

  // * Thêm các thuộc tính cần thiết
  INPUT.type = 'file'
  INPUT.accept = 'image/*'
  INPUT.style.display = 'none'
  INPUT.multiple = true

  // * Hàm xử lý sau khi upload thành công
  INPUT.onchange = () => {
    // * Nếu không có file nào được chọn thì thoát
    if (!INPUT.files) return

    // * Upload file
    uploadFile(INPUT.files)

    // * xoá input sau khi xong việc
    if (INPUT && INPUT.parentNode) INPUT.parentNode.removeChild(INPUT)
  }

  // * Thêm input vào html
  document.body.appendChild(INPUT)

  // * Click vào input
  INPUT.click()
}

/** Upload file */
async function uploadFile(files: FileList) {
  try {
    for (let i = 0; i < files.length; i++) {
      // * Lấy file
      let file = files[i]

      // * Kiểm tra kích thước file (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(`File ${file.name} đã lớn hơn 5MB.`)
      }

      // * Tạo form data
      let form_data = new FormData()

      // * Thêm file vào form data
      form_data.append('file', file)

      /** Upload ảnh lên merchant */
      let res = await $merchant.uploadFile(form_data)

      /** Lấy về dữ liệu ảnh upload lên merchants */
      let image = get(res, 'file_path')

      // * Thêm ảnh vào sản phẩm
      if (image && product.value.images && isArray(product.value.images)) {
        product.value.images = [...product.value.images, image]
      } else {
        product.value.images = [image]
      }
    }
  } catch (e) {
    console.log(e)
  }
}

/** Xử lý xóa ảnh */
function removeImage(index: number) {
  /** danh sách ảnh */
  const IMGS = product.value.images
  // nếu không có ảnh nào trong danh sách thì thôi
  if (!IMGS?.length) return
  // xóa ảnh tại index
  product.value.images = IMGS.filter((item, i) => {
    return i !== index
  })
}

/** hàm xóa sản phẩm */
async function deleteAnProduct() {
  try {
    // nếu không có id sản phẩm thì thôi
    if (!product.value.id) return
    // * Xóa san pham
    await $order.deleteProduct(product.value.id)
    // * Đóng form
    closeForm()
  } catch (e) {
    console.log(e)
  }
}

/** Cập nhật sản phẩm */
async function updateAnProduct() {
  try {
    /** validate các field */
    validateProduct()

    // * Cập nhật sản phẩm
    await $order.updateProduct({
      ...product.value,
      ...{
        cost: Number(product.value.cost),
        price: Number(product.value.price),
        wholesale_price: Number(product.value.wholesale_price),
        service_fee: Number(product.value.service_fee),
      },
    })

    // * Thông báo
    notify('Update successfully!')

    // cập nhật trong mảng sản phẩm
    $props.update()

    // * Đóng form
    closeForm()
  } catch (e) {
    notify(e as string, {
      type: 'error',
      duration: 1000,
      position: 'top-center',
    })
  }
}

/** hàm validate sản phẩm */
function validateProduct() {
  /** nếu tên sản phẩm không hợp lệ */
  if (!product.value.name?.trim()) throw 'Name is required'

  /** loại sản phẩm không hợp lệ */
  // if (!product.value.type) throw 'Product type is required'
}
</script>
