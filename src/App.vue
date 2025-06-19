<template>
    <dev class=" flex items-center justify-between h-screen"> 
        <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
            <div class="h-[90%] overflow-y-auto">
                <ConversationList :items="items"/>
            </div>
            <dev class="h-[10%] grid grid-cols-2 gap-2 p-2">
                <RouterLink to="/">
                    <Button icon-name="radix-icons:chat-bubble" class="w-full">
                        新建聊天
                    </Button>
                    <!-- <button
                    class="shadow-sm inline-flex items-center justify-center 
                    bg-green-700 text-white hover:bg-green-700/90 border border-green-700
                        h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
                    >
                        <Icon icon="radix-icons:chat-bubble" class="mr-[2px]"></Icon>
                        新建聊天
                    </button> -->
                </RouterLink>
                <RouterLink to="/settings">
                    <Button icon-name="radix-icons:gear" plain class="w-full">
                        应用设置
                    </Button>
                    <!-- <button
                    class="shadow-sm inline-flex items-center justify-center 
                    bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 
                        h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
                    >
                        <Icon icon="radix-icons:gear" class="mr-[2px]"></Icon>
                        应用设置
                    </button> -->
                </RouterLink>
            </dev>
        </div>
        <div class="h-full flex-1">
            <RouterView></RouterView>
        </div>

    </dev>
</template>

<script setup lang="ts">
    import {ref, onMounted, computed} from 'vue'
    import {ConversationProps, ProviderProps} from './types'
    import { Icon } from "@iconify/vue";
    import {RouterLink, RouterView} from 'vue-router'
    import ConversationList from './components/ConversationList.vue'
    import ProviderSelect from './components/ProviderSelect.vue'
    import MessageInput from './components/MessageInput.vue'
    import Button from './components/Button.vue'
    import { db, initProviders } from './db'
    import { useConversationStore } from './stores/conversation'
    // 测试数据
    // import {conversations, providers} from './testData'

    // const conversations = ref<ConversationProps[]>([])
    const conversationStore = useConversationStore()
    const items = computed(() => conversationStore.items)

    onMounted(async () => {
        await initProviders()
        // conversations.value = await db.conversations.toArray()
        // conversationStore.items = await db.conversations.toArray()
        conversationStore.fetchConversations()
    })


    console.log('Hello World!')
</script>