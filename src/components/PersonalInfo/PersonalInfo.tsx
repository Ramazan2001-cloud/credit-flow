import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Input, Button, DatePicker } from "antd";
import InputMask from "react-input-mask";
import dayjs from "dayjs";

type PersonalInfoForm = {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
};

const schema = yup.object().shape({
    firstName: yup.string().required("Введите имя"),
    lastName: yup.string().required("Введите фамилию"),
    birthDate: yup.string().required("Укажите дату рождения"),
    phone: yup
        .string()
        .required("Введите номер телефона")
        .matches(/^\+77\d{9}$/, "Формат: +77XXXXXXXXX"),
    email: yup.string().required("Введите email").email("Некорректный email"),
});

type Props = {
    onNext: (data: PersonalInfoForm) => void;
    savedData?: Partial<PersonalInfoForm>;
};

const PersonalInfo: React.FC<Props> = ({ onNext, savedData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PersonalInfoForm>({
        resolver: yupResolver(schema),
        defaultValues: savedData,
    });

    useEffect(() => {
        if (savedData) {
            Object.entries(savedData).forEach(([key, value]) => {
                setValue(key as keyof PersonalInfoForm, value || "");
            });
        }
    }, [savedData, setValue]);

    const onSubmit = (data: PersonalInfoForm) => {
        localStorage.setItem("creditFormData", JSON.stringify(data));
        onNext(data);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Имя" validateStatus={errors.firstName ? "error" : ""} help={errors.firstName?.message}>
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>

            <Form.Item label="Фамилия" validateStatus={errors.lastName ? "error" : ""} help={errors.lastName?.message}>
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>

            <Form.Item label="Дата рождения" validateStatus={errors.birthDate ? "error" : ""} help={errors.birthDate?.message}>
                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            format="YYYY-MM-DD"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => field.onChange(date?.format("YYYY-MM-DD"))}
                            style={{ width: "100%" }}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item label="Телефон" validateStatus={errors.phone ? "error" : ""} help={errors.phone?.message}>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <InputMask mask="+77999999999" {...field}>
                            {(inputProps) => <input {...inputProps} className="ant-input" />}
                        </InputMask>
                    )}
                />
            </Form.Item>

            <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} />}
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

export default PersonalInfo;
