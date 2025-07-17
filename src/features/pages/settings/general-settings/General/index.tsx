'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import TextArea from "@/components/textarea"
import SelectInput from '@/components/select';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        logo: initialValues ? initialValues.logo : [],
        logo_favicon: initialValues ? initialValues.logo_favicon : [],
        company_name: initialValues ? initialValues.company_name : '',
        address: initialValues ? initialValues.address : '',
        city: initialValues ? initialValues.city : '',
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
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div>
                        <FormGroup
                            title="Company"
                            description="Company information"
                        >
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
                            <Input
                                id='company_name'
                                label='Company Name'
                                type='text'
                                placeholder='Input Company Name'
                                onChange={handleChange}
                                value={formData.company_name}
                            />
                            <div>
                                {dynamicFields.address.map((item, index: any) => (
                                    <div key={index} className='flex gap-2'>
                                        <div className='col-span-full w-full'>
                                            <TextArea id='address'
                                                label='Address'
                                                placeholder='Input Address'
                                                onChange={(e) => updateDynamicItem(index, 'address', e.target.value)}
                                                value={item.value}
                                            />
                                        </div>

                                        <MinusCircleOutlined
                                            onClick={() => removeDynamicItem('address', index)}
                                            style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                                        />
                                    </div>

                                ))}
                                <div className='md:mt-5 flex justify-end'>
                                    <Button
                                        label='Add Address'
                                        btnClassname="!text-white"
                                        icon={<PlusOutlined />}
                                        onClick={() => addDynamicItem('address')}
                                    />
                                </div>
                            </div>

                            <Input
                                id='city'
                                label='City'
                                type='text'
                                placeholder='Input City'
                                onChange={handleChange}
                                value={formData.city}
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

                            <div>
                                {dynamicFields.phone_number.map((item, index: any) => (
                                    <div key={index} className='flex gap-2'>
                                        <div className='col-span-full w-full'>
                                            <Input
                                                id='phone_number'
                                                label='Phone Number'
                                                type='text'
                                                placeholder='Input Phone Number'
                                                onChange={(e) => updateDynamicItem(index, 'phone_number', e.target.value)}
                                                value={item.value}

                                            />
                                        </div>

                                        <MinusCircleOutlined
                                            onClick={() => removeDynamicItem('phone_number', index)}
                                            style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                                        />
                                    </div>

                                ))}
                                <div className='md:mt-5 flex justify-end'>
                                    <Button
                                        label='Add Phone Number'
                                        btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                                        icon={<PlusOutlined />}
                                        onClick={() => addDynamicItem('phone_number')}
                                    />
                                </div>
                            </div>

                            <Input
                                id='email'
                                label='Email'
                                type='email'
                                placeholder='Input Email'
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                        <FormGroup title="Company Details" description='Company Details Information'>
                            <div className="space-y-4 col-span-full">
                                {dynamicFields.business_number.map((item, index: any) => (
                                    <div key={index} className="flex items-center gap-2 mb-3 w-full">
                                        <div className="w-full">
                                            <Input
                                                id='business_number'
                                                label='Business Name'
                                                type='text'
                                                value={item.value}
                                                onChange={(e) => updateDynamicItem(index, 'business_number', e.target.value)}
                                                style={{ width: '100%', borderColor: '#E5E7EB' }}
                                            />
                                        </div>

                                        <div className="pt-6">
                                            <MinusCircleOutlined
                                                onClick={() => removeDynamicItem('business_number', index)}
                                                style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-end mt-4">
                                    <Button
                                        label='Add Business Number'
                                        btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                                        icon={<PlusOutlined />}
                                        onClick={() => addDynamicItem('business_number')}
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                        <FormGroup
                            title="SEO"
                            description="SEO information"
                        >
                            <div className='col-span-full w-full'>
                                <TextArea id='meta_title'
                                    label='Meta Title'
                                    placeholder='Input Meta Title'
                                    onChange={handleChange}
                                    value={formData.meta_title}
                                    notes='min.55 / max.65, Character 0'
                                />
                            </div>

                            <div className='col-span-full w-full'>
                                <TextArea id='meta_description'
                                    label='Meta Description'
                                    placeholder='Input Meta Description'
                                    onChange={handleChange}
                                    value={formData.meta_description}
                                    notes='min.145 / max.165, Character 0'
                                />
                            </div>

                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />
                        <FormGroup
                            title="Social Media Link"
                        >
                            <div className='col-span-full w-full'>
                                <Input
                                    id='facebook'
                                    label='Facebook Link'
                                    type='text'
                                    placeholder='Facebook Link'
                                    onChange={handleChange}
                                    value={formData.facebook}
                                />
                            </div>
                            <div className='col-span-full w-full'>
                                <Input
                                    id='instagram'
                                    label='Instagram Link'
                                    type='text'
                                    placeholder='Input Instagram Link'
                                    onChange={handleChange}
                                    value={formData.instagram}
                                />
                            </div>
                            <div className='col-span-full w-full'>
                                <Input
                                    id='xlink'
                                    label='X Link'
                                    type='text'
                                    placeholder='X Link'
                                    onChange={handleChange}
                                    value={formData.xlink}
                                />
                            </div>
                            <div className='col-span-full w-full'>
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
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
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
