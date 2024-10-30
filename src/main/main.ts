/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  crashReporter,
  protocol,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { killMainProcess, resolveHtmlPath } from './util';
import { run as runClientCheck } from './check-client-update';
import runMu from './run-mu';
import {
  EVENT_CHECK_CLIENT_UPDATE,
  EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE,
  EVENT_ELECTRON_STORE_CHANGE_UNSUBSCRIBE,
} from '../config';
import { getRegedit, setRegedit } from './regedit';
import { handleMyResourceProtocol, myResourceSchema } from './custom-protocol';
import store, { getUserSetting, someStoreSubscribe } from '../store';

log.initialize();

protocol.registerSchemesAsPrivileged([
  {
    scheme: myResourceSchema,
    privileges: {
      standard: true,
      secure: true,
    },
  },
]);

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('--no-sandbox');

// app.commandLine.appendSwitch('disable-software-rasterizer')
// app.commandLine.appendSwitch('disable-gpu')
// app.commandLine.appendSwitch('disable-gpu-compositing')
// app.commandLine.appendSwitch('disable-gpu-rasterization')
// app.commandLine.appendSwitch('disable-gpu-sandbox')
// app.disableHardwareAcceleration();

// console.log(app.getPath('crashDumps'))
// crashReporter.start({ submitURL: '', uploadToServer: false })

let mainWindow: BrowserWindow | null = null;

ipcMain.on('electron-store-get', async (event, value) => {
  event.returnValue = store.get(value);
});

ipcMain.on('electron-store-set', async (event, key, value) => {
  store.set(key, value);
});

ipcMain.on(EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE, async (event) => {
  const unsubscribe = store.onDidAnyChange(() => {
    event.reply(EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE, getUserSetting());
  });
  someStoreSubscribe.onDidAnyChangeSubscribe.push(unsubscribe);
});

ipcMain.on(EVENT_ELECTRON_STORE_CHANGE_UNSUBSCRIBE, async (event) => {
  someStoreSubscribe.onDidAnyChangeSubscribe.forEach((unsubscribe) => {
    unsubscribe?.();
  });

  someStoreSubscribe.onDidAnyChangeSubscribe = [];
});

ipcMain.on('resizeWindow', async (event, value) => {
  mainWindow?.setSize(value.width, value.height);
});

ipcMain.handle('runMu', async () => {
  runMu();
});

ipcMain.on(EVENT_CHECK_CLIENT_UPDATE, async (event, args) => {
  runClientCheck(event, args);
});

ipcMain.handle('killMainProcess', async () => {
  killMainProcess();
});

ipcMain.handle('getMuRegedit', async () => {
  return getRegedit();
});

ipcMain.handle('setMuRegedit', async (event, args) => {
  setRegedit(args[0]);
});

ipcMain.handle('selectFolder', async (event) => {
  const folders = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  return folders;
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    // maxWidth: 800,
    // maxHeight: 600,
    icon: getAssetPath('icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
      webSecurity: false,
      sandbox: false,
      webviewTag: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    protocol.registerBufferProtocol(myResourceSchema, handleMyResourceProtocol);
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
