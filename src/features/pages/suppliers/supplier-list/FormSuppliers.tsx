'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { addSupplierList, updateSupplierList } from '@/services/supplier-list-service';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import { useNotificationAntd } from '@/components/toast';

const FormSuppliers: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();

    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        name: initialValues ? initialValues.name : '',
        email: initialValues ? initialValues.email : '',
        mobile_number: initialValues ? initialValues.mobile_number : '',
        telephone: initialValues ? initialValues.telephone : '',
        sales_person: initialValues ? initialValues.sales_person : '',
        company_name: initialValues ? initialValues.company_name : '',
        website: initialValues ? initialValues.website : '',
        city: initialValues ? initialValues.city : '',
        state: initialValues ? initialValues.state : '',
        post_code: initialValues ? initialValues.post_code : '',
        address: initialValues ? initialValues.address : '',
        abn: initialValues ? initialValues.abn : '',
        url_sync_stock: initialValues ? initialValues.url_sync_stock : ''
    });

    const breadcrumb = [
        { title: 'Supplier List', url: routes.eCommerce.supplierList },
        { title: mode === 'create' ? 'Create Supplier List' : 'Edit Supplier List' },
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
        try {
            const submitData = {
                name: formData.name,
                email: formData.email,
                mobile_number: formData.mobile_number,
                telephone: formData.telephone,
                sales_person: formData.sales_person,
                company_name: formData.company_name,
                website: formData.website,
                city: formData.city,
                state: formData.state,
                post_code: formData.post_code,
                address: formData.address,
                abn: formData.abn,
                url_sync_stock: formData.url_sync_stock,
            }

            let response;
            if (mode == 'edit' && slug) {
                response = await updateSupplierList(slug, submitData)
            } else {
                response = await addSupplierList(submitData)
            }

            if (response.success == true) {
                notifySuccess(response.message)
                setTimeout(() => {
                    router.push(routes.eCommerce.supplierList)
                }, 2000);
            }
        } catch (error) {
            console.error(error)
        }

    }

    console.log(formData)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Supplier List' : 'Edit Supplier List'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    {/* Tab Content */}
                    <div>
                        <FormGroup
                            title="Supplier List"
                            description="Supplier List information"
                        >
                            <Input
                                id='name'
                                label='Name'
                                type='text'
                                placeholder='Input Name'
                                onChange={handleChange}
                                value={formData.name}
                            />
                            <Input
                                id='email'
                                label='Email'
                                type='email'
                                placeholder='Input email'
                                onChange={handleChange}
                                value={formData.email}
                            />
                            <Input
                                id='mobile_number'
                                label='Phone Number'
                                type='text'
                                placeholder='Input Phone Number'
                                onChange={handleChange}
                                value={formData.mobile_number}
                            />
                            <Input
                                id='telephone'
                                label='Telephone'
                                type='text'
                                placeholder='Input telephone'
                                onChange={handleChange}
                                value={formData.telephone}
                            />
                            <Input
                                id='sales_person'
                                label='Sales Person'
                                type='text'
                                placeholder='Input Sales Person'
                                onChange={handleChange}
                                value={formData.sales_person}
                            />
                            <Input
                                id='company_name'
                                label='Company Name'
                                type='text'
                                placeholder='Input Company Name'
                                onChange={handleChange}
                                value={formData.company_name}
                            />
                            <Input
                                id='website'
                                label='Website'
                                type='text'
                                placeholder='Input Website'
                                onChange={handleChange}
                                value={formData.website}
                            />
                            <Input
                                id='city'
                                label='City'
                                type='text'
                                placeholder='Input City'
                                onChange={handleChange}
                                value={formData.city}
                            />
                            <Input
                                id='state'
                                label='State'
                                type='text'
                                placeholder='Input State'
                                onChange={handleChange}
                                value={formData.state}
                            />
                            <Input
                                id='post_code'
                                label='Post Code'
                                type='text'
                                placeholder='Input Post Code'
                                onChange={handleChange}
                                value={formData.post_code}
                            />
                            <div className='w-full'>
                                <Textarea
                                    id='address'
                                    label='Address'
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <Input
                                id='abn'
                                label='ABN'
                                type='text'
                                placeholder='Input ABN'
                                onChange={handleChange}
                                value={formData.abn}
                            />
                            <Input
                                id='url_sync_stock'
                                label='URL Sync Stock'
                                type='text'
                                placeholder='Input URL Sync Stock'
                                onChange={handleChange}
                                value={formData.url_sync_stock}
                            />
                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Supplier List' : 'Edit Supplier List'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormSuppliers;
