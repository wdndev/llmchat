import { CreateChatProps, OnUpdatedCallback } from "../types"

export interface IElectronAPI {
    startChat: (data: CreateChatProps) => void;
    onUpdateMessage: (callback: OnUpdatedCallback) => any;
    copyImageToUserDir: (dataUrl: string) => Promise<string>;
    getConfig: () => Promise<AppConfig>;
    updateConfig: (newConfig: Partial<AppConfig>) => Promise<void>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}

// 新建类型声明文件
declare module 'electron-squirrel-startup';