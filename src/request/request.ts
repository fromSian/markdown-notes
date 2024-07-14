import axios from "axios";
import { httpErrorHandler } from "./error";
const request = axios.create({
  baseURL: "/api",
});

request.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseHandler = (response) => {
  const config = response?.config;
  if (config.raw) {
    return response;
  }
  if (response.data) {
    const { success, message, ...rest } = response.data;
    if (!success) {
      throw new Error(message);
    }
    return rest;
  } else {
    throw new Error("Failed to fetch data");
  }
};
const errorHandler = (response) => {
  const config = response?.config;
  if (config.raw) {
    return response;
  }
  // the code of this function was written in above section.
  return httpErrorHandler(response);
};
request.interceptors.response.use(responseHandler, errorHandler);
export default request;
