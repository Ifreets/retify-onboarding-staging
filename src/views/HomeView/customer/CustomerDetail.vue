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
        @click="save"
      >
        Save
      </button>
    </header>
    <main class="w-full h-full px-2 py-3 gap-5 flex flex-col overflow-auto">
      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <Image
          :url="contactStore.selected_contact.avatar || ''"
          container_class="size-11 rounded-full object-contain flex-shrink-0"
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
            <p class="text-slate-700">{{ before_edit.phone }}</p>
          </div>
          <template v-if="!is_edit">
            <div class="w-full h-px bg-slate-200"></div>
            <div class="font-semibold flex gap-2.5 text-base">
              <button
                class="flex items-center gap-2 py-2 px-5 rounded-lg border text-slate-700"
                v-if="contactStore.selected_contact.contact_phones?.length"
                @click="
                  openCallPhone('page.customer', contactStore.selected_contact)
                "
              >
                <SolidPhoneIcon class="size-4 text-black flex-shrink-0" />
                Call
              </button>
              <button
                class="flex items-center gap-2 py-2 px-5 text-white bg-blue-700 rounded-lg"
                v-if="contactStore.selected_contact.contact_sources?.length"
                @click="toChat('page.customer', contactStore.selected_contact)"
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
                @focus="
                  () => {
                    if (before_edit.phone === phone) phone = ''
                  }
                "
                @blur="
                  () => {
                    if (!phone) phone = before_edit.phone
                  }
                "
                :placeholder="before_edit.phone || 'No phone'"
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
                :placeholder="before_edit.email || 'No email'"
                @focus="
                  () => {
                    if (before_edit.email === email) email = ''
                  }
                "
                @blur="
                  () => {
                    if (!email) email = before_edit.email
                  }
                "
              />
            </div>
            <Square2StackIcon
              v-if="!is_edit"
              class="size-5 flex-shrink-0 text-blue-700"
            />
          </div>

          <!-- <div class="flex gap-3 items-center">
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
                :placeholder="before_edit.address || 'No address'"
                @focus="() => {
                  if(before_edit.address === address) address = ''
                }"
                @blur="() => {
                  if(!address) address = before_edit.address
                }"
              />
            </div>
            <Square2StackIcon
              v-if="!is_edit"
              class="size-5 flex-shrink-0 text-blue-700"
            />
          </div> -->

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
          <ul
            v-if="contactStore.selected_contact.label_ids?.length"
            class="flex gap-3 flex-wrap"
          >
            <li
              v-for="(label, index) in contactStore.selected_contact.label_ids"
              class="flex gap-1 items-center font-medium bg-slate-200 py-0.5 px-2 rounded-md"
            >
              {{ contactStore.labels_obj?.[label]?.title }}
              <XCircleIcon
                v-if="is_edit"
                class="size-4 flex-shrink-0"
                @click="removeLabel(index)"
              />
            </li>
          </ul>
          <p
            v-else-if="!is_edit"
            class="text-slate-500"
          >
            No labels
          </p>
          <button
            v-if="is_edit && !is_show_labels"
            class="py-2 px-5 text-white bg-blue-700 rounded-md w-fit font-medium"
            @click="is_show_labels = true"
          >
            Add Label
          </button>
          <div
            v-if="is_edit && is_show_labels"
            class="flex flex-col gap-2"
          >
            <div class="border-b pb-2 flex justify-between">
              <p class="font-medium">Chọn nhãn</p>
              <XMarkIcon
                class="size-5 flex-shrink-0"
                @click="is_show_labels = false"
              />
            </div>
            <ul class="flex gap-2 flex-wrap">
              <li
                v-for="label in contactStore.labels_obj"
                class="flex gap-1 items-center font-medium bg-slate-200 py-0.5 px-2 rounded-md"
                @click="addLabel(label.label_id?.toString() || '')"
                v-show="
                  !contactStore.selected_contact.label_ids?.includes(
                    label.label_id?.toString() || '',
                  )
                "
              >
                {{ label.title }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="border py-3 px-4 rounded-lg flex gap-3">
        <ChatBubbleLeftRightIcon class="size-8 flex-shrink-0" />
        <div class="w-full flex flex-col gap-3">
          <p class="text-lg font-semibold">Note</p>
          <div class="w-full h-px bg-slate-200"></div>
          <textarea
            type="text"
            placeholder="Enter note..."
            class="w-full outline-none border py-1.5 px-3 rounded-lg"
            v-model="note"
          />
          <button
            :disabled="!note"
            class="bg-blue-700 disabled:bg-slate-400 text-white font-medium py-1.5 px-3 rounded-md w-fit"
            @click="addNote"
          >
            Add note
          </button>
          <ul class="flex flex-col gap-2 max-h-[60dvh] pb-2 overflow-auto">
            <li
              v-for="item in notes"
              class="flex flex-col gap-1 w-full rounded-xl shadow-md border px-3 py-2"
            >
              <div class="w-full flex gap-2 items-center">
                <Image
                  url="https://static.botbanhang.vn/merchant/files/business_642655457c339f9194288da9/1712568308370.jpeg"
                  container_class="size-8 rounded-full object-contain flex-shrink-0"
                >
                  <div
                    class="size-8 flex-shrink-0 rounded-full flex items-center justify-center bg-slate-100"
                  >
                    <UserIcon class="w-5 h-5 flex-shrink-0 text-slate-700" />
                  </div>
                </Image>
                <div class="flex flex-col w-full">
                  <div>
                    <p class="font-semibold text-black">Nguyen Xuan Hai</p>
                  <p class="text-xs text-slate-500">
                    {{ format(item.createdAt, 'HH:mm dd/MM/yyyy') }}
                  </p>
                  </div>
                  <!-- <button>
                    Reply
                  </button> -->
                </div>
              </div>
              <p class="pl-10">
                {{ item.content }}
              </p>
            </li>
          </ul>
          <!-- <p class="text-slate-500">No messages</p> -->
        </div>
      </section>

      <ProductList
        v-if="last_order.products?.length"
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
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PhoneIcon as SolidPhoneIcon,
  TagIcon,
  UserCircleIcon,
  UserIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid'

import type {
  Contact,
  ContactAddress,
  ContactEmail,
  ContactPhone,
  Order,
} from '@/interfaces'
import { useNavigationHandler } from '@/composables/useNavigationHandler'
import { formatDate } from '@/services/format'
import { format } from 'date-fns'

// router
const router = useRouter()
const route = useRoute()

// store
const contactStore = useContactStore()

// composable
const { openCallPhone, toChat } = useNavigationHandler()

/** chế độ edit */
const is_edit = ref(false)

/** ẩn hiện danh sách nhãn */
const is_show_labels = ref(false)

/** đơn hàng gần nhất */
const last_order = ref<Order>({})

/** số điện thoại */
const phone = computed({
  get: () => getValue(contactStore.selected_contact, 'phone_number'),
  set: value => setValue('phone_number', value),
})
/** email */
const email = computed({
  get: () => getValue(contactStore.selected_contact, 'email'),
  set: value => setValue('email', value),
})
/** địa chỉ */
const address = computed({
  get: () => getValue(contactStore.selected_contact, 'full_address'),
  set: value => setValue('full_address', value),
})

/** các giá trị trước khi sửa */
const before_edit = ref({
  phone: phone.value,
  email: email.value,
  address: address.value,
})

/** giá trị của input ghi chú */
const note = ref('')
/** danh sách ghi chú */
const notes = ref<any[]>([])

onMounted(() => {
  // nếu chưa có dữ liệu id thì thôi
  if (contactStore.selected_contact.identifier_id) {
    // lấy đơn hàng gần nhất của khách
    getLastOrders()
    // lấy danh sách ghi chú
    getNotes()
    return
  }
  // call api lấy dữ liệu của danh bạ trên url
  getContactOnUrl()
})

/** Lấy giá trị sdt, email, địa chỉ */
function getValue(
  contact: Contact,
  value_key: 'phone_number' | 'email' | 'full_address',
) {
  /** danh sách các giá trị */
  const MAP = {
    phone_number: 'contact_phones',
    email: 'contact_emails',
    full_address: 'contact_addresses',
  }
  /** mảng chứa các giá trị cần lấy */
  const DATAS = get(contact, MAP[value_key], [])
  // lấy ra phần tử cuối cùng
  return get(DATAS, `[${DATAS.length - 1}][${value_key}]`, '') || ''
}

/** Gán giá trị sdt, email, địa chỉ */
function setValue(
  value_key: 'phone_number' | 'email' | 'full_address',
  value: string,
) {
  /** danh sách các giá trị */
  const MAP = {
    phone_number: 'contact_phones',
    email: 'contact_emails',
    full_address: 'contact_addresses',
  }
  /** mảng chứa các giá trị */
  const DATAS = get(contactStore.selected_contact, MAP[value_key], [])
  // set giá trị có sản phẩm cuối cùng
  set(
    contactStore.selected_contact,
    `[${MAP[value_key]}][${DATAS.length - 1}][${value_key}]`,
    value,
  )
}

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

/** lấy danh sách ghi chú */
async function getNotes() {
  try {
    /** danh sách ghi chú */
    const RES = await $contact.getNote({
      contact_id: contactStore.selected_contact.identifier_id,
    })

    // lưu lại danh sách ghi chú
    notes.value = RES?.notes
  } catch (e) {
    console.log(e)
  }
}

/** cập nhật ghi chú */
async function addNote() {
  try {
    await $contact.createNote({
      contact_id: contactStore.selected_contact.identifier_id,
      content: note.value,
    })
    note.value = ''
    getNotes()
  } catch (e) {
    console.log(e)
  }
} 

/** bật chế độ edit */
function openEdit() {
  is_edit.value = true
  before_edit.value = {
    phone: phone.value,
    email: email.value,
    address: address.value,
  }
}

/** lưu thông tin */
async function save() {
  try {
    await updateContactInfo()
    closeEdit()
  } catch (e) {
    console.log(e)
  }
}

/** tắt chế độ edit */
function closeEdit() {
  is_edit.value = false
}

/** cập nhật liên hệ */
async function updateContactInfo() {
  try {
    // nếu không có id liên hệ là thì dừng lại
    if (
      !contactStore.selected_contact.id ||
      !contactStore.selected_contact.identifier_id
    )
      return

    // tạo mới hoặc cập nhật các số điện thoại
    await createAndUpdatePhone(
      contactStore.selected_contact.contact_phones || [],
    )

    // tạo mới hoặc cập nhật các email
    await createAndUpdateEmail(
      contactStore.selected_contact.contact_emails || [],
    )

    // tạo mới hoặc cập nhật các địa chỉ
    await createAndUpdateAddress(
      contactStore.selected_contact.contact_address || [],
    )

    /** dữ liệu liên hệ mới được cập nhật */
    await $contact.update({
      id: contactStore.selected_contact.id,
      identifier_id: contactStore.selected_contact.identifier_id,
      label_ids: contactStore.selected_contact.label_ids,
      first_name: contactStore.selected_contact.first_name,
      last_name: contactStore.selected_contact.last_name,
    })

    // call api lấy dữ liệu cửa đơn hàng
    const RES = await $contact.getContact({
      identifier_id: route.params.id as string,
    })

    // lưu lại dữ liệu cửa đơn hàng
    contactStore.selected_contact = RES
  } catch (error) {
    throw error
  }
}

/** tạo mới và cập nhật số điện thoại */
async function createAndUpdatePhone(contact_phones: ContactPhone[]) {
  try {
    //không thay đổi gì thì dừng lại
    if (phone.value === before_edit.value.phone) return
    // kiểm tra xem số điện thoại có hợp lệ hay không
    if (!isValidPhone(phone.value)) {
      throw 'Phone number is invalid'
    }

    await createAndUpdateData(
      contact_phones,
      contactStore.selected_contact.identifier_id,
      $contact.createPhone.bind($contact),
      $contact.updatePhone.bind($contact),
      { value_key: 'phone_number' },
    )
  } catch (error) {
    throw error
  }
}

/** kiểm tra xem số điện thoại có hợp lệ hay không */
function isValidPhone(input: string) {
  return /^\+?[0-9]\d{1,14}$/.test(input)
}

/** tạo mới và cập nhật email */
async function createAndUpdateEmail(contact_emails: ContactEmail[]) {
  try {
    // không thay đổi gì thì dừng lại
    if (email.value === before_edit.value.email) return
    // kiểm tra xem số điện thoại có hợp lệ hay không
    if (!isValidEmail(email.value)) {
      throw 'Email is invalid'
    }

    await createAndUpdateData(
      contact_emails,
      contactStore.selected_contact.identifier_id,
      $contact.createEmail.bind($contact),
      $contact.updateEmail.bind($contact),
      { value_key: 'email' },
    )
  } catch (error) {
    throw error
  }
}

/** kiểm tra xem email có hợp lệ hay không */
function isValidEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
}

