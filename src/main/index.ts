import { app, BrowserWindow, Tray, Menu, net, protocol } from "electron";
import path from "path";
import "dotenv/config";
import url from 'url'
import fs from "fs";

import { configManager } from '@/renderer/config/app.config'
import { registerIPC} from '@/main/modules/ipc'
import { createMenu } from '@/main/modules/menu'

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuiting = false;

const getIconPath = (type: 'window' | 'tray' = 'window') => {
  const platform = process.platform;

  let fileName = '';
  if (platform === 'win32') fileName = 'app.ico';
  else if (platform === 'darwin') fileName = 'app.icns';
  else fileName = 'app.png';

  let iconPath: string;

  if (app.isPackaged) {
    // 打包环境下，从 resources 目录读取
    iconPath = path.join(process.resourcesPath, 'assets', 'icons', platform, fileName);
  } else {
    // 开发环境下，使用项目根目录相对路径（你需要根据项目结构调整）
    iconPath = path.join(__dirname, '..', '..', 'assets', 'icons', platform, fileName);
  }

  if (!fs.existsSync(iconPath)) {
    console.warn(`[图标警告] ${type} 图标文件不存在: ${iconPath}`);
  }

  return iconPath;
}


const createWindow = async () => {
  // init config
  const config = await configManager.load()
  console.log(`config: ${JSON.stringify(config)}`)
  const iconPath = getIconPath('window');

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    title: "LLM Chat",
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  createMenu(mainWindow)
  registerIPC(mainWindow)

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../../dist/renderer/index.html`));
  }

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("close", (event: Electron.Event) => {
    // event.preventDefault();
    // mainWindow.setSkipTaskbar(true)
    // mainWindow.hide()
    if (!isQuiting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  })

  tray = new Tray(getIconPath('tray'));
  tray.setToolTip('LLM Chat')
  tray.on('click', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
      mainWindow.focus();
    }
  })
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开",
      click: () => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    {
      label: "退出",
      click: () => {
        isQuiting = true;
        tray?.destroy(); // 移除托盘
        mainWindow?.destroy();
        app.quit();
      }
    }
  ])

  
  tray.setContextMenu(contextMenu)
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  protocol.handle('safe-file', async (request) => {
      const filePath = decodeURIComponent(request.url.slice('safe-file://'.length))
      const newFilePath = url.pathToFileURL(filePath).toString()
      return net.fetch(newFilePath)
  })

  await createWindow();
  
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (BrowserWindow.getAllWindows().length === 0) {
  //   createWindow();
  // }

  if (mainWindow === null || (mainWindow && mainWindow.isDestroyed())) {
    createWindow();
  } else {
    mainWindow?.show();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
