import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
        invoke(channel: string, ...args: any[]): Promise<any>;
      };

      store: {
        get: (key: string) => any;
        set: (key: string, value: any) => void;
        watchStoreChange: () => void;
      };
    };
  }
}

export {};
