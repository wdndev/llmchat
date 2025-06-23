<template>
    <div class="conversation-list">
        <div 
            class="item border-gray-300 border-t cursor-pointer p-2"
            :class="{
                'bg-gray-200 hover:bg-gray-300': conversationStore.selectId === item.id,
                'bg-white hover:bg-gray-300': conversationStore.selectId !== item.id
            }"
            v-for="item in sortedItems"
            :key="item.id"
            @contextmenu.prevent="showContextMenu($event, item.id)"
            @click="hideContextMenuIfVisible"
        >
            <a @click.prevent="goToConversation(item.id)">
                <div class=" flex justify-between items-center text-sm leading-5 text-gray-500 ">
                    <span>{{ item.selectedModel }}</span>
                    <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm') }}</span>
                </div>
                <h2 class=" font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
            </a>
        </div>
        <!-- 右键菜单 -->
        <div
            v-if="contextMenuVisible"
            class="fixed bg-white shadow-lg rounded-md z-50 py-1 w-36"
            :style="{ left: `${contextMenuX}px`, top: `${contextMenuY}px` }"
            @click.stop
            @contextmenu.stop
        >
            <button
                class="w-full text-left px-3 py-1.5 text-sm text-black hover:bg-gray-300 flex items-center"
                @click="deleteSelectedItem()"
            >
                <Icon
                    icon="fluent:delete-28-regular" 
                    width="18" 
                    height="18" 
                    class="mr-2" 
                    style="color: #e53e3e" 
                ></Icon>
                <span>删除会话</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs';
    import {Icon} from '@iconify/vue'
    import { useRouter} from 'vue-router'
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    
    import { type ConversationProps } from '@/renderer/types/chat.types';
    import { useConversationStore} from '@/renderer/stores/conversation'
    import { useMessageStore} from '@/renderer/stores/message'

    const props = defineProps<{
        items: ConversationProps[]
    }>()

    const router = useRouter()
    const conversationStore = useConversationStore()
    const messageStore = useMessageStore()
    const goToConversation = (id: number) => {
        router.push({
            path: `/conversation/${id}`,
            query: { name: 'wdn' },
            hash: '#foo',
        })
        conversationStore.selectId = id
    }

    // 添加排序后的计算属性
    const sortedItems = computed(() => {
        return [...props.items].sort((a, b) => {
            // 按照更新时间降序排列（最新的在前）
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        })
    })

    // 右键菜单状态
    const contextMenuVisible = ref(false)
    const contextMenuX = ref(0)
    const contextMenuY = ref(0)
    const selectedItemId = ref(-1)


    // 显示右键菜单
    const showContextMenu = (event: MouseEvent, id: number) => {
        // 阻止事件冒泡到document
        event.stopPropagation()
        contextMenuX.value = event.clientX
        contextMenuY.value = event.clientY
        selectedItemId.value = id
        contextMenuVisible.value = true
    }

    // 隐藏右键菜单
    const hideContextMenu = () => {
        contextMenuVisible.value = false
        selectedItemId.value = -1
    }

    // 如果菜单可见则隐藏
    const hideContextMenuIfVisible = () => {
        if (contextMenuVisible.value) {
            hideContextMenu()
        }
    }

    // 修改deleteSelectedItem方法
    const deleteSelectedItem = async () => {
        if (selectedItemId.value !== -1) {
            try {
                await conversationStore.deleteConversation(selectedItemId.value)
                await messageStore.deleteMessagesByConversationId(selectedItemId.value)
                if (conversationStore.selectId === selectedItemId.value) {
                    conversationStore.selectId = -1
                    router.push('/')
                }
            } catch (error) {
                console.error('删除会话失败:', error)
            }
        }
        hideContextMenu()
    }

    // 点击其他区域关闭菜单
    const handleClickOutside = () => {
        if (contextMenuVisible.value) {
            hideContextMenu()
        }
    }
    
    // 监听键盘ESC关闭菜单
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            hideContextMenu()
        }
    }
    
    onMounted(() => {
        // 同时监听左键和右键点击
        document.addEventListener('click', handleClickOutside)
        document.addEventListener('contextmenu', handleClickOutside)
        document.addEventListener('keydown', handleKeydown)
    })
    
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
        document.removeEventListener('contextmenu', handleClickOutside)
        document.removeEventListener('keydown', handleKeydown)
    })
</script>