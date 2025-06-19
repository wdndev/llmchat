/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import { createApp} from 'vue'
import { createPinia} from 'pinia'
import { createMemoryHistory, createRouter} from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Conversation from './views/Conversation.vue'
import Settings from './views/Settings.vue'
import { useConversationStore } from './stores/conversation'
import './index.css';
import 'highlight.js/styles/github-dark.min.css'

const routers = [
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
const pinia = createPinia()

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

createApp(App).use(router).use(pinia).mount('#app')