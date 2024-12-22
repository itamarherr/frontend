import axios from "axios";
import { object } from "yup";

const url = import.meta.env.VITE_BASE_URL + "/Orders"; 
console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL); 
export interface OrderFormData {
    id: number;
    userId: number;
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
    status: number;
    serviceType: string; 
    userEmail: string
}
export interface DatabaseOrder {
    id: number;
    userEmail: string;
    createdAt: string;
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
    additionalNotes?: string;
    totalPrice: number;
    userEmail: string;
    statusTypeString: string;
    // adminNotes?: string;
    // consultancyType: Purpose;
    consultancyTypeString: string;
}
// export enum OrderStatus {
//     pending = 'pending',
//     approved = 'approved',
//     inProgress = 'inProgress',
//     completed = 'completed',
//     cancelled = 'cancelled'
// }
// export enum Purpose {
//     BeforeConstruction = "Before Construction",
//     Dislocations = "Dislocations",
//     TreesIllness = "Trees Illness",
   
//  }
// export function mapPurposeEnum(value: number): Purpose {
//     switch (value) {
//         case 1:
//             return Purpose.BeforeConstruction;
//         case 2:
//             return Purpose.Dislocations;
//         case 3:
//             return Purpose.TreesIllness;
//         default:
//             throw new Error("Invalid Purpose value");
//     }
// }
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
        return axios.post<OrderFormData>(url, orderFormData, {
            headers: {
                Authorization: `bearer ${jwt}`,
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
    // updateOrder(jwt: string, orderFormData: OrderFormData){
    //     return axios.put<OrderFormData>(`${url}/${orderFormData.id}`, orderFormData, {
    //         headers: {
    //             Authorization: `bearer ${jwt}`,
    //         },
    //     });
    // },
    deleteOrder(jwt: string, orderId: number){
        return axios.delete(`${url}/${orderId}`, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
    },

}