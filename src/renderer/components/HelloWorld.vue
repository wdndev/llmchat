<template>
  <h3 class="text-2xl font-blod">{{ msg }}</h3>

  <div class="card">
    <div class="flex flex-row grid-cols-2 gap-8">
      <Button icon-name="radix-icons:paper-plane" @click="count++"
        >Button</Button
      >
      <div class="text-2xl font-bold">
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>
