<template>
  <article class="h-full flex flex-col items-center justify-center">
    <header class="flex justify-between items-center w-full px-2">
      <div class="w-18">
        <ArrowLeftIcon
          class="size-6"
          @click="back"
        />
      </div>
      <h3 class="text-2xl font-semibold">
        {{ is_edit ? 'Edit Customer' : 'Customer Details' }}
      </h3>
      <button
        v-if="!is_edit"
        class="w-18 flex items-center gap-1 py-2 justify-center rounded-xl font-medium text-white bg-black"
        @click="openEdit"
      >
        <PencilSquareIcon class="size-4" />
        Edit
      </button>
      <button
        v-else
        class="w-18 flex items-center gap-1 py-2 justify-center rounded-xl font-medium text-white bg-blue-700"
        @click="closeEdit"
      >
        Save
      </button>
    </header>
    <main class="w-full h-full px-2 py-3 gap-5 flex flex-col overflow-auto">
      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <Image
          :url="contactStore.selected_contact.avatar || ''"
          class="size-11 rounded-full object-contain flex-shrink-0"
        >
          <div
            class="size-11 flex-shrink-0 rounded-full flex items-center justify-center bg-slate-100"
          >
            <UserIcon class="w-7 h-7 flex-shrink-0 text-slate-700" />
          </div>
        </Image>
        <div class="w-full flex flex-col gap-3">
          <div>
            <p class="text-base font-semibold">
              {{ contactStore.selected_contact.first_name }}
              {{ contactStore.selected_contact.last_name }}
            </p>
            <p class="text-slate-700">{{ phone }}</p>
          </div>
          <template v-if="!is_edit">
            <div class="w-full h-px bg-slate-200"></div>
            <div class="font-semibold flex gap-2.5 text-base">
              <button
                class="flex items-center gap-2 py-2 px-5 rounded-lg border text-slate-700"
              >
                <SolidPhoneIcon class="size-4 text-black flex-shrink-0" />
                Call
              </button>
              <button
                class="flex items-center gap-2 py-2 px-5 text-white bg-blue-700 rounded-lg"
              >
                <ChatBubbleOvalLeftEllipsisIcon class="size-4" />
                Message
              </button>
            </div>
          </template>
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <UserCircleIcon class="size-8 flex-shrink-0" />
        <div class="w-full flex flex-col gap-3">
          <p class="text-lg font-semibold">Contact Information</p>
          <div class="w-full h-px bg-slate-200"></div>

          <div class="flex gap-3 items-center">
            <PhoneIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Phone</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                v-model="phone"
                placeholder="No phone"
              />
            </div>
            <Square2StackIcon
              v-if="!is_edit"
              class="size-5 flex-shrink-0 text-blue-700"
            />
          </div>

          <div class="flex gap-3 items-center">
            <EnvelopeIcon
              class="text-base size-5 flex-shrink-0 text-slate-500"
            />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Email</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                v-model="email"
                placeholder="No email"
              />
            </div>
            <Square2StackIcon
              v-if="!is_edit"
              class="size-5 flex-shrink-0 text-blue-700"
            />
          </div>

          <div class="flex gap-3 items-center">
            <MapPinIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Address</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                v-model="address"
                placeholder="No address"
              />
            </div>
            <Square2StackIcon
              v-if="!is_edit"
              class="size-5 flex-shrink-0 text-blue-700"
            />
          </div>

          <!-- <div class="flex gap-3 items-center">
            <FacebookCircleIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Facebook</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                value="alice"
              />
            </div>
            <ExternalLinkIcon v-if="!is_edit" class="size-5 flex-shrink-0 text-blue-700" />
          </div> -->

          <!-- <div class="flex gap-3 items-center">
            <InstagramCircleIcon class="text-base size-5 flex-shrink-0 text-slate-500" />
            <div class="w-full flex flex-col">
              <p class="font-semibold">Instagram</p>
              <input
                class="outline-none bg-transparent"
                :class="{
                  'border py-1.5 px-3 rounded-lg': is_edit,
                }"
                :disabled="!is_edit"
                type="text"
                value="alice"
              />
            </div>
            <ExternalLinkIcon v-if="!is_edit" class="size-5 flex-shrink-0 text-blue-700" />
          </div> -->
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <TagIcon class="size-8 flex-shrink-0" />
        <div class="w-full flex flex-col gap-3">
          <p class="text-lg font-semibold">Preferences & Labels</p>
          <div class="w-full h-px bg-slate-200"></div>
          <ul class="flex gap-3 flex-wrap">
            <li
              v-for="label in contactStore.selected_contact.label_ids"
              class="flex gap-1 items-center font-medium bg-slate-200 py-0.5 px-2 rounded-md"
            >
              {{ contactStore.labels_obj?.[label]?.title }}
              <XCircleIcon
                v-if="is_edit"
                class="size-4 flex-shrink-0"
              />
            </li>
          </ul>
          <button
            v-if="is_edit"
            class="py-2 px-5 text-white bg-blue-700 rounded-md w-fit font-medium"
          >
            Add Label
          </button>
        </div>
      </section>

      <ProductList
        v-show="!is_edit"
        title="Last Orders"
        :products="last_order.products || []"
      />
    </main>
  </article>
