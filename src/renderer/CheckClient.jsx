import {
  EVENT_UPDATE_PROGRESS,
  EVENT_UPDATE_FINISHED,
  EVENT_CHECK_CLIENT_UPDATE,
} from 'config';
import { forwardRef, useImperativeHandle, useState } from 'react';

const { electron } = window;

function checkClientUpdate({ onProgress = () => {}, force = false }) {
  return new Promise((resolve, reject) => {
    electron.ipcRenderer.on(EVENT_UPDATE_PROGRESS, (payload) => {
      console.log(EVENT_UPDATE_PROGRESS, payload);
      onProgress(payload);
    });

    electron.ipcRenderer.once(EVENT_UPDATE_FINISHED, () => {
      console.log(EVENT_UPDATE_FINISHED);
      resolve();
    });

    electron.ipcRenderer.sendMessage(EVENT_CHECK_CLIENT_UPDATE, [
      {
        forceUpdate: force,
      },
    ]);
  });
}

function CheckClient(props, ref) {
  const [progress, setProgress] = useState(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        checkUpdate(force) {
          return checkClientUpdate({
            onProgress: setProgress,
            force,
          }).then(() => {
            setProgress(null);
          });
        },
      };
    },
    []
  );

  return (
    <div className="CheckClient">
      {progress && (
        <div className="my-2 py-2 px-0 text-left text-primary text-break">
          [{progress.updateCount}/{progress.total}] {progress.currentFile}
        </div>
      )}
    </div>
  );
}

export default forwardRef(CheckClient);
