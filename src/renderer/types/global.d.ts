export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

declare module "*.css";
