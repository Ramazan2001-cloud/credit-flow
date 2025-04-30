import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import './App.css';
// import AddressInfo from './components/AddressInfo/AddressInfo';

const title = ['Персональная информация', 'Адресная информация', 'Финансовая информация'];

function App() {
	const handleNext = (data: any) => {
		console.log("Персональные данные отправлены:", data);
		// здесь можешь переключить шаг формы или сохранить данные в глобальное хранилище
	};
	return (
		<>
			<h1>Персональная информация</h1>
			<PersonalInfo onNext={handleNext} />
			{/* <h1>Адресная информация</h1>
			<AddressInfo onNext={handleNext} /> */}
		</>
	)
}

export default App;
