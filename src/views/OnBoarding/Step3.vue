<template>
  <section>
    <header>3</header>
    <div>abc</div>
    <footer class="flex justify-between">
      <button @click="back">Back</button>
      <button @click="next">Next</button>
    </footer>
  </section>
</template>
<script setup lang="ts">
const $emit = defineEmits(['next', 'back'])

/** tiến trước */
function next() {
  $emit('next')
}

/** quay lại */
function back() {
  $emit('back')
}
</script>
