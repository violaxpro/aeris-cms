'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation'
import { getPriceLevel, addPriceLevel, updatePriceLevel } from '@/services/price-level-service';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import { useNotificationAntd } from '@/components/toast';
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import Table from "@/components/table"
import Pagination from '@/components/pagination'
import OrderHistory from './OrderHistory'

const FormCustomers: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [search, setSearch] = useState('')
    const [optionsCategories] = useAtom(categoriesAtom)
    const [pageSize, setPageSize] = useState(10);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
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
        person: initialValues ? initialValues.person : '',
        company: initialValues ? initialValues.company : '',
        first_address: initialValues ? initialValues.first_address : '',
        second_address: initialValues ? initialValues.second_address : '',
        country: initialValues ? initialValues.country : '',
        state: initialValues ? initialValues.state : '',
        city: initialValues ? initialValues.city : '',
        postcode: initialValues ? initialValues.postcode : '',
        is_billing_same_with_delivery_address: false,
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
        { title: 'Customers', url: routes.eCommerce.customers },
        { title: mode === 'create' ? 'Create' : 'Edit' },
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
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Customer' : 'Edit Customer'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: 'var(--background)' }}>
                    <div className='flex flex-col gap-8'>
                        <FormGroup
                            title="Customers"
                            description="Customers information"
                            childClassName='grid md:grid-cols-4 gap-2'
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
                            <div className='col-span-full grid md:grid-cols-3 gap-2'>
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

                            </div>
                            <div className='col-span-full'>
                                <Input
                                    id='credit'
                                    label='Credit'
                                    type='text'
                                    placeholder='Input Credit'
                                    onChange={handleChange}
                                    value={formData.credit}
                                />
                            </div>

                        </FormGroup>
                        <FormGroup
                            title="Delivery Address"
                            description="Delivery Address information"
                            childClassName='grid md:grid-cols-2 gap-3'
                        >
                            <Input
                                id='person'
                                label='Person'
                                type='text'
                                placeholder='Input Person'
                                onChange={handleChange}
                                value={formData.person}
                            />
                            <Input
                                id='company'
                                label='Company'
                                type='text'
                                placeholder='Input Company'
                                onChange={handleChange}
                                value={formData.company}
                            />
                            <Input
                                id='first_address'
                                label='Address 1'
                                type='first_address'
                                placeholder='Input Address 1'
                                onChange={handleChange}
                                value={formData.first_address}
                            />
                            <Input
                                id='second_address'
                                label='Address 2'
                                type='text'
                                placeholder='Input Address 2'
                                onChange={handleChange}
                                value={formData.second_address}
                            />
                            <div className='col-span-full grid md:grid-cols-4 gap-3'>
                                <SelectInput
                                    id='country'
                                    label="Country"
                                    placeholder="Select Country"
                                    value={formData.country}
                                    onChange={(e) => handleChangeSelect('country', e)}
                                    options={optionBrands}
                                />
                                <SelectInput
                                    id='city'
                                    label="City"
                                    placeholder="Select City"
                                    value={formData.city}
                                    onChange={(e) => handleChangeSelect('city', e)}
                                    options={optionBrands}
                                />
                                <SelectInput
                                    id='state'
                                    label="State"
                                    placeholder="Select State"
                                    value={formData.state}
                                    onChange={(e) => handleChangeSelect('state', e)}
                                    options={optionBrands}
                                />
                                <Input
                                    id='postcode'
                                    label='Post Code'
                                    type='text'
                                    placeholder='Input Post Code'
                                    onChange={handleChange}
                                    value={formData.postcode}
                                />
                            </div>
                        </FormGroup>
                        <CheckboxInput
                            text='My billing address is different from my delivery address'
                            checked={formData.is_billing_same_with_delivery_address}
                            onChange={(checked) => {
                                setFormData((prev: any) => ({
                                    ...prev,
                                    is_billing_same_with_delivery_address: checked
                                }))
                            }}
                        />
                        {
                            formData.is_billing_same_with_delivery_address == true
                            && <FormGroup
                                title="Billing Address"
                                description="Billing Address information"
                                childClassName='grid md:grid-cols-2 gap-3'
                            >
                                <Input
                                    id='person'
                                    label='Person'
                                    type='text'
                                    placeholder='Input Person'
                                    onChange={handleChange}
                                    value={formData.person}
                                />
                                <Input
                                    id='company'
                                    label='Company'
                                    type='text'
                                    placeholder='Input Company'
                                    onChange={handleChange}
                                    value={formData.company}
                                />
                                <Input
                                    id='first_address'
                                    label='Address 1'
                                    type='first_address'
                                    placeholder='Input Address 1'
                                    onChange={handleChange}
                                    value={formData.first_address}
                                />
                                <Input
                                    id='second_address'
                                    label='Address 2'
                                    type='text'
                                    placeholder='Input Address 2'
                                    onChange={handleChange}
                                    value={formData.second_address}
                                />
                                <div className='col-span-full grid md:grid-cols-4 gap-3'>
                                    <SelectInput
                                        id='country'
                                        label="Country"
                                        placeholder="Select Country"
                                        value={formData.country}
                                        onChange={(e) => handleChangeSelect('country', e)}
                                        options={optionBrands}
                                    />
                                    <SelectInput
                                        id='city'
                                        label="City"
                                        placeholder="Select City"
                                        value={formData.city}
                                        onChange={(e) => handleChangeSelect('city', e)}
                                        options={optionBrands}
                                    />
                                    <SelectInput
                                        id='state'
                                        label="State"
                                        placeholder="Select State"
                                        value={formData.state}
                                        onChange={(e) => handleChangeSelect('state', e)}
                                        options={optionBrands}
                                    />
                                    <Input
                                        id='postcode'
                                        label='Post Code'
                                        type='text'
                                        placeholder='Input Post Code'
                                        onChange={handleChange}
                                        value={formData.postcode}
                                    />
                                </div>
                            </FormGroup>
                        }

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Customer' : 'Edit Customer'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content >
        </>
    );
};

export default FormCustomers;
