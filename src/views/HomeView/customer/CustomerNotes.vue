<template>
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
      <ul
        v-if="notes.length"
        class="flex flex-col gap-2 max-h-[60dvh] pb-2 overflow-auto"
      >
        <li
          v-for="(item, index) in notes"
          class="flex flex-col gap-1 w-full rounded-xl shadow-md border px-3 py-2"
        >
          <div class="w-full flex gap-2 items-center">
            <Image
              :url="
                appStore.employees_obj?.[item.employee_id || '']?.avatar || ''
              "
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
                <p class="font-semibold text-black">
                  {{ getNameEmployee(item.employee_id || '') }}
                </p>
                <p class="text-xs text-slate-500">
                  {{
                    item.createdAt && format(item.createdAt, 'HH:mm dd/MM/yyyy')
                  }}
                </p>
              </div>
            </div>
            <button
              v-if="!item.is_add_reply"
              class="text-blue-500 font-medium"
              @click="
                () => {
                  item.is_add_reply = true
                  item.note = ''
                }
              "
            >
              Reply
            </button>
          </div>
          <div class="pl-10">
            <p class="border-b pb-2">
              {{ item.content }}
            </p>

            <div v-for="sub_item in item.replies">
              <div class="w-full flex gap-2 items-center py-2">
                <Image
                  :url="
                    appStore.employees_obj?.[sub_item.employee_id || '']
                      ?.avatar || ''
                  "
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
                    <p class="font-semibold text-black">
                      {{ getNameEmployee(sub_item.employee_id || '') }}
                    </p>
                    <p class="text-xs text-slate-500">
                      {{
                        sub_item.createdAt &&
                        format(sub_item.createdAt, 'HH:mm dd/MM/yyyy')
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <p class="pl-10 pb-2 border-b">{{ sub_item.content }}</p>
            </div>

            <template v-if="item.is_add_reply">
              <textarea
                type="text"
                placeholder="Enter note..."
                class="mt-2 w-full outline-none border py-1.5 px-3 rounded-lg"
                v-model="item.note"
              />
              <div class="flex gap-3 font-medium">
                <button
                  :disabled="!item.note"
                  class="bg-blue-700 disabled:bg-slate-400 text-white py-1.5 px-3 rounded-md"
                  @click="addReplyNote(index)"
                >
                  Add note
                </button>
                <button
                  class="text-red-500"
                  @click="item.is_add_reply = false"
                >
                  Cancel
                </button>
              </div>
            </template>
          </div>
        </li>
      </ul>
      <p
        v-else
        class="text-slate-500"
      >
        No notes
      </p>

      <Pagination
      class="pt-2"
      v-model:page="page"
      :total="total_note"
      :sibling-count="1"
      :items-per-page="PAGE_SIZE"
      :change-page="getNotes"
    />
    </div>
  </section>
</template>

<script setup lang="ts">
import { $contact } from '@/api'
import { format } from 'date-fns'
import { onMounted, ref } from 'vue'
import { useAppStore, useContactStore } from '@/stores'

import Pagination from '@/components/ui/Pagination.vue'

import { ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/vue/24/solid'

import type { Note } from '@/interfaces'

const PAGE_SIZE = 10

// store
const appStore = useAppStore()
const contactStore = useContactStore()

/** giá trị của input ghi chú */
const note = ref('')
/** danh sách ghi chú */
const notes = ref<Note[]>([])
/** trang hiện tại */
const page = ref(1)
/** số bản ghi một lần lấy */
const total_note = ref(0)

onMounted(() => {
  // nếu chưa có dữ liệu id thì thôi
  if (contactStore.selected_contact.identifier_id) {
    // lấy danh sách ghi chú
    getNotes()
    return
  }
})

/** lấy danh sách ghi chú */
async function getNotes() {
  try {
    /** danh sách ghi chú */
    const RES = await $contact.getNote({
      contact_id: contactStore.selected_contact.identifier_id,
      limit: PAGE_SIZE,
      skip: (page.value - 1) * PAGE_SIZE,
    })

    // lưu lại danh sách ghi chú
    notes.value = RES?.notes
    // lưu lại tổng số bản ghi
    total_note.value = RES?.total

    // lấy các comment trả lời cho vào trong các comment chính
    notes.value = notes.value.filter(note => {
      // nếu có parent_id => comment trả lời thì xóa khỏi mảng
      if (note.parent_id) return false

      // lặp qua mảng snap copy để lấy ra các ghi chú comment thêm vào note chính
      RES?.notes.forEach((snap_note: Note) => {
        // nếu không phải comment trả lời của ghi chú chính thì thôi
        if (snap_note.parent_id !== note.id) return
        // Khởi tạo giá trị comments cho ghi chú chính nếu chưa có
        if (!note.replies) note.replies = []

        // thêm ghi chú comment thêm vào ghi chú chính
        note.replies.push(snap_note)
      })

      return true
    })
  } catch (e) {
    console.log(e)
  }
}

/** cập nhật ghi chú */
async function addNote() {
  try {
    /** dữ liệu ghi chú mới được tạo */
    const RES = await $contact.createNote({
      contact_id: contactStore.selected_contact.identifier_id,
      content: note.value,
    })
    // reset input
    note.value = ''

    // thêm vào đầu mảng
    notes.value = [RES, ...(notes.value || [])]
  } catch (e) {
    console.log(e)
  }
}

/** thêm mới ghi chú trả lời */
async function addReplyNote(index: number) {
  try {
    // nếu không tồn tại khi chú với index thì thôi
    if (!notes.value?.[index]) return

    /** dữ liệu mới được tạo */
    const RES = await $contact.createNote({
      contact_id: contactStore.selected_contact.identifier_id,
      parent_id: notes.value?.[index]?.id,
      is_nested: true,
      content: notes.value?.[index]?.note || '',
    })

    // reset giá trị
    notes.value[index].note = ''
    notes.value[index].is_add_reply = false

    // thêm vào đầu mảng
    notes.value[index].replies = [RES, ...(notes.value[index].replies || [])]
  } catch (e) {
    console.log(e)
  }
}

/** lấy tên của nhân sự */
function getNameEmployee(id: string) {
  /** dữ liệu của nhân sự đã tạo */
  const EMPLOYEE = appStore.employees_obj?.[id]

  return `${EMPLOYEE?.first_name || ''}`?.trim()
}
</script>
