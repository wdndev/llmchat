import type { CreateChatProps, OnUpdatedCallback } from '@/renderer/types/ipc'
export interface IElectronAPI {
    startChat: (data: CreateChatProps) => void;
    onUpdateMessage: (callback: OnUpdatedCallback) => any;
    copyImageToUserDir: (dataUrl: string) => Promise<string>;
    getConfig: () => Promise<AppConfig>;
    updateConfig: (newConfig: Partial<AppConfig>) => Promise<void>;
    showContextMenu: (id: number) => void;
    onDeleteConversation: (callback: (id: number) => void) => void;
    onMenuNewConversation: (callback: () => void) => void;
    onMenuOpenSettings: (callback: () => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}


