import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const onSuccess = (response) => {
  console.debug("Request Successful!", response);
  return response;
};

const onError = (error) => {
  console.error("Request Failed:", error);
  return error;
};

const request = async (options: AxiosRequestConfig) => {
   try {
    const response = await client(options);
    console.log("response:", response);
    console.log("response:", response.data);
    console.log("options:",options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

//request({ url: "/products", method: "GET" })
export default request;