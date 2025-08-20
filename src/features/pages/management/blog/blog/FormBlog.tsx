'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation'
import { getPriceLevel, addPriceLevel, updatePriceLevel } from '@/services/price-level-service';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file'
import { uploadImages } from '@/services/upload-images';

const FormBlog: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        title: initialValues ? initialValues.title : '',
        body: initialValues ? initialValues.body : '',
        short_description: initialValues ? initialValues.short_description : '',
        images: initialValues ? initialValues.images : [],
        status: initialValues ? initialValues.status : '',
        category: initialValues ? initialValues.category : '',
        meta_title: initialValues ? initialValues.meta_title : '',
        meta_description: initialValues ? initialValues.meta_description : '',
    });

    const breadcrumb = [
        { title: 'Managemnet' },
        { title: 'Blog' },
        { title: 'Blogs', url: routes.eCommerce.blogs },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const handleSuccess = async (file: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'product');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                const updated = { ...formData, images: images, }
                // setFormData(prev => {
                //     const updated = { ...prev, images: images, }
                //     // images: [...prev.images, ...images], > 1 gambar
                //     onChange(updated)
                //     return updated
                // });
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

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
                // name: formData.name,
                // brandId: formData.brands,
                // categoryId: formData.categories,
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
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Blog' : 'Edit Blog'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content >
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div className='grid md:grid-cols-2 gap-3'>
                        <Input
                            id='title'
                            label='Title'
                            type='text'
                            placeholder='Input Title'
                            onChange={handleChange}
                            value={formData.title}
                        />
                        <div className='row-span-2 max-h-38'>
                            <Textarea
                                id='body'
                                label='Body'
                                placeholder='Input Body'
                                onChange={handleChange}
                                value={formData.body}
                                textareaClassname='!h-38'
                            />
                        </div>
                        <Textarea
                            id='short_description'
                            label='Short Description'
                            placeholder='Input Short Description'
                            onChange={handleChange}
                            value={formData.short_description}
                            textareaClassname='!h-20'
                        />
                        <SelectInput
                            id='status'
                            label="Status"
                            placeholder="Select Status"
                            value={formData.status}
                            onChange={(e) => handleChangeSelect('status', e)}
                            options={[
                                { label: 'Draft', value: 'draft' },
                                { label: 'Published', value: 'published' },
                                { label: 'Archived', value: 'archived' },
                            ]}
                        />
                        <div className='row-span-2'>
                            <FileUploader
                                label='Images'
                                action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                multiple={true}
                                onSuccess={handleSuccess}
                                onError={handleError}
                                isUpload={isLoading}
                                fileList={formData.images?.map((img: any, index: any) => {
                                    return {
                                        uid: `${index}`,
                                        name: img.name ?? img.url,
                                        status: 'done',
                                        url: img.url
                                    }
                                })}
                            />
                        </div>
                        <SelectInput
                            id="category"
                            label="Category"
                            placeholder="Select category"
                            value={formData.category}
                            onChange={(val) => handleChangeSelect("category", val)}
                            options={optionsCategories}
                        />
                        <Textarea
                            id='meta_title'
                            label='Meta Title'
                            placeholder='Input Meta Title'
                            onChange={handleChange}
                            value={formData.meta_title}
                            textareaClassname='!h-20'
                        />
                        <Textarea
                            id='meta_description'
                            label='Meta Description'
                            placeholder='Input Meta Description'
                            onChange={handleChange}
                            value={formData.meta_description}
                            textareaClassname='!h-20'
                        />
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Blog' : 'Edit Blog'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormBlog;
