<template>
    <div class="conversation-list">
        <div 
            class="item border-gray-300 border-t cursor-pointer p-2"
            :class="{
                'bg-gray-100 hover:bg-gray-300': conversationStore.selectId === item.id,
                'bg-white hover:bg-gray-200': conversationStore.selectId !== item.id
            }"
            v-for="item in items"
            :key="item.id"
        >
            <a @click.prevent="goToConversation(item.id)">
                <div class=" flex justify-between items-center text-sm leading-5 text-gray-500 ">
                    <span>{{ item.selectedModel }}</span>
                    <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
                </div>
            </a>
            <h2 class=" font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs';
    import { ConversationProps } from '../types'
    import { useRouter, RouterLink} from 'vue-router'
    import { useConversationStore} from '../stores/conversation'
    defineProps<{
        items: ConversationProps[]
    }>()
    const router = useRouter()
    const conversationStore = useConversationStore()
    const goToConversation = (id: number) => {
        router.push({
            path: `/conversation/${id}`,
            query: { name: 'wdn' },
            hash: '#foo',
        })
        conversationStore.selectId = id
    }
    // console.log(items)
</script>
