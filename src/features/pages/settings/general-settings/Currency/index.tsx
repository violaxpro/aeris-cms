'use client'
import React, { useState, useEffect } from 'react';
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import CheckboxInput from '@/components/checkbox';
import { useNotificationAntd } from '@/components/toast';

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [formData, setFormData] = useState({
        support_currency: initialValues ? initialValues.support_currency : '',
        default_currency: initialValues ? initialValues.default_currency : '',
        rate_service: initialValues ? initialValues.rate_service : '',
        auto_refresh: initialValues ? initialValues.auto_refresh : false,
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
                support_currency: formData.support_currency,
                default_currency: formData.default_currency,
                rate_service: formData.rate_service,
                auto_refresh: formData.auto_refresh,
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
                            title="Currency"
                            description="Currency information"
                        >
                            <Input
                                id='support_currency'
                                label='Supported Currency'
                                type='text'
                                placeholder='Supported Currency'
                                onChange={handleChange}
                                value={formData.support_currency}
                            />
                            <Input
                                id='default_currency'
                                label='Default Currency'
                                type='text'
                                placeholder='Default Currency'
                                onChange={handleChange}
                                value={formData.default_currency}
                            />
                            <Input
                                id='rate_service'
                                label='Exchange Rate Service'
                                type='text'
                                placeholder='Exchange Rate Service'
                                onChange={handleChange}
                                value={formData.rate_service}
                            />
                            <CheckboxInput
                                label='Auto Refresh'
                                text={formData.auto_refresh == true ? 'True' : 'False'}
                                onChange={(e: any) => setFormData({
                                    ...formData,
                                    auto_refresh: e
                                })}
                                checked={formData.auto_refresh}
                            />

                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label='Save Currency'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
