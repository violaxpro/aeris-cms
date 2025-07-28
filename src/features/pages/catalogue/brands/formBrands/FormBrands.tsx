'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import GeneralForm from "./GeneralForm";
import SEOForm from "./SEOForm";
import Breadcrumb from "@/components/breadcrumb";
import { FormProps } from '@/plugins/types/form-type';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { routes } from '@/config/routes';
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form-group'
import Textarea from '@/components/textarea'
import FileUploader from '@/components/input-file'
import { addBrand, updateBrand } from '@/services/brands-service';
import { useNotificationAntd } from '@/components/toast';

const FormBrands: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()

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
        urlBanner: initialValues ? initialValues.url_banner : '',
        urlLogo: initialValues ? initialValues.url_banner : ''
    })
    const [formErrors, setFormErrors] = useState({
        name: '',
        status: '',
        urlLogo: ''
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSuccess = (id: string) => (file: any) => {
        console.log('Uploaded:', file);
        const fileUrl = file?.response?.url || file?.name || '';

        setFormData((prev) => ({
            ...prev,
            [id]: fileUrl,
        }));
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    const handleSubmit = async () => {
        try {
            let errors: any = {}
            if (!formData.name) {
                errors.name = 'Name is required'
            }
            if (!formData.urlLogo) {
                errors.urlLogo = 'Url Logo is required'
            }

            setFormErrors(errors)

            if (Object.keys(errors).length > 0) {
                console.log('Form has errors, stop submit');
                return;
            }

            const data = {
                name: formData.name,
                discount_percent: Number(formData.discountPercent) ?? 0,
                status: formData.status == true ? 1 : 0,
                meta_title: formData.metaTitle,
                meta_description: formData.metaDescription,
                url_banner: formData.urlBanner,
                url_logo: formData.urlLogo
            }

            let response;
            if (mode == 'edit' && slug) {
                response = await updateBrand(slug, data)
            } else {
                response = await addBrand(data)
            }

            console.log(response)
            if (response.success == true) {
                notifySuccess(response.message)
                setTimeout(() => {
                    router.push(routes.eCommerce.brands)
                }, 2000);
            }
        } catch (error) {
            console.error(error)
        }

    }

    const metaTitle = formData?.metaTitle;
    const titleLength = metaTitle?.length || 0;
    const isTitleInvalid = titleLength > 65;

    const metaDescription = formData?.metaDescription;
    const descLength = metaDescription?.length || 0;
    const isDescInvalid = descLength > 165;
    return (
        <div>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Brands' : 'Edit Brands'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

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
                                />
                                <Input
                                    id='discountPercent'
                                    label='Discount Percent'
                                    type='number'
                                    value={formData.discountPercent}
                                    onChange={handleChange}
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
                                />
                                <Input
                                    id='urlBanner'
                                    label='Url Banner'
                                    type='text'
                                    value={formData.urlBanner}
                                    onChange={handleChange}
                                />
                                {/* <div className='flex col-span-full gap-4'>
                                    <FileUploader
                                        label='Url Logo'
                                        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        onSuccess={handleSuccess('urlLogo')}
                                        onError={handleError}
                                        errorMessage={formErrors.urlLogo}
                                    />
                                    <FileUploader
                                        label='Url Banner'
                                        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        onSuccess={handleSuccess('urlBanner')}
                                        onError={handleError}
                                    />
                                </div> */}
                            </FormGroup>

                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode === 'create' ? 'Create Brands' : 'Edit Brands'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>

        </div>
    )
}

export default FormBrands
