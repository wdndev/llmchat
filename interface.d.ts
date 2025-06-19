import { CreateChatProps, OnUpdatedCallback } from "src/types"

export interface IElectronAPI {
    startChat: (data: CreateChatProps) => void;
    onUpdateMessage: (callback: OnUpdatedCallback) => any;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}