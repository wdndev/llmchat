import { contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: ipcRenderer,
});