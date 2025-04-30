import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, InputNumber, Slider, Button } from "antd";

type FinancialInfoForm = {
    monthlyIncome: number;
    creditAmount: number;
    creditTerm: number;
};

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
    onNext: (data: FinancialInfoForm) => void;
    savedData?: Partial<FinancialInfoForm>;
};

const FinancialInfo: React.FC<Props> = ({ onNext, savedData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FinancialInfoForm>({
        resolver: yupResolver(schema),
        defaultValues: savedData || {
            monthlyIncome: 0,
            creditAmount: 20000,
            creditTerm: 12,
        },
    });

    const onSubmit = (data: FinancialInfoForm) => {
        localStorage.setItem("creditFinancialData", JSON.stringify(data));
        onNext(data);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
                            formatter={(value) => `₸ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                            parser={(value) => value?.replace(/[₸\s]/g, "") || ""}
                            style={{ width: "100%" }}
                        />
                    )}
                />
            </Form.Item>

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
                                formatter={(value) => `₸ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                parser={(value) => value?.replace(/[₸\s]/g, "") || ""}
                                style={{ width: "100%", marginTop: 8 }}
                            />
                        </>
                    )}
                />
            </Form.Item>

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
                            style={{ width: "100%" }}
                            placeholder="например, 12"
                        />
                    )}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Далее
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FinancialInfo;
