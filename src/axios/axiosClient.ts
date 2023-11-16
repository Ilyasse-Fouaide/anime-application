import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://api.jikan.moe/v4/',
});

axiosClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default axiosClient;
