import axios from 'axios';
import { mySessionKey } from './config';
import { fireHttp401Event } from './renderer/MyCustomEvent';

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      mySessionKey
    )}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      !error.config.url.includes('/mu/api/login') // 排除登录接口
    ) {
      fireHttp401Event(error.response);
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
