import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { MaskedInput } from "antd-mask-input";
import dayjs from "dayjs";

import './PersonalInfo.scss';

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
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Формат: +7 (XXX) XXX-XX-XX"),
    email: yup.string().required("Введите email").email("Некорректный email"),
});

type Props = {
    onNext: (data: PersonalInfoForm) => void;
    savedData?: Partial<PersonalInfoForm>;
};

const PersonalInfo: React.FC<Props> = ({ onNext, savedData }) => {
    const {
        getValues,
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
            console.log('getValues', getValues);
        }
    }, [getValues, savedData, setValue]);

    const onSubmit = (data: PersonalInfoForm) => {
        localStorage.setItem("creditFormData", JSON.stringify(data));
        onNext(data);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="personal-info">
            <Row gutter={[20,0]}>
                <Col span={12}>
                    <Form.Item label="Имя" validateStatus={errors.firstName ? "error" : ""} help={errors.firstName?.message}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Фамилия" validateStatus={errors.lastName ? "error" : ""} help={errors.lastName?.message}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[20,0]}>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
                    <Form.Item label="Телефон" validateStatus={errors.phone ? "error" : ""} help={errors.phone?.message}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <MaskedInput
                                    mask="+7 (000) 000-00-00"
                                    {...field}
                                    placeholder="+7 (___) ___-__-__"
                                />
                            )}
                        />
                    </Form.Item>
                </Col>
            </Row>
                
            <Row gutter={[20, 0]} align="middle">
                <Col span={18}>
                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                </Col>
                <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Далее
                    </Button>
                </Col>
            </Row>

        </Form>
    );
};

export default PersonalInfo;
