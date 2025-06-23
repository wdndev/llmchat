# Electron Vue3 Template

## Introduction

🥳 `Electron` + `Vue3` + `Vite` + `TypeScript` + `Tailwind` + `Electron-builder`

> You can choose to clone the project or fork repository, or download the zip file directly. It is recommended to clone the repository so that you can receive the latest patches.
>
> To run a project, you need to have node version 20 or higher and use npm or pnpm as your dependency management tool

## Build Setup

```bash
# Clone this repository
$ git clone https://github.com/wdndev/electron-vue3-template.git

# Go into the repository
$ cd electron-vue3-template

# install dependencies
$ pnpm install

# serve with hot reload at localhost:9080
$ pnpm run dev

# build electron application for production
$ pnpm run build
```

```bash
npx vue-tsc -p tsconfig.app.json --noEmit --watch
```

# Built-in

- [Electron](http://www.electronjs.org/docs)
- [Vue3](https://cn.vuejs.org/guide/introduction.html)
- [vue-router](https://next.router.vuejs.org/index.html)
- [Vite](https://cn.vitejs.dev/guide/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/docs/installation/using-vite)
- [Electron-builder](https://www.electron.build/)
- [Electron-vue](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)

## FAQ

### Electron install again

`pnpm dev` start error message：

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

Solution: Fix Electron
Reference：https://github.com/pangxieju/electron-fix

1. First, `pnpm instal` or `yarn install`
2. Execute `npm install electron-fix -g`
3. Then `electron-fix start` for fix electron
