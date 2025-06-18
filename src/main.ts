import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import  {ChatCompletion} from '@baiducloud/qianfan'
import 'dotenv/config'
import OpenAI from 'openai';
import fs from 'fs'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
async function qianfan() { 
  const client = new ChatCompletion()
  const resp = await client.chat({
    messages: [
      {
        role: 'user',
        content: '你好'
      }
    ]
  }, "ERNIE-Speed-128K")
  console.log(resp)
}
async function qwen_plus_openai() {
  const client = new OpenAI({
    apiKey: process.env['LLM_API_KEY'],
    baseURL: process.env['LLM_BASE_URL']
  })
  const model_name : string = process.env['LLM_MODEL_NAME'] || "qwen-max"
  console.log(`model_name: ${model_name}`)
  console.log(`LLM_API_KEY: ${process.env['LLM_API_KEY']}`)
  console.log(`LLM_BASE_URL: ${process.env['LLM_BASE_URL']}`)

  const resp = await client.chat.completions.create({
    model: model_name,
    messages: [
      {
        role: 'user',
        content: '你好'
      }
    ]
  })
  console.log("resp", resp.choices[0].message)
}
async function qwen_vl_openai() {
  const imageBuffer = await fs.promises.readFile('C:/Users/dd/Desktop/Llama3_Repo.jpeg')
  const base64Image = imageBuffer.toString('base64');
  // console.log("base64:   ", base64Image)
  const client = new OpenAI({
    apiKey: process.env['LLM_API_KEY'],
    baseURL: process.env['LLM_BASE_URL']
  })
  const model_name : string = process.env['LLM_MODEL_NAME'] || "qwen-max"
  console.log(`model_name: ${model_name}`)
  console.log(`LLM_API_KEY: ${process.env['LLM_API_KEY']}`)
  console.log(`LLM_BASE_URL: ${process.env['LLM_BASE_URL']}`)

  const resp = await client.chat.completions.create({
    model: model_name,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: [
          {type: "text", text: "图中是什么动物？"},
          {type: "image_url", image_url: {url: `data:image/jpeg;base64,${base64Image}`}}
        ]
      }
    ]
  })

  console.log("resp", resp.choices[0].message)
}

async function qwen_file_upload() { 
  const client = new OpenAI({
    apiKey: process.env['LLM_API_KEY'],
    baseURL: process.env['LLM_BASE_URL'],
  })
  const model_name : string = process.env['LLM_MODEL_NAME'] || "qwen-plus"
  const fileObj = await client.files.create({
    file: fs.createReadStream("C:/Users/dd/Desktop/aaaa.pdf"),
    purpose: "file-extract" as any,
  });
  // console.log("fileObj", fileObj)
  const resp = await client.chat.completions.create({
    model: model_name,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "system",
        content: `fileid://${fileObj.id}`,
      },
      {
        role: "user",
        content: "文件里面讲什么？",
      }
    ]
  })
  console.log("resp", resp.choices[0].message)
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
