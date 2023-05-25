import axios from 'axios';

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    Accept: 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default request;
