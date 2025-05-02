export const getFormDataFromLocalStorage = () => {
    // Извлекаем данные из localStorage
    const personalInfo = localStorage.getItem('personalInfoData') ? JSON.parse(localStorage.getItem('personalInfoData')!) : {};
    const addressInfo = localStorage.getItem('addressInfoData') ? JSON.parse(localStorage.getItem('addressInfoData')!) : {};
    const financialInfo = localStorage.getItem('financialInfoData') ? JSON.parse(localStorage.getItem('financialInfoData')!) : {};
  
    // Объединяем все данные в одном объекте
    return {
      ...personalInfo,
      ...addressInfo,
      ...financialInfo,
    };
};