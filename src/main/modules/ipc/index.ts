import { BrowserWindow } from "electron";

export function setupIPC(mainWindow: BrowserWindow) {
  mainWindow.webContents.send("update-message", 333);
}
