<template>
  <div
    class="flex flex-col bg-gray-50 px-3 min-h-0 h-[100vh] overflow-hidden overflow-y-auto pb-20"
  >
    <h1 class="text-xl font-semibold">Business Profile</h1>

    <!-- Images Section -->
    <!-- Images Section -->
    <div class="bg-white shadow-sm rounded-xl p-4 space-y-4">
      <h2 class="text-lg font-medium">Business Images</h2>

      <!-- Cover Upload -->
      <div
        class="relative rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center cursor-pointer hover:opacity-90 transition"
        @click="coverInput?.click()"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p class="text-sm mt-2">Upload cover (max 5MB)</p>
        </div>

        <!-- Overlay actions -->
        <div
          v-if="preview.cover"
          class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition"
        >
          <button
            @click.stop="coverInput?.click()"
            class="bg-white text-gray-700 px-3 py-1 rounded-md text-sm font-medium"
          >
            Change
          </button>
          <button
            @click.stop="removeCover"
            class="ml-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium"
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
      <div class="relative w-24 h-24 -mt-12 ml-4">
        <div
          class="w-full h-full rounded-lg border-2 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
          @click="logoInput?.click()"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>

        <!-- Overlay actions -->
        <div
          v-if="preview.logo"
          class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition"
        >
          <button
            @click.stop="logoInput?.click()"
            class="bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium"
          >
            Change
          </button>
          <button
            @click.stop="removeLogo"
            class="ml-1 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium"
          >
            Remove
          </button>
        </div>

        <input
          ref="logoInput"
          type="file"
          class="hidden"
          accept="image/*"
          @change="onLogoUpload"
        />
      </div>
    </div>

    <!-- Basic Info -->
    <div class="bg-white shadow-sm rounded-lg p-4 space-y-3">
      <h2 class="text-lg font-medium">Basic Info</h2>
      <input
        v-model="form.name"
        type="text"
        placeholder="Business Name"
        class="input"
      />
      <input
        v-model="form.legalName"
        type="text"
        placeholder="Legal Entity Name"
        class="input"
      />
      <input
        v-model="form.category"
        type="text"
        placeholder="Category"
        class="input"
      />
      <input
        v-model="form.cuisine"
        type="text"
        placeholder="Cuisine Type"
        class="input"
      />
      <textarea
        v-model="form.description"
        maxlength="500"
        placeholder="Description (max 500 chars)"
        rows="3"
        class="input"
      ></textarea>
    </div>

    <!-- Contact -->
    <div class="bg-white shadow-sm rounded-lg p-4 space-y-3">
      <h2 class="text-lg font-medium">Contact</h2>
      <input
        v-model="form.phone"
        type="tel"
        placeholder="Phone"
        class="input"
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="input"
      />
      <input
        v-model="form.website"
        type="url"
        placeholder="Website"
        class="input"
      />
    </div>

    <!-- Operating Hours -->
    <div class="bg-white shadow-sm rounded-lg p-4 space-y-3">
      <h2 class="text-lg font-medium">Operating Hours</h2>
      <div
        v-for="(day, i) in form.hours"
        :key="day.day"
        class="border rounded p-3 space-y-2"
      >
        <div class="flex items-center justify-between">
          <span class="font-medium">{{ day.day }}</span>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              v-model="day.closed"
            />
            Closed
          </label>
        </div>
        <div
          v-if="!day.closed"
          class="flex items-center gap-2"
        >
          <input
            v-model="day.from"
            type="time"
            class="input w-32"
          />
          <span>-</span>
          <input
            v-model="day.to"
            type="time"
            class="input w-32"
          />
        </div>
      </div>
    </div>

    <!-- Special Hours -->
    <div class="bg-white shadow-sm rounded-lg p-4 space-y-3">
      <h2 class="text-lg font-medium">Special Hours</h2>
      <div
        v-for="(s, i) in form.specialHours"
        :key="s.id"
        class="border rounded p-3 space-y-2"
      >
        <input
          type="date"
          v-model="s.date"
          class="input"
        />
        <div
          v-if="!s.closed"
          class="flex items-center gap-2"
        >
          <input
            v-model="s.from"
            type="time"
            class="input w-32"
          />
          <span>-</span>
          <input
            v-model="s.to"
            type="time"
            class="input w-32"
          />
        </div>
        <label class="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            v-model="s.closed"
          />
          Closed
        </label>
        <button
          @click="form.specialHours.splice(i, 1)"
          class="text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
      <button
        @click="addSpecialHour"
        class="text-blue-600 text-sm"
      >
        + Add Special Hour
      </button>
    </div>

    <!-- Locations -->
    <div class="bg-white shadow-sm rounded-lg p-4 space-y-3">
      <h2 class="text-lg font-medium">Locations</h2>
      <div
        v-for="(loc, i) in form.locations"
        :key="loc.id"
        class="border rounded p-3 space-y-2"
      >
        <input
          v-model="loc.address"
          placeholder="Address"
          class="input"
        />
        <label class="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            v-model="loc.isPrimary"
          />
          Primary
        </label>
        <button
          @click="removeLocation(i)"
          class="text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
      <button
        @click="addLocation"
        class="text-blue-600 text-sm"
      >
        + Add Location
      </button>
    </div>

    <!-- Parking & Payment -->
    <div class="bg-white shadow-sm rounded-lg p-4 space-y-3">
      <h2 class="text-lg font-medium">Parking & Payment</h2>
      <input
        v-model="form.parking"
        placeholder="Parking Info"
        class="input"
      />
      <div class="flex flex-col space-y-2">
        <label
          v-for="opt in paymentOptions"
          :key="opt.value"
          class="flex items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            v-model="form.payments"
            :value="opt.value"
          />
          {{ opt.label }}
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <button
        @click="saveDraft"
        class="w-full bg-gray-200 py-2 rounded"
      >
        Save Draft
      </button>
      <button
        @click="publish"
        class="w-full bg-blue-600 text-white py-2 rounded"
      >
        Publish
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import { reactive, ref } from 'vue'

