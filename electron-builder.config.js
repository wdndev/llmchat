module.exports = {
  appId: 'com.electron.vue3ts',
  productName: 'electron-vue3-template',
  copyright: 'Copyright © 2025',
  directories: {
    output: 'release/${version}',
    buildResources: 'build',
  },
  files: [
    'dist/**/*',
    'dist/main/**/*',
    'dist/preload/**/*',
  ],
  asar: true,
  compression: 'maximum',
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64'] // 将 arch 移到 target 内部
      }
    ],
    icon: 'assets/icons/win/app.ico',
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