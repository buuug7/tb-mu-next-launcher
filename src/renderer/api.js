import { getBaseUrl } from '../config';
import http from '../http';
import { getDefaultServer } from '../util';

export const getUserData = (userId) => {
  return http.get(`${getBaseUrl()}/api/users/getUser?username=${userId}`);
};

export const getCharacterByUsername = (userId) => {
  return http.get(`/api/users/getCharacterByUsername?username=${userId}`);
};

export const getUpgradeItems = () => {
  return this.getSocketItem();
};

export const getItemStarList = () => {
  const url = `/json/item-star.json`;
  return http.get(url);
};

export const getSocketItem = () => {
  const url = '/json/item-socket.json';
  return http.get(url);
};

export const getSocketItemProperties = () => {
  const server = getDefaultServer();
  return http.get(`/json/socket-item-properties-${server.key}.json`);
};

export const getMuItems = () => {
  return http.get('/json/mu-items.json');
};

export const getRecycleItems = () => {
  return http.get('/json/recycle-items.json');
};

export const getWarehouseInfo = (username) => {
  const url = `/api/users/getWarehouseInfo?username=${username}`;
  return http.get(url);
};

export const getTubieExtendItemInfo = (itemSerial) => {
  const url = `/api/users/getTubieExtendItem?itemSerial=${itemSerial}`;
  return http.get(url);
};

export const getCustomTitles = () => {
  const url = '/json/custom-title.json';
  return http.get(url);
};

export const register = (data) => {
  const url = getBaseUrl() + `/api/register`;
  return http.post(url, data);
};

export const login = (data) => {
  const url = `${getBaseUrl()}/api/login`;
  return http.post(url, data);
};

export const updateUserInfo = (data) => {
  const url = `${getBaseUrl()}/api/users/updateUserInfo`;
  return http.post(url, data);
};

export const changePassword = (data) => {
  const url = `${getBaseUrl()}/api/users/changePassword`;
  return http.post(url, data);
};
