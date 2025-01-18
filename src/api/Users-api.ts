import React from 'react'
// import axios from 'axios'
import request from "../utils/axios-interceptors";

const usersUrl = import.meta.env.VITE_BASE_URL + "/Users";

export interface UpdateUserData {
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    imageUrl?: string;
    // Add other fields as needed
}
export const users_api = {
    getAllUsers: () => {
  return request({
    url: "/Users",
    method: "GET",
    
});
},
getUserByid: (userId: string) => {
    return  request({
        url: `/Users/${userId}`,
        method: "GET",
    });
},
updateUser: (userId: string, data: UpdateUserData) => {
    return request({
        url: `/Users/${userId}`,
        method: "PUT",
        data,
    });
},
deleteUser: (userId: string) => {
    return request({
        url: `/Users/${userId}`,
        method: "DELETE",
    });
}
}
