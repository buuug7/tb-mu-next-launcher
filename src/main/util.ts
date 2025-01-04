/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import log from 'electron-log';
import findProcess from 'find-process';
import { rootPath } from '../../release/app/node_modules/electron-root-path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

// export const muDefaultFolder = path.resolve(process.execPath, '..', '..');
export const muDefaultFolder = path.resolve(rootPath, '..', '..');
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _rootPath = rootPath;

export function killMainProcess() {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line promise/catch-or-return
    findProcess('name', 'main.exe', true).then(
      // eslint-disable-next-line promise/always-return
      (list) => {
        log.info(`main.exe process list: `, list);
        try {
          list.forEach((it) => {
            process.kill(it.pid);
          });
        } catch (error) {
          log.error(`process.kill error: `, error);
          reject();
        }
        resolve(true);
      },
      (err) => {
        log.info(`err`, err);
        reject();
      }
    );
  });
}

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
