import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Input, Button, Select } from "antd";

type AddressInfoForm = {
    country: string;
    city: string;
    address: string;
    postalCode: string;
};

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
    onNext: (data: AddressInfoForm) => void;
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
        localStorage.setItem("addressFormData", JSON.stringify(data));
        onNext(data);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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

            <Form.Item label="Город" validateStatus={errors.city ? "error" : ""} help={errors.city?.message}>
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>

            <Form.Item label="Адрес" validateStatus={errors.address ? "error" : ""} help={errors.address?.message}>
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>

            <Form.Item label="Почтовый индекс" validateStatus={errors.postalCode ? "error" : ""} help={errors.postalCode?.message}>
                <Controller
                    name="postalCode"
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

export default AddressInfo;