/** tạo mới và cập nhật điểm giao hành */
async function createAndUpdateAddress(contact_addresses: ContactAddress[]) {
  try {
    // không thay đổi gì thì dừng lại
    if (address.value === before_edit.value.address) return

    await createAndUpdateData(
      contact_addresses,
      contactStore.selected_contact.identifier_id,
      $contact.createAddress.bind($contact),
      $contact.updateAddress.bind($contact),
      { value_key: 'full_address' },
    )
  } catch (error) {
    throw error
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

  /** phần tử đầu tiên */
  const ITEM = items?.[items.length - 1] as any

  /** giá trị cần cập nhật hoặc tạo mới */
  const VAL = ITEM?.[fields.value_key] as string

  // Nếu đã có id và giá trị không chứa '*', gọi update
  if (ITEM?.id) {
    updateFn({
      identifier_id: identifier_id,
      object_id: ITEM.id,
      [fields.value_key]: VAL,
    })
  }
  // Nếu chưa có id, gọi create
  else {
    createFn({
      identifier_id: identifier_id,
      [fields.value_key]: VAL,
    })
  }
}

/** hàm trở lại danh sách khách hàng */
function back() {
  // nếu đang ở màn edit thì lấy lại giá trị trước khi sửa
  if (is_edit.value) {
    // lấy lại giá trị trước khi sửa
    phone.value = before_edit.value.phone
    email.value = before_edit.value.email
    address.value = before_edit.value.address

    // thoát màn edit
    closeEdit()
    return
  }
  router.push('/home/customer')
}

/** hàm xóa nhãn */
function removeLabel(index: number) {
  contactStore.selected_contact.label_ids?.splice(index, 1)
}

/** thêm mới nhãn */
function addLabel(label_id: string) {
  contactStore.selected_contact.label_ids = [
    ...(contactStore.selected_contact.label_ids || []),
    label_id,
  ]
}
</script>
