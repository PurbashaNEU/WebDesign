import { API_CONSTANTS } from '../constants/api_endpoints.constants';
import api from '../interceptors/api';

export const fetchAmountDue = async (cardId: String): Promise<any> => {
    try {
        const res = await api.get(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.EXPENDITURE}${API_CONSTANTS.EXPENDITURE_TOTAL_AMNT}${cardId}`);
        return res;
    } catch (err) {
        return err;
    }
}

export const fetchExpenditureDetails = async(cardId: String): Promise<any> => {
    try {
        const res = await api.get(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.EXPENDITURE}${cardId}`);
        return res;
    } catch (err) {
        return err;
    }
}