import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
const appId = process.env.NEXT_PUBLIC_API_APP_ID;

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 1000,
  headers: { "app-id": appId },
});

apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiClient;
