import { defineStore } from 'pinia'
import { ConversationProps } from '../types'
import { db } from '../db'

export interface ConversationStore {
    items: ConversationProps[]
}

export const useConversationStore = defineStore('conversation', {
    state: (): ConversationStore => {
        return {
            items: []
        }
    },
    actions: {
        async fetchConversations() {
            const data = await db.conversations.toArray()
            this.items = data
        },
        async createConversation(data: Omit<ConversationProps, 'id'>) {
            const newCId = await db.conversations.add(data)
            this.items.push({
                ...data,
                id: newCId
            })
            return newCId
        },
    },
    getters: { 
        totalNumber: (state) => state.items.length,
        getConversationById: (state) => (id: number) => {
            return state.items.find(item => item.id === id)
        }
    }
})

