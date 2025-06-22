export interface IElectronAPI {
  startChat: (data: any) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
