import Store from 'electron-store';
import { USER_SETTING_KEY } from './config';

const store = new Store({
  watch: true,
});

export const getUserSetting = () => {
  const userSetting = (store.get(USER_SETTING_KEY) as UserSetting) || {};
  return userSetting;
};

export const setUserSetting = (value: any) => {
  store.set(USER_SETTING_KEY, value);
};

// 杂项
export const someStoreSubscribe: { onDidAnyChangeSubscribe: any[] } = {
  onDidAnyChangeSubscribe: [],
};

export default store;
