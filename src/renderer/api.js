import http from '../http';
import { getBaseUrl } from '../config';
import { getDefaultServer } from '../util';

export const register = (data) => {
  const url = getBaseUrl() + `/mu/api/register`;
  return http.post(url, data);
};

export const login = (data) => {
  const url = `${getBaseUrl()}/mu/api/login`;
  return http.post(url, data);
};

export const getMyData = () => {
  return http.get(`${getBaseUrl()}/mu/api/my`);
};

export const updateUserData = (userId, payload) => {
  const url = `${getBaseUrl()}/mu/api/users/${userId}`;
  return http.put(url, payload);
};

export const changePassword = (userId, payload) => {
  const url = `${getBaseUrl()}/mu/api/users/${userId}/changePassword`;
  return http.put(url, payload);
};

/* 11111111 */

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
