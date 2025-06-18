<template>
    <div class="h-[5%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="conversation">
        <h3 class="text-semiblod text-gray-900">{{ conversation?.title }}</h3>
        <span class="text-sm text-gray-500">{{ dayjs(conversation?.updatedAt).format('YYYY-MM-DD') }}</span>
    </div>
    <div class="w-[80%] mx-auto h-[80%] overflow-auto pt-2">
        <MessageList :messages="filteredMessages" />
    </div>
    <div class="w-[80%] mx-auto h-[15%] flex items-center">
        <MessageInput></MessageInput>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';
    import { ref, watch, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import {MessageProps, ConversationProps} from '../types'
    import MessageInput from '../components/MessageInput.vue'
    import MessageList from '../components/MessageList.vue'
    import { db } from '../db'
    // 测试数据
    // import { messages, conversations } from '../testData'

    const route = useRoute()
    const filteredMessages = ref<MessageProps[]>([])
    const conversation = ref<ConversationProps>()
    let conversationId = parseInt(route.params.id as string)
    const initMessageId = parseInt(route.query.init as string)

    const creatingInitialMessage = async () => {
        const createdData: Omit<MessageProps, 'id'> = {
            content: '',
            type: 'answer',
            conversationId,
            status: 'loading',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        const newMessageId = await db.messages.add(createdData)
        filteredMessages.value.push({
            ...createdData,
            id: newMessageId
        })
    }

    // filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
    // conversation.value = conversations.find(item => item.id === conversationId)
    
    watch(() => route.params.id, async (newID: string) => {
        conversationId = parseInt(newID)
        filteredMessages.value = await db.messages.where({conversationId}).toArray()
        conversation.value = await db.conversations.where({id: conversationId}).first()
    })

    onMounted(async () => { 
        conversation.value = await db.conversations.where({id: conversationId}).first()
        filteredMessages.value = await db.messages.where({conversationId}).toArray()
        if (initMessageId) {
            await creatingInitialMessage()
        }
    })

</script>