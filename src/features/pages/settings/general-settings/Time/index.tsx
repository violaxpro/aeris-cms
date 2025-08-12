'use client'
import React, { useState, useEffect } from 'react';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import { useNotificationAntd } from '@/components/toast';
import { timeFormats, timezones } from '@/plugins/utils/utils';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [formData, setFormData] = useState({
        time_format: initialValues ? initialValues.time_format : '',
        time_zone: initialValues ? initialValues.time_zone : '',
    });


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
                time_format: formData.time_format,
                time_zone: formData.time_zone,
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
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                    <div>
                        <FormGroup
                            title="Time"
                            description="Time Setting"
                            childClassName='grid md:grid-cols-2 gap-3'
                        >
                            <SelectInput
                                id='time_format'
                                label='Time Format'
                                value={formData.time_format}
                                onChange={(selected) => handleChangeSelect('time_format', selected)}
                                options={timeFormats}
                                className='w-full'
                            />
                            <SelectInput
                                id='time_zone'
                                label='Time Zone'
                                value={formData.time_zone}
                                onChange={(selected) => handleChangeSelect('time_zone', selected)}
                                options={timezones}
                                className='w-full'
                            />
                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label='Save Time'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
