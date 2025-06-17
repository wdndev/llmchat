<template>
    <dev class="flex items-center justify-between h-screen"> 
        <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
            <div class="h-[90%] overflow-y-auto">
                <ConversationList :items="items"/>
            </div>
            <dev class="h-[10%] grid grid-cols-2 gap-2 p-2">
                <button
                 class="shadow-sm inline-flex items-center justify-center 
                   bg-green-700 text-white hover:bg-green-700/90 border border-green-700
                     h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
                >
                    <Icon icon="radix-icons:chat-bubble" class="mr-[2px]"></Icon>
                    新建聊天
                </button>
                <button
                 class="shadow-sm inline-flex items-center justify-center 
                   bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 
                     h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
                >
                    <Icon icon="radix-icons:gear" class="mr-[2px]"></Icon>
                    应用设置
                </button>
            </dev>
        </div>
        <div class="h-full flex-1">
            <!-- content -->
            <ProviderSelect />
        </div>

    </dev>
</template>

<script setup lang="ts">
    import {ConversationProps} from './types'
    import { Icon } from "@iconify/vue";
    import ConversationList from './components/ConversationList.vue'
    import ProviderSelect from './components/ProviderSelect.vue'

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


    console.log('Hello World!')
</script>