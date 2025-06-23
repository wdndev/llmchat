import {defineStore} from 'pinia'
import {db} from '@/renderer/db'
import type { MessageProps } from '@/renderer/types/chat.types'

export interface MessageStore {
    items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
    state: (): MessageStore => {
        return {
            items: []
        }
    },
    actions: {
        async fetchMessagesByConversationId(conversationId: number) {
            const messages = await db.messages.where({conversationId}).toArray()
            this.items = messages
        },
        async createMessage(data: Omit<MessageProps, 'id'>) {
            const newMsgId = await db.messages.add(data)
            this.items.push({
                ...data,
                id: newMsgId
            })
            return newMsgId
        },
        async updateMessage(messageId: number,  updatedData: Partial<MessageProps>) { 
            await db.messages.update(messageId, updatedData)
            const index  = this.items.findIndex(item => item.id === messageId)
            if (index !== -1) {
                this.items[index] = {...this.items[index], ...updatedData}
            }
        },
        async deleteMessagesByConversationId(conversationId: number) {
            // 从数据库删除
            await db.messages.where({conversationId}).delete()
            // 从内存中过滤掉对应会话的消息
            this.items = this.items.filter(item => item.conversationId !== conversationId)
        }
    },
    getters: {
        getLastQuestion: (state) => (conversationId: number) => {
            // return state.items.findLast(item => item.conversationId === conversationId && item.type === 'question')
            const questions = state.items.filter((item: MessageProps) => item.conversationId === conversationId && item.type === 'question');
            return questions.length > 0 ? questions[questions.length - 1] : undefined;
        },
        isMessageLoading: (state) =>{
            return state.items.some(item => item.status === 'loading' || item.status === 'streaming')
        },
    }
})