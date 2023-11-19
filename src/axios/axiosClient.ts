import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

const axiosClient = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://api.jikan.moe/v4',
});

const rateLimitedAxios = axiosRateLimit(axiosClient, {
  maxRequests: 1, // Maximum number of requests allowed
  perMilliseconds: 1000, // in milliseconds
});

rateLimitedAxios.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error);
  }
)

rateLimitedAxios.interceptors.response.use(
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

  return rateLimitedAxios.get(`/${url}`, { cancelToken: source }).then(response => response);
}

export default rateLimitedAxios;
