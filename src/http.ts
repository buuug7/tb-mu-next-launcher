import axios from 'axios';
import { defaultServerKey, getBaseUrl, mySessionKey } from './config';
import { fireHttpCustomException } from './renderer/MyCustomEvent';

const instance = axios.create({
  baseURL: getBaseUrl(),
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (globalThis.window) {
      const token = localStorage.getItem(mySessionKey);
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-default-server'] =
        localStorage.getItem(defaultServerKey);
    }

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
    console.log(`error`, error);

    if (globalThis.window) {
      fireHttpCustomException(error);
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
