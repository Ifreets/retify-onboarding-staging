<template>
  <ul class="px-2 flex flex-col gap-5 animate-pulse">
    <li
      class="flex gap-3"
      v-for="i in 3"
    >
      <div
        class="w-21 h-21 object-contain bg-slate-200 rounded-xl flex-shrink-0"
      ></div>
      <div class="flex gap-2 flex-col py-2 w-full">
        <div class="h-5 rounded-full bg-slate-200 w-24"></div>
        <div class="h-4 rounded-full bg-slate-200 w-full"></div>
        <div class="h-3 rounded-full bg-slate-200 w-44"></div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts"></script>
