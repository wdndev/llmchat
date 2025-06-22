module.exports = {
  productName: 'electron-vue3-template',
  appId: 'com.electron.vue3ts',
  copyright: 'Copyright © 2025',
  compression: 'maximum',
  asar: true,   // 打包格式压缩
  directories: {
    output: 'release/${version}',   // 打包输出目录
    buildResources: 'build',
  },
  files: [
    'dist/**/*',
    'dist/main/**/*',
    'dist/preload/**/*',
  ],
  
  
  win: {
    icon: 'assets/icons/win/app.ico',
    target: [
      {
        target: 'nsis',
        arch: ['x64'] // 将 arch 移到 target 内部
      }
    ],
    
  },
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'electron-vite-vue3-electron-builder',
    runAfterFinish: true,
    uninstallDisplayName: 'electron-vite-vue3-electron-builder',
    perMachine: true,
  },
  mac: {
    target: 'dmg',
    icon: 'src/renderer/public/favicon.icns',
  },
  linux: {
    target: 'AppImage',
    icon: 'src/renderer/public/favicon.png',
  }
}    