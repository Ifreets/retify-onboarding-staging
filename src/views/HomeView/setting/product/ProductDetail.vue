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
      <p
        class="font-medium"
        v-if="product.product_id"
      >
        #{{ product.product_id }}
      </p>
      <p
        class="font-medium"
        v-else
      >
        New Product
      </p>
      <div class="w-14"></div>
    </div>

    <!-- body -->
    <div
      class="bg-slate-100 text-sm flex flex-col gap-4 p-2 h-full overflow-auto"
    >
      <div class="rounded-lg bg-white p-3 flex flex-col gap-2">
        <!-- Tên -->
        <div>
          <p class="mb-1 font-medium">
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
        <!-- ID -->
        <div class="grid grid-cols-2 gap-2">
          <div>
            <p class="mb-1 font-medium">Product ID</p>
            <input
              v-model="product.product_id"
              type="text"
              placeholder="Product ID"
              class="border px-3 py-1.5 w-full rounded-md focus:outline-none cursor-not-allowed read-only:bg-slate-100"
              readonly
            />
          </div>
          <div class="relative">
            <p class="mb-1 font-medium">BarCode</p>
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
        <!-- Giá -->
        <div
          v-if="!product.variant_options"
          class="grid grid-cols-2 gap-2"
        >
          <div>
            <p class="mb-1 font-medium">
              Cost <span class="text-red-500">*</span>
            </p>
            <InputMoney
              class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
              placeholder="Import price"
              :min="0"
              v-model="product.cost"
            />
          </div>
          <div v-if="product.type !== 'gmv'">
            <p class="mb-1 font-medium">Price</p>
            <InputMoney
              class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
              placeholder="Selling price"
              :min="0"
              v-model="product.price"
            />
          </div>
        </div>
        <!-- Trạng thái -->
        <div>
          <p class="mb-1 font-medium">Status</p>
          <Select
            v-model="product.status"
            :options="PRODUCT_STATUS"
            :label_field="'name'"
            :value_field="'value'"
            placeholder="Choose status"
          />
        </div>
        <!-- Danh mục -->
        <div>
          <p class="mb-1 font-medium">Category</p>
          <Select
            v-model="product.category_id"
            :options="categories"
            :label_field="'name'"
            :value_field="'category_id'"
            placeholder="Choose category"
            :is_search="true"
          />
        </div>
        <!-- Thẻ -->
        <div>
          <p class="mb-1 font-medium">Tag</p>
          <MutipleSelect
            v-model="product.labels"
            :options="labels"
            :label_field="'title'"
            :value_field="'label_id'"
            placeholder="Choose tag"
          />
        </div>
        <!-- Mô tả -->
        <div>
          <p class="mb-1 font-medium">Description</p>
          <textarea
            v-model="product.description"
            placeholder="Enter description"
            class="border px-3 py-1.5 w-full h-14 rounded-md focus:outline-none"
          ></textarea>
        </div>
        <!-- Ghi chú nội bộ -->
        <div>
          <p class="mb-1 font-medium">Internal note</p>
          <textarea
            v-model="product.internal_note"
            placeholder="Enter notes"
            class="border px-3 py-1.5 w-full h-14 rounded-md focus:outline-none"
          ></textarea>
        </div>
        <!-- Ảnh -->

        <div class="">
          <p class="mb-2 font-medium">Image</p>
          <div
            v-if="product.images"
            class="mb-2 flex gap-2 flex-wrap"
          >
            <draggable
              v-model="product.images"
              group="images"
              item-key="index"
              :delay="150"
              :delayOnTouchOnly="true"
              class="flex gap-2 flex-wrap"
            >
              <template #item="{ element, index }">
                <div
                  class="relative w-fit group border-2 border-white rounded-lg"
                >
                  <img
                    :src="element"
                    class="rounded-md w-16 h-16 object-cover cursor-move"
                    @click="openPreview(element)"
                  />
                  <XCircleIcon
                    @click="removeImage(index)"
                    class="w-5 absolute -top-1 -right-1 cursor-pointer text-red-500"
                  />
                </div>
              </template>
            </draggable>
          </div>

          <button
            @click="selectFile"
            class="rounded-lg border border-slate-500 border-dashed flex gap-2 px-3 py-2 bg-slate-100 text-xs text-gray-500"
          >
            <img :src="ImageUpload" />
            Upload smaller image (5mb)
          </button>

          <!-- Overlay preview -->
          <div
            v-if="previewImage"
            class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            @click="closePreview"
          >
            <XCircleIcon
              class="absolute top-4 right-4 w-8 h-8 text-white"
              @click="closePreview"
            />

            <img
              :src="previewImage"
              class="max-h-[90%] max-w-[90%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div
      class="text-base flex items-center gap-2 w-full border-t p-3 text-gray-700 bg-white justify-between font-medium"
    >
      <button
        class="flex items-center bg-red-100 py-2 px-4 w-1/2 rounded-md justify-center gap-2 text-red-500"
        @click="is_open = true"
      >
        <TrashIcon class="size-5" />
        Delete
      </button>
      <button
        @click="updateAnProduct()"
        class="bg-black text-white py-2 px-4 whitespace-nowrap rounded-md w-1/2"
      >
        Save
      </button>
    </div>

    <Modal
      v-model:is_open="is_open"
      :container_class="'w-[360px]'"
    >
      <div class="flex flex-col items-center font-medium">
        <QuestionMarkCircleIcon class="size-20 text-orange-400" />
        <p class="text-xl text-center">
          Are you sure you want to confirm delete this product?
        </p>
        <div class="flex justify-between gap-2 w-full pt-4 px-7">
          <button
            class="px-7 py-2 bg-red-100 text-red-500 rounded-md"
            @click="is_open = false"
          >
            Cancel
          </button>
          <button
            class="px-7 py-2 bg-blue-100 text-blue-700 rounded-md"
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
import { PRODUCT_STATUS } from '@/utils/constant'
import { get, isArray } from 'lodash'
import { ref, type PropType } from 'vue'

