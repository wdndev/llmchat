import Dexie, { type EntityTable } from 'dexie';
import { testProviders } from './testData';

import type { ProviderProps, ConversationProps, MessageProps } from '@/renderer/types/chat.types';

export const db = new Dexie('llmchatDatabase') as Dexie & {
    providers: EntityTable<ProviderProps, 'id'>;
    conversations: EntityTable<ConversationProps, 'id'>;
    messages: EntityTable<MessageProps, 'id'>;
}

db.version(1).stores({
    providers: '++id, name',
    conversations: '++id, providerId',
    messages: '++id, conversationId'
})

export const initProviders = async () => { 
    const count = await db.providers.count()
    if (count === 0) {
        db.providers.bulkAdd(testProviders)
    }
}