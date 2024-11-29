import axios from "axios";

const url = import.meta.env.VITE_BASE_URL + "/services";
export interface ForestSurveyData {
  id: number;
  location: string;
  areaSize: number;
  surveyPurpose: string;
  forestType: string;
  isMeasurementMap: boolean;
  checkListItems: {
    id: number;
    name: string;
    isSelected: boolean;
  }[];
}
export const services_api = {


  getServices(jwt: string) {
    return axios.get<ForestSurveyData[]>(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  createServices(jwt: string, forestSurveyData: ForestSurveyData) {
    return axios.post<ForestSurveyData>(url, forestSurveyData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  updateServices(jwt: string, forestSurveyData: ForestSurveyData) {
    return axios.put<ForestSurveyData>(`${url}/${forestSurveyData.id}`, forestSurveyData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  deleteServices(jwt: string, serviceId: number) {
    return axios.delete(`${url}/${serviceId}`,{
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
};
