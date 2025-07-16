'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation'
import { getPriceLevel, addPriceLevel, updatePriceLevel } from '@/services/price-level-service';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import { useNotificationAntd } from '@/components/toast';

const FormUsers: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();

    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        firstname: initialValues ? initialValues.firstname : '',
        lastname: initialValues ? initialValues.lastname : '',
        email: initialValues ? initialValues.email : '',
        phone: initialValues ? initialValues.phone : '',
        roles: initialValues ? initialValues.roles : '',
        password: initialValues ? initialValues.password : '',
        confirm_password: initialValues ? initialValues.confirm_password : '',
        price_level: initialValues ? initialValues.price_level : '',
        credit: initialValues ? initialValues.credit : '',
        permission: initialValues ? initialValues.permission : '',
    });

    const [formErrors, setFormErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        roles: '',
        password: '',
        price_level: '',
        permission: '',
        // address: '',
    });

    const breadcrumb = [
        { title: 'Users' },
        { title: 'Users', url: routes.eCommerce.users },
        { title: mode === 'create' ? 'Create Users' : 'Edit Users' },
    ];

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeSelect = (id: string, value: string | string[]) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        const newErrors = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            roles: '',
            password: '',
            price_level: '',
            permission: '',
        };

        if (!formData.firstname.trim()) newErrors.firstname = 'First Name is required';
        if (!formData.lastname.trim()) newErrors.lastname = 'Last Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';

        // if (productList.length === 0) newErrors.product = 'At least one product is required';


        const hasErrors = Object.values(newErrors).some((v) => v !== '');

        if (hasErrors) {
            setFormErrors(newErrors);
            return;
        } else {
            setFormErrors({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                roles: '',
                password: '',
                price_level: '',
                permission: '',
            });
        }
        try {
            const submitData = {
                // name: formData.name,
                // brandId: formData.brands,
                // categoryId: formData.categories,
                // rrp_price: Number(formData.rrp),
                // trade_price: Number(formData.trade),
                // silver_price: Number(formData.silver),
                // gold_price: Number(formData.gold),
                // platinum_price: Number(formData.platinum),
                // diamond_price: Number(formData.diamond)
            }

            // let response;
            // if (mode == 'edit' && slug) {
            //     response = await updatePriceLevel(slug, submitData)
            // } else {
            //     response = await addPriceLevel(submitData)
            // }

            // if (response.success == true) {
            //     notifySuccess(response.message)
            //     setTimeout(() => {
            //         router.push(routes.eCommerce.priceLevel)
            //     }, 2000);
            // }
        } catch (error) {
            console.error(error)
        }

    }

    console.log(formData)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Users' : 'Edit Users'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: 'var(--background)' }}>

                    {/* Tab Content */}
                    <div>
                        <FormGroup
                            title="Users"
                            description="Users information"
                        >
                            <Input
                                id='firstname'
                                label='First Name'
                                type='text'
                                placeholder='Input First Name'
                                onChange={handleChange}
                                value={formData.firstname}
                            />
                            <Input
                                id='lastname'
                                label='Last Name'
                                type='text'
                                placeholder='Input Last Name'
                                onChange={handleChange}
                                value={formData.lastname}
                            />
                            <Input
                                id='email'
                                label='Email'
                                type='email'
                                placeholder='Input Email'
                                onChange={handleChange}
                                value={formData.email}
                            />
                            <Input
                                id='phone'
                                label='Phone'
                                type='text'
                                placeholder='Input Phone'
                                onChange={handleChange}
                                value={formData.phone}
                            />
                            <SelectInput
                                id='roles'
                                label="Roles"
                                placeholder="Select Roles"
                                value={formData.roles}
                                onChange={(e) => handleChangeSelect('roles', e)}
                                options={optionBrands}
                            />
                            <Input
                                id='password'
                                label='Password'
                                type='password'
                                placeholder='Input Password'
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <Input
                                id='confirm_password'
                                label='Confirm Password'
                                type='password'
                                placeholder='Input Confirm Password'
                                onChange={handleChange}
                                value={formData.confirm_password}
                            />
                            <Input
                                id='price_level'
                                label='Price Level'
                                type='text'
                                placeholder='Input Price Level'
                                onChange={handleChange}
                                value={formData.price_level}
                            />
                            <Input
                                id='credit'
                                label='Credit'
                                type='text'
                                placeholder='Input Credit'
                                onChange={handleChange}
                                value={formData.credit}
                            />
                            <Input
                                id='permission'
                                label='Permission'
                                type='text'
                                placeholder='Input Permission'
                                onChange={handleChange}
                                value={formData.permission}
                            />
                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode === 'create' ? 'Create Users' : 'Edit Users'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content >
        </>
    );
};

export default FormUsers;
