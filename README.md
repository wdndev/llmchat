# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


## FAQ

### Electron install again

pnpm dev 运行报错信息：

```
E:\02Personal\electron-vue3-template\node_modules\electron\index.js:17
    throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again');
          ^

Error: Electron failed to install correctly, please delete node_modules/electron and try installing again
    at getElectronPath (E:\02Personal\electron-vue3-template\node_modules\electron\index.js:17:11)
    at Object.<anonymous> (E:\02Personal\electron-vue3-template\node_modules\electron\index.js:21:18)
    at Module._compile (node:internal/modules/cjs/loader:1730:14)
    at Object..js (node:internal/modules/cjs/loader:1895:10)
    at Module.load (node:internal/modules/cjs/loader:1465:32)
    at Function._load (node:internal/modules/cjs/loader:1282:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
    at cjsLoader (node:internal/modules/esm/translators:266:5)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:200:7)

Node.js v22.16.0                                                                                                                                                                        ELIFECYCLE  Command failed with exit code 1.       
```

解决方法：修复 Electron 
参考：https://github.com/pangxieju/electron-fix

1. 首先 pnpm instal或者yarn install
2. 执行 npm install electron-fix -g
3. 接着 electron-fix start 修复


