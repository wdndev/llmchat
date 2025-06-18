<template>
    <div class="w-[80%] mx-auto h-full">
        <div class="flex items-center h-[85%]">
            <ProviderSelect :items="providers" v-model="selectedModel"></ProviderSelect>
        </div>
        <div class="flex items-center h-[15%]">
            <MessageInput> </MessageInput>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { ProviderProps } from '../types'
    import ProviderSelect from '../components/ProviderSelect.vue'
    import MessageInput from '../components/MessageInput.vue'
    import { providers } from '../testData'

    const selectedModel = ref('')
    // const items: ConversationProps[] = [
    //     {id: 1, title: 'Conversation 1', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 2, title: 'Conversation 2', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 3, title: 'Conversation 3', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 4, title: 'Conversation 4', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 5, title: 'Conversation 5', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 6, title: 'Conversation 6', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 7, title: 'Conversation 7', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 8, title: 'Conversation 8', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    //     {id: 9, title: 'Conversation 9', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    // ]


</script>