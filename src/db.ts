import Dexie, { EntityTable } from 'dexie';
import { ProviderProps } from './types';

export const db = new Dexie('llmchatDatabase') as Dexie & {
    providers: EntityTable<ProviderProps, 'id'>;
}

db.version(1).stores({
    providers: '++id, name'
})