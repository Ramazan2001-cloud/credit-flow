import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import './App.css';

function App() {
	const handleNext = (data: any) => {
		console.log("Персональные данные отправлены:", data);
		// здесь можешь переключить шаг формы или сохранить данные в глобальное хранилище
	};
	return (
		<>
			<h1>Персональная информация</h1>
			<PersonalInfo onNext={handleNext} />
		</>
	)
}

export default App
