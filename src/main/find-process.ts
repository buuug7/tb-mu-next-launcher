import { exec } from 'child_process';

interface ProcessInfo {
  name: string;
  pid: number;
}

function getCommandForPlatform(platform: NodeJS.Platform): string {
  switch (platform) {
    case 'win32':
      return 'tasklist';
    case 'darwin':
      return 'ps -ax';
    case 'linux':
      return 'ps -A';
    default:
      throw new Error('Unsupported platform');
  }
}

// TODO: linux and macos need to be tested
function parseProcessList(stdout: string): ProcessInfo[] {
  return stdout
    .split('\n')
    .map((line) => {
      const [name, pid] = line.trim().split(/\s+/);
      return { name, pid: Number(pid) };
    })
    .filter((process) => process.name && !Number.isNaN(process.pid));
}

function getProcessList(): Promise<ProcessInfo[]> {
  return new Promise((resolve, reject) => {
    const platform = process.platform;

    let cmd: string;
    try {
      cmd = getCommandForPlatform(platform);
    } catch (error) {
      reject(error);
      return;
    }

    exec(cmd, (err, stdout: string, stderr: string) => {
      if (err) {
        reject(new Error(`Error: ${err.message}`));
        return;
      }

      const psList = parseProcessList(stdout);
      resolve(psList);
    });
  });
}

// find process by name
function findProcessByName(processName: string): Promise<ProcessInfo[]> {
  return getProcessList().then((psList) =>
    psList.filter((ps) => ps.name === processName)
  );
}

export default findProcessByName;
