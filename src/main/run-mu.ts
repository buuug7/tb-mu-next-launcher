import child from 'child_process';
import { dialog } from 'electron';
import { defaultIp, defaultPort } from '../config';
import { muDefaultFolder } from './util';
import { getUserSetting } from './store';

export default async function run() {
  const userSetting = getUserSetting();
  const muFolder = userSetting.muFolder || muDefaultFolder;

  let ipAndPortArr = [defaultIp, defaultPort];
  if (userSetting.ipAndPort) {
    ipAndPortArr = userSetting.ipAndPort.split(':');
  }

  if (!muFolder) {
    dialog.showMessageBox({
      message: '请设置 MU 客户端目录',
    });
    return;
  }

  const executablePath = `${muFolder}\\main.exe`;
  const param = ['connect', `/u${ipAndPortArr[0]}`, `/p${ipAndPortArr[1]}`];

  child.execFile(
    executablePath,
    param,
    {
      cwd: muFolder,
    },
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      }
    }
  );
}
