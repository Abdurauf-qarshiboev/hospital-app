import axios from "axios";
const url = 'https://hospital.hamkasb.uz'
// const url = "https://hospitalapi.talk2me.uz";
const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${
      $cookies.get("hospital_token") || ''
    }`;
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    console.log("eeerrr", error);
    return Promise.reject(error);
  }
);

export { url, api };
