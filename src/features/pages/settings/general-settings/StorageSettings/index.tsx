'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { Divider } from 'antd';
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import SwitchInput from '@/components/switch';
import Input from "@/components/input"
import CheckboxInput from '@/components/checkbox';
import SelectInput from '@/components/select';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [formData, setFormData] = useState({
        mode: initialValues ? initialValues.mode : false,
        access_key_test: initialValues ? initialValues.access_key_test : '',
        secret_key_test: initialValues ? initialValues.secret_key_test : '',
        bucket_name_test: initialValues ? initialValues.bucket_name_test : '',
        region_test: initialValues ? initialValues.region_test : '',
        access_key_live: initialValues ? initialValues.access_key_live : '',
        secret_key_live: initialValues ? initialValues.secret_key_live : '',
        bucket_name_live: initialValues ? initialValues.bucket_name_live : '',
        region_live: initialValues ? initialValues.region_live : '',
    });
    const optionsMode = [
        { label: "Live", value: 'live' },
        { label: "Test", value: 'test' },
    ]

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            // const submitData = {
            //     logo: formData.logo,
            //     logo_favicon: formData.logo_favicon,
            //     company_name: formData.company_name,
            //     address: formData.address,
            //     city: formData.city,
            //     country: formData.country,
            //     postcode: formData.postcode,
            //     phone_number: formData.phone_number,
            //     email: formData.email,

            // }

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
            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='mt-4'>
                        <div className='flex justify-between mt-4 items-center'>
                            <div>
                                <h4 className="text-base font-medium">Storage Settings</h4>
                                <p className="mt-2">Storage Settings</p>
                            </div>
                            <SwitchInput
                                label='Live/Test Mode'
                                checked={formData.mode}
                                onChange={(checked) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        mode: checked
                                    }))
                                }
                            />
                        </div>
                        <Divider />
                        <div className={`col-span-12 md:col-span-8 grid grid-cols-2 gap-4`}>

                            <Input
                                id='access_key_test'
                                label='Access Key Test'
                                type='text'
                                placeholder='Access Key Test'
                                onChange={handleChange}
                                value={formData.access_key_test}
                            />
                            <Input
                                id='secret_key_test'
                                label='Secret Key Test'
                                type='text'
                                placeholder='Secret Key Test'
                                onChange={handleChange}
                                value={formData.secret_key_test}
                            />
                            <Input
                                id='bucket_name_test'
                                label='Bucket Name Test'
                                type='text'
                                placeholder='Bucket Name Test'
                                onChange={handleChange}
                                value={formData.bucket_name_test}
                            />
                            <Input
                                id='region_test'
                                label='Region Test'
                                type='text'
                                placeholder='Region Test'
                                onChange={handleChange}
                                value={formData.region_test}
                            />
                            <Input
                                id='access_key_live'
                                label='Access Key Live'
                                type='text'
                                placeholder='Access Key Live'
                                onChange={handleChange}
                                value={formData.access_key_live}
                            />
                            <Input
                                id='secret_key_live'
                                label='Secret Key Live'
                                type='text'
                                placeholder='Secret Key Live'
                                onChange={handleChange}
                                value={formData.secret_key_live}
                            />
                            <Input
                                id='bucket_name_live'
                                label='Bucket Name Live'
                                type='text'
                                placeholder='Bucket Name Live'
                                onChange={handleChange}
                                value={formData.bucket_name_live}
                            />
                            <Input
                                id='region_live'
                                label='Region Live'
                                type='text'
                                placeholder='Region Live'
                                onChange={handleChange}
                                value={formData.region_live}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label='Create Storage Settings'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
