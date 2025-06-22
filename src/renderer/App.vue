<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-gray-300 space-y-4"
  >
    <div class="text-3xl font-bold bg-sky-300">Hello wdndev</div>
    <HelloWorld
      msg="Electron + Vite + Vue3 + Typescript + Tailwind + Electron-builder"
    />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>
