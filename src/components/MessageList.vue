<template>
    <div class="message-list" ref="_ref"> 
        <div class="message-item mb-3" v-for="message in messages" :key="message.id">
            <div class="flex" :class="{'justify-end': message.type === 'question'}">
                <div>
                    <div class="text-sm text-gray-500 mb-1" :class="{'text-right': message.type === 'question'}">
                        {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
                    </div>
                    <div class="message-question bg-green-700 text-white p-2 rounded-md" v-if="message.type === 'question'">
                        {{ message.content }}
                    </div>
                    <div class="message-answer bg-gray-200 text-gray-700 p-2 rounded-md" v-else>
                        <template v-if="message.status === 'loading'">
                            <Icon icon="eos-icons:three-dots-loading"></Icon>
                        </template>
                        <div v-else class="prose prose-slate prose-headings:my-1 prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-pre:p-0 prose-hr:hidden  prose-hr:my-1">
                            <vue-markdown :source="message.content" :plugins="plugins"/>
                            <!-- {{ message.content }} -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import dayjs from 'dayjs';
    import VueMarkdown from 'vue-markdown-render';
    
    import hljs from 'highlight.js';
    import markdownItHighlight from 'markdown-it-highlightjs';
    import {MessageProps} from '../types'
    import {Icon} from '@iconify/vue'

    defineProps<{
        messages: MessageProps[]
    }>()
    const plugins = [markdownItHighlight]
    // 暴漏 ref
    const _ref = ref<HTMLDivElement>()
    defineExpose({ref: _ref} )

</script>
