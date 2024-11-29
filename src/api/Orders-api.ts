import axios from "axios";

const url = import.meta.env.VITE_BASE_URL + "/orders";
export interface OrderData {
    id: number;
    userId: number;
    createAt: Date;
}
export const orders_api = {
    getOrders(jwt: string, params?: {
        page?: number;
        pageSize?: number;
        sortBy?: string;
        descending?: boolean;
    }) {
        return axios.get<OrderData[]>(url, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
            params: params
        });
    },
    getOrderById(jwt: string, orderId: number){
        return axios.get<OrderData>(`${url}/${orderId}`, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
    },
    createOrder(jwt: string, orderData: OrderData){
        return axios.post<OrderData>(url, orderData, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
    },
    updateOrder(jwt: string, orderData: OrderData){
        return axios.put<OrderData>(`${url}/${orderData.id}`, orderData, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
    },
    deleteOrder(jwt: string, orderId: number){
        return axios.delete(`${url}/${orderId}`, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
    },

}