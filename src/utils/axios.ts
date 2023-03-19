import axios, { AxiosInstance } from 'axios';

import config from '@/config';
import { getToken } from '@/helpers/auth';

const instance: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
