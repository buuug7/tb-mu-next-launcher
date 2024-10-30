import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { MuConfigContext } from './MuConfigProvider';
import {
  EVENT_UPDATE_PROGRESS,
  EVENT_UPDATE_FINISHED,
  EVENT_CHECK_CLIENT_UPDATE,
} from '../config';

const { electron } = window;

function checkClientUpdate({
  onProgress = () => {},
  force = false,
  servers = [],
}) {
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = electron.ipcRenderer.on(
        EVENT_UPDATE_PROGRESS,
        (payload) => {
          console.log(EVENT_UPDATE_PROGRESS, payload);
          onProgress(payload);
        }
      );

      electron.ipcRenderer.once(EVENT_UPDATE_FINISHED, () => {
        console.log(EVENT_UPDATE_FINISHED);
        resolve(unsubscribe);
      });

      electron.ipcRenderer.sendMessage(EVENT_CHECK_CLIENT_UPDATE, [
        {
          forceUpdate: force,
          servers,
        },
      ]);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function CheckClient(props, ref) {
  const { muConfig } = useContext(MuConfigContext);
  const [progress, setProgress] = useState(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        checkUpdate(force) {
          return checkClientUpdate({
            onProgress: setProgress,
            servers: muConfig?.servers || [],
            force,
          })
            .then((unsubscribe) => {
              setProgress(null);
              unsubscribe();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      };
    },
    [muConfig]
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
