import { contextBridge, ipcRenderer } from 'electron'
import type { CreateChatProps, OnUpdatedCallback } from '@/renderer/types/ipc.types'
import type { AppConfig } from '@/renderer/types/app.types'

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) => ipcRenderer.on('update-message', (_event, data) => callback(data)),
  copyImageToUserDir: (dataUrl: string) => ipcRenderer.invoke('copy-image-to-user-dir', dataUrl),
  getConfig: () => ipcRenderer.invoke('get-config'),
  updateConfig: (newConfig: Partial<AppConfig>) => ipcRenderer.invoke('update-config', newConfig),
  showContextMenu: (id: number) => ipcRenderer.send('show-context-menu', id),
  onDeleteConversation: (callback: (id: number) => void) => ipcRenderer.on('delete-conversation', (_event, id) => callback(id)),
  onMenuNewConversation: (callback: () => void) => ipcRenderer.on('menu-new-conversation', () => callback()),
  onMenuOpenSettings: (callback: () => void) => ipcRenderer.on('menu-open-settings', () => callback())
})
