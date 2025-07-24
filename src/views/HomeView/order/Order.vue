<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-between w-full px-2 pt-2">
      <div class="w-20"></div>
      <h3 class="text-2xl font-semibold">Orders</h3>
      <CreateButton />
    </header>
    <section class="w-full h-full p-2 flex flex-col overflow-hidden">
      <InputSearch placeholder="Search Orders..." />
      <OrderList />
      <!-- <EmptyState 
        add_content="New Order"
        empty_content="Not Found Order"
      /> -->
    </section>

    <AskRetionButton />
  </article>
</template>

<script setup lang="ts">
import AskRetionButton from '@/components/common/AskRetionButton.vue';
import CreateButton from '@/components/common/CreateButton.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import InputSearch from '@/components/common/InputSearch.vue';
import OrderList from '@/views/HomeView/order/OrderList.vue';
</script>
