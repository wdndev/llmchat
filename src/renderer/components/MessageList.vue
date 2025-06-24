<!-- <template>
    <div class="message-list" ref="_ref"> 
        <div class="message-item mb-3" v-for="message in messages" :key="message.id">
            <div class="flex" :class="{'justify-end': message.type === 'question'}">
                <div>
                    
                    <div v-if="message.type === 'question'" class="flex">
                        <div class="right-1">
                            <Icon icon="stash:person" class=" right-1"/>
                        </div>
                        <div>
                            <div class="text-sm text-gray-500 mb-1 text-right">
                                {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
                            </div>
                            <div class="message-question bg-lime-300 text-black p-2 rounded-md" >
                                <img 
                                    v-if="message.imagePath" 
                                    :src="getImageUrl(message.imagePath)" 
                                    alt="Message image" 
                                    class="h-24 w-24 object-cover rounded block"
                                    @click="showImagePreview(message.imagePath)"
                                >
                                {{ message.content }}
                            </div>
                        </div>
                        
                    </div>
                    <div v-if="message.type !== 'question'" class="flex">
                        <Icon icon="mage:robot"  width="30" height="30"/>
                        <div>
                            <div class="text-sm text-gray-500 mb-1">
                                {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
                            </div>
                            <div class="message-answer bg-gray-100 text-black p-2 rounded-md" 
                                :class="{'bg-red-100 text-red-700': message.status === 'error', 'bg-gray-200 text-gray-700': message.status !== 'error'}"
                            >
                                <template v-if="message.status === 'loading'">
                                    <Icon icon="eos-icons:three-dots-loading"></Icon>
                                </template>
                                <template v-else-if="message.status === 'error'"> 
                                    <span>{{ message.content }}</span>
                                </template>
                                <div v-else class="prose prose-slate prose-headings:my-1 prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-pre:p-0 prose-hr:hidden  prose-hr:my-1">
                                    <MarkdownArea :markdown="message.content" />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        <div 
            v-if="previewImagePath" 
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            @click="previewImagePath = ''"
        >
            <div class="relative max-w-4xl w-full mx-4">
                <button 
                    class="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
                    @click.stop="previewImagePath = ''"
                >
                    <Icon icon="eva:close-fill" />
                </button>
                <img 
                    :src="getImageUrl(previewImagePath)" 
                    alt="Preview image" 
                    class="max-h-[80vh] w-auto mx-auto rounded-lg shadow-2xl"
                >
            </div>
        </div>
    </div>
</template> -->

<template>
  <div class="message-list" ref="_ref">
    <div class="message-item mb-3" v-for="message in messages" :key="message.id">
      <div
        class="flex items-start"
        :class="message.type === 'question' ? 'flex-row-reverse' : 'flex-row'"
      >
        <!-- 头像（左或右） -->
        <div class="w-8 h-8 mt-5" :class="message.type === 'question' ? 'ml-2' : 'mr-2'">
          <Icon
            :icon="message.type === 'question' ? 'stash:person' : 'mage:robot'"
            width="40"
            height="40"
            style="color: #000"
          />
        </div>

        <!-- 内容部分 -->
        <div>
          <div
            class="text-xs text-gray-500 mb-1"
            :class="message.type === 'question' ? 'text-right' : 'text-left'"
          >
            {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
          </div>

          <!-- 问题 -->
          <div
            v-if="message.type === 'question'"
            class="message-question bg-lime-300 text-black p-2 rounded-md"
          >
            <img
              v-if="message.imagePath"
              :src="getImageUrl(message.imagePath)"
              alt="Message image"
              class="h-24 w-24 object-cover rounded block mb-2"
              @click="showImagePreview(message.imagePath)"
            />
            {{ message.content }}
          </div>

          <!-- 回答 -->
          <div
            v-else
            class="message-answer bg-gray-100 text-black p-2 rounded-md"
            :class="{
              'bg-red-100 text-red-700': message.status === 'error',
              'bg-gray-200 text-gray-700': message.status !== 'error'
            }"
          >
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading" />
            </template>
            <template v-else-if="message.status === 'error'">
              <span>{{ message.content }}</span>
            </template>
            <div
              v-else
              class="prose prose-slate prose-headings:my-1 prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-pre:p-0 prose-hr:hidden prose-hr:my-1"
            >
              <MarkdownArea :markdown="message.content" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- image preview -->
    <div
      v-if="previewImagePath"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      @click="previewImagePath = ''"
    >
      <div class="relative max-w-4xl w-full mx-4">
        <button
          class="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
          @click.stop="previewImagePath = ''"
        >
          <Icon icon="eva:close-fill" />
        </button>
        <img
          :src="getImageUrl(previewImagePath)"
          alt="Preview image"
          class="max-h-[80vh] w-auto mx-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
    import { ref } from 'vue';
    import dayjs from 'dayjs';
    import {Icon} from '@iconify/vue'
    
    import {type MessageProps} from '@/renderer/types/chat.types'
    // @ts-ignore 忽略模块类型检查
    import MarkdownArea from '@/renderer/components/MarkdownArea.vue'

    defineProps<{
        messages: MessageProps[]
    }>()

    // 暴漏 ref
    const _ref = ref<HTMLDivElement>()
    defineExpose({ref: _ref} )

    // 图片预览相关
    const previewImagePath = ref('');

    const getImageUrl = (imagePath: string) => {
        // 将反斜杠替换为正斜杠
        const normalizedPath = imagePath.replace(/\\/g, '/');
        // 构建并返回安全的URL
        return `safe-file://${encodeURIComponent(normalizedPath)}`;
        // return `file://${imagePath}`
    }

    const showImagePreview = (imagePath: string) => {
        previewImagePath.value = imagePath;
    }

</script>