interface DayHour {
  day: string
  from: string
  to: string
  closed: boolean
}
interface SpecialHour {
  id: string
  date: string
  from?: string
  to?: string
  closed: boolean
}
interface Location {
  id: string
  address: string
  isPrimary: boolean
}

const uid = () => Math.random().toString(36).slice(2, 9)

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const form = reactive({
  name: '',
  legalName: '',
  category: '',
  cuisine: '',
  description: '',
  phone: '',
  email: '',
  website: '',
  hours: days.map(d => ({ day: d, from: '09:00', to: '17:00', closed: false })),
  specialHours: [] as SpecialHour[],
  locations: [{ id: uid(), address: '', isPrimary: true }] as Location[],
  parking: '',
  payments: [] as string[],
  logo: '',
  cover: '',
})

const preview = reactive({ logo: '', cover: '' })

const paymentOptions = [
  { label: 'Cash', value: 'cash' },
  { label: 'Credit Card', value: 'card' },
  { label: 'Mobile Pay', value: 'mobile' },
  { label: 'Contactless', value: 'nfc' },
]

const logoInput = ref<HTMLInputElement | null>(null)
const coverInput = ref<HTMLInputElement | null>(null)

function validateSize(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    alert('Ảnh vượt quá 5MB!')
    return false
  }
  return true
}

function fileToBase64(file: File) {
  return new Promise<string>(resolve => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}

async function onLogoUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file && validateSize(file)) {
    const b64 = await fileToBase64(file)
    form.logo = b64
    preview.logo = b64
  }
}

async function onCoverUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file && validateSize(file)) {
    const b64 = await fileToBase64(file)
    form.cover = b64
    preview.cover = b64
  }
}

function removeLogo() {
  form.logo = ''
  preview.logo = ''
}

function removeCover() {
  form.cover = ''
  preview.cover = ''
}

function addSpecialHour() {
  form.specialHours.push({
    id: uid(),
    date: new Date().toISOString().slice(0, 10),
    from: '09:00',
    to: '17:00',
    closed: false,
  })
}
function addLocation() {
  form.locations.push({ id: uid(), address: '', isPrimary: false })
}
function removeLocation(i: number) {
  form.locations.splice(i, 1)
}

function saveDraft() {
  localStorage.setItem('biz_profile_draft', JSON.stringify(form))
  alert('Draft saved!')
}
function publish() {
  alert('Profile published!')
}
</script>

<style scoped>
.input {
  @apply border rounded px-3 py-2 w-full;
}
</style>
