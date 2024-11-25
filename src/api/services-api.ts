import axios from "axios";

const url = import.meta.env.VITE_BASE_URL + "/services";

export const getServices = (jwt: string) =>{
  return axios.get(url,{
    headers: {
        Authorization: `Bearer ${jwt}`,
    },
  });
};