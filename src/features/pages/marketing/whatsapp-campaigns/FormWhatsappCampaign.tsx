'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import Textarea from '@/components/textarea'
import FormGroup from '@/components/form-group';
import FileUploader from '@/components/input-file';
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
    SuccessIcon,
} from '@public/icon';
import dynamic from 'next/dynamic';
import Divider from '@/components/divider'
import ButtonAction from '@/components/button/ButtonAction';
import ButtonIcon from '@/components/button/ButtonIcon';
import Image from 'next/image';
import ModalPreviewTest from './ModalPreviewTest';
import { uploadImages } from '@/services/upload-images';

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });

const FormWhatsappCampaign: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [formData, setFormData] = useState({
        campaign_name: initialValues ? initialValues.campaign_name : '',
        audience_segment: initialValues ? initialValues.audience_segment : '',
        approve_template: initialValues ? initialValues.approve_template : '',
        language: initialValues ? initialValues.language : '',
        variable_mapper: initialValues ? initialValues.variable_mapper : [{ variable: '', mapping_field: '' }],
        media: initialValues ? initialValues.media : [],
        max_length_strategy: initialValues ? initialValues.max_length_strategy : 'Split',
        link_shortener: initialValues ? initialValues.link_shortener : false,
        click_tracking: initialValues ? initialValues.click_tracking : false,
        category_display: initialValues ? initialValues.category_display : '',
        rate_limit_per_minute: initialValues ? initialValues.rate_limit_per_minute : '',
        schedule_type: initialValues ? initialValues.schedule_type : '',
        schedule_at: initialValues ? initialValues.schedule_at : '',
        test_numbers: initialValues ? initialValues.test_numbers : '',
    });
    const [openModalPreviewTest, setOpenModalPreviewTest] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const breadcrumb = [
        { title: 'Campaigns Management' },
        { title: 'Whatsapp Campaigns', url: routes.eCommerce.whatsappCampaigns },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const addItem = () => {
        const newItem: any = {
            variable: '',
            mapping_field: ''
        };
        setFormData((prev: any) => ({
            ...prev,
            variable_mapper: [...prev.variable_mapper, newItem],
        }));
    };

    const handleRemoveRow = (index: number) => {
        setFormData((prev: any) => {
            const updatedItems = [...prev.variable_mapper];
            updatedItems.splice(index, 1);
            return {
                ...prev,
                variable_mapper: updatedItems,
            };
        });
    };

    const handleUpdateRow = (
        index: number,
        fieldName: any,
        value: any
    ) => {
        setFormData((prev: any) => {
            const updatedItems = [...prev.variable_mapper];
            updatedItems[index] = {
                ...updatedItems[index],
                [fieldName]: value
            };
            return {
                ...prev,
                variable_mapper: updatedItems,
            };
        });
    };

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

                setFormData(prev => {
                    const updated = { ...prev, media: images, }
                    return updated
                });
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

    console.log(formData)
    return (
        <>
            {contextHolder}
            <ModalPreviewTest
                isModalOpen={openModalPreviewTest}
                handleCancel={() => setOpenModalPreviewTest(false)}
            />
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Whatsapp Campaign' : 'Edit Whatsapp Campaign'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div className='p-6 min-h-[360px] flex flex-col gap-8'>
                    <div className='grid md:grid-cols-2 gap-3'>
                        <Input
                            id='campaign_name'
                            label='Campaign Name'
                            type='text'
                            placeholder='Input Campaign Name'
                            onChange={handleChange('campaign_name')}
                            value={formData.campaign_name}
                        />
                        <SelectInput
                            id='audience_segment'
                            label='Audience Segment'
                            placeholder='Input Audience Segment'
                            onChange={handleChange('audience_segment')}
                            value={formData.audience_segment}
                            options={[
                                { label: 'All Subscribers', value: 'All Subscribers' },
                                { label: 'Active Subscribers', value: 'Active Subscribers' },
                            ]}
                        />
                        <SelectInput
                            id='approve_template'
                            label='Approved Template'
                            placeholder='Input Approved Template'
                            onChange={handleChange('approve_template')}
                            value={formData.approve_template}
                            options={[
                                { label: 'Get Discount 20%', value: '1' },
                                { label: 'Buy 1 Get 1 Free', value: '2' },
                                { label: 'Buy 2 Get Free Gift', value: '3' },
                            ]}
                        />
                        <SelectInput
                            id='language'
                            label='Language / Local'
                            placeholder='Input Language / Local'
                            onChange={handleChange('language')}
                            value={formData.language}
                            options={[
                                { label: 'ENG', value: 'en' },
                                { label: 'ID', value: 'id' },
                            ]}
                        />
                        <div className='col-span-full flex flex-col gap-3 my-5'>
                            <h1 className='text-xl font-semibold'>Variable Mapper</h1>
                            <Divider />
                            {
                                formData?.variable_mapper?.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className='col-span-full grid md:grid-cols-[repeat(2,2fr)_50px] gap-3 w-full'>
                                            <Input
                                                id='variable'
                                                label='Variable'
                                                type='text'
                                                placeholder='Input Variable'
                                                onChange={(e) => handleUpdateRow(index, 'variable', e.target.value)}
                                                value={item.variable}
                                            />
                                            <Input
                                                id='mapping_field'
                                                label='Mapped Field (Campaign Data)'
                                                type='text'
                                                placeholder='Input Mapped Field (Campaign Data)'
                                                onChange={(e) => handleUpdateRow(index, 'mapping_field', e.target.value)}
                                                value={item.mapping_field}
                                            />
                                            <div className='pt-5'>
                                                <ButtonIcon
                                                    color='danger'
                                                    variant='filled'
                                                    size="small"
                                                    icon={TrashIconRed}
                                                    width={15}
                                                    height={15}
                                                    className='!h-10 !w-15'
                                                    onClick={() => handleRemoveRow(index)}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <Divider />
                            <div className='flex justify-end'>
                                <Button
                                    label='Add Variable'
                                    icon={<Image src={PlusOutlineIcon} alt='plus-icon' />}
                                    onClick={addItem}
                                />
                            </div>

                        </div>
                        <div className='col-span-full'>
                            <FileUploader
                                label='Media'
                                action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                multiple={true}
                                onSuccess={handleSuccess}
                                onError={handleError}
                                isUpload={isLoading}
                                fileList={formData.media?.map((img: any, index: any) => {
                                    return {
                                        uid: `${index}`,
                                        name: img.name ?? img.url,
                                        status: 'done',
                                        url: img.url
                                    }
                                })}
                            />
                        </div>
                        <div className='col-span-full grid md:grid-cols-3 gap-3'>
                            <SelectInput
                                id='max_length_strategy'
                                label='Max Length Strategy'
                                placeholder='Input Max Length Strategy'
                                onChange={handleChange('max_length_strategy')}
                                value={formData.max_length_strategy}
                                options={[
                                    { label: 'Truncate', value: 'Truncate' },
                                    { label: 'Split', value: 'Split' },
                                    { label: 'Reject', value: 'Reject' },
                                ]}
                            />
                            <CheckboxInput
                                label='Link Shortener (Optional)'
                                checked={formData.link_shortener}
                                onChange={handleChange('link_shortener')}
                                text='Link Shortener'
                            />
                            <CheckboxInput
                                label='Click Tracking (Optional)'
                                checked={formData.click_tracking}
                                onChange={handleChange('click_tracking')}
                                text='Click Tracking'
                            />
                        </div>
                        <SelectInput
                            id='category_display'
                            label='Category Display'
                            placeholder='Select Category Display'
                            onChange={handleChange('category_display')}
                            value={formData.category_display || undefined}
                            options={[
                                { label: 'Marketing', value: 'Marketing' },
                                { label: 'Utility', value: 'Utility' },
                            ]}
                        />
                        <Input
                            id='rate_limit_per_minute'
                            label='Rate Limit Per Minute (Optional)'
                            type='text'
                            placeholder='Input Rate Limit Per Minute '
                            onChange={handleChange('rate_limit_per_minute')}
                            value={formData.rate_limit_per_minute}
                        />
                        <div className='col-span-full grid md:grid-cols-3 gap-3'>
                            <SelectInput
                                id='schedule_type'
                                label='Schedule Type'
                                placeholder='Select Schedule Type'
                                onChange={handleChange('schedule_type')}
                                value={formData.schedule_type}
                                options={[
                                    { label: 'Send Now', value: 'Send Now' },
                                    { label: 'Scheduled', value: 'Scheduled' },
                                    { label: 'RRULE', value: 'RRULE' },
                                ]}
                            />
                            <DatePickerInput
                                id='schedule_at'
                                label='Schedule At / RRULE'
                                value={formData.schedule_at ? dayjs(formData.schedule_at, 'DD-MM-YYYY HH:mm') : null}
                                onChange={(value: any, dateString: any) => handleDateChange('schedule_at', value, dateString)}
                                showTime
                                format='DD-MM-YYYY HH:mm'
                            />
                            <SelectInput
                                id='test_numbers'
                                label='Test Numbers'
                                placeholder='Select Test Numbers'
                                onChange={handleChange('test_numbers')}
                                value={formData.test_numbers || undefined}
                                options={[
                                    { label: 'Australia', value: 'Australia' },
                                    { label: 'Indonesia', value: 'Indonesia' },
                                ]}
                                modeType='multiple'
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-between">
                        <ButtonAction
                            label='Preview & Test'
                            onClick={() => setOpenModalPreviewTest(true)}
                        />
                        <Button
                            label={mode === 'create' ? 'Create Whatsapp Campaign' : 'Edit Whatsapp Campaign'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content >
        </>
    );
};

export default FormWhatsappCampaign;
