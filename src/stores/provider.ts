import { defineStore } from 'pinia'
import { db } from '../db'
import { ProviderProps } from '../types'

export interface ProviderStore {
    items: ProviderProps[];
}

export const useProviderStore = defineStore('provider', {
    state: (): ProviderStore => ({
        items: [],
    }),
    actions: {
        async fetchProviders() {
            this.items = await db.providers.toArray()
        }
    },
    getters: {
        getProviderById: (state) => (id: number) => {
            return state.items.find(item => item.id === id)
        }
    }
})

