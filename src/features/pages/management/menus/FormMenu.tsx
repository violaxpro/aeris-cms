'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file'
import { uploadImages } from '@/services/upload-images';
import CustomSwitch from '@/components/switch/CustomSwitch';
import Image from 'next/image';
import { BlockGreyIcon, FluidMenuIcon } from '@public/icon';

const FormMenu: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [isLoading, setIsLoading] = useState({
        logo_favicon: false,
        background_image: false,
    })

    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        name: initialValues ? initialValues.name : '',
        type: initialValues ? initialValues.type : '',
        category: initialValues ? initialValues.category : '',
        target: initialValues ? initialValues.target : '',
        parent_menu_item: initialValues ? initialValues.parent_menu_item : '',
        status: initialValues ? initialValues.status : '',
        logo_favicon: initialValues ? initialValues.logo_favicon : [],
        background_image: initialValues ? initialValues.background_image : [],
        menu_mode: initialValues ? initialValues.menu_mode : false,
    });

    const breadcrumb = [
        { title: 'Management' },
        { title: 'Menus', url: routes.eCommerce.menus },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const handleSuccess = async (file: any, field: string) => {
        setIsLoading(prev => ({ ...prev, [field]: true }));
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'menus');
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
            setIsLoading(prev => ({ ...prev, [field]: false }));
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
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Menu' : 'Edit Menu'}</h1>
                        <Breadcrumb items={breadcrumb} />
                    </div>
                    <CustomSwitch
                        iconOff={BlockGreyIcon}
                        iconOn={FluidMenuIcon}
                        labelOff='Not Fluid'
                        labelOn='Fluid Menu'
                        size='md'
                        onToggle={(state) => {
                            setFormData((prev: any) => ({
                                ...prev,
                                menu_mode: state ? 'not-fluid-menu' : 'fluid-menu'
                            }))
                        }}
                    />
                </div>
            </div>

            <Content >
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div className='grid md:grid-cols-3 gap-3'>
                        <Input
                            id='name'
                            label='Name'
                            type='text'
                            placeholder='Input Name'
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <SelectInput
                            id='type'
                            label="Type"
                            placeholder="Select Type"
                            value={formData.type}
                            onChange={(e) => handleChangeSelect('type', e)}
                            options={[
                                { label: 'Draft', value: 'draft' },
                            ]}
                        />
                        <SelectInput
                            id="category"
                            label="Category"
                            placeholder="Select Category"
                            value={formData.category}
                            onChange={(val) => handleChangeSelect("category", val)}
                            options={optionsCategories}
                        />
                        <SelectInput
                            id="target"
                            label="Target"
                            placeholder="Select Target"
                            value={formData.target}
                            onChange={(val) => handleChangeSelect("target", val)}
                            options={optionsCategories}
                        />
                        <SelectInput
                            id="parent_menu_item"
                            label="Parent Menu Item"
                            placeholder="Select Parent Menu Item"
                            value={formData.parent_menu_item}
                            onChange={(val) => handleChangeSelect("parent_menu_item", val)}
                            options={optionsCategories}
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
                        <div className='col-span-full grid md:grid-cols-2 gap-3'>
                            <FileUploader
                                label='Logo Favicon'
                                action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                multiple={true}
                                onSuccess={(file) => handleSuccess(file, 'logo_favicon')}
                                onError={handleError}
                                isUpload={isLoading.logo_favicon}
                                fileList={formData.logo_favicon?.map((img: any, index: any) => {
                                    return {
                                        uid: `${index}`,
                                        name: img.name ?? img.url,
                                        status: 'done',
                                        url: img.url
                                    }
                                })}
                            />
                            <FileUploader
                                label='Background Image'
                                action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                multiple={true}
                                onSuccess={(file) => handleSuccess(file, 'background_image')}
                                onError={handleError}
                                isUpload={isLoading.background_image}
                                fileList={formData.background_image?.map((img: any, index: any) => {
                                    return {
                                        uid: `${index}`,
                                        name: img.name ?? img.url,
                                        status: 'done',
                                        url: img.url
                                    }
                                })}
                            />
                        </div>


                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Menu' : 'Edit Menu'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormMenu;
