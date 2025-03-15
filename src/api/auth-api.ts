import axios from "axios";

const baseUrl = "https://localhost:7129/api/auth";

export const register = (form: FormData) =>
  axios.post(`${baseUrl}/register`, form,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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


  export const getCurrentUserProfile = async (token: string) => {
    try {
      const response = await axios.get(`${baseUrl}/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Fetched Current User Profile:", response); // Debugging
      return response;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  };

export const auth = { register, login };