import type { ChatMessageProps} from '@/renderer/types/ipc.types'
import type { UniversalChunkProps } from '@/renderer/types/chat.types'

export abstract class BaseProvider { 
    abstract chat(messages: ChatMessageProps[], modelName: string):Promise<AsyncIterable<UniversalChunkProps>>;
    protected abstract transformResponse(chunk: any): UniversalChunkProps;
}
