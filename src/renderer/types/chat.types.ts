// 消息对话框数据定义
export interface ConversationProps {
    id: number;
    title: string;
    selectedModel: string;
    createdAt: string;
    updatedAt: string;
    providerId: number;
}

// 模型选择数据定义
export interface ProviderProps {
    id: number;
    name: string;
    title?: string;
    desc?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    models: string[];
}

// 消息数据定义
export type MessageStatus = 'loading' | 'streaming' | 'finished' | 'error'
export interface MessageProps {
    id: number;
    content: string;
    type: 'question' | 'answer'
    conversationId: number;
    status?: MessageStatus;
    createdAt: string;
    updatedAt: string;
    imagePath?: string;
}

// 模型调用返回数据结构
export interface UniversalChunkProps {
    is_end: boolean;
    result: string;
}
export interface BaiduChunkProps {
    is_end: boolean;
    result: string;
}
