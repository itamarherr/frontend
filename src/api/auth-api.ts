import axios from "axios";

const baseUrl = "https://localhost:7129/api/auth";

export const register = (form: FormData) =>
  axios.post(`${baseUrl}/register`, form,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

//after successful login, the server will return a token
//and we will store it in the local storage
 export const login = (email: string, password: string) =>
  axios.post(`${baseUrl}/login`, { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data));
    }
    return response;
  });

  export const updateUserProfile = (token:string, form: FormData) =>
  axios.put(`${baseUrl}/update-my-profile`, form,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }); 


export const getCurrentUserProfile = (token: string) =>{
  return axios.get(`${baseUrl}/my-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const auth = { register, login };