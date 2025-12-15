<template>
  <div class="flex flex-col bg-gray-50 min-h-0 h-full overflow-hidden">
    <!-- Nội dung chính có thể scroll -->
    <main class="flex-1 overflow-y-auto px-3 py-4 space-y-4 pb-32">
      <!-- Images Section -->
      <section class="bg-white shadow-sm rounded-xl p-4 space-y-4">
        <h2 class="text-lg font-medium">Business Images</h2>

        <!-- Cover Upload -->
        <div
          class="relative rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center cursor-pointer hover:opacity-90 transition"
          @click="cover_input?.click()"
        >
          <img
            v-if="preview.cover"
            :src="preview.cover"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="flex flex-col items-center text-gray-400"
          >
            <PlusIcon class="size-10" />
            <p class="text-sm mt-2">Upload cover (max 5MB)</p>
          </div>

          <!-- Overlay actions - hiển thị khi có cover -->
          <div
            v-if="preview.cover"
            class="absolute bottom-2 right-2 flex gap-2"
          >
            <button
              @click.stop="cover_input?.click()"
              class="bg-white/90 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:bg-white transition"
            >
              Change
            </button>
            <button
              @click.stop="removeCover"
              class="bg-red-500/90 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:bg-red-500 transition"
            >
              Remove
            </button>
          </div>

          <input
            ref="coverInput"
            type="file"
            class="hidden"
            accept="image/*"
            @change="onCoverUpload"
          />
        </div>

        <!-- Logo Upload -->
        <div class="relative w-24 h-24 -mt-14 ml-4">
          <div
            class="w-full h-full rounded-xl border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
            @click="logo_input?.click()"
          >
            <img
              v-if="preview.logo"
              :src="preview.logo"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="flex flex-col items-center text-gray-400"
            >
              <PlusIcon class="size-6" />
              <p class="text-[10px] mt-1">Logo</p>
            </div>
          </div>

          <!-- Logo actions - hiển thị luôn nếu có logo -->
          <div
            v-if="preview.logo"
            class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
          >
            <button
              @click.stop="logo_input?.click()"
              class="bg-white text-gray-700 px-2 py-0.5 rounded text-xs font-medium shadow border"
            >
              Edit
            </button>
            <button
              @click.stop="removeLogo"
              class="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium shadow"
            >
              ✕
            </button>
          </div>

          <input
            ref="logo_input"
            type="file"
            class="hidden"
            accept="image/*"
            @change="onLogoUpload"
          />
        </div>
      </section>

      <!-- Basic Info -->
      <section class="bg-white shadow-sm rounded-xl p-4 space-y-3">
        <h2 class="text-lg font-medium">Basic Info</h2>
        <div class="space-y-3">
          <div class="form-group">
            <label class="form-label">Business Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter business name"
              class="input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Legal Entity Name</label>
            <input
              v-model="form.legalName"
              type="text"
              placeholder="Enter legal name"
              class="input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <input
              v-model="form.category"
              type="text"
              placeholder="e.g. Restaurant, Cafe, Bar"
              class="input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Cuisine Type</label>
            <input
              v-model="form.cuisine"
              type="text"
              placeholder="e.g. Italian, Vietnamese, Japanese"
              class="input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              v-model="form.description"
              maxlength="500"
              placeholder="Describe your business..."
              rows="3"
              class="input resize-none"
            ></textarea>
            <p class="text-xs text-gray-400 text-right mt-1">
              {{ form.description.length }}/500
            </p>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section class="bg-white shadow-sm rounded-xl p-4 space-y-3">
        <h2 class="text-lg font-medium">Contact</h2>
        <div class="space-y-3">
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              class="input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="contact@business.com"
              class="input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Website</label>
            <input
              v-model="form.website"
              type="url"
              placeholder="https://www.example.com"
              class="input"
            />
          </div>
        </div>
      </section>

      <!-- Operating Hours -->
      <section class="bg-white shadow-sm rounded-xl p-4 space-y-3">
        <h2 class="text-lg font-medium">Operating Hours</h2>
        <div class="space-y-2">
          <div
            v-for="(day, i) in form.hours"
            :key="day.day"
            class="border border-gray-200 rounded-lg p-3"
          >
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-700">{{ day.day }}</span>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  v-model="day.closed"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-gray-500">Closed</span>
              </label>
            </div>
            <div
              v-if="!day.closed"
              class="flex items-center gap-2 mt-2"
            >
              <input
                v-model="day.from"
                type="time"
                class="input w-28 text-sm"
              />
              <span class="text-gray-400">to</span>
              <input
                v-model="day.to"
                type="time"
                class="input w-28 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Special Hours -->
      <section class="bg-white shadow-sm rounded-xl p-4 space-y-3">
        <h2 class="text-lg font-medium">Special Hours</h2>
        <div class="space-y-2">
          <div
            v-for="(s, i) in form.specialHours"
            :key="s.id"
            class="border border-gray-200 rounded-lg p-3 space-y-2"
          >
            <div class="flex items-center justify-between">
              <input
                type="date"
                v-model="s.date"
                class="input w-40 text-sm"
              />
              <button
                @click="form.specialHours.splice(i, 1)"
                class="text-red-500 text-sm font-medium hover:text-red-600"
              >
                Remove
              </button>
            </div>
            <div
              v-if="!s.closed"
              class="flex items-center gap-2"
            >
              <input
                v-model="s.from"
                type="time"
                class="input w-28 text-sm"
              />
              <span class="text-gray-400">to</span>
              <input
                v-model="s.to"
                type="time"
                class="input w-28 text-sm"
              />
            </div>
            <label class="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                v-model="s.closed"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-gray-500">Closed this day</span>
            </label>
          </div>
        </div>
        <button
          @click="addSpecialHour"
          class="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700"
        >
          <PlusIcon class="size-4" />
          Add Special Hour
        </button>
      </section>

      <!-- Locations -->
      <section class="bg-white shadow-sm rounded-xl p-4 space-y-3">
        <h2 class="text-lg font-medium">Locations</h2>
        <div class="space-y-2">
          <div
            v-for="(loc, i) in form.locations"
            :key="loc.id"
            class="border border-gray-200 rounded-lg p-3 space-y-2"
          >
            <input
              v-model="loc.address"
              placeholder="Enter full address"
              class="input"
            />
            <!-- Tạm ẩn option primary và remove location theo yêu cầu -->
            <!-- <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  v-model="loc.isPrimary"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-gray-500">Primary location</span>
              </label>
              <button
                v-if="form.locations.length > 1"
                @click="removeLocation(i)"
                class="text-red-500 text-sm font-medium hover:text-red-600"
              >
                Remove
              </button>
            </div> -->
          </div>
        </div>
        <!-- Tạm ẩn nút Add Location -->
        <!-- <button
          @click="addLocation"
          class="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700"
        >
          <PlusIcon class="size-4" />
          Add Location
        </button> -->
      </section>

      <!-- Parking & Payment -->
      <section class="bg-white shadow-sm rounded-xl p-4 space-y-3">
        <h2 class="text-lg font-medium">Parking & Payment</h2>
        <div class="form-group">
          <label class="form-label">Parking Info</label>
          <input
            v-model="form.parking"
            placeholder="e.g. Free parking available"
            class="input"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Payment Methods</label>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <label
              v-for="opt in PAYMENT_OPTIONS"
              :key="opt.value"
              class="flex items-center gap-2 text-sm p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
              :class="{
                'border-blue-500 bg-blue-50': form.payments.includes(opt.value),
              }"
            >
              <input
                type="checkbox"
                v-model="form.payments"
                :value="opt.value"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {{ opt.label }}
            </label>
          </div>
        </div>
      </section>
    </main>

    <!-- Fixed Footer Buttons -->
    <footer
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-3 shadow-lg"
    >
      <!-- <button
        @click="goBack"
        class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
      >
        Close
      </button> -->
      <button
        @click="handleSave(true)"
        class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Save
      </button>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { $merchant } from '@/api'