import InputMoney from '@/components/ui/InputMoney.vue'
import Modal from '@/components/ui/Modal.vue'
import MutipleSelect from '@/components/ui/MutipleSelect.vue'
import Select from '@/components/ui/Select.vue'
import draggable from 'vuedraggable'
import ImageUpload from '@/assets/icons/image-upload.svg'
import {
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/outline'
import {
  ChevronDownIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/vue/24/solid'

import type { Category, Product, ProductLabel } from '@/interfaces'

const $props = defineProps({
  create: {
    type: Function,
    default: () => {},
  },
  update: {
    type: Function,
    default: () => {},
  },
  delete: {
    type: Function,
    default: () => {},
  },
  categories: {
    type: Array as PropType<Category[]>,
    required: true,
  },
  labels: {
    type: Object as PropType<ProductLabel[]>,
    required: true,
  },
})

const previewImage = ref<string | null>(null)

function openPreview(url: string) {
  previewImage.value = url
}
function closePreview() {
  previewImage.value = null
}

/** màn hình hiển thị */
const view = defineModel<'form' | 'list'>('view', {
  default: 'form',
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
  view.value = 'list'
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

    // xóa trong mảng
    $props.delete(product_index.value)

    // Thông báo
    notify('Delete successfully!')

    // đóng modal
    is_open.value = false
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

    // nếu có id thì là cập nhật
    if (product.value.id) {
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
    } else {
      // * Cập nhật sản phẩm
      const RES = await $order.createProduct({
        ...product.value,
        ...{
          cost: Number(product.value.cost),
          price: Number(product.value.price),
          wholesale_price: Number(product.value.wholesale_price),
          service_fee: Number(product.value.service_fee),
        },
      })

      // * Thông báo
      notify('Create successfully!')

      // cập nhật trong mảng sản phẩm
      $props.create(RES)
    }

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

  /** nếu chưa nhập đơn giá */
  if (!Number(product.value.cost)) throw 'Unit price is required'
}
</script>
