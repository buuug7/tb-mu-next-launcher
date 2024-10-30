/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE,
  EVENT_ELECTRON_STORE_CHANGE_UNSUBSCRIBE,
} from 'config';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example' | string;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },

    invoke(channel: Channels, ...arg: any[]) {
      return ipcRenderer.invoke(channel, arg);
    },
  },

  store: {
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(key: string, value: any) {
      ipcRenderer.send('electron-store-set', key, value);
    },
    watchStoreChange() {
      ipcRenderer.send(EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE);

      return () => {
        ipcRenderer.send(EVENT_ELECTRON_STORE_CHANGE_UNSUBSCRIBE);
      };
    },
  },
});
