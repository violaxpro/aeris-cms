'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import Textarea from '@/components/textarea'
import FormGroup from '@/components/form-group';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import { routes } from '@/config/routes';
import { useNotificationAntd } from '@/components/toast';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import {
    CancelGreyIcon,
    PlusOutlineIcon,
    DollarIcon,
    TrashIconRed,
    AlertIcon,
    WarningIcon,
    SuccessIcon
} from '@public/icon';
import dynamic from 'next/dynamic';
import Divider from '@/components/divider'
import ButtonAction from '@/components/button/ButtonAction';
import ModalPreviewTest from './ModalPreviewTest';
import Modal from '@/components/modal'
import Table from '@/components/table'
import type { TableColumnsType } from 'antd';

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const FormSmsCampaign: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [formData, setFormData] = useState({
        campaign_name: initialValues ? initialValues.campaign_name : '',
        audience_segment: initialValues ? initialValues.audience_segment : '',
        custom_audience: initialValues ? initialValues.custom_audience : '',
        utm_parameters: initialValues ? initialValues.utm_parameters : '',
        provider: initialValues ? initialValues.provider : '',
        sender_id: initialValues ? initialValues.sender_id : '',
        message_body: initialValues ? initialValues.message_body : '',
        template_selector: initialValues ? initialValues.template_selector : '',
        content: initialValues ? initialValues.content : '',
        max_length_strategy: initialValues ? initialValues.max_length_strategy : 'Split',
        link_shortener: initialValues ? initialValues.link_shortener : false,
        click_tracking: initialValues ? initialValues.click_tracking : true,
        skip_if_no_option: initialValues ? initialValues.skip_if_no_option : true,
        country_routing: initialValues ? initialValues.country_routing : '',
        rate_limit_per_minute: initialValues ? initialValues.rate_limit_per_minute : '',
        schedule_type: initialValues ? initialValues.schedule_type : '',
        schedule_at: initialValues ? initialValues.schedule_at : '',
        test_numbers: initialValues ? initialValues.test_numbers : '',
    });
    const [openModalPreviewTest, setOpenModalPreviewTest] = useState(false)
    const [openModalCustomer, setOpenModalCustomer] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const breadcrumb = [
        { title: 'Campaigns Management' },
        { title: 'SMS Campaigns', url: routes.eCommerce.smsCampaigns },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const columnCustomer: TableColumnsType<any> = [
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            sorter: (a: any, b: any) => {
                return a?.customer_name.localeCompare(b?.customer_name)
            },
            render: (_: any, row: any) => {
                return row.customer_name
            }
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            sorter: (a: any, b: any) => {
                return a?.phone_number.localeCompare(b?.phone_number)
            },
            render: (_: any, row: any) => {
                return row.phone_number
            }
        }
    ]

    const handleChange = (field: string) => (
        e: any
    ) => {
        let value;

        // Kalau boolean (checkbox)
        if (typeof e === 'boolean') {
            value = e;
        }
        // Kalau event dari checkbox native
        else if (e?.target?.type === 'checkbox') {
            value = e.target.checked;
        }
        // Kalau string atau array langsung pakai
        else if (typeof e === 'string' || Array.isArray(e)) {
            if (e == 'Custom') {
                setOpenModalCustomer(true)
            }
            value = e;
        }
        // Input biasa (text/number)
        else {
            value = e.target.value;
        }

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDateChange = (field: string, value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };

    const handleSubmit = async () => {
        try {
            // const submitData = {
            //     name: formData.name,
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
    return (
        <>
            {contextHolder}
            <ModalPreviewTest
                isModalOpen={openModalPreviewTest}
                handleCancel={() => setOpenModalPreviewTest(false)}
            />
            {
                formData.audience_segment == 'Custom' &&
                <Modal
                    open={openModalCustomer}
                    handleCancel={() => setOpenModalCustomer(false)}
                    title='List Customer Groups'
                >
                    <Table
                        columns={columnCustomer}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        dataSource={[
                            {
                                id: 1,
                                customer_name: 'John Smith',
                                phone_number: '+6283176374875',
                            },
                            {
                                id: 2,
                                customer_name: 'Linda',
                                phone_number: '+6281277361589',
                            },
                        ]}

                    />
                </Modal>
            }
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create SMS Campaign' : 'Edit SMS Campaign'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div className='p-6 min-h-[360px] flex flex-col gap-8'>
                    <div className='grid md:grid-cols-5 gap-3'>
                        <Input
                            id='campaign_name'
                            label='Campaign Name'
                            type='text'
                            placeholder='Summer Promo 2025'
                            onChange={handleChange('campaign_name')}
                            value={formData.campaign_name}
                        />
                        <SelectInput
                            id='audience_segment'
                            label='Audience Segment'
                            placeholder='Loyal Customers - Last 90 Days'
                            onChange={handleChange('audience_segment')}
                            value={formData.audience_segment || undefined}
                            options={[
                                { label: 'All Subscribers', value: 'All Subscribers' },
                                { label: 'Active Subscribers', value: 'Active Subscribers' },
                                { label: 'Custom', value: 'Custom' },
                            ]}
                        />
                        {/* <Input
                            id='utm_parameters'
                            label='UTM Parameters'
                            type='text'
                            placeholder='Input UTM Parameters'
                            onChange={handleChange('utm_parameters')}
                            value={formData.utm_parameters}
                        /> */}
                        <SelectInput
                            id='country_routing'
                            label='Country Routing (Optional)'
                            placeholder='Australia'
                            onChange={handleChange('country_routing')}
                            value={formData.country_routing || undefined}
                            options={[
                                { label: 'Australia', value: 'Australia' },
                                { label: 'Indonesia', value: 'Indonesia' },
                            ]}
                            modeType='multiple'
                        />
                        <SelectInput
                            id='provider'
                            label='Provider'
                            placeholder='Twillio'
                            onChange={handleChange('provider')}
                            value={formData.provider || undefined}
                            options={[
                                { label: 'Twillio', value: 'Twillio' },
                            ]}
                        />
                        <SelectInput
                            id='sender_id'
                            label='Sender ID / Number'
                            placeholder='+12025550123'
                            onChange={handleChange('sender_id')}
                            value={formData.sender_id || undefined}
                            options={[
                                { label: '+61025550123', value: '+61025550123' },
                            ]}
                        />
                        <div className='col-span-full flex flex-col gap-3'>
                            <SelectInput
                                id='template_selector'
                                label='Template Selector (Optional)'
                                placeholder='Flash Sale Reminder Template'
                                onChange={handleChange('template_selector')}
                                value={formData.template_selector || undefined}
                                options={[
                                    { label: 'SMS Campaigns Template', value: '1' }
                                ]}
                            />
                            <QuillInput
                                value={formData.content}
                                onChange={handleChange('content')}
                                label="Content Editor"
                                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                placeholder='Hi {{first_name}}, 
                                Don’t miss our Summer Sale! Get 20% off all items. 
                                Shop now: https://brand.ly/sale
                                Reply STOP to opt out.
                                '
                                notes={
                                    <div className='flex gap-3'>
                                        <span>Characters: 120 </span>
                                        <span> Segments: 1 </span>
                                        <span> Est. cost: $0.02</span>
                                        {/* Est. cost = (Jumlah penerima) × (Jumlah segmen) × (Tarif per SMS segmen) */}
                                    </div>
                                }
                            />
                        </div>
                        <div className={`col-span-full grid ${formData.schedule_type !== 'Send Now' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-3`}>
                            <SelectInput
                                id='max_length_strategy'
                                label='Max Length Strategy'
                                placeholder='Split'
                                onChange={handleChange('max_length_strategy')}
                                value={formData.max_length_strategy || undefined}
                                options={[
                                    { label: 'Truncate', value: 'Truncate' },
                                    { label: 'Split', value: 'Split' },
                                    { label: 'Reject', value: 'Reject' },
                                ]}
                            />
                            <Input
                                id='rate_limit_per_minute'
                                label='Rate Limit Per Minute (Optional)'
                                type='text'
                                placeholder='500'
                                onChange={handleChange('rate_limit_per_minute')}
                                value={formData.rate_limit_per_minute}
                            />
                            <SelectInput
                                id='schedule_type'
                                label='Schedule Type'
                                placeholder='Send Now'
                                onChange={handleChange('schedule_type')}
                                value={formData.schedule_type || undefined}
                                options={[
                                    { label: 'Send Now', value: 'Send Now' },
                                    { label: 'Scheduled', value: 'Scheduled' },
                                    { label: 'RRULE', value: 'RRULE' },
                                ]}
                            />
                            {
                                formData.schedule_type !== 'Send Now' &&
                                <DatePickerInput
                                    id='schedule_at'
                                    label='Set Schedule'
                                    placeholder='09/10/2025 10:00 AM'
                                    value={formData.schedule_at ? dayjs(formData.schedule_at, 'DD-MM-YYYY HH:mm') : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('schedule_at', value, dateString)}
                                    showTime
                                    format='DD-MM-YYYY HH:mm'
                                />
                            }

                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-between">
                        <ButtonAction
                            label='Preview & Test'
                            onClick={() => setOpenModalPreviewTest(true)}
                        />
                        <Button
                            label={mode === 'create' ? 'Create SMS Campaign' : 'Edit SMS Campaign'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content >
        </>
    );
};

export default FormSmsCampaign;
