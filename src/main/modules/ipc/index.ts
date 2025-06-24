import { ipcMain, BrowserWindow, app } from 'electron'
import { type CreateChatProps } from '@/renderer/types/ipc.types'
import { createProvider } from '@/renderer/providers/createProvider'
import { configManager } from '@/renderer/config/app.config'
import { createContextMenu, updateMenu } from '@/main/modules/menu'
import fs from 'fs/promises'
import path from 'path'

export function registerIPC(mainWindow: BrowserWindow) {
    // Context menu handler
    ipcMain.on('show-context-menu', (event, id) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        if (!win) return
        createContextMenu(win, id)
    }) 
    
    ipcMain.handle('copy-image-to-user-dir', async (event, dataUrl: string) => {
        console.log('event', event);
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

    // Chat handler
    ipcMain.on('start-chat', async (event: Electron.IpcMainEvent, data: CreateChatProps) => { 
        console.log('start-chat message event: ', event)
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
        console.log('update-config: ', event)
        const updatedConfig = await configManager.update(newConfig)
        // 如果语言发生变化，更新菜单
        if (newConfig.language) {
            updateMenu(mainWindow)
        }
        return updatedConfig
    })
}
