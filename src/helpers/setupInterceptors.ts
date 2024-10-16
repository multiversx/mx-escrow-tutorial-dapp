import axios from "axios";

export const setupInterceptors = (authToken: string) => {
  axios.interceptors.request.use(async (config) => {
    config.headers.set("Authorization", `Bearer ${authToken}`);
    return config;
  });
};
