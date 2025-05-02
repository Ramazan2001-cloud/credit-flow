import axios from "axios";
import { getFormDataFromLocalStorage } from "../helpers/formatData";

export const fetchCredit = async () => {
    const allFormData = getFormDataFromLocalStorage();

    const requestData = {
        firstName: allFormData.firstName || '',
        lastName: allFormData.lastName || '',
        birthDate: allFormData.birthDate || '',
        phone: allFormData.phone || '',
        email: allFormData.email || '',
        postalCode: allFormData.postalCode || 0,
        address: allFormData.address || '',
        city: allFormData.city || '',
        country: allFormData.country || '',
        monthlyIncome: allFormData.monthlyIncome || 0,
        creditAmount: allFormData.creditAmount || 0,
        creditTerm: allFormData.creditTerm || 0,
    };

    try {
        const response = await axios.post('https://6814a53b225ff1af16298b84.mockapi.io/api/send-data/credit', requestData);
        if (response.status === 201) {
            return response;
        }
    } catch (err) {
        console.log(err);
    }
};