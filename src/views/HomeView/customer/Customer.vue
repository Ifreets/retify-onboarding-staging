<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-between w-full px-2">
      <div class="w-20"></div>
      <h3 class="text-2xl font-semibold">Customers</h3>
      <CreateButton />
    </header>
    <section class="w-full h-full p-2 flex flex-col overflow-hidden">
      <InputSearch placeholder="Search customers..." />
      <CustomerList />
      <!-- <EmptyState 
        add_content="New Customer"
        empty_content="Not Found Customer"
      /> -->
    </section>

    <AskRetionButton />
  </article>
</template>
  
<script setup lang='ts'>
import AskRetionButton from '@/components/common/AskRetionButton.vue';
import CreateButton from '@/components/common/CreateButton.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import InputSearch from '@/components/common/InputSearch.vue';
import CustomerList from '@/views/HomeView/customer/CustomerList.vue';
  
</script>