import { object } from "yup";
import request from "../utils/axios-interceptors";

export interface OrderFormData {
    id: number;
    userId: string;
    productId: number;
    userName: string;
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
    dateForConsultancy: Date; 
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

  export interface OrdersApiResponse {
    orders: DatabaseOrder[];
    totalItems: number;
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

export interface UpdateOrderData {
    id: number;
    userId: string;
    productId?: number; 
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
export interface SearchOrderResponse{
    id: number;
    userEmail: string;
    userName: string;
    serviceType: string;
    city: string;
    statusTypeString: string;
    consultancyTypeString: string;   
}

export const orders_api = {
    getOrders: async(params: { page: number; pageSize: number; sortBy: string; descending: boolean }) =>  {
        return await request<OrdersApiResponse>({
            url: "/Orders",
            method: "GET",
            params,
    });
    },
    getOrderById: async(orderId: number):Promise<OrderFormData> =>{
        if (!orderId || isNaN(orderId)) {
            throw new Error("Invalid order ID provided.");
          }
            return await request<OrderFormData>({
             url: `/Orders/${orderId}`,
             method: "GET"   
            }); 
    },
    
    getMyOrder: async() => {
        return await request<OrderResponse>({
         url: "/Orders/my-orders",
         method: "GET"
        });
    },
    createOrder: async (orderFormData: OrderFormData) => {
        return await request<OrderFormData>({
         url: "/orders",
         method: "POST",
         data: orderFormData
        })  
    },
    getMyOrderForUpdate: async () => {
        return await request<OrderFormData>({
        url: "/Orders/my-orders/for-update",
        method: "GET"
        });
    },
    updateOrder: async(orderFormData: OrderFormData) => {
        return await request<OrderFormData>({
     url: `/Orders/${orderFormData.id}`,
     method: "PUT",
     data: orderFormData
        });
    },
    updateMyOrder: async(orderFormData: OrderFormData) => {
        return await request<OrderFormData>({
            url: `/Orders/my-orders/for-update`,
            method: "PUT",
            data: orderFormData
        });
    },
    deleteOrder: async(orderId: number) => {
        return await request({
            url: `/Orders/Delete/${orderId}`,
            method: "DELETE"
        });
    },
    deleteMyOrder: async() => {
       
            return await request({
              url: "/Orders/my-orders/latest",
            method: "DELETE"
            });
        },

    searchOrders: async (query: string ): Promise<SearchOrderResponse[]>=>{
            return await request<SearchOrderResponse[]>({
                url: `/Orders/search`,
                method: "GET",
                params: {query},
            })
        }
    }


