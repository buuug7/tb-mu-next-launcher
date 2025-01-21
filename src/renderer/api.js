import http from '../http';

export const register = (data) => {
  return http.post('/mu/api/register', data);
};

export const login = (data) => {
  return http.post('/mu/api/login', data);
};

export const getMyData = () => {
  return http.get(`/mu/api/my`);
};

export const updateUserData = (payload) => {
  return http.put('/mu/api/users/updateUser', payload);
};

export const changePassword = (payload) => {
  return http.put('/mu/api/users/changePassword', payload);
};

export const getUserOnlineStatus = () => {
  return http.get(`/mu/api/users/onlineStatus`);
};

export const getCharactersByPage = (query) => {
  return http.get(`/mu/api/users/characters`, {
    params: query,
  });
};

export const buyVip = (payload) => {
  return http.post(`/mu/api/users/buyVip`, payload);
};

export const cancelVip = () => {
  return http.post(`/mu/api/users/cancelVip`);
};

export const getCharacterByUsername = (username) => {
  return http.get(`/mu/api/users/${username}/characters`);
};

export const getSomeJson = (id) => {
  return http.get(`/mu/api/json/${id}`);
};

export const customTitle = (data) => {
  return http.post(`/mu/api/users/customTitle`, data);
};

export const changeCharacterName = (data) => {
  return http.post(`/mu/api/users/changeCharacterName`, data);
};

export const customExt1Update = (data) => {
  return http.post(`/mu/api/users/customExt1Update`, data);
};

export const autoResetConfig = (data) => {
  return http.post(`/mu/api/users/autoResetConfig`, data);
};

export const customExt1Reset = (data) => {
  return http.post(`/mu/api/users/customExt1Reset`, data);
};

export const selfHelp = (data) => {
  return http.post(`/mu/api/users/selfHelp`, data);
};

export const toThirdEvolution = (data) => {
  return http.post(`/mu/api/users/characters/toThirdEvolution`, data);
};

export const backToSecondEvolution = (data) => {
  return http.post(`/mu/api/users/characters/backToSecondEvolution`, data);
};

export const deleteCharacter = (data) => {
  return http.post(`/mu/api/users/deleteCharacter`, data);
};

export const getWarehouseInfo = () => {
  return http.get(`/mu/api/users/warehouseInfo`);
};

export const updateWarehouseFirstItem = (data) => {
  return http.post(`/mu/api/users/warehouse/updateFirstItem`, data);
};

export const itemCheckSocket = (category, index) => {
  return http.get(`/mu/api/items/checkSocket/${category}/${index}`);
};

export const addPoints = (data) => {
  return http.post(`/mu/api/users/characters/addPoints`, data);
};

export const resetPoints = (data) => {
  return http.post(`/mu/api/users/characters/resetPoints`, data);
};

export const recycleCharacter = (data) => {
  return http.post(`/mu/api/users/characters/recycleCharacter`, data);
};

export const resetLife = (data) => {
  return http.post(`/mu/api/users/characters/resetLife`, data);
};

export const getPost = (name) => {
  return http.get(`/mu/api/posts/${name}`);
};

export const getPosts = () => {
  return http.get(`mu/api/posts`);
};
