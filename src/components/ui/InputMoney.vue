<template>
  <Cleave
    v-model="value"
    @change="updateValue"
    :options="getOptions()"
  />
</template>
<script setup lang="ts">
import { nextTick } from 'vue'
import Cleave from 'vue-cleave-component'
// * kiểu dữ liệu các prop của component này sẽ được truyền từ component cha
type Props = {
  /** giá trị tối đa */
  min?: number
  /** giá trị tối thiểu */
  max?: number
  /** hàm cập nhật giá trị */
  onChange?: Function
}

/** props */
const props = defineProps<Props>()

/** giá trị của input */
const value = defineModel({
  default: 0,
})

/** hàm lấy options của cleave theo tiền tệ */
function getOptions() {
  // nếu là tiền tệ khác
  return {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: '',
    noImmediatePrefix: true,
    rawValueTrimPrefix: true,
    numeralDecimalMark: '.',
    delimiter: ',',
    numeralIntegerScale: 15,
    numeralDecimalScale: 2,
  }
}

/** hàm cập nhật giá trị của input nếu input ra khỏi ngoài khoảng thiết lập */
function updateValue() {
  /** format lại về number */
  const NUM = Number(value.value)

  // * nếu không phải là số thì trả về 0
  if (isNaN(NUM)) {
    value.value = props.min ?? 0
    return
  }

  // * nếu nhỏ hơn giá trị tối thiểu thì trả về giá trị tối thiểu
  if (props.min !== undefined && NUM < props.min) value.value = props.min

  // * nếu lớn hơn giá trị tối đa thì trả về giá trị tối đa
  if (props.max !== undefined && NUM > props.max) value.value = props.max

  nextTick(() => {
    props.onChange && props.onChange(value.value.toString())
  })
}
</script>
