'use client'
import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { FormProps } from '@/plugins/types/form-type';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { routes } from '@/config/routes';
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form-group'
import Textarea from '@/components/textarea'
import { useCreateBrand, useUpdateBrand } from '@/core/hooks/use-brands';
import { useNotificationAntd } from '@/components/toast';

const FormBrands: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder } = useNotificationAntd()
    const { mutate: createBrandMutate } = useCreateBrand()
    const { mutate: updateBrandMutate } = useUpdateBrand(slug ?? '')

    const breadcrumb = [
        { title: 'Catalogue' },
        { title: 'Brands', url: routes.eCommerce.brands },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const [formData, setFormData] = useState({
        name: initialValues ? initialValues.name : '',
        discountPercent: initialValues ? initialValues.discount_percent : '',
        status: initialValues ? initialValues.status : false,
        metaTitle: initialValues ? initialValues.meta_title : '',
        metaDescription: initialValues ? initialValues.meta_description : '',
        urlLogo: initialValues ? initialValues.url_logo : '',
        urlBanner: initialValues ? initialValues.url_banner : ''
    })

    const titleLength = formData?.metaTitle?.length || 0;
    const isTitleInvalid = titleLength !== 0 && (titleLength < 55 || titleLength > 65);
    const descLength = formData?.metaDescription?.length || 0;
    const isDescInvalid = descLength !== 0 && (descLength < 145 || descLength > 165);
    const [formErrors, setFormErrors] = useState({
        name: '',
        status: '',
        urlLogo: '',
        metaTitle: '',
        metaDescription: ''
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = () => {
        let errors: any = {}
        if (!formData.name) {
            errors.name = 'Name is required'
        }
        // if (!formData.urlLogo) {
        //     errors.urlLogo = 'Url Logo is required'
        // }


        setFormErrors(errors)

        if (Object.keys(errors).length > 0) {
            return;
        }

        if (titleLength < 55 || titleLength > 65) {
            return;
        }

        if (descLength < 145 || descLength > 165) {
            return;
        }

        const data = {
            name: formData.name,
            discount_percent: Number(formData.discountPercent) ?? 0,
            status: formData.status,
            meta_title: formData.metaTitle,
            meta_description: formData.metaDescription,
            url_banner: formData.urlBanner,
            url_logo: formData.urlLogo
        }

        if (mode == 'edit' && slug) {
            updateBrandMutate(data)
        } else {
            createBrandMutate(data)
        }
    }

    return (
        <div>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Brand' : 'Edit Brand'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div>
                        <div className='flex flex-col gap-12'>
                            <FormGroup
                                title="General"
                                description="General Information"
                                childClassName='grid md:grid-cols-3 gap-4'
                            >
                                <Input
                                    id='name'
                                    label='Name'
                                    type='text'
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!formErrors.name}
                                    errorMessage={formErrors.name}
                                    placeholder='e.g. Sony'
                                />
                                <Input
                                    id='discountPercent'
                                    label='Discount Percent'
                                    type='number'
                                    value={formData.discountPercent}
                                    onChange={handleChange}
                                    placeholder='Enter Number'
                                />
                                <Checkbox
                                    label='Status'
                                    text='Enable the brand'
                                    onChange={(val) => setFormData({ ...formData, status: val })}
                                    checked={formData.status}
                                />
                            </FormGroup>
                            <FormGroup
                                title="SEO"
                                description='SEO Information'
                                childClassName='grid gap-4'
                            >
                                <Input
                                    id='metaTitle'
                                    label='Meta Title'
                                    type='text'
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                    notes={
                                        <span className={isTitleInvalid ? 'text-red-500' : 'text-gray-400'}>
                                            min.55 / max.65, Character {titleLength}
                                        </span>
                                    }
                                    placeholder='Enter SEO-friendly title'
                                />
                                <Textarea
                                    id='metaDescription'
                                    label='Meta Description'
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                    notes={
                                        <span className={isDescInvalid ? 'text-red-500' : 'text-gray-400'}>
                                            min.145 / max.165, Character {descLength}
                                        </span>
                                    }
                                    placeholder='Enter SEO-friendly description'
                                />
                            </FormGroup>
                            <FormGroup
                                title="Images"
                                description="Add images here"
                                childClassName='grid md:grid-cols-2 gap-4'
                            >
                                <Input
                                    id='urlLogo'
                                    label='Url Logo'
                                    type='text'
                                    value={formData.urlLogo}
                                    onChange={handleChange}
                                    errorMessage={formErrors.urlLogo}
                                    placeholder='https://example.com/logo.png'
                                />
                                <Input
                                    id='urlBanner'
                                    label='Url Banner'
                                    type='text'
                                    value={formData.urlBanner}
                                    onChange={handleChange}
                                    placeholder='https://example.com/banner.png'
                                />
                            </FormGroup>

                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode === 'create' ? 'Create Brand' : 'Edit Brand'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </div>
    )
}

export default FormBrands
