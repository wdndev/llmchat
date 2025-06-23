import { app, BrowserWindow } from "electron";
import path from "path";
import "dotenv/config";
// import { setupIPC } from '@/main/modules/ipc'

// import { configManager } from '@/renderer/config/app.config'
import { configManager } from '@/renderer/config/app.config'
import { createProvider} from '@/renderer/providers/createProvider'

const getAppIcon = () => { 
  const devIconPath =
    process.platform === "win32"
      ? path.join(__dirname, "../../assets/icons/win/app.ico")
      : process.platform === "darwin"
      ? path.join(__dirname, "../../assets/icons/mac/app.icns")
      : path.join(__dirname, "../../assets/icons/linux/app.png");

  const prodIconPath =
    process.platform === "win32"
      ? path.join(__dirname, "../assets/icons/win/app.ico")
      : process.platform === "darwin"
      ? path.join(__dirname, "../assets/icons/mac/app.icns")
      : path.join(__dirname, "../assets/icons/linux/app.png");

  const iconPath = app.isPackaged ? prodIconPath : devIconPath;

  console.log("iconPath:", iconPath);
  return iconPath;
};
const createWindow = async () => {
  // init config
  const config = await configManager.load()
  console.log(`config: ${JSON.stringify(config)}`)

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    title: "LLM Chat",
    icon: getAppIcon(),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  // and load the index.html of the app.
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../../dist/renderer/index.html`));
  }

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
