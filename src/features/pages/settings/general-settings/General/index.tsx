'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import TextArea from "@/components/textarea"
import SelectInput from '@/components/select';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalAddress from './ModalAddress';
import Image from 'next/image';
import { Divider } from 'antd';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        logo: initialValues ? initialValues.logo : [],
        logo_favicon: initialValues ? initialValues.logo_favicon : [],
        company_name: initialValues ? initialValues.company_name : '',
        address: initialValues ? initialValues.address : '',
        city: initialValues ? initialValues.city : '',
        state: initialValues ? initialValues.state : '',
        postcode: initialValues ? initialValues.postcode : '',
        country: initialValues ? initialValues.country : '',
        phone_number: initialValues ? initialValues.phone_number : '',
        email: initialValues ? initialValues.email : '',
        business_number: initialValues ? initialValues.business_number : '',
        meta_title: initialValues ? initialValues.meta_title : '',
        meta_description: initialValues ? initialValues.meta_description : '',
        facebook: initialValues ? initialValues.facebook : '',
        instagram: initialValues ? initialValues.instagram : '',
        xlink: initialValues ? initialValues.xlink : '',
        tiktok: initialValues ? initialValues.tiktok : '',
    });
    const [dynamicFields, setDynamicFields] = useState<Record<string, any[]>>({
        business_number: [],
        phone_number: [],
        address: [],
    });

    const metaTitle = formData.meta_title;
    const titleLength = metaTitle.length;
    const isTitleInvalid = titleLength > 65;

    const metaDescription = formData.meta_description;
    const descLength = metaDescription.length;
    const isDescInvalid = descLength > 165;



    const addDynamicItem = (field: string) => {
        setDynamicFields(prev => ({
            ...prev,
            [field]: [{ value: '' }, ...prev[field]],
        }));
    };

    const removeDynamicItem = (field: string, index: number) => {
        setDynamicFields(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const updateDynamicItem = (field: string, index: any, value: string) => {
        setDynamicFields(prev => {
            const updated = [...prev[field]];
            (updated[index] as any) = { value };
            return {
                ...prev,
                [field]: updated,
            };
        });
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

    const handleSubmit = async () => {
        try {
            const submitData = {
                logo: formData.logo,
                logo_favicon: formData.logo_favicon,
                company_name: formData.company_name,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                postcode: formData.postcode,
                phone_number: formData.phone_number,
                email: formData.email,

            }

            let response;
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
            <ModalAddress
                isModalOpen={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                handleChange={handleChange}
                formData={formData}
            />
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex flex-col gap-10'>
                        <FormGroup
                            title="Company Details"
                            description="Company details information"
                            childClassName='grid md:grid-cols-3 gap-4'
                        >
                            <div className='md:grid gap-4 md:h-[220px]'>
                                <FileUploader
                                    label='Logo'
                                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                    multiple={true}
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    isUpload={isLoading}
                                    fileList={formData.logo?.map((img: any, index: any) => {
                                        return {
                                            uid: `${index}`,
                                            name: img.name ?? img.url,
                                            status: 'done',
                                            url: img.url
                                        }
                                    })}
                                />
                                <FileUploader
                                    label='Logo Favicon'
                                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                    multiple={true}
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    isUpload={isLoading}
                                    fileList={formData.logo_favicon?.map((img: any, index: any) => {
                                        return {
                                            uid: `${index}`,
                                            name: img.name ?? img.url,
                                            status: 'done',
                                            url: img.url
                                        }
                                    })}
                                />
                            </div>
                            <div className='grid md:grid-cols-2 gap-4 w-full mt-2 col-span-2'>
                                <Input
                                    id='company_name'
                                    label='Company Name'
                                    type='text'
                                    placeholder='Company Name'
                                    onChange={handleChange}
                                    value={formData.company_name}
                                />
                                <Input
                                    id='business_number'
                                    label='Business Name'
                                    type='text'
                                    placeholder='Business Name'
                                    value={formData.business_number}
                                    onChange={handleChange}
                                />
                                <div className='col-span-full'>
                                    <Input
                                        id='address'
                                        label='Address'
                                        type='text'
                                        placeholder='Input Address'
                                        onChange={handleChange}
                                        value={formData.address}
                                        divClassName='w-full'
                                    />
                                </div>
                                <div className='col-span-full grid md:grid-cols-4 gap-2'>
                                    <Input
                                        id='city'
                                        label='City'
                                        type='text'
                                        placeholder='City'
                                        onChange={handleChange}
                                        value={formData.city}
                                    />
                                    <Input
                                        id='state'
                                        label='State'
                                        type='text'
                                        placeholder='State'
                                        onChange={handleChange}
                                        value={formData.state}
                                    />
                                    <Input
                                        id='postcode'
                                        label='Post Code'
                                        type='text'
                                        placeholder='Input Post Code'
                                        onChange={handleChange}
                                        value={formData.postcode}
                                    />
                                    <Input
                                        id='country'
                                        label='Country'
                                        type='text'
                                        placeholder='Input Country'
                                        onChange={handleChange}
                                        value={formData.country}
                                    />
                                </div>
                                <div className='col-span-full'>
                                    <div className='flex w-32'>
                                        <Button
                                            label='Add Another Address'
                                            icon={<PlusOutlined />}
                                            onClick={() => setIsModalOpen(true)}
                                            style={{ height: '5vh' }}
                                        />
                                    </div>
                                </div>
                                <div className='col-span-full grid md:grid-cols-2 gap-2'>
                                    <Input
                                        id='email'
                                        label='Email'
                                        type='email'
                                        placeholder='Email'
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                    <div className='grid gap-4'>
                                        <div className='flex gap-2'>
                                            <Input
                                                id='phone_number'
                                                label='Phone Number'
                                                type='text'
                                                placeholder='Phone Number'
                                                onChange={handleChange}
                                                value={formData.phone_number}
                                                divClassName='w-full'
                                            />
                                            <Button
                                                icon={<PlusOutlined />}
                                                onClick={() => addDynamicItem('phone_number')}
                                                style={{ height: '5vh', marginTop: '1.2rem' }}
                                            />

                                        </div>
                                        {dynamicFields.phone_number.map((item, index: any) => (
                                            <div key={index} className='flex gap-2'>
                                                <Input
                                                    id='phone_number'
                                                    label='Phone Number'
                                                    type='text'
                                                    placeholder='Input Phone Number'
                                                    onChange={(e) => updateDynamicItem(index, 'phone_number', e.target.value)}
                                                    value={item.value}
                                                    divClassName='w-full'
                                                />
                                                <Button
                                                    icon={
                                                        <DeleteOutlined className='!text-inherit' />
                                                    }
                                                    onClick={() => removeDynamicItem('phone_number', index)}
                                                    style={{ height: '5vh', marginTop: '1.2rem' }}

                                                />
                                            </div>

                                        ))}
                                    </div>



                                </div>

                                {/* <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <Input
                                            id='address'
                                            label='Address'
                                            type='text'
                                            placeholder='Input Address'
                                            onChange={handleChange}
                                            value={formData.address}
                                            divClassName='w-full'
                                        />
                                        <Button
                                            btnClassname="!text-white !h-10 md:mt-5"
                                            icon={<PlusOutlined />}
                                            onClick={() => addDynamicItem('address')}
                                        />
                                    </div>

                                    {dynamicFields.address.map((item, index: any) => (
                                        <div key={index} className='flex gap-2'>
                                            <Input
                                                id='address'
                                                label='Address'
                                                type='text'
                                                placeholder='Input Address'
                                                onChange={(e) => updateDynamicItem(index, 'address', e.target.value)}
                                                value={item.value}
                                                divClassName='w-full'
                                            />
                                            <Button
                                                icon={
                                                    <DeleteOutlined className='!text-inherit' />
                                                }
                                                onClick={() => removeDynamicItem('address', index)}
                                                btnClassname='!h-10 md:mt-5'
                                            />

                                        </div>

                                    ))}

                                </div> */}
                            </div>

                        </FormGroup>
                        <FormGroup
                            title="SEO"
                            description="SEO information"
                        >
                            <div className='flex flex-col md:flex-row gap-4'>
                                <TextArea id='meta_title'
                                    label='Meta Title'
                                    placeholder='Input Meta Title'
                                    onChange={handleChange}
                                    value={formData.meta_title}
                                    className='w-full'
                                    textareaClassname={`!h-20 ${isTitleInvalid ? '!border !border-red-500' : ''}`}
                                    notes={
                                        <span className={isTitleInvalid ? 'text-red-500' : 'text-gray-400'}>
                                            min.55 / max.65, Character {titleLength}
                                        </span>
                                    }
                                />
                                <TextArea id='meta_description'
                                    label='Meta Description'
                                    placeholder='Input Meta Description'
                                    onChange={handleChange}
                                    value={formData.meta_description}
                                    className='w-full'
                                    textareaClassname={`!h-20 ${isDescInvalid ? '!border !border-red-500' : ''}`}
                                    notes={
                                        <span className={isDescInvalid ? 'text-red-500' : 'text-gray-400'}>
                                            min.145 / max.165, Character {descLength}
                                        </span>
                                    }
                                />
                            </div>

                        </FormGroup>
                        <FormGroup
                            title="Social Media"
                            description="Social Media Link Information"
                        >
                            <div className='grid md:grid-cols-2 gap-4'>
                                <Input
                                    id='facebook'
                                    label='Facebook Link'
                                    type='text'
                                    placeholder='Facebook Link'
                                    onChange={handleChange}
                                    value={formData.facebook}
                                />

                                <Input
                                    id='instagram'
                                    label='Instagram Link'
                                    type='text'
                                    placeholder='Instagram Link'
                                    onChange={handleChange}
                                    value={formData.instagram}
                                />
                                <Input
                                    id='xlink'
                                    label='X Link'
                                    type='text'
                                    placeholder='X Link'
                                    onChange={handleChange}
                                    value={formData.xlink}
                                />

                                <Input
                                    id='tiktok'
                                    label='Tiktok Link'
                                    type='text'
                                    placeholder='Tiktok Link'
                                    onChange={handleChange}
                                    value={formData.tiktok}
                                />
                            </div>
                        </FormGroup>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create General' : 'Edit General'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
