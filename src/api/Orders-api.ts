import axios from "axios";
import { object } from "yup";

const url = import.meta.env.VITE_BASE_URL + "/Orders"; 
console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL); 
export interface OrderFormData {
    id: number;
    userId: string;
    productId: number;
    // imageUrl: string;
    adminNotes?: string; 
    totalPrice: number;
    additionalNotes?: string; 
    numberOfTrees: number;
    city: string;
    street: string;
    number: number;
    consultancyType: number; 
    isPrivateArea: boolean;
    dateForConsultancy: string; 
    createdAt: string; 
    statusType: number;
    serviceType: string; 
    userEmail: string
}
export interface DatabaseOrder {
    id: number;
    userEmail: string;
    createdAt: string;
    totalPrice: number;
  }
  export interface OrderResponse {
    id: number;
    userId: string;
    userName: string;
    createdAt: string;
    serviceType: string;
    city: string;
    street: string;
    number: number;
    isPrivateArea: boolean;
    dateForConsultancy: string;
    numberOfTrees: number;
    additionalNotes?: string;
    totalPrice: number;
    userEmail: string;
    statusType: number;
    consultancyType: number;
}
// const mapResponseToFormData = (response: OrderResponse): Partial<OrderFormData> => ({
//     id: response.id,
//     userId: response.userId,
//     productId: response.productId,
//     adminNotes: response.adminNotes || "",
//     totalPrice: response.totalPrice,
//     additionalNotes: response.additionalNotes || "",
//     numberOfTrees: response.numberOfTrees,
//     city: response.city,
//     street: response.street,
//     number: response.number,
//     consultancyType: response.consultancyType,
//     isPrivateArea: response.isPrivateArea,
//     dateForConsultancy: response.dateForConsultancy,
//     createdAt: response.createdAt,
//     statusType: response.statusType,
//     userEmail: response.userEmail,
//     serviceType: response.serviceType
//   });
export interface UpdateOrderData {
    id: number;
    userId: string;
    productId?: number; // Optional if not always updated
    adminNotes?: string;
    totalPrice: number;
    additionalNotes?: string;
    numberOfTrees: number;
    city: string;
    street: string;
    number: number;
    consultancyType: number;
    isPrivateArea: boolean;
    dateForConsultancy: string;
    statusType: number;
    serviceType: string;
    userEmail: string;
}
export const orders_api = {
    getOrders(jwt: string, params?: {
        page?: number;
        pageSize?: number;
        sortBy?: string;
        descending?: boolean;
    }) {
        return axios.get<DatabaseOrder[]>(url, {
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
    getMyOrder(jwt: string) {
        return axios.get<OrderResponse>(`${url}/my-orders`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
    },
    createOrder(jwt: string, orderFormData: OrderFormData){
        console.log('Constructed URL:', url); console.log('JWT Token:', jwt); console.log('Order Form Data:', JSON.stringify(orderFormData, null, 2));
        return axios.post<OrderFormData>(url, orderFormData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json' 
            },
        })
        .catch(error => {
            if (error.response?.data?.errors) {
                const validationErrors = error.response.data.errors;
        
                Object.entries(validationErrors).forEach(([field,messages]) => {
                    if(Array.isArray(messages)){
                        console.error(`Field ${field} has errors: ${messages.join(", ")}`);
                    }
                });
            } else {
                console.error("An unknown error occurred:", error);
            }
            throw error;
        });
        
    },
    getMyOrderForUpdate(jwt: string) {
        return axios.get<OrderFormData>(`${url}/my-orders/for-update`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
    },
    updateOrder(jwt: string, orderFormData: OrderFormData){
        return axios.put<OrderFormData>(`${url}/${orderFormData.id}`, orderFormData, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
    },
    updateMyOrder(jwt: string, orderFormData: OrderFormData){
        return axios.put<OrderFormData>(`${url}/my-orders/for-update`, orderFormData, {
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
    async deleteMyOrder(jwt: string){
        try {
            return await axios.delete(`${url}/my-orders/latest`, {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            });
        } catch (error) {
            console.error("Failed to delete order:", error.response || error.message);
            throw error;
        }
    },

}