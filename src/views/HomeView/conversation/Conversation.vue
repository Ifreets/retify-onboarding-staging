<template>
  <article class="h-full flex flex-col items-center justify-center relative">
    <header class="flex justify-between w-full px-2">
      <div class="w-20"></div>
      <h3 class="text-2xl font-semibold">Converstions</h3>
      <CreateButton />
    </header>
    <section class="w-full h-full py-2 flex flex-col overflow-hidden">
      <InputSearch placeholder="Search Conversations..." />
      <ConversationList />
      <!-- <EmptyState
        add_content="Connect Channels"
        empty_content="Not Found Conversations"
      /> -->
    </section>

    <AskRetionButton />
  </article>
</template>
  
<script setup lang='ts'>
import CreateButton from '@/components/common/CreateButton.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import InputSearch from '@/components/common/InputSearch.vue';
import ConversationList from '@/views/HomeView/conversation/ConversationList.vue';

  
</script>