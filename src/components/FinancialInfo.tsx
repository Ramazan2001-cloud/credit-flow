import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, InputNumber, Slider, Button, Col, Row } from "antd";
import { FinancialInfoForm } from "../types/ICreditFlow";

const schema = yup.object().shape({
    monthlyIncome: yup
        .number()
        .typeError("Укажите доход")
        .required("Укажите доход")
        .min(1, "Доход должен быть больше 0"),
    creditAmount: yup
        .number()
        .typeError("Укажите сумму кредита")
        .required("Укажите сумму кредита")
        .min(20000, "Минимум 20000")
        .max(1000000, "Максимум 1000000"),
    creditTerm: yup
        .number()
        .typeError("Укажите срок кредита")
        .required("Укажите срок кредита")
        .min(1, "Срок должен быть больше 0"),
});

type Props = {
    onNext: (step: 'send') => void;
    savedData?: Partial<FinancialInfoForm>;
};

const FinancialInfo: React.FC<Props> = ({ onNext, savedData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<FinancialInfoForm>({
        resolver: yupResolver(schema),
        defaultValues: savedData || {
            monthlyIncome: 0,
            creditAmount: 20000,
            creditTerm: 12,
        },
    });

    useEffect(() => {
        if (savedData) {
            Object.entries(savedData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    setValue(key as keyof FinancialInfoForm, value);
                }
            });
        }
    }, [savedData, setValue, getValues]);
    
    const onSubmit = (data: FinancialInfoForm) => {
        localStorage.setItem("financialInfoData", JSON.stringify(data));
        onNext('send');
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="form-data">
            <Row gutter={[20, 0]} align={'bottom'}>
                <Col span={12}>
                    <Form.Item
                        label="Сумма кредита"
                        validateStatus={errors.creditAmount ? "error" : ""}
                        help={errors.creditAmount?.message}
                    >
                        <Controller
                            name="creditAmount"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Slider
                                        min={20000}
                                        max={1000000}
                                        step={10000}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                    <InputNumber
                                        {...field}
                                        min={20000}
                                        max={1000000}
                                        step={10000}
                                        type="number"
                                    />
                                </>
                            )}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Ежемесячный доход"
                        validateStatus={errors.monthlyIncome ? "error" : ""}
                        help={errors.monthlyIncome?.message}
                    >
                        <Controller
                            name="monthlyIncome"
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    min={1}
                                    type="number"
                                />
                            )}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[20, 0]} align={'bottom'}>
                <Col span={12}>
                    <Form.Item
                        label="Срок кредита (в месяцах)"
                        validateStatus={errors.creditTerm ? "error" : ""}
                        help={errors.creditTerm?.message}
                    >
                        <Controller
                            name="creditTerm"
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    min={1}
                                    max={60}
                                    placeholder="например, 12"
                                    type="number"
                                />
                            )}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Отправить
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default FinancialInfo;
