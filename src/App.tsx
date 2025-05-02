import { useEffect, useState } from 'react';
import { Button, Col, Layout, notification, Progress, Row, Typography } from 'antd';
const { Title } = Typography;
const { Content } = Layout;
import { ArrowLeftOutlined } from '@ant-design/icons';
import FormStep from './components/FormStep';
import { fetchCredit } from './http/axios';
import './App.css';

const title = ['Персональная информация', 'Адресная информация', 'Финансовая информация'];

function App() {
	const [step, setStep] = useState<number>(parseInt(localStorage.getItem('step') || '0'));
	const [percent, setPercent] = useState(0);
	const totalSteps = 3;

	const [api, contextHolder] = notification.useNotification();

	const openNotification = (type: 'success' | 'error', message: string, description: string) => {
		api.open({
			message,
			description,
			type,
			duration: 3,
		});
	};

	const handleSubmit = async (step: number | 'send') => {
		if (step === 'send') {
			try {
				const response = await fetchCredit();
				if (response?.status === 201) {
					openNotification('success', 'Ваша заявка отправлена на рассмотрение', 'Мы скоро свяжемся с вами для уточнения деталей.');
					progressPercent();
				} else {
					openNotification('error', 'Ошибка', 'Что-то пошло не так. Пожалуйста, попробуйте снова.');
				}
			} catch (err) {
				openNotification('error', 'Ошибка', 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.');
				console.error(err);
			}
		} else {
			setStep(step);
		}
	};

	const handleBack = () => {
		if (step > 0) {
			setStep(prev => prev - 1);
		}
	};

	const getProgressColor = (percent: number): string => {
		if (percent < 25) return '#ff4d4f';
		if (percent < 50) return '#fadb14';
		if (percent < 75) return '#fa8c16';
		return '#52c41a';
	};

	const progressPercent = () => {
		const filled = [
			localStorage.getItem('personalInfoData'),
			localStorage.getItem('addressInfoData'),
			localStorage.getItem('financialInfoData'),
		].filter(Boolean).length;

		// Если нет данных, возвращаемся к первому шагу
		if (!filled) {
			setStep(0);
		}

		// Вычисляем процент завершения
		setPercent(Math.round((filled / totalSteps) * 100));
	};

	useEffect(() => {
		localStorage.setItem('step', step.toString());
		progressPercent(); // Обновляем процент прогресса при изменении шага
	}, [step]);

	return (
		<Layout className="app-layout">
			{contextHolder}
			<div className="center-wrapper">
				<Content className="app-content">
					{/* Прогрессбар */}
					<Progress
						percent={percent}
						percentPosition={{ align: 'center', type: 'inner' }}
						strokeColor={getProgressColor(percent)}
						strokeWidth={20}
					/>

					{/* Шапка с кнопкой для возврата назад и названием шага */}
					<Row justify="center" align="middle" style={{ position: 'relative', marginBottom: 24 }}>
						{step > 0 && (
							<Col style={{ position: 'absolute', left: 0 }}>
								<Button
									icon={<ArrowLeftOutlined />}
									onClick={handleBack}
									className="app-content-back"
								/>
							</Col>
						)}
						<Col>
							<Title level={1}>{title[step]}</Title>
						</Col>
					</Row>

					{/* Динамический рендеринг формы по шагам */}
					<FormStep step={step} handleSubmit={handleSubmit} />
				</Content>
			</div>
		</Layout>
	);
}

export default App;
