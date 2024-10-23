import http from '../http';
import { getBaseUrl } from '../config';

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

export const changePassword = (payload) => {
  const url = `${getBaseUrl()}/mu/api/users/changePassword`;
  return http.put(url, payload);
};

export const getUserOnlineStatus = () => {
  return http.get(`${getBaseUrl()}/mu/api/users/onlineStatus`);
};

export const getCharactersByPage = (query) => {
  return http.get(`${getBaseUrl()}/mu/api/users/characters`, {
    params: query,
  });
};

export const buyVip = (payload) => {
  return http.post(`${getBaseUrl()}/mu/api/users/buyVip`, payload);
};

export const cancelVip = () => {
  return http.post(`${getBaseUrl()}/mu/api/users/cancelVip`);
};

export const getCharacterByUsername = (username) => {
  return http.get(`${getBaseUrl()}/mu/api/users/${username}/characters`);
};

export const getSomeJson = (id) => {
  return http.get(`${getBaseUrl()}/mu/api/json/${id}`);
};

export const customTitle = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/customTitle`, data);
};

export const changeCharacterName = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/changeCharacterName`, data);
};

export const customExt1Update = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/customExt1Update`, data);
};

export const customExt1Reset = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/customExt1Reset`, data);
};

export const selfHelp = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/selfHelp`, data);
};

export const toThirdEvolution = (data) => {
  return http.post(
    `${getBaseUrl()}/mu/api/users/characters/toThirdEvolution`,
    data
  );
};

export const backToSecondEvolution = (data) => {
  return http.post(
    `${getBaseUrl()}/mu/api/users/characters/backToSecondEvolution`,
    data
  );
};

export const deleteCharacter = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/deleteCharacter`, data);
};

export const getWarehouseInfo = () => {
  return http.get(`${getBaseUrl()}/mu/api/users/warehouseInfo`);
};

export const updateWarehouseFirstItem = (data) => {
  return http.post(
    `${getBaseUrl()}/mu/api/users/warehouse/updateFirstItem`,
    data
  );
};

export const itemCheckSocket = (category, index) => {
  return http.get(
    `${getBaseUrl()}/mu/api/items/checkSocket/${category}/${index}`
  );
};

export const addPoints = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/characters/addPoints`, data);
};

export const resetPoints = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/characters/resetPoints`, data);
};

export const recycleCharacter = (data) => {
  return http.post(
    `${getBaseUrl()}/mu/api/users/characters/recycleCharacter`,
    data
  );
};

export const resetLife = (data) => {
  return http.post(`${getBaseUrl()}/mu/api/users/characters/resetLife`, data);
};

/* 11111111 */

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

export const getRecycleItems = () => {
  return http.get('/json/recycle-items.json');
};

export const getTubieExtendItemInfo = (itemSerial) => {
  const url = `/api/users/getTubieExtendItem?itemSerial=${itemSerial}`;
  return http.get(url);
};