import { useToast } from '@/composables/useToast'
import { useAppStore } from '@/stores'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Giao diện định nghĩa giờ hoạt động trong ngày.
 */
interface DayHour {
  /** Ngày trong tuần (ví dụ: Monday, Tuesday). */
  day: string
  /** Thời gian bắt đầu (ví dụ: 09:00). */
  from: string
  /** Thời gian kết thúc (ví dụ: 17:00). */
  to: string
  /** Trạng thái đóng cửa trong ngày. */
  closed: boolean
}

/**
 * Giao diện định nghĩa giờ đặc biệt.
 */
interface SpecialHour {
  /** ID duy nhất của giờ đặc biệt. */
  id: string
  /** Ngày áp dụng giờ đặc biệt (ví dụ: YYYY-MM-DD). */
  date: string
  /** Thời gian bắt đầu (tùy chọn). */
  from?: string
  /** Thời gian kết thúc (tùy chọn). */
  to?: string
  /** Trạng thái đóng cửa trong ngày đặc biệt. */
  closed: boolean
}

/**
 * Giao diện định nghĩa thông tin địa điểm.
 */
interface Location {
  /** ID duy nhất của địa điểm. */
  id: string
  /** Địa chỉ đầy đủ của địa điểm. */
  address: string
  /** Xác định xem đây có phải là địa điểm chính hay không. */
  isPrimary: boolean
}
/** Lưu dữ liệu ban đầu */
const origin_business_data = ref<any>(null)

