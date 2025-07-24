<template>
  <section class="overflow-auto px-2">
    <ul 
      class="flex flex-col gap-2.5 pb-5 cursor-pointer"
    >
      <ConversationItem v-for="item in 15" :index="item"/>
    </ul>
  </section>
</template>

<script setup lang="ts">
import ConversationItem from '@/views/HomeView/conversation/ConversationItem.vue';

</script>
