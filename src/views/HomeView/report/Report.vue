<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-center w-full px-2 text-2xl font-semibold">
      Analytics Dashboard
    </header>
    <main class="w-full h-full flex flex-col overflow-auto py-3">
      <div class="px-2 flex flex-col gap-5">
        <section class="border border-slate-200 rounded-lg p-3 flex flex-col gap-3">
          <p class="text-base font-semibold">Action Items</p>
          <div class="bg-slate-200 h-px"></div>
          <div
            class="flex gap-3 text-red-500 font-semibold border bg-red-50 p-3 border-red-500 rounded-lg"
          >
            <ExclamationCircleIcon class="size-6 flex-shrink-0" />
            <p class="flex-grow overflow-hidden">2 New Negative Feedbacks!</p>
            <button class="py-1 px-2 rounded bg-red-500 text-white flex-shrink-0 h-fit">
              Review
            </button>
          </div>
          <div
            class="flex gap-3 text-red-500 font-semibold border bg-red-50 p-3 border-red-500 rounded-lg"
          >
            <ExclamationCircleIcon class="size-6 flex-shrink-0" />
            <p class="flex-grow overflow-hidden">3 New Orders Need Confirmation</p>
            <button class="py-1 px-2 rounded bg-red-500 text-white flex-shrink-0 h-fit">
              Confirm
            </button>
          </div>
          <div
            class="flex gap-3 text-blue-700 font-semibold border bg-blue-50 p-3 border-blue-700 rounded-lg"
          >
            <LightBulbIcon class="size-6 flex-shrink-0" />
            <p class="flex-grow overflow-hidden">3 New Orders Need Confirmation</p>
            <button class="py-1 px-2 rounded bg-blue-700 text-white flex-shrink-0 h-fit">
              Confirm
            </button>
          </div>
        </section>

        <section class="flex flex-col gap-2 items-center w-full px-3">
          <div class="min-h-96 w-full overflow-auto">
            <div class="h-full" :style="{ width: `${LINE_DATA.labels.length * 80}px` }">
              <Line :data="LINE_DATA" :options="LINE_OPTIONS" />
            </div>
          </div>
          <p class="text-slate-700">Rate of increase and decrease of emotions over time</p>
        </section>

        <section class="flex flex-col gap-2 items-center w-full px-3">
          <div class="min-h-96 overflow-auto w-full">
            <div class="h-full" :style="{ width: `${BAR_DATA.labels.length * 50}px` }">
              <Bar :data="BAR_DATA" :options="BAR_OPTIONS" :plugins="[ChartDataLabels]" />
            </div>
          </div>
          <p class="text-slate-700">Emotion chart</p>
          <div class="rounded-xl border border-slate-200 overflow-hidden w-full">
            <table class="w-full">
              <thead>
                <tr class="bg-slate-100">
                  <th
                    class="font-semibold border-b border-slate-200 p-2 w-1/2 text-start bg-slate-200"
                  >
                    Emotion
                  </th>
                  <th class="font-semibold border-b border-slate-200 p-2 w-1/4 text-end">Num</th>
                  <th class="font-semibold border-b border-slate-200 p-2 w-1/4 text-end">Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr class="font-medium">
                  <td class="border-b border-slate-200 bg-slate-50">
                    <div class="flex items-center justify-between p-2 text-blue-700">
                      😀 Happy
                      <ExternalLinkIcon class="size-4 flex-shrink-0" />
                    </div>
                  </td>
                  <td class="border-b border-slate-200 p-2 text-end">163</td>
                  <td class="border-b border-slate-200 p-2 text-end">26.9%</td>
                </tr>
                <tr class="font-medium">
                  <td class="border-b border-slate-200 bg-slate-50">
                    <div class="flex items-center justify-between p-2">
                      😡 Angry
                      <ExternalLinkIcon class="size-4 flex-shrink-0" />
                    </div>
                  </td>
                  <td class="border-b border-slate-200 p-2 text-end">1.592</td>
                  <td class="border-b border-slate-200 p-2 text-end">26.9%</td>
                </tr>
                <tr class="font-medium">
                  <td class="border-b border-slate-200 bg-slate-50">
                    <div class="flex items-center justify-between p-2">
                      😢 Sad
                      <ExternalLinkIcon class="size-4 flex-shrink-0" />
                    </div>
                  </td>
                  <td class="border-b border-slate-200 p-2 text-end">291</td>
                  <td class="border-b border-slate-200 p-2 text-end">26.9%</td>
                </tr>
                <tr class="font-semibold bg-slate-100">
                  <td class="border-slate-200 p-2 text-center bg-slate-200">Total</td>
                  <td class="border-slate-200 p-2 text-end">1.893</td>
                  <td class="border-slate-200 p-2 text-end">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div class="mx-10">
          <Pie :data="PIE_CHART" :options="PIE_OPTIONS" />
        </div>

        <ul class="flex flex-col gap-5 mx-3">
          <li class="flex gap-3 py-2 px-3 bg-slate-100 rounded-lg items-center">
            <div class="bg-slate-200 rounded-lg p-2">
              <ChatBubbleLeftRightIcon class="size-5 flex-shrink-0 text-slate-700" />
            </div>
            <div class="flex flex-col flex-grow">
              <p class="font-medium">Total Messages</p>
              <p class="text-base font-semibold">10.927</p>
            </div>
          </li>
          <li class="flex gap-3 py-2 px-3 bg-slate-100 rounded-lg items-center">
            <div class="bg-slate-200 rounded-lg p-2">
              <FaceFrownIcon class="size-5 flex-shrink-0 text-red-500" />
            </div>
            <div class="flex flex-col flex-grow">
              <div class="font-medium flex gap-2">
                <p class="flex-grow truncate">Number of negative messages</p>
                <ExternalLinkIcon class="size-4 flex-shrink-0 text-blue-700" />
              </div>
              <p class="text-base font-semibold text-red-500">16.482</p>
            </div>
          </li>
          <li class="flex gap-3 py-2 px-3 bg-slate-100 rounded-lg items-center">
            <div class="bg-slate-200 rounded-lg p-2">
              <FaceSmileIcon class="size-5 flex-shrink-0 text-blue-700" />
            </div>
            <div class="flex flex-col flex-grow">
              <div class="font-medium flex gap-2">
                <p class="flex-grow truncate">Number of active messages</p>
                <ExternalLinkIcon class="size-4 flex-shrink-0 text-slate-500" />
              </div>
              <p class="text-base font-semibold text-blue-700">16.482</p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </article>
