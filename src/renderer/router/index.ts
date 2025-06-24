import { createMemoryHistory, createRouter} from 'vue-router'
import { useConversationStore } from '@/renderer/stores/conversation'

import Home from '@/renderer/views/Home.vue'
import Conversation from '@/renderer/views/Conversation.vue'
import Settings from '@/renderer/views/Settings.vue'

export const routers = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/conversation/:id',
        name: 'conversation',
        component: Conversation
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes: routers
})
router.beforeEach((to) => {
    const conversationStore = useConversationStore()
    if (!to.path.startsWith('/conversation/')) {
        conversationStore.selectId = -1
    }
})

export default router
