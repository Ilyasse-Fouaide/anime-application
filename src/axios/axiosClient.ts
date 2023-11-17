import axios, { CancelToken } from "axios";

const axiosClient = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://api.jikan.moe/v4',
});

axiosClient.interceptors.request.use(
  (request) => {
    return request
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
    if (error.response && error.response.status === 429) {
      console.log("Too many request")
    }
    return Promise.reject(error);
  }
)

export function getRequest(url: string, source?: any) {

  return axiosClient.get(`/${url}`, { cancelToken: source }).then(response => response);
}

export default axiosClient;
