<template>
    <dev class="flex items-center justify-between h-screen"> 
        <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
            <div class="h-[90%] overflow-y-auto">
                <ConversationList :items="items"/>
            </div>
            <dev class="h-[10%] grid grid-cols-2 gap-2 p-2">
                <RouterLink to="conversation">
                    <button
                    class="shadow-sm inline-flex items-center justify-center 
                    bg-green-700 text-white hover:bg-green-700/90 border border-green-700
                        h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
                    >
                        <Icon icon="radix-icons:chat-bubble" class="mr-[2px]"></Icon>
                        新建聊天
                    </button>
                </RouterLink>
                <RouterLink to="/settings">
                    <button
                    class="shadow-sm inline-flex items-center justify-center 
                    bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 
                        h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
                    >
                        <Icon icon="radix-icons:gear" class="mr-[2px]"></Icon>
                        应用设置
                    </button>
                </RouterLink>
            </dev>
        </div>
        <div class="h-full flex-1">
            <!-- content -->
            <!-- <div class="w-[80%] mx-auto h-full">
                <div class="flex items-center h-[85%]">
                    <ProviderSelect :items="providers" v-model="selectedModel"></ProviderSelect>
                </div>
                <div class="flex items-center h-[15%]">
                    <MessageInput> </MessageInput>
                </div>
            </div> -->
            <RouterView></RouterView>
        </div>

    </dev>
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue'
    import {ConversationProps, ProviderProps} from './types'
    import { Icon } from "@iconify/vue";
    import {RouterLink, RouterView} from 'vue-router'
    import ConversationList from './components/ConversationList.vue'
    import ProviderSelect from './components/ProviderSelect.vue'
    import MessageInput from './components/MessageInput.vue'

    const selectedModel = ref('')
    const items: ConversationProps[] = [
        {id: 1, title: 'Conversation 1', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 2, title: 'Conversation 2', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 3, title: 'Conversation 3', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 4, title: 'Conversation 4', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 5, title: 'Conversation 5', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 6, title: 'Conversation 6', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 7, title: 'Conversation 7', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 8, title: 'Conversation 8', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
        {id: 9, title: 'Conversation 9', selectModel: 'gpt-3.5-turbo', createAt: '2023-01-01', updateAt: '2023-01-01', providerId: 1},
    ]

    const providers: ProviderProps[] = [
        {id: 1, name: 'OpenAI', titel: 'OpenAI', desc: 'OpenAI is a company that provides artificial intelligence services.', acatar: '', createAt:'2023-01-01', updateAt:'2023-01-01', models: ['gpt-3.5-turbo1', 'gpt-4.1']},
        {id: 2, name: 'ChatGPT', titel: 'ChatGPT', desc: 'ChatGPT is a chatbot that provides artificial intelligence services.', acatar: '',createAt:'2023-01-01', updateAt:"2023-01-01", models: ['gpt-3.5-turbo2', 'gpt-4.2']}
    ]


    console.log('Hello World!')
</script>