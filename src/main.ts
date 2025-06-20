import { app, BrowserWindow, ipcMain, protocol, net} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import 'dotenv/config'
import fs from 'fs/promises'
import url from 'url'


import { CreateChatProps } from './types';
import { convertMessages } from './helper'
import { createProvider } from './providers/createProvider';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  protocol.handle('safe-file', async (request) => {
    console.log("wwwwwwwww: ", request.url)
    const filePath = decodeURIComponent(request.url.slice('safe-file://'.length))
    console.log(filePath)
    const newFilePath = url.pathToFileURL(filePath).toString()
    console.log(newFilePath)
    return net.fetch(newFilePath)
  })

  ipcMain.handle('copy-image-to-user-dir', async (event: Electron.IpcMainInvokeEvent, dataUrl: string) => {
    // 创建用户目录
    const userDataPath = app.getPath('userData');
    const imageDir = path.join(userDataPath, 'images');
    await fs.mkdir(imageDir, { recursive: true })
    console.log('user Dir Data', imageDir);
    // 从 DataURL中提取数据
    const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid data URL format');
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // 生成唯一文件名
    const fileExt = mimeType === 'image/jpeg' ? 'jpg' : 
                   mimeType === 'image/png' ? 'png' : 
                   mimeType === 'image/gif' ? 'gif' : 'unknown';
    const fileName = `img_${Date.now()}.${fileExt}`;
    const targetPath = path.join(imageDir, fileName);

    // 写入文件
    await fs.writeFile(targetPath, buffer);

    return targetPath;

  });
  
  ipcMain.on('start-chat', async (event: Electron.IpcMainEvent, data: CreateChatProps) => { 
    console.log('start-chat message: ', data)
    const { messageId, providerName, selectedModel, messages } = data
    const convertedMessages = await convertMessages(messages)
    const provider = createProvider(providerName)
    const stream = await provider.chat(messages, selectedModel)
    for await (const chunk of stream) {
      console.log('llm chunk: ', chunk)
      const sendContent = {
        messageId,
        data: chunk
      }
      mainWindow.webContents.send('update-message', sendContent)
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
