import path from 'path';
import log from 'electron-log';
import fs from 'fs';
import axios from '../http';
import { killMainProcess, muDefaultFolder, _rootPath } from './util';
import { getUserData, setUserData } from './store';
import {
  EVENT_CHECK_CLIENT_UPDATE,
  EVENT_UPDATE_FINISHED,
  EVENT_UPDATE_PROGRESS,
  servers,
} from '../config';

export async function downloadByUrl(url: string, filePath: string) {
  try {
    const response = await axios({
      url: encodeURI(url),
      method: 'get',
      responseType: 'stream',
    });

    const chunks: any[] = [];

    console.log(
      `download: status=${response.status},url=${url},filePath=${filePath}`
    );

    return await new Promise((resolve, reject) => {
      response.data.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      response.data.on('error', (err: any) => {
        reject(err);
      });

      response.data.on('end', () => {
        const buf = Buffer.concat(chunks);
        const dirName = path.dirname(filePath);

        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, {
            recursive: true,
          });
        }

        fs.writeFileSync(filePath, buf);
        resolve('下载成功');
      });
    });
  } catch (err: any) {
    console.log(err.response.status);
    const message = err.response
      ? `status: ${err.response.status},statusText: ${err.response.statusText}`
      : 'Unknown Error';
    return Promise.reject(new Error(message));
  }
}

export async function downloadUpdatedFiles(
  event: Electron.IpcMainEvent,
  forceUpdate = false
) {
  const userData = getUserData();
  const defaultServer = userData.server || servers[0];
  const muFolder = userData.muFolder || muDefaultFolder;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const version = userData[`version-${defaultServer.key}`] || 0;
  const updateUrl = `mu/api/update/check?server=${defaultServer.key}`;

  try {
    // get updated items from server
    const response = await axios.get(updateUrl, {
      maxContentLength: Infinity,
    });
    const { data }: { data: UpdateData } = response;

    log.info(`Update Response Data: `, data);

    const needUpdate = data.version > parseInt(version, 10) || forceUpdate;

    const logUpdateInfo = {
      forceUpdate,
      latestVersion: data.version,
      currentVersion: version,
      needUpdate,
      status: response.status,
    };

    log.info(`update info: `, logUpdateInfo);

    if (!needUpdate) {
      const msg = `当前版本是最新的，无需更新!`;
      event.reply(EVENT_UPDATE_FINISHED, {
        msg,
        finished: true,
      });
      return;
    }

    const updateItems = data.items.map((filename) => {
      return {
        link: data.baseUrl + '/' + filename,
        filePath: path.join(muFolder, filename),
        filename,
      };
    });

    if (updateItems.length > 0) {
      // 更新前杀死正在运行的 main.exe
      killMainProcess();
    }

    log.info(`updateItems`, updateItems);
    log.info(`begin download update files`);

    let updateCount = 0;
    let errorCount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of updateItems) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await downloadByUrl(item.link, item.filePath);
        updateCount += 1;

        event.reply(EVENT_UPDATE_PROGRESS, {
          updateCount: updateCount,
          total: updateItems.length,
          currentFile: item.filename,
          finished: false,
        });
      } catch (err: any) {
        console.log(err.message);
        errorCount += 1;
      }
    }

    if (errorCount === 0) {
      setUserData({
        ...userData,
        [`version-${defaultServer.key}`]: data.version,
      });
    }

    event.reply(
      EVENT_UPDATE_FINISHED,
      JSON.stringify({
        msg: `启动游戏`,
        finished: true,
      })
    );
  } catch (error: any) {
    console.log('error:', error.message);
    event.reply(EVENT_UPDATE_FINISHED, {
      msg: `更新异常, 请稍后再试`,
      finished: true,
    });
  }
}

export async function run(event: Electron.IpcMainEvent, args: any[]) {
  const userData = getUserData();
  let forceUpdate = false;

  if (args.length > 0) {
    forceUpdate = args[0].forceUpdate;
  }

  const muFolder = userData.muFolder || muDefaultFolder;

  log.info(`muDefaultFolder: ${muDefaultFolder}`);
  log.info(`_rootPath: ${_rootPath}`);

  if (!muFolder) {
    event.reply(EVENT_CHECK_CLIENT_UPDATE, '请设置 MU 客户端目录');
    return;
  }

  downloadUpdatedFiles(event, forceUpdate);
}
