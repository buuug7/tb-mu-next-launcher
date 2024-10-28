import { useEffect, useState } from 'react';
import { USER_SETTING_KEY } from '../config';

const { electron } = window;

export default function useUserSetting() {
  const [userSetting, setUserSetting] = useState({});

  useEffect(() => {
    const setting = electron.store.get(USER_SETTING_KEY) || {};
    setUserSetting(setting);
  }, []);

  return userSetting;
}

export function updateUserSetting(data) {
  electron.store.set(USER_SETTING_KEY, data);
}
