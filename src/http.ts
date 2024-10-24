import axios from 'axios';
import { getBaseUrl, mySessionKey } from './config';
import { fireHttpCustomException } from './renderer/MyCustomEvent';

const instance = axios.create({
  baseURL: getBaseUrl(),
});

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
    console.log(`error`, error);
    fireHttpCustomException(error);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