/** Router để điều hướng */
const router = useRouter()
/** Store app */
const appStore = useAppStore()
/** Toast notification */
const { notify } = useToast()

/** Tạo ID ngẫu nhiên */
const uid = () => Math.random().toString(36).slice(2, 9)

/** Danh sách các ngày trong tuần */
const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

/** Form dữ liệu */
const form = reactive({
  name: '',
  legalName: '',
  category: '',
  cuisine: '',
  description: '',
  phone: '',
  email: '',
  website: '',
  hours: DAYS.map(d => ({ day: d, from: '09:00', to: '17:00', closed: false })),
  specialHours: [] as SpecialHour[],
  locations: [{ id: uid(), address: '', isPrimary: true }] as Location[],
  parking: '',
  payments: [] as string[],
  logo: '',
  cover: '',
})

/** Preview ảnh */
const preview = reactive({ logo: '', cover: '' })

/** Danh sách phương thức thanh toán */
const PAYMENT_OPTIONS = [
  { label: 'Cash', value: 'cash' },
  { label: 'Credit Card', value: 'card' },
  { label: 'Mobile Pay', value: 'mobile' },
  { label: 'Contactless', value: 'nfc' },
]

/** Tham chiếu đến phần tử input cho logo */
const logo_input = ref<HTMLInputElement | null>(null)
/** Tham chiếu đến phần tử input cho ảnh bìa */
const cover_input = ref<HTMLInputElement | null>(null)

/**
 * Kiểm tra kích thước tệp tin ảnh tải lên.
 * @param {File} file - Đối tượng tệp tin cần kiểm tra.
 * @returns {boolean} - `true` nếu kích thước tệp hợp lệ (nhỏ hơn hoặc bằng 5MB), `false` nếu không hợp lệ.
 */
function validateSize(file: File) {
  /** Kiểm tra nếu kích thước tệp lớn hơn 5MB */
  if (file.size > 5 * 1024 * 1024) {
    /** Hiển thị thông báo lỗi */
    notify('Ảnh vượt quá 5MB!', { type: 'error' })
    /** Trả về false vì kích thước không hợp lệ */
    return false
  }
  /** Trả về true vì kích thước hợp lệ */
  return true
}

/** Xử lý upload logo */
async function onLogoUpload(e: Event) {
  /** Lấy tệp tin đầu tiên từ sự kiện tải lên */
  const FILE = (e.target as HTMLInputElement).files?.[0]
  /** Kiểm tra nếu có tệp tin và kích thước tệp hợp lệ */
  if (FILE && validateSize(FILE)) {
    /** Xử lý tải lên tệp tin */
    try {
      /** Tạo đối tượng FormData để chứa tệp tin */
      const FORM_DATA = new FormData()
      /** Thêm tệp tin vào FormData với khóa 'file' */
      FORM_DATA.append('file', FILE)

      /** Gọi API để tải lên tệp tin */
      const RES = await $merchant.uploadFile(FORM_DATA)

      /** Nếu tải lên thành công và có đường dẫn tệp tin trả về */
      if (RES?.file_path) {
        /** Cập nhật đường dẫn logo trong form */
        form.logo = RES.file_path
        /** Cập nhật đường dẫn logo để hiển thị xem trước */
        preview.logo = RES.file_path
      }
    } catch (error) {
      /** Ghi lại lỗi nếu quá trình tải lên logo thất bại */
      console.error('Lỗi khi upload logo:', error)
      /** Hiển thị thông báo lỗi cho người dùng */
      notify('Upload logo thất bại!', { type: 'error' })
    }
  }
}

