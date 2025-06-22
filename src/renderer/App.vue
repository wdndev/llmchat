<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

// import from '@/renderer'

</script>

<template>
  <div>
     Hello wdndev
  </div>
  <HelloWorld msg="Electron + Vite + Vue3 + Typescript + Electron-builder" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
