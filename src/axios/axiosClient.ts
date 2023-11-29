import axios from "axios";
import axiosRateLimit from "axios-rate-limit";
import { baseURL } from "./baseUrl";

const axiosClient = axios.create({
  baseURL: baseURL,
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
    if (error.message === "Network Error") {
      window.location.href = "/error"
    }

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
