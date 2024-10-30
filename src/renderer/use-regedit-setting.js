import { useEffect, useState } from 'react';

const { electron } = window;

export default function useRegeditSetting() {
  const [regeditSetting, setRegeditSetting] = useState({});

  useEffect(() => {
    electron.ipcRenderer.invoke('getMuRegedit').then((data) => {
      const results = data['HKCU\\Software\\Webzen\\Mu\\Config']?.values;

      if (!results) {
        return;
      }

      setRegeditSetting({
        ID: results.ID.value,
        Resolution: results.Resolution.value,
        MusicOnOff: results.MusicOnOff.value,
        SoundOnOff: results.SoundOnOff.value,
        WindowMode: results.WindowMode.value,
        ColorDepth: results.ColorDepth.value,
      });
    });
  }, []);

  return regeditSetting;
}
