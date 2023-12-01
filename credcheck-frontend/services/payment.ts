import api from '../interceptors/api';
import { API_CONSTANTS } from '../constants/api_endpoints.constants';
const confirmPayment = async (paymentMethod: any, amountDue: String) => {
    try {
        const payload = {
            amount: amountDue,
            id: paymentMethod
        }
        let response = await api.post(`${API_CONSTANTS.BASE_URL}${API_CONSTANTS.PAYMENT}`, payload);
        return response;
    } catch (err) {

    }
}

export default confirmPayment;