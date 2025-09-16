<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-between w-full px-2">
      <div class="w-20"></div>
      <h3 class="text-2xl font-semibold">Customers</h3>
      <CreateButton />
    </header>
    <section class="w-full h-full py-2 flex flex-col overflow-hidden">
      <InputSearch
        v-model:search="search"
        placeholder="Search Customers..."
        :call-api-search="getContacts"
      />
      <SkeletonLoading v-if="loading.first" />
      <template v-else>
        <CustomerList
          v-if="contacts.length"
          :contacts="contacts"
          :get-contacts="getMoreContact"
        />
        <EmptyState
          v-else
          add_content="New Customer"
          empty_content="Not Found Customer"
        />
      </template>
      <Loading :loading="loading.more" />
    </section>

    <!-- <AskRetionButton /> -->
  </article>
</template>

<script setup lang="ts">
import { $contact } from '@/api'
import { useResumeAndPause } from '@/composables/useResumeAndPause'
import { useContactStore } from '@/stores/contact'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CreateButton from '@/components/common/CreateButton.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import InputSearch from '@/components/common/InputSearch.vue'
import Loading from '@/components/common/Loading.vue'
import SkeletonLoading from '@/components/common/SkeletonLoading.vue'
import CustomerList from '@/views/HomeView/customer/CustomerList.vue'

import type { Contact } from '@/interfaces'

// store
const contactStore = useContactStore()

/** số bản ghi một lần lấy dữ liệu */
const LIMIT = 20

/** danh sách đơn hàng */
const contacts = ref<Contact[]>([])

/** từ khóa tìm kiếm */
const search = ref('')

/** số bản ghi bắt đầu lấy */
const skip = ref(0)

/** trạng thái loading của đơn hàng */
const loading = ref({
  first: false,
  more: false,
})

/** cờ check xem đã load hết dữ liệu chưa */
const is_load_full = ref(false)

// router
const router = useRouter()
const route = useRoute()

// composable
useResumeAndPause({ onResume: getContactsWithoutSearch })

onMounted(() => {
  // Lấy danh sách danh bạ
  getContacts()

  // nếu có id trên url thì chuyển về màn chi tiết
  getContactOnUrl()
})

/** reset search và lấy danh sách khách hàng */
function getContactsWithoutSearch() {
  search.value = ''
  getContacts()
}

/** Lấy danh sách danh bạ */
async function getContacts() {
  try {
    // bật loading
    loading.value.first = true
    // clear skip
    skip.value = 0
    /** danh sách danh bạ */
    const RES = await getContact()
    // lưu lại
    contacts.value = RES
  } catch (e) {
    console.log(e)
  } finally {
    // tắt loading
    loading.value.first = false
    // tắt cờ load hết dữ liệu
    is_load_full.value = false
  }
}

/** lấy thêm danh sách đơn hàng */
async function getMoreContact() {
  try {
    // nếu cờ load hết dữ liệu thì thôi
    if (is_load_full.value) return

    // bật loading
    loading.value.more = true
    // tăng skip
    skip.value += LIMIT

    /** dữ liệu danh sách đơn hàng */
    const RES = await getContact()

    // thêm danh sách vào danh sách danh bạ hiện tại
    contacts.value = [...contacts.value, ...RES]

    /** nếu ít hơn số bản ghi cần lấy => đã lấy hết */
    if (RES.length < LIMIT) {
      is_load_full.value = true
    }
  } catch (e) {
    console.log(e)
  } finally {
    // tắt loading
    loading.value.more = false
  }
}

/** call api lấy danh sách đơn hàng */
async function getContact() {
  return await $contact.getContact({
    skip: skip.value,
    limit: LIMIT,
    search: search.value,
  })
}

/** Nếu có id của customer thì chuyển sang màn chi tiết với luôn */
async function getContactOnUrl() {
  /** id khách hàng trên url */
  const CUSTOMER_ID = route.query.customer_id

  /** id đơn hàng trên url */
  const ORDER_ID = route.query.order_id

  // nếu không id trên url thì thôi
  if (!CUSTOMER_ID) return

  router.push(
    {
      path: `/home/customer/${CUSTOMER_ID}`,
      query: {
        order_id: ORDER_ID,
      },
    },
  )
}
</script>
