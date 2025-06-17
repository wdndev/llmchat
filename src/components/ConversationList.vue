<template>
    <div class="conversation-list">
        <div 
            class="item border-gray-300 border-t cursor-pointer bg-white hover:bg-gra p-2"
            v-for="item in items"
            :key="item.id"
        >
            <a href="#">
                <div class=" flex justify-between items-center text-sm leading-5 text-gray-500 ">
                    <span>{{ item.selectModel }}</span>
                    <span>{{ item.updateAt }}</span>
                </div>
            </a>
            <h2 class=" font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ConversationProps } from '../types'
    defineProps<{
        items: ConversationProps[]
    }>()
    // console.log(items)
</script>
