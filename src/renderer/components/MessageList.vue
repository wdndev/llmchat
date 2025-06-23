<template>
    <div class="message-list" ref="_ref"> 
        <div class="message-item mb-3" v-for="message in messages" :key="message.id">
            <div class="flex" :class="{'justify-end': message.type === 'question'}">
                <div>
                    <div class="text-sm text-gray-500 mb-1" :class="{'text-right': message.type === 'question'}">
                        {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
                    </div>
                    <div class="message-question bg-green-700 text-white p-2 rounded-md" v-if="message.type === 'question'">
                        <img 
                            v-if="message.imagePath" 
                            :src="getImageUrl(message.imagePath)" 
                            alt="Message image" 
                            class="h-24 w-24 object-cover rounded block"
                            @click="showImagePreview(message.imagePath)"
                        >
                        {{ message.content }}
                    </div>
                    <div class="message-answer bg-gray-200 text-gray-700 p-2 rounded-md" 
                        v-else
                        :class="{'bg-red-100 text-red-700': message.status === 'error', 'bg-gray-200 text-gray-700': message.status !== 'error'}"
                    >
                        <template v-if="message.status === 'loading'">
                            <Icon icon="eos-icons:three-dots-loading"></Icon>
                        </template>
                        <template v-else-if="message.status === 'error'"> 
                            <span>{{ message.content }}</span>
                        </template>
                        <div v-else class="prose prose-slate prose-headings:my-1 prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-pre:p-0 prose-hr:hidden  prose-hr:my-1">
                            <vue-markdown :source="message.content" :plugins="plugins"/>
                            <!-- {{ message.content }} -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 图片预览模态框 -->
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
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import dayjs from 'dayjs';
    import {Icon} from '@iconify/vue'
    import VueMarkdown from 'vue-markdown-render';
    import markdownItHighlight from 'markdown-it-highlightjs';
    
    import {type MessageProps} from '@/renderer/types/chat.types'
    

    defineProps<{
        messages: MessageProps[]
    }>()

    const plugins = [markdownItHighlight]
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
