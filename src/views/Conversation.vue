<template>
    <div class="w-[80%] mx-auto h-[85%] overflow-auto pt-2">
        <MessageList :messages="messages" />
    </div>
    <div class="w-[80%] mx-auto h-[15%] flex items-center">
        <MessageInput></MessageInput>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { MessageProps} from '../types'
    import MessageInput from '../components/MessageInput.vue'
    import MessageList from '../components/MessageList.vue'

    const messages: MessageProps[] = [
        {id: 1,content: 'hello', type: 'question', conversationId: 1, status: 'streaming', createAt: '2023-01-01', updateAt: '2023-01-01' },
        {id: 2,content: '111111111', type: 'answer', conversationId: 1, status: 'streaming', createAt: '2023-01-01', updateAt: '2023-01-01' },
        {id: 3,content: '22222222222', type: 'question', conversationId: 1, status: 'streaming', createAt: '2023-01-01', updateAt: '2023-01-01' },
        {id: 4,content: '33333333333', type: 'answer', conversationId: 1, status: 'streaming', createAt: '2023-01-01', updateAt: '2023-01-01' },
        {id: 5,content: '4444444444', type: 'question', conversationId: 1, status: 'streaming', createAt: '2023-01-01', updateAt: '2023-01-01' },
        {id: 6,content: '', type: 'answer', conversationId: 1, status: 'loading', createAt: '2023-01-01', updateAt: '2023-01-01' }
    ]
</script>