import { useEffect, useState } from 'react';
import { EVENT_GET_REGEDIT } from '../config';

const { electron } = window;

export default function useRegeditSetting() {
  const [regeditSetting, setRegeditSetting] = useState({});

  useEffect(() => {
    electron.ipcRenderer.sendMessage(EVENT_GET_REGEDIT, []);

    electron.ipcRenderer.once(EVENT_GET_REGEDIT, (data) => {
      console.log(EVENT_GET_REGEDIT, data);
      setRegeditSetting({
        ID: data.ID.value,
        Resolution: data.Resolution.value,
        MusicOnOff: data.MusicOnOff.value,
        SoundOnOff: data.SoundOnOff.value,
        WindowMode: data.WindowMode.value,
        ColorDepth: data.ColorDepth.value,
      });
    });
  }, []);

  return regeditSetting;
}
