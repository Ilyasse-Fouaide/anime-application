import axios from "axios";

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
    return Promise.reject(error);
  }
)

export function getRequest(url: string) {
  const CancelToken = axios.CancelToken.source();

  return axiosClient.get(`/${url}`, { cancelToken: CancelToken.token }).then(response => response);
}

export default axiosClient;
