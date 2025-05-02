import PersonalInfo from './PersonalInfo';
import AddressInfo from './AddressInfo';
import FinancialInfo from './FinancialInfo';

interface FormStepProps {
    step: number;
    handleSubmit: (step: number | 'send') => void;
}

const FormStep: React.FC<FormStepProps> = ({ step, handleSubmit }) => {

    const savedData = [
        localStorage.getItem('personalInfoData'),
        localStorage.getItem('addressInfoData'),
        localStorage.getItem('financialInfoData')
    ];

    const components = [
        <PersonalInfo onNext={handleSubmit} savedData={savedData[0] ? JSON.parse(savedData[0]!) : undefined} />,
        <AddressInfo onNext={handleSubmit} savedData={savedData[1] ? JSON.parse(savedData[1]!) : undefined} />,
        <FinancialInfo onNext={handleSubmit} savedData={savedData[2] ? JSON.parse(savedData[2]!) : undefined} />,
    ];

    return components[step] || null;
};

export default FormStep;