/** Xử lý upload cover */
async function onCoverUpload(e: Event) {
  /** Lấy tệp tin đầu tiên từ sự kiện tải lên từ input */
  const FILE = (e.target as HTMLInputElement).files?.[0]
  /** Kiểm tra nếu có tệp tin và kích thước tệp hợp lệ (nhỏ hơn 5MB) */
  if (FILE && validateSize(FILE)) {
    /** Xử lý tải lên tệp tin */
    try {
      /** Tạo đối tượng FormData để chứa tệp tin */
      const FORM_DATA = new FormData()
      /** Thêm tệp tin vào FormData với khóa 'file' */
      FORM_DATA.append('file', FILE)

      /** Gọi API để tải lên tệp tin */
      const RESPONSE = await $merchant.uploadFile(FORM_DATA)
      /** Ghi log phản hồi từ API khi upload ảnh bìa */
      console.log('RES cover', RESPONSE)

      /** Nếu tải lên thành công và có đường dẫn tệp tin trả về */
      if (RESPONSE?.file_path) {
        /** Cập nhật đường dẫn ảnh bìa trong form */
        form.cover = RESPONSE.file_path
        /** Cập nhật đường dẫn ảnh bìa để hiển thị xem trước */
        preview.cover = RESPONSE.file_path
      }
    } catch (error) {
      /** Ghi lại lỗi nếu quá trình tải lên ảnh bìa thất bại */
      console.error('Lỗi khi upload cover:', error)
      /** Hiển thị thông báo lỗi cho người dùng */
      notify('Upload cover thất bại!', { type: 'error' })
    }
  }
}

/**
 * Xóa logo hiện tại khỏi form và preview.
 */
function removeLogo() {
  /** Đặt giá trị logo trong form về rỗng */
  form.logo = ''
  /** Đặt giá trị logo trong preview về rỗng */
  preview.logo = ''
}

/**
 * Xóa ảnh bìa hiện tại khỏi form và preview.
 */
function removeCover() {
  /** Đặt giá trị ảnh bìa trong form về rỗng */
  form.cover = ''
  /** Đặt giá trị ảnh bìa trong preview về rỗng */
  preview.cover = ''
}

/**
 * Thêm một giờ đặc biệt mới vào danh sách giờ đặc biệt của form.
 */
function addSpecialHour() {
  /** Thêm một đối tượng giờ đặc biệt mới vào mảng specialHours */
  form.specialHours.push({
    /** Tạo ID duy nhất cho giờ đặc biệt */
    id: uid(),
    /** Đặt ngày mặc định là ngày hiện tại ở định dạng YYYY-MM-DD */
    date: new Date().toISOString().slice(0, 10),
    /** Đặt thời gian bắt đầu mặc định là 09:00 */
    from: '09:00',
    /** Đặt thời gian kết thúc mặc định là 17:00 */
    to: '17:00',
    /** Đặt trạng thái đóng cửa mặc định là false */
    closed: false,
  })
}

/**
 * Thêm một địa điểm mới vào danh sách địa điểm của form.
 */
function addLocation() {
  /** Thêm một đối tượng địa điểm mới vào mảng locations */
  form.locations.push({
    /** Tạo ID duy nhất cho địa điểm */
    id: uid(),
    /** Đặt địa chỉ mặc định là chuỗi rỗng */
    address: '',
    /** Đặt trạng thái là địa điểm chính mặc định là false */
    isPrimary: false,
  })
}

/**
 * Xóa một địa điểm khỏi danh sách địa điểm của form dựa trên chỉ mục.
 * @param {number} i - Chỉ mục của địa điểm cần xóa trong mảng locations.
 */
function removeLocation(i: number) {
  /** Xóa một phần tử tại vị trí chỉ mục i khỏi mảng locations */
  form.locations.splice(i, 1)
}

/**
 * Hàm xử lý lưu tất cả dữ liệu doanh nghiệp và cài đặt.
 * @param {boolean} isPublish - Xác định xem có phải là thao tác xuất bản hay không.
 */
