'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import CheckboxInput from '@/components/checkbox';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [formData, setFormData] = useState({
        maintenance: initialValues ? initialValues.maintenance : false,
    });

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

                    <div>
                        <FormGroup
                            title="Maintenance"
                            description="Maintenance setting for handling if system is maintenance"
                        >
                            <CheckboxInput
                                text='Maintenance Mode'
                                checked={formData.maintenance}
                                onChange={(checked) => (
                                    setFormData((prev) => ({
                                        ...prev,
                                        maintenance: checked
                                    }))
                                )}
                            />

                        </FormGroup>
                        <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', margin: '1rem 0' }} />

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label='Create Maintenance'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
