import Store from 'electron-store';
import { USER_SETTING_KEY } from '../config';

const store = new Store();

export const getUserSetting = () => {
  const userSetting = (store.get(USER_SETTING_KEY) as UserSetting) || {};
  return userSetting;
};

export const setUserSetting = (value: any) => {
  store.set(USER_SETTING_KEY, value);
};

export const setUserSettingKv = (key: string, value: any) => {
  const userSetting = getUserSetting();
  setUserSetting({
    ...userSetting,
    key: value,
  });
};

export default store;