async function handleSave(isPublish: boolean) {
  /** Xử lý lưu dữ liệu */
  try {
    /** Lấy ID doanh nghiệp từ dữ liệu gốc */
    const BUSINESS_ID = origin_business_data.value?._id
    /** Kiểm tra nếu không tìm thấy ID doanh nghiệp */
    if (!BUSINESS_ID) {
      /** Hiển thị thông báo lỗi */
      notify('Không tìm thấy thông tin doanh nghiệp!', { type: 'error' })
      /** Dừng hàm */
      return
    }

    /** 1. Cập nhật thông tin doanh nghiệp */
    /** Tạo đối tượng dữ liệu để cập nhật */
    const UPDATE_DATA = {
      /** Sao chép tất cả các thuộc tính từ dữ liệu doanh nghiệp gốc */
      ...origin_business_data.value,
      /** Cập nhật tên doanh nghiệp từ form */
      name: form.name,
      /** Cập nhật logo từ form */
      logo: form.logo,
      /** Cập nhật địa chỉ từ địa điểm đầu tiên trong form */
      address: form.locations[0]?.address || '',
      /** Gán ID doanh nghiệp */
      id: origin_business_data.value._id,
    }
    /** Gọi API để cập nhật thông tin doanh nghiệp */
    await $merchant.updateBusiness(UPDATE_DATA)

    /** 2. Lưu cài đặt giờ làm việc */
    /** Danh sách các ngày trong tuần bằng tiếng Việt */
    const VN_DAYS = [
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
      'Chủ nhật',
    ]
    /**
     * Hàm phân tích chuỗi thời gian thành đối tượng giờ và phút.
     * @param {string} str - Chuỗi thời gian (ví dụ: "09:00").
     * @returns {{hour: number, minute: number}} - Đối tượng chứa giờ và phút.
     */
    const parseTime = (str: string) => {
      /** Nếu chuỗi rỗng, trả về mặc định 00:00 */
      if (!str) return { hour: 0, minute: 0 }
      /** Phân tích chuỗi thành giờ và phút */
      const [h, m] = str.split(':').map(Number)
      /** Trả về đối tượng giờ và phút */
      return { hour: h || 0, minute: m || 0 }
    }

    /** Chuyển đổi giờ làm việc từ form sang định dạng API yêu cầu */
    const TIME_LIST = form.hours.map((d, i) => ({
      /** Tiêu đề ngày làm việc */
      title: VN_DAYS[i],
      /** Thời gian bắt đầu làm việc */
      checkin: parseTime(d.from),
      /** Thời gian kết thúc làm việc */
      checkout: parseTime(d.to),
      /** Trạng thái hoạt động (true nếu không đóng cửa) */
      active: !d.closed,
    }))

    /** Gọi API để lưu cài đặt giờ làm việc */
    await $merchant.saveSetting({
      /** ID doanh nghiệp */
      business_id: BUSINESS_ID,
      /** Loại cài đặt là giờ làm việc */
      setting_type: 'working_time',
      /** Dữ liệu cài đặt giờ làm việc */
      setting_data: {
        /** Múi giờ */
        time_zone: 'GMT +7:00 Hanoi, Bangkok, Jakarta',
        /** Cấu hình giờ hoạt động của tổ chức */
        organization_working_time: {
          /** Kích hoạt giờ hoạt động */
          active: true,
          /** Danh sách giờ làm việc */
          working_time: TIME_LIST,
        },
      },
    })

    /** 3. Lưu cài đặt ảnh nền */
    /** Kiểm tra nếu có ảnh bìa trong form */
    if (form.cover) {
      /** Gọi API để lưu cài đặt ảnh nền */
      await $merchant.saveSetting({
        /** ID doanh nghiệp */
        business_id: BUSINESS_ID,
        /** Loại cài đặt là ảnh nền */
        setting_type: 'background',
        /** Dữ liệu cài đặt ảnh nền */
        setting_data: {
          /** Cấu hình ảnh nền cho PC */
          pc: [{ link: form.cover, active: true }],
          /** Cấu hình ảnh nền cho thiết bị di động (hiện tại để trống) */
          mobile: [],
        },
      })
    }

    /** Hiển thị thông báo thành công dựa trên trạng thái xuất bản */
    if (isPublish) {
      /** Thông báo đã lưu và xuất bản thành công */
      notify('Lưu thành công!', { type: 'success' })
    } else {
      /** Thông báo đã lưu bản nháp thành công */
      notify('Lưu bản nháp thành công!', { type: 'success' })
    }
  } catch (e) {
    /** Ghi log lỗi nếu quá trình lưu dữ liệu thất bại */
    console.error('Lỗi khi lưu dữ liệu:', e)
    /** Hiển thị thông báo lỗi cho người dùng */
    notify('Lưu thất bại! Vui lòng thử lại.', { type: 'error' })
  }
}

