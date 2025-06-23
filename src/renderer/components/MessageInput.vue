<template>
  <div class="message-input w-full shadow-sm border rounded-lg border-gray-300 py-1 px-2 focus-within:border-green-700">
    <div v-if="imageDataUrl"  class="mb-2 relative flex items-center group">
      <img :src="imageDataUrl" alt="Preview" class="h-20 w-20 object-cover rounded">
      <button 
        class="absolute top-0 left-16 bg-red-500/80 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        @click="cancelImage"
      >
        x
      </button>
    </div>
    <div class="flex items-center">
      <input type="file"  accept="image/*" ref="fileInput" class="hidden" @change="handleImageUpload">
      <Icon 
        icon="radix-icons:image" 
        width="24" 
        height="24" 
        :class="[
          'mr-2',
          disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600'
        ]"
        @click="triggerFileInput"
      />
      <input class="outline-none border-0 flex-1 bg-white focus:ring-0" type="text" v-model="model" :disabled="disabled" @keyup.enter="onCreate">
      <Button icon-name="radix-icons:paper-plane" @click="onCreate" :disabled="disabled">
        Send
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import {Icon} from '@iconify/vue'

    import Button from '@/renderer/components/Button.vue'

    const props = defineProps<{
        disabled?: boolean;
    }>()
    const emit = defineEmits<{
        create: [value: string, imageDataUrl?: string]
    }>()
    const model = defineModel<string>()

    const fileInput = ref<HTMLInputElement | null>(null)
    // const imagePreview = ref('')
    const imageDataUrl = ref('') // 新增一个ref来存储DataURL

    const triggerFileInput = () => {
        if (!props.disabled) {
            fileInput.value?.click()
        }
    }

    const handleImageUpload = (event: Event) => {
        const target = event.target as HTMLInputElement
        if (target.files && target.files.length > 0) {
            const file = target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                const dataUrl = e.target?.result as string
                // imagePreview.value = dataUrl
                imageDataUrl.value = dataUrl // 存储DataURL
            }
            reader.readAsDataURL(file)
        }
    }

    const onCreate = () => {
        if(model.value && model.value.trim() !== '') {
            emit('create', model.value, imageDataUrl.value || undefined)
            imageDataUrl.value = '' // 重置
            // imagePreview.value = ''
        } 
    }

    const cancelImage = () => {
        imageDataUrl.value = ''
        // 重置文件输入框
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    }
</script>