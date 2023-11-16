import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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

export function getRequest(url: string) {
  const CancelToken = axios.CancelToken.source();

  return axiosClient(`${url}`, { cancelToken: CancelToken.token }).then(response => response);
}

export default axiosClient;