/** Quay lại trang trước */
function goBack() {
  /** Điều hướng về trang settings */
  router.back()
}

/** Fetch data khi mounted */
onMounted(async () => {
  try {
    /** Lấy ID doanh nghiệp từ store */
    const BUSINESS_ID =
      appStore.merchant_data.business_id || appStore.merchant_data.org_id
    /** Nếu không có ID doanh nghiệp, thoát */
    if (!BUSINESS_ID) return

    /** Gọi API lấy thông tin */
    const RES = await $merchant.getBusinessInfo({
      business_id: BUSINESS_ID,
    })
    /** Nếu có thông tin doanh nghiệp, map vào form */
    if (RES?.business) {
      /** Lưu thông tin doanh nghiệp gốc */
      const BIZ = RES.business
      /** Lưu thông tin doanh nghiệp gốc */
      origin_business_data.value = BIZ

      /** Map data vào form */
      form.name = BIZ.name || ''
      form.logo = BIZ.logo || ''
      preview.logo = BIZ.logo || ''

      /** Map address vào location đầu tiên */
      if (form.locations.length > 0) {
        form.locations[0].address = BIZ.address || BIZ.full_address || ''
      }
    }

    /** Gọi API lấy settings */
    const RES_SETTING = await $merchant.getBusinessSetting({
      business_id: BUSINESS_ID,
    })
    /** Nếu có settings */
    if (RES_SETTING) {
      /** Lưu settings */
      const SETTINGS = RES_SETTING

      /** 1. Xử lý Working Time */
      const WORKING_TIME_SETTING = SETTINGS.find(
        (s: any) => s.setting_type === 'working_time',
      )
      /** Nếu có settings */
      if (
        WORKING_TIME_SETTING?.setting_data?.organization_working_time
          ?.working_time
      ) {
        /** Lưu settings */
        const TIME_LIST =
          WORKING_TIME_SETTING.setting_data.organization_working_time
            .working_time

        /** Format hiển thị giờ: 9:0 -> 09:00 */
        /**
         * Định dạng giờ và phút thành chuỗi 'HH:mm'.
         * @param {object} t - Đối tượng chứa giờ và phút.
         * @param {number} t.hour - Giờ (0-23).
         * @param {number} t.minute - Phút (0-59).
         * @returns {string} Chuỗi thời gian đã định dạng (ví dụ: '09:00').
         */
        const fmt = (t: { hour: number; minute: number }) => {
          /** Nếu không có đối tượng thời gian, trả về giá trị mặc định '09:00' */
          if (!t) return '09:00'
          /** Chuyển đổi giờ sang chuỗi và thêm '0' vào đầu nếu chỉ có 1 chữ số */
          const H = t.hour.toString().padStart(2, '0')
          /** Chuyển đổi phút sang chuỗi và thêm '0' vào đầu nếu chỉ có 1 chữ số */
          const M = t.minute.toString().padStart(2, '0')
          /** Trả về chuỗi thời gian đã định dạng */
          return `${H}:${M}`
        }

        /** Map từng ngày theo index (T2->CN khớp với Monday->Sunday) */
        form.hours = form.hours.map((day, index) => {
          const apiDay = TIME_LIST[index]
          if (apiDay) {
            return {
              ...day,
              from: fmt(apiDay.checkin),
              to: fmt(apiDay.checkout),
              closed: !apiDay.active,
            }
          }
          return day
        })
      }

      /** 2. Xử lý Background (Cover) */
      const BG_SETTING = SETTINGS.find(
        (s: any) => s.setting_type === 'background',
      )

      console.log('BG_SETTING', BG_SETTING)
      if (BG_SETTING?.setting_data) {
        const { pc, mobile } = BG_SETTING.setting_data
        /** Lấy ảnh đầu tiên từ pc hoắc mobile làm cover */
        const coverObj =
          pc && pc.length > 0
            ? pc[0]
            : mobile && mobile.length > 0
              ? mobile[0]
              : null

        if (coverObj && coverObj.link) {
          form.cover = coverObj.link
          preview.cover = coverObj.link
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch business info:', error)
  }
})
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded-lg px-3 py-2.5 w-full transition-colors;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.form-group {
  @apply flex flex-col;
}

.form-label {
  @apply text-sm font-medium text-gray-700 mb-1;
}
</style>
