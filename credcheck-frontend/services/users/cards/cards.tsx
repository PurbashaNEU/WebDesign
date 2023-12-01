import axios from 'axios';
import { async } from 'rxjs';
import { API_CONSTANTS } from '../../../constants/api_endpoints.constants';
import api from '../../../interceptors/api';


const BASE_URL = 'http://localhost:8000'

export const addCards = async(route:string,payload: any): Promise<any> => {
    try {
        let response = await api.post(`${BASE_URL}${route}`, payload);
        return response;
    }
    catch (err) {
        return err
    }
}


export const getCards = async(route:string): Promise<any> => {
    try {
        let response = await api.get(`${BASE_URL}${route}`);
        return response;
    }
    catch (err) {
        return err
    }
}

export const fetchCardDetails = async (id: String): Promise<any> => {
    try {
        let response = await api.get(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.CARD_DETAIL}/${id}`);
        return response;
    } catch (err) {
        return err;
    }
} 

export const updateCard = async(payload:any): Promise<any> => {
    try {
        let response = await api.put(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.CARD_DETAIL}`,payload);
        return response;
    } catch (err) {
        return err;
    }
} 

