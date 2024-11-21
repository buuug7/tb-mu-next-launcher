import { useEffect, useState } from 'react';
import {
  EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE,
  USER_SETTING_KEY,
} from '../config';

const { electron } = window;

export function updateUserSetting(data) {
  electron.store.set(USER_SETTING_KEY, data);
}

export default function useUserSetting() {
  const [userSetting, setUserSetting] = useState({});

  useEffect(() => {
    setUserSetting(electron.store.get(USER_SETTING_KEY) || {});

    const unsubscribe1 = electron.store.watchStoreChange();
    const unsubscribe2 = electron.ipcRenderer.on(
      EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE,
      (data) => {
        console.log(`data`, data);
        setUserSetting(data);
      }
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  return userSetting;
}
