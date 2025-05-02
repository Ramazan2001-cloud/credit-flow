import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Input, Button, Select, Row, Col, InputNumber } from "antd";
import { AddressInfoForm } from "../types/ICreditFlow";

const countryOptions = [
    { label: "Казахстан", value: "Kazakhstan" },
    { label: "Россия", value: "Russia" },
    { label: "США", value: "USA" },
    { label: "Германия", value: "Germany" },
    { label: "Франция", value: "France" },
    { label: "Китай", value: "China" },
    { label: "Япония", value: "Japan" },
];

const schema = yup.object().shape({
    country: yup.string().required("Выберите страну"),
    city: yup.string().required("Введите город"),
    address: yup.string().required("Введите адрес"),
    postalCode: yup
        .string()
        .required("Введите почтовый индекс")
        .matches(/^\d{5,10}$/, "Почтовый индекс должен содержать от 5 до 10 цифр"),
});

type Props = {
    onNext: (step: number) => void;
    savedData?: Partial<AddressInfoForm>;
};

const AddressInfo: React.FC<Props> = ({ onNext, savedData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AddressInfoForm>({
        resolver: yupResolver(schema),
        defaultValues: savedData,
    });

    useEffect(() => {
        if (savedData) {
            Object.entries(savedData).forEach(([key, value]) => {
                setValue(key as keyof AddressInfoForm, value || "");
            });
        }
    }, [savedData, setValue]);

    const onSubmit = (data: AddressInfoForm) => {
        localStorage.setItem("addressInfoData", JSON.stringify(data));
        onNext(2);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}  className="form-data">
            <Row gutter={[20,0]}>
                <Col span={12}>
                    <Form.Item label="Страна" validateStatus={errors.country ? "error" : ""} help={errors.country?.message}>
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={countryOptions}
                                    placeholder="Выберите страну"
                                />
                            )}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Город" validateStatus={errors.city ? "error" : ""} help={errors.city?.message}>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[20,0]}>
                <Col span={12}>
                    <Form.Item label="Адрес" validateStatus={errors.address ? "error" : ""} help={errors.address?.message}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Почтовый индекс" validateStatus={errors.postalCode ? "error" : ""} help={errors.postalCode?.message}>
                        <Controller
                            name="postalCode"
                            control={control}
                            render={({ field }) => <InputNumber {...field} maxLength={10}/>}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Далее
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddressInfo;
