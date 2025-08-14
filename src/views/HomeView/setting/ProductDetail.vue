<template>
  <div class="w-full h-dvh flex flex-col bg-white overflow-hidden">
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
                @click="createBarcode(product.id as string, product_index)"
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
              <!-- <InputMoney
                class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                placeholder="Import price"
                :min="0"
                v-model="product.cost"
              /> -->
              <input
                type="number"
                v-model="product.cost"
                class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
              />
            </div>
            <div v-if="product.type !== 'gmv'">
              <p class="mb-1">Selling price</p>
              <!-- <InputMoney
                class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                placeholder="Selling price"
                :min="0"
                v-model="product.price"
              /> -->
              <input type="text" v-model="product.price" class="border px-3 py-1.5 w-full rounded-md focus:outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <template v-if="!product.variant_options">
              <div>
                <p class="mb-1">Minimum inventory</p>
                <Input
                  :min="0"
                  v-if="!checkProductService()"
                  v-model="product.min_inventory_quantity"
                  placeholder="0"
                  class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                />
                <input
                  v-if="checkProductService()"
                  disabled
                  type="number"
                  value="0"
                  class="border px-3 py-1.5 w-full rounded-md focus:outline-none cursor-not-allowed bg-slate-100 text-gray-500"
                />
              </div>
              <div>
                <p class="mb-1">Maximum inventory</p>
                <Input
                  :min="0"
                  v-if="!checkProductService()"
                  v-model="product.max_inventory_quantity"
                  placeholder="0"
                  class="border px-3 py-1.5 w-full rounded-md focus:outline-none"
                />
                <input
                  v-if="checkProductService()"
                  disabled
                  type="number"
                  placeholder="0"
                  class="border px-3 py-1.5 w-full rounded-md focus:outline-none cursor-not-allowed bg-slate-100 text-gray-500"
                />
              </div>
            </template>
          </div>
          <div>
            <p class="mb-1">Description</p>
            <TiptapEditor
              v-model="product.description"
              :type_content="'markdown'"
              placeholder="'Enter description'"
              :upload-image="uploadImages"
            />
          </div>
          <div>
            <p class="mb-1">Internal note</p>
            <textarea
              v-model="product.internal_note"
              placeholder="Enter notes"
              class="border px-3 py-1.5 w-full h-14 rounded-md focus:outline-none resize-none"
            ></textarea>
          </div>
          <div v-if="!checkProductService()">
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
              <draggable
                class="flex gap-2"
                ghost-class="ghost"
                v-model="product.images"
              >
                <transition-group>
                  <div
                    v-for="(img, index) in product.images"
                    class="relative w-fit group border-2 border-white rounded-lg"
                    :key="index"
                  >
                    <img
                      @click=";(img_selected = img), (show_img = true)"
                      :src="img"
                      class="rounded-md w-16 h-16 object-cover"
                    />
                  </div>
                </transition-group>
              </draggable>
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
      class="flex items-center gap-2 w-full border-t p-3 text-sm text-gray-700 bg-white justify-between flex-wrap"
    >
      <div class="w-full flex gap-2 font-medium">
        <button
          @click="productReplication()"
          class="w-1/2 sm:w-fit bg-gray-200 text-gray-700 py-1.5 px-4 rounded-md text-sm flex justify-center gap-2 items-center"
        >
          <Square2StackIcon class="w-5 h-5 text-slate-700" />
          Copy product
        </button>
        <button
          class="flex items-center bg-red-100 py-1.5 px-4 w-1/2 rounded-md justify-center gap-2 text-red-500"
          @click="deleteAnProduct()"
        >
          <TrashIcon class="size-5" />
          Delete product
        </button>
      </div>
      <button
        @click="updateAnProduct()"
        class="bg-black text-white py-1.5 px-4 whitespace-nowrap sm:w-max rounded-md text-sm sm:ml-3 w-full font-medium"
      >
        Save
      </button>
    </div>
    <!-- ZoomImg -->
    <!-- <ZoomImg
      v-if="show_img"
      :image="img_selected"
      :close="() => (show_img = false)"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ImageUpload from '@/assets/icons/image-upload.svg'
import {
  ChevronDownIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid'
import { Square2StackIcon } from '@heroicons/vue/24/outline'

const product = defineModel<any>('product', {
  default: {},
})
const product_index = ref(0)
const img_selected = ref('')
const show_img = ref(false)

function closeForm() {}
function uploadImages() {}
function createBarcode(product_id: string, product_index: number) {}
function checkProductService() {
  return true
}
function selectFile() {}
function productReplication() {}
function deleteAnProduct() {}

function updateAnProduct() {}
</script>
