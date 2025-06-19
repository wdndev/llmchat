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
    import { ref, watch, onMounted, computed} from 'vue'
    import { useRoute } from 'vue-router'
    import {MessageProps, ConversationProps, MessageStatus} from '../types'
    import MessageInput from '../components/MessageInput.vue'
    import MessageList from '../components/MessageList.vue'
    import { useConversationStore } from '../stores/conversation';
    import { db } from '../db'
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
    // 测试数据
    // import { messages, conversations } from '../testData'

    const route = useRoute()
    const conversationStore = useConversationStore()
    const filteredMessages = ref<MessageProps[]>([])
    // const conversation = ref<ConversationProps>()
    let conversationId = ref(parseInt(route.params.id as string))
    const initMessageId = parseInt(route.query.init as string)
    const conversation = computed(() => {
        return conversationStore.getConversationById(conversationId.value)
    })
    let lastQuestion = ''

    const creatingInitialMessage = async () => {
        const createdData: Omit<MessageProps, 'id'> = {
            content: '',
            type: 'answer',
            conversationId: conversationId.value,
            status: 'loading',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        const newMessageId = await db.messages.add(createdData)
        filteredMessages.value.push({
            ...createdData,
            id: newMessageId
        })
        if (conversation.value) {
            const provider = await db.providers.where({id: conversation.value.providerId}).first()
            if (provider) {
                await window.electronAPI.startChat({
                    messageId: newMessageId,
                    providerName: provider.name,
                    selectedModel: conversation.value.selectedModel,
                    content: lastQuestion
                })
            }
        }
    }

    // filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
    // conversation.value = conversations.find(item => item.id === conversationId)
    
    watch(() => route.params.id, async (newID: string) => {
        conversationId.value = parseInt(newID)
        filteredMessages.value = await db.messages.where({conversationId: conversationId.value}).toArray()
        // conversation.value = await db.conversations.where({id: conversationId}).first()
    })

    onMounted(async () => { 
        // conversation.value = await db.conversations.where({id: conversationId}).first()
        filteredMessages.value = await db.messages.where({conversationId: conversationId.value}).toArray()
        if (initMessageId) {
            const lastMessage = await db.messages.where({conversationId: conversationId.value}).last()
            lastQuestion = lastMessage?.content || ''
            await creatingInitialMessage()
        }
        window.electronAPI.onUpdateMessage(async (streamData) => {
            console.log('streamData', streamData)
            // 更新数据库 + 更新页面
            const {messageId, data} = streamData
            const currentMessage = await db.messages.where({id: messageId}).first()
            if (currentMessage) {
                const updatedData= {
                    content: currentMessage.content + data.result,
                    status: data.is_end ? 'finished' : 'streaming' as MessageStatus,
                    updatedAt: new Date().toISOString(),
                }
                // 数据库更新
                await db.messages.update(messageId, updatedData)
                // 页面更新
                const index = filteredMessages.value.findIndex(item => item.id === messageId)
                if (index !== -1) {
                    filteredMessages.value[index] = {...filteredMessages.value[index], ...updatedData}
                }

            }
        })
    })

</script>