import axios from "axios"
const url = "http://195.158.9.124:4109"
const api = axios.create({
  baseURL: url,
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('hospital_token' || "")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {api, url}