
// 消息对话框数据定义
export interface ConversationProps {
    id: number;
    title: string;
    selectModel: string;
    createAt: string;
    updateAt: string;
    providerId: number;
}

// 模型选择数据定义
export interface ProviderProps {
    id: number;
    name: string;
    titel?: string;
    desc?: string;
    acatar?: string;
    createAt: string;
    updateAt: string;
    models: string[];
}

// 
export type MessageStatus = 'loading' | 'streaming' | 'finished'
export interface MessageProps {
    id: number;
    content: string;
    type: 'question' | 'answer'
    conversationId: number;
    status?: MessageStatus;
    createAt: string;
    updateAt: string;
}