</template>
<script setup lang="ts">
import { $contact, $order } from '@/api'
import { useContactStore } from '@/stores/contact'
import { get, set } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ProductList from '@/components/common/ProductList.vue'
import Image from '@/components/ui/Image.vue'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon.vue'
import FacebookCircleIcon from '@/components/icons/FacebookCircleIcon.vue'
import InstagramCircleIcon from '@/components/icons/InstagramCircleIcon.vue'

import {
  ArrowLeftIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  Square2StackIcon,
} from '@heroicons/vue/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PhoneIcon as SolidPhoneIcon,
  TagIcon,
  UserCircleIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/vue/24/solid'

import type { ContactEmail, ContactPhone, Order } from '@/interfaces'

// router
const router = useRouter()
const route = useRoute()

// store
const contactStore = useContactStore()

/** chế độ edit */
const is_edit = ref(false)

/** đơn hàng gần nhất */
const last_order = ref<Order>({})

/** số điện thoại */
const phone = computed({
  get: () =>
    get(contactStore.selected_contact, 'contact_phones[0].phone_number', '') ||
    '',
  set: value => {
    set(contactStore.selected_contact, 'contact_phones[0].phone_number', value)
  },
})
/** email */
const email = computed({
  get: () =>
    get(contactStore.selected_contact, 'contact_emails[0].email', '') || '',
  set: value => {
    set(contactStore.selected_contact, 'contact_emails[0].email', value)
  },
})
/** địa chỉ */
const address = computed({
  get: () =>
    get(contactStore.selected_contact, 'contact_addresses[0].address', '') ||
    '',
  set: value => {
    set(contactStore.selected_contact, 'contact_addresses[0].address', value)
  },
})

onMounted(() => {
  // nếu chưa có dữ liệu id thì thôi
  if (contactStore.selected_contact.identifier_id) {
    // lấy đơn hàng gần nhất của khách
    getLastOrders()
    return
  }
  // call api lấy dữ liệu của danh bạ trên url
  getContactOnUrl()
})

/** Lấy dữ liệu cửa đơn hàng trên url */
async function getContactOnUrl() {
  try {
    // nếu không có id trên url
    if (!route.params.id) return

    // call api lấy dữ liệu cửa đơn hàng
    const RES = await $contact.getContact({
      identifier_id: route.params.id as string,
    })

    // lưu lại dữ liệu cửa đơn hàng
    contactStore.selected_contact = RES

    // lấy đơn hàng gần nhất của khách
    getLastOrders()
  } catch (e) {
    console.log(e)
  }
}

/** Lấy đơn hàng gần nhất */
async function getLastOrders() {
  try {
    /** đơn hàng gần nhất */
    const RES = await $order.getOrderByContact({
      contact_id: contactStore.selected_contact.identifier_id,
    })

    // nếu có thì lưu lại
    if (RES?.[0]) last_order.value = RES[0]
  } catch (e) {
    console.log(e)
  }
}

