
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
export type MessageStatus = 'loading' | 'streaming' | 'finished'
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

// 渲染进程向主进程发送消息格式，用于调用大模型
export interface ChatMessageProps {
    role: string;
    content: string;
    imagePath?: string;
}
export interface CreateChatProps {
    // content: string;
    messages: ChatMessageProps[];
    providerName: string;
    selectedModel: string;
    messageId: number;
}
// 主进程向渲染进程发送的消息，大模型的返回
export interface UpdatedStreamData {
    messageId: number;
    data: {
        is_end: boolean;
        result: string;
        is_error?: boolean;
    }
}
// LLM输出到渲染进程的回调函数
export type OnUpdatedCallback = (data: UpdatedStreamData) => void;

export interface MessageListIntance {
    ref: HTMLDivElement;
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

export interface AppConfig {
  language: 'zh' | 'en'
  fontSize: number
  providerConfigs: Record<string, Record<string, string>>
}

export const DEFAULT_CONFIG: AppConfig = {
  language: 'zh',
  fontSize: 14,
  providerConfigs: {}
}
