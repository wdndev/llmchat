import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'

// https://vitejs.dev/config
export default defineConfig((env) => {
    return {
        plugins: [
            vue()
        ],
        resolve: {
            alias: {
            '@': resolve(__dirname, './src'),
            '*': resolve('')
            }
        }
    }
});
