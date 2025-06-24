<template>
    <div class="w-[80%] mx-auto h-full">
        <div class="flex items-center h-[85%]">
            <ProviderSelect :items="providers" v-model="currentProvider"></ProviderSelect>
        </div>
        <div class="flex items-center h-[15%]">
            <MessageInput @create="createConversation" :disabled="currentProvider === ''"> </MessageInput>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { useRouter } from 'vue-router'
    // import { type ProviderProps } from '@/renderer/types/chat.types'
    import { useConversationStore } from '@/renderer/stores/conversation'
    import { useProviderStore} from  '@/renderer/stores/provider'
    import ProviderSelect from '@/renderer/components/ProviderSelect.vue'
    import MessageInput from '@/renderer/components/MessageInput.vue'
    import { db } from '@/renderer/db'
    // import { providers } from '../testData'

    const router = useRouter()
    const currentProvider = ref('')
    // const providers = ref<ProviderProps[]>([])
    const conversationStore = useConversationStore()
    const providerStore = useProviderStore()
    const providers = computed(() => providerStore.items)
    
    // onMounted(async () => {
    //     providers.items = await db.providers.toArray()
    // })

    const modelInfo = computed(() => {
        const [providerId, selectedModel ] = currentProvider.value.split('/')
        return {
            providerId: parseInt(providerId),
            selectedModel
        }
    })

    const createConversation = async (question: string, imagePath?: string) => { 
        const { providerId, selectedModel } = modelInfo.value
        const currentDate = new Date().toISOString()
        let copiedImagePath: string | undefined
        if (imagePath) {
            try {
                copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath)
                console.log('copiedImagePath: ', copiedImagePath)
            } catch (error) {
                console.log('Failed to copy image: ', error)
            }
        }
        const conversationId = await conversationStore.createConversation({
            title: question,
            providerId,
            selectedModel,
            createdAt: currentDate,
            updatedAt: currentDate
        })
        const newMessageId = await db.messages.add({
            content: question,
            conversationId,
            createdAt: currentDate,
            updatedAt: currentDate,
            type: 'question',
            ...(copiedImagePath && { imagePath: copiedImagePath })
        })
        router.push(`/conversation/${conversationId}?init=${newMessageId}`)
    }


</script>