</template>

<script setup lang="ts">
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  layouts,
  Legend,
  LinearScale,
  LineElement,
  plugins,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Bar, Line, Pie } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon.vue'
import LightBulbIcon from '@/components/icons/LightBulbIcon.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { ChatBubbleLeftRightIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/vue/24/solid'

// import các plugin của chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  ChartDataLabels,
)

/** thiết lập của biểu đồ đường */
const LINE_OPTIONS: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    colors: {
      forceOverride: true,
    },
    datalabels: { display: false },
  },
  scales: {
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: true,
        drawTicks: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        align: 'center',
        labelOffset: 0,
      },
      offset: true,
    },
  },
}
/** dữ liệu của biểu đồ line */
const LINE_DATA = {
  labels: [
    '2024-07-19',
    '2024-07-20',
    '2024-07-21',
    '2024-07-22',
    '2024-07-23',
    '2024-07-24',
    '2024-07-25',
  ],
  datasets: [
    {
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      borderColor: '#00b8db',
      data: [15, 9, 10, 92, 9, 26, 15],
    },
  ],
}

/** thiết lập của biểu đồ cột */
const BAR_OPTIONS: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    datalabels: { display: true, anchor: 'end', clamp: true, align: 'top', color: '#2b7fff' },
  },
  scales: {
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: true,
        drawTicks: false,
      },
      suggestedMax: 45
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        align: 'center',
        labelOffset: 0,
        maxRotation: 0,
        minRotation: 0,
        callback: function (value, index, values) {
          const label = this.getLabelForValue(value as number)
          return label.split(' ')
        },
      },
      offset: true,
    },
  },
}
/** dữ liệu của biểu đồ cột */
const BAR_DATA = {
  labels: [
    'Vui vẻ',
    'Giận dữ',
    'Buồn bã',
    'Sợ hãi',
    'Ngạc nhiên',
    'Ghê tởm',
    'Yêu thương',
    'Ghen tỵ',
    'Xấu hổ',
    'Tự hào',
    'Không rõ',
  ],
  datasets: [
    {
      backgroundColor: '#2b7fff',
      data: [40, 20, 10, 5, 5, 3, 10, 2, 3, 2, 0],
    },
  ],
}

/** thiết lập của biểu đồ tròn */
const PIE_OPTIONS: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    datalabels: { display: false },
  },
}
/** dữ liệu của biểu đồ tròn */
const PIE_CHART = {
  labels: [
    'Vui vẻ',
    'Giận dữ',
    'Buồn bã',
    'Sợ hãi',
    'Ngạc nhiên',
    'Ghê tởm',
    'Yêu thương',
    'Ghen tỵ',
    'Xấu hổ',
    'Tự hào',
    'Không rõ',
  ],
  datasets: [
    {
      backgroundColor: [
        '#ffdf20',
        '#fb2c36',
        '#733e0a',
        '#7008e7',
        '#bbf451',
        '#00b8db',
        '#f87979',
        '#ffe2e2',
        '#008236',
        '#cccccc',
      ],
      data: [40, 20, 10, 5, 5, 3, 10, 2, 3, 2, 0],
    },
  ],
}
</script>
