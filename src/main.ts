import { app, BrowserWindow, net, protocol, session} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import 'dotenv/config'
import url from 'url'
import fs from 'fs/promises'
import {lookup} from 'mime-types'

import { CreateChatProps } from './types';
import { createProvider } from './providers/createProvider'
import { configManager} from './config'
import { createMenu, updateMenu } from './menu'
import { registerIPC } from './ipc'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// 设置应用程序图标（用于任务栏和系统托盘）
const setAppIcon = () => {
  if (process.platform === 'win32' || process.platform === 'linux') {
    // Windows和Linux需要设置app.setAppUserModelId()以确保任务栏图标正确显示
    app.setAppUserModelId(app.name);
  }
};

const createWindow = async () => {
  // 初始化配置
  const config = await configManager.load()
  console.log(`config: ${JSON.stringify(config)}`)

  const iconPath = process.platform === 'win32' 
      ? path.join(__dirname, 'assets/llmchat_ico_256x256.ico') // Windows使用.ico格式
      : process.platform === 'darwin' 
        ? path.join(__dirname, 'assets/llmchat_ico_256x256.icns') // macOS使用.icns格式
        : path.join(__dirname, 'assets/llmchat_ico_256x256.png'); // Linux使用.png格式

  // console.log('iconPath', iconPath)
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    icon: iconPath,
    title: 'LLM Chat',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // 创建菜单
  createMenu(mainWindow)

  registerIPC(mainWindow)

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  protocol.handle('safe-file', async (request) => {
      console.log("request.url: ", request.url)
      console.log(request.url)
      const filePath = decodeURIComponent(request.url.slice('safe-file://'.length))
      console.log(filePath)
      const newFilePath = url.pathToFileURL(filePath).toString()
      console.log(newFilePath)
      return net.fetch(newFilePath)
  })

  setAppIcon();
  createWindow();
});

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
