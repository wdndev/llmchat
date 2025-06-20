import { app, BrowserWindow, ipcMain, protocol} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import 'dotenv/config'
import fs from 'fs/promises'
import {lookup} from 'mime-types'


import { CreateChatProps } from './types';
import { createProvider } from './providers/createProvider'
import { configManager} from './config'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  // 初始化配置
  const config = await configManager.load()
  console.log(`config: ${JSON.stringify(config)}`)

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  protocol.handle('safe-file', async (request) => {
    console.log("wwwwwwww: ", request.url)
    const filePath = decodeURIComponent(request.url.slice('safe-file://'.length))
    console.log("dddddd filePath: ", filePath)
    const data = await fs.readFile(filePath)
    return new Response(data, {
      status: 200,
      headers:{
        'Content-Type': lookup(filePath) as string
      }
    })
  })
  
  ipcMain.handle('copy-image-to-user-dir', async (event, dataUrl: string) => {
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
    try {
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
    } catch (error) {
      console.error('LLM Chat Error:', error)
      const errorContent = {
        messageId,
        data: {
          is_error: true,
          result: error instanceof Error ? error.message : "与AI服务器通信发生错误"
        }
      }
      mainWindow.webContents.send('update-message', errorContent)
    }
  })

  // Config handlers
  ipcMain.handle('get-config', () => {
    return configManager.get()
  })

  ipcMain.handle('update-config', async (event, newConfig) => {
    const updatedConfig = await configManager.update(newConfig)
    // 如果语言发生变化，更新菜单
    // if (newConfig.language) {
    //   updateMenu(mainWindow)
    // }
    return updatedConfig
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
