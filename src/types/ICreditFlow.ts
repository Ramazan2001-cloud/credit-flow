export interface PersonalInfoForm {
    firstName: string,
    lastName: string,
    birthDate: string,
    phone: string,
    email: string,
}

export interface AddressInfoForm {
    country: string,
    city: string,
    address: string,
    postalCode: string,
}

export interface FinancialInfoForm {
    monthlyIncome: number;
    creditAmount: number;
    creditTerm: number;
};

export type ICreditType = 'personalInfo' | 'addressInfo' | 'financialInfo';