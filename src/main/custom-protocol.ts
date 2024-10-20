import { app, ProtocolRequest, ProtocolResponse } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

const mimeTypes = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.ico': 'image/vnd.microsoft.icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.map': 'text/plain',
};

function charset(mimeExt: string) {
  return ['.html', '.htm', '.js', '.mjs'].some((m) => m === mimeExt)
    ? 'utf-8'
    : undefined;
}

function mime(filename: string) {
  const mimeExt = path.extname(`${filename || ''}`).toLowerCase();
  // @ts-ignore
  const mimeType = mimeTypes[mimeExt];
  return mimeType ? { mimeExt, mimeType } : { mimeExt: null, mimeType: null };
}

export const myResourceSchema = 'my-res';

export const handleMyResourceProtocol = (
  req: ProtocolRequest,
  next: (response: Buffer | ProtocolResponse) => void
) => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const reqUrl = new URL(req.url);
  let reqPath = path.normalize(reqUrl.pathname);
  if (reqPath === '/') {
    reqPath = '/index.html';
  }
  const reqFilename = path.basename(reqPath);
  fs.readFile(path.join(RESOURCES_PATH, reqPath), (err: any, data: any) => {
    const { mimeExt, mimeType } = mime(reqFilename);
    if (!err && mimeType !== null) {
      next({
        mimeType,
        charset: charset(mimeExt),
        data,
      });
    } else {
      console.error(err);
    }
  });
};
