<template>
    <div class="h-[5%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="conversation">
        <h3 class="text-semiblod text-gray-900">{{ conversation?.title }}</h3>
        <span class="text-sm text-gray-500">{{ dayjs(conversation?.updatedAt).format('YYYY-MM-DD') }}</span>
    </div>
    <div class="w-[85%] mx-auto h-[80%] overflow-auto pt-2">
        <MessageList :messages="filteredMessages" ref="messageListRef"/>
    </div>
    <div class="w-[85%] mx-auto h-[15%] flex items-center">
        <MessageInput @create="sendNewMessage" v-model="inputValue" :disabled="messageStore.isMessageLoading"></MessageInput>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';
    import { ref, watch, onMounted, computed, nextTick} from 'vue'
    import { useRoute } from 'vue-router'
    import {MessageProps, MessageListIntance} from '../types'
    import MessageInput from '../components/MessageInput.vue'
    import MessageList from '../components/MessageList.vue'
    import { useConversationStore } from '../stores/conversation';
    import { useProviderStore} from  '../stores/provider'
    import { useMessageStore } from '../stores/message';
    import { db } from '../db'


    // 测试数据
    // import { messages, conversations } from '../testData'

    const inputValue = ref('')
    const messageListRef = ref<MessageListIntance>()
    const route = useRoute()
    const conversationStore = useConversationStore()
    const messageStore = useMessageStore()
    const providerStore = useProviderStore()
    // const filteredMessages = ref<MessageProps[]>([])

    // const conversation = ref<ConversationProps>()
    let conversationId = ref(parseInt(route.params.id as string))
    const initMessageId = parseInt(route.query.init as string)
    const conversation = computed(() => {
        return conversationStore.getConversationById(conversationId.value)
    })
    const filteredMessages = computed(() => {
        return messageStore.items
    })
    const sendedMessages = computed(() => filteredMessages.value
        .filter(message => message.status !== 'loading')
        .map(message => {
            return {
                role: message.type === 'question' ? 'user' : 'assistant',
                content: message.content,
            }
        })
    )
    const sendNewMessage = async (question: string) => { 
        if (question) {
            const date = new Date().toISOString()
            await messageStore.createMessage({
                content: question,
                conversationId: conversationId.value,
                createdAt: date,
                updatedAt: date,
                type: 'question'
            })
            inputValue.value = ''
            creatingInitialMessage()
        }
    }
    const lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value))

    const messageScrollToBottom = async () => {
        await nextTick()
        if (messageListRef.value) {
            messageListRef.value.ref.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })  
        }
    }
    const creatingInitialMessage = async () => {
        const createdData: Omit<MessageProps, 'id'> = {
            content: '',
            type: 'answer',
            conversationId: conversationId.value,
            status: 'loading',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        const newMessageId = await messageStore.createMessage(createdData)
        await messageScrollToBottom()
        if (conversation.value) {
            // const provider = await db.providers.where({id: conversation.value.providerId}).first()
            const provider = providerStore.getProviderById(conversation.value.providerId)
            if (provider) {
                await window.electronAPI.startChat({
                    messageId: newMessageId,
                    providerName: provider.name,
                    selectedModel: conversation.value.selectedModel,
                    // content: lastQuestion.value?.content || ''
                    messages: sendedMessages.value
                })
            }
        }
    }

    // filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
    // conversation.value = conversations.find(item => item.id === conversationId)
    
    watch(() => route.params.id, async (newID: string) => {
        conversationId.value = parseInt(newID)
        await messageStore.fetchMessagesByConversationId(conversationId.value)
        await messageScrollToBottom()
        // filteredMessages.value = await db.messages.where({conversationId: conversationId.value}).toArray()
        // conversation.value = await db.conversations.where({id: conversationId}).first()
    })

    onMounted(async () => { 
        // conversation.value = await db.conversations.where({id: conversationId}).first()
        // filteredMessages.value = await db.messages.where({conversationId: conversationId.value}).toArray()
        await messageStore.fetchMessagesByConversationId(conversationId.value)
        // 滚动
        await messageScrollToBottom()
        if (initMessageId) {
            await creatingInitialMessage()
        }
        let currentMessageListHeight = 0
        const checkAndScrollToButtom = async () => { 
            if (messageListRef.value) {
                const newHeight = messageListRef.value.ref.clientHeight
                if (newHeight > currentMessageListHeight) { 
                    currentMessageListHeight = newHeight
                    await messageScrollToBottom()
                }
            }
        }
        window.electronAPI.onUpdateMessage(async (streamData) => {
            console.log('streamData', streamData)
            // 更新数据库 + 更新页面
            messageStore.updateMessage(streamData)
            // await messageScrollToBottom()
            await nextTick()
            checkAndScrollToButtom()
        })
    })

</script>