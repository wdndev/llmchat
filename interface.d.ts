import { CreateChatProps, OnUpdatedCallback } from "src/types"

export interface IElectronAPI {
    startChat: (data: CreateChatProps) => void;
    onUpdateMessage: (callback: OnUpdatedCallback) => any;
    copyImageToUserDir: (dataUrl: string) => Promise<string>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}