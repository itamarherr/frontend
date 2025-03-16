import request from "../utils/axios-interceptors";

const usersUrl = import.meta.env.VITE_BASE_URL + "/Users";

export interface UpdateUserData {
    id?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    imageUrl?: string;
}
export const users_api = {

    getAllUsers: async () => {
        return await request({
            url: "/Users",
            method: "GET",
        });
    },

    getUserById: async (userId: string):Promise<UpdateUserData | null> => {
        try{
            return await request({
                url: `/Users/${userId}`,
                method: "GET",
            });
        }
        catch(error){
            console.error("Error fetching user:", error)
            return null;
        }
    },
    updateUser: async (userId: string, data: UpdateUserData) => {
        return await request({
            url: `/Users/${userId}`,
            method: "PUT",
            data,
        });
    },
    deleteUser: async (userId: string) => {
        return await request({
            url: `/Users/${userId}`,
            method: "DELETE",
        });
    },

    searchUsers : async (query: string) => {
        return await request({
            url: `/Users/search`,
            method: "GET",
            params: { query},
        });
    }
};
