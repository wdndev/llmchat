<template>
    <div class="h-[5%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="conversation">
        <h3 class="text-semiblod text-gray-900">{{ conversation?.title }}</h3>
        <span class="text-sm text-gray-500">{{ conversation?.updatedAt }}</span>
    </div>
    <div class="w-[80%] mx-auto h-[80%] overflow-auto pt-2">
        <MessageList :messages="filteredMessages" />
    </div>
    <div class="w-[80%] mx-auto h-[15%] flex items-center">
        <MessageInput></MessageInput>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import {MessageProps, ConversationProps} from '../types'
    import MessageInput from '../components/MessageInput.vue'
    import MessageList from '../components/MessageList.vue'
    // 测试数据
    import { messages, conversations } from '../testData'

    const route = useRoute()
    const filteredMessages = ref<MessageProps[]>([])
    const conversation = ref<ConversationProps>()
    let conversationId = parseInt(route.params.id as string)

    filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
    conversation.value = conversations.find(item => item.id === conversationId)
    watch(() => route.params.id, (newID: string) => {
        conversationId = parseInt(newID)
        filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
        conversation.value = conversations.find(item => item.id === conversationId)
    })
</script>