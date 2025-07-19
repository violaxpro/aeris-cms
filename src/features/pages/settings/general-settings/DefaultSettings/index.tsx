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
import SwitchInput from '@/components/switch';
import { uploadImages } from '@/services/upload-images';
import { useNotificationAntd } from '@/components/toast';
import FileUploader from '@/components/input-file';
import DatePickerInput from '@/components/date-picker';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

const index: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [formData, setFormData] = useState({
        bills_default_due_date: initialValues ? initialValues.bills_default_due_date : '',
        sales_invoice_default_due_date: initialValues ? initialValues.sales_invoice_default_due_date : '',
        invoice_next_number: initialValues ? initialValues.invoice_next_number : '',
        credit_note: initialValues ? initialValues.credit_note : '',
        purchase_next_number: initialValues ? initialValues.purchase_next_number : '',
        quote_next_number: initialValues ? initialValues.quote_next_number : '',
        include_link_invoice: initialValues ? initialValues.include_link_invoice : '',
        expire_due_date: initialValues ? initialValues.expire_due_date : '',
    });

    const handleDateChange = (field: 'bills_default_due_date' | 'sales_invoice_default_due_date' | 'expire_due_date', value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };

    const optionsSecurityType = [
        { label: "SSL", value: 'ssl' },
        { label: "TLS", value: 'tls' },
        { label: "STARTTLS", value: 'starttls' },
        { label: "No Security", value: 'nosecurity' }
    ]

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
                            title="Default Setting"
                            description="Default Setting"
                            childClassName='flex gap-3'
                        >
                            <DatePickerInput
                                id='bills_default_due_date'
                                label='Bills Default Due Date (Optional)'
                                value={formData.bills_default_due_date ? dayjs(formData.bills_default_due_date) : null}
                                onChange={(value: any, dateString: any) => handleDateChange('bills_default_due_date', value, dateString)}
                            />
                            <DatePickerInput
                                id='sales_invoice_default_due_date'
                                label='Sales Invoices Default Due Date (Optional)'
                                value={formData.sales_invoice_default_due_date ? dayjs(formData.sales_invoice_default_due_date) : null}
                                onChange={(value: any, dateString: any) => handleDateChange('sales_invoice_default_due_date', value, dateString)}
                            />
                        </FormGroup>
                        <FormGroup title="Automatic Sequencing" description='Automatic Sequencing' className='mt-6'>
                            <div className='col-span-full grid grid-cols-2 gap-3' style={{ borderColor: '#E5E7EB' }}  >
                                <div>
                                    <Input
                                        id='invoice_next_number'
                                        label='Invoice Prefix'
                                        type='text'
                                        placeholder='Invoice Prefix'
                                        onChange={handleChange}
                                        value={formData.invoice_next_number}
                                    />
                                </div>
                                <div>
                                    <Input
                                        id='purchase_next_number'
                                        label='Purchase Order Prefix'
                                        type='text'
                                        placeholder='Purchase Order Prefix'
                                        onChange={handleChange}
                                        value={formData.purchase_next_number}
                                    />
                                </div>
                                <div>
                                    <Input
                                        id='quote_next_number'
                                        label='Quote Prefix'
                                        type='text'
                                        placeholder='Quote Prefix'
                                        onChange={handleChange}
                                        value={formData.quote_next_number}
                                    />
                                </div>
                                <div>
                                    <Input
                                        id='credit_note'
                                        label='Credit Note Prefix'
                                        type='text'
                                        placeholder='Credit Note Prefix'
                                        onChange={handleChange}
                                        value={formData.credit_note}
                                    />
                                </div>

                            </div>

                        </FormGroup>


                        <FormGroup
                            title="Show Outstanding Bills"
                            description="Show Outstanding Bills"
                            className='mt-6'
                        >
                            <div className='col-span-full'>
                                <Input
                                    id='include_link_invoice'
                                    label='Include a Link on Online Invoices to Show All Outstanding Bills for a Contact'
                                    type='text'
                                    placeholder='Type here'
                                    onChange={handleChange}
                                    value={formData.include_link_invoice}
                                />
                            </div>

                        </FormGroup>

                        <FormGroup
                            title="Quote Expire Date"
                            description="Quote Expire Date"
                            className='mt-6'
                        >
                            <DatePickerInput
                                id='expire_due_date'
                                label='Quote Expire Due Date'
                                value={formData.expire_due_date ? dayjs(formData.expire_due_date) : null}
                                onChange={(value: any, dateString: any) => handleDateChange('expire_due_date', value, dateString)}
                            />
                        </FormGroup>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label='Create Default Setting'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default index;
