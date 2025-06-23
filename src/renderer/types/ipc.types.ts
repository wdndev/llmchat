
// 渲染进程向主进程发送消息格式，用于调用大模型
export interface ChatMessageProps {
    role: string;
    content: string;
    imagePath?: string;
}
export interface CreateChatProps {
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
