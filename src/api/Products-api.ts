import axios from "axios";

const url = import.meta.env.VITE_BASE_URL + "/Products";
export interface ConsultancyOakData {
  
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
}
export const Products_api = {


  getProducts(jwt: string) {
    return axios.get<ConsultancyOakData[]>(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  createProducts(jwt: string, consultancyOakData: ConsultancyOakData) {
    return axios.post<ConsultancyOakData>(url, consultancyOakData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  updateProducts(jwt: string, consultancyOakData: ConsultancyOakData) {
    return axios.put<ConsultancyOakData>(`${url}/${consultancyOakData.id}`, consultancyOakData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  deleteProducts(jwt: string, productId: number) {
    return axios.delete(`${url}/${productId}`,{
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
};
