import axios from "axios";

const url = import.meta.env.VITE_BASE_URL + "/Orders"; 
console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL); 
export interface OrderFormData {
    id: number;
    name: string;
    description?: string;
    numberOfTrees: number;
    city: string;
    street: string;
    number: number;
    imageUrl?: string;
    consultancyType?: string; 
    isPrivateArea: boolean;
    dateForConsultancy: Date;
    editing: boolean;
    userId: number;
    productId: number;
    additionalNotes?: string;
    totalPrice?: number;
    status: string;                // New field for the order status (Pending/Completed)
    orderDate: Date;  
}
export const orders_api = {
    getOrders(jwt: string, params?: {
        page?: number;
        pageSize?: number;
        sortBy?: string;
        descending?: boolean;
    }) {
        return axios.get<OrderFormData[]>(url, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
            params: params
        });
    },
    getOrderById(jwt: string, orderId: number){
        return axios.get<OrderFormData>(`${url}/${orderId}`, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
    },
    createOrder(jwt: string, orderFormData: OrderFormData){
        console.log('Full URL:', url );
        return axios.post<OrderFormData>(url, orderFormData, {
            headers: {
                Authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json' 
            },
        })
        .catch(error => {
            console.error('Request data:', orderFormData); 
            console.error('Error response:', error.response?.data); 
            throw error;
        });
    },
    updateOrder(jwt: string, orderFormData: OrderFormData){
        return axios.put<OrderFormData>(`${url}/${orderFormData.id}`, orderFormData, {
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