/** bật chế độ edit */
function openEdit() {
  is_edit.value = true
}

/** tắt chế độ edit */
function closeEdit() {
  is_edit.value = false
}

/** cập nhật liên hệ */
async function updateContactInfo() {
  try {
    /** Convert lại dữ liệu datetime */
    if (contactStore.selected_contact.birthday) {
      contactStore.selected_contact.birthday = new Date(
        contactStore.selected_contact.birthday,
      )
    }

    // tạo mới hoặc cập nhật các số điện thoại
    await createAndUpdatePhone(
      contactStore.selected_contact.contact_phones || [],
    )

    // tạo mới hoặc cập nhật các email
    await createAndUpdateEmail(
      contactStore.selected_contact.contact_emails || [],
    )

    // nếu không có id liên hệ là thì dừng lại
    if (
      !contactStore.selected_contact.id ||
      !contactStore.selected_contact.identifier_id
    )
      return

    /** dữ liệu liên hệ mới được cập nhật */
    const RES = await $contact.update({
      id: contactStore.selected_contact.id,
      identifier_id: contactStore.selected_contact.identifier_id,
      label_ids: contactStore.selected_contact.label_ids,
      first_name: contactStore.selected_contact.first_name,
      last_name: contactStore.selected_contact.last_name,
    })

    return RES
  } catch (error) {
    throw error
  }
}

/** tạo mới và cập nhật số điện thoại */
async function createAndUpdatePhone(contact_phones: ContactPhone[]) {
  try {
    await createAndUpdateData(
      contact_phones,
      contactStore.selected_contact.identifier_id,
      $contact.createPhone,
      $contact.updatePhone,
      { value_key: 'phone_number' },
    )
  } catch (error) {
    console.log(error)
  }
}

/** tạo mới và cập nhật email */
async function createAndUpdateEmail(contact_emails: ContactEmail[]) {
  try {
    await createAndUpdateData(
      contact_emails,
      contactStore.selected_contact.identifier_id,
      $contact.createEmail,
      $contact.updateEmail,
      { value_key: 'email' },
    )
  } catch (error) {
    console.log(error)
  }
}

/** Hàm xử lý chung cho việc tạo/cập nhật (Sử dụng chung kiểu, tách riêng chức năng Phone/Email) */
async function createAndUpdateData<T extends { id?: string }>(
  items: T[],
  identifier_id: string | undefined,
  createFn: (data: any) => Promise<T>,
  updateFn: (data: any) => Promise<T>,
  fields: { value_key: string },
) {
  // nếu không có id contact thì dừng lại
  if (!identifier_id) return

  /** mảng các promise cần gọi API */
  const OPERATIONS: { promise: Promise<T>; index: number }[] = []

  // Lặp qua tất cả dữ liệu
  items?.forEach((item: any, i) => {
    /** giá trị cần cập nhật haowjc tạo mới */
    const VAL = item?.[fields.value_key] as string

    // Nếu đã có id và giá trị không chứa '*', gọi update
    if (item.id && VAL && !VAL.includes('*')) {
      OPERATIONS.push({
        index: i,
        promise: updateFn({
          identifier_id: identifier_id,
          object_id: item.id,
          [fields.value_key]: VAL,
        }),
      })
    }
    // Nếu chưa có id, gọi create
    else if (!item.id && VAL) {
      OPERATIONS.push({
        index: i,
        promise: createFn({
          identifier_id: identifier_id,
          [fields.value_key]: VAL,
        }),
      })
    }
  })

  /** danh sách kết quả của các api */
  const RES = await Promise.allSettled(OPERATIONS.map(op => op.promise))

  // Cập nhật kết quả trả về cho từng item ban đầu hoặc log lỗi
  RES.forEach((res, idx) => {
    if (res.status === 'fulfilled') {
      // Gán lại item gốc bằng dữ liệu trả về mới
      items[idx] = res.value
    } else {
      throw res.reason
    }
  })
}

/** hàm trở lại danh sách khách hàng */
function back() {
  if (is_edit.value) {
    closeEdit()
    return
  }
  router.push('/home/customer')
}
</script>
