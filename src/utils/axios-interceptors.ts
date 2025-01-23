import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const client = axios.create({
baseURL:  baseUrl,
})


client.interceptors.request.use(
  (config) =>{
    const jwt = localStorage.getItem("token");
    if(jwt){
config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) =>  response,
  (error) => {
    if(error.response && error.response.status === 401){
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const request = async (options: AxiosRequestConfig) => {
  try {
    const response = await client(options);
    return response.data;
  } catch (error) {
    console.log("requesr error:", error)
    throw error;
  }
}
export default request;
