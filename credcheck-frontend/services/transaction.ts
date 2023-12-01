import { API_CONSTANTS } from '../constants/api_endpoints.constants';
import api from '../interceptors/api';

export const addTransactionDetails = async (payload: any): Promise<any> => {
    try {
        let res  = await api.post(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.TRANSACTION}`, payload);
        return res;
    } catch (err) {
        return err;
    }
}

export const fetchTransactionDetails = async (cardId: String): Promise<any> => {
    try {
        const res = await api.get(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.TRANSACTION}${cardId}`);
        return res;
    } catch (err) {
        return err;
    }
}

export const fetchTransactionByMonth = async (cardId: String): Promise<any> => {
    try {
        const res = await api.get(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.TRANSACTION}${API_CONSTANTS.TRANSACTION_BY_MONTH}${cardId}`);
        return res;
    } catch (err) {
        return err;
    }
}

