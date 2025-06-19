import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import  {ChatCompletion} from '@baiducloud/qianfan'
import 'dotenv/config'
import OpenAI from 'openai';
import fs from 'fs'

import { CreateChatProps } from './types';
import { SelectContent } from 'radix-vue';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => { 
    console.log('start-chat message: ', data)
    const { messageId, providerName, selectedModel, messages } = data
    if (providerName === 'qianfan') {
      const client = new ChatCompletion()
      const streams = await client.chat({
        messages: messages as any,
        stream: true,
      }, selectedModel)
      for await (const chunk of streams as AsyncIterableIterator<any>) {
        const {is_end, result} = chunk
        const sendContent = {
          messageId,
          data: {
            result,
            is_end 
          }
        }
        mainWindow.webContents.send('update-message', sendContent)
      }
    }
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // llm test
  // await qwen_vl_openai()
  // await qwen_file_upload()

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
