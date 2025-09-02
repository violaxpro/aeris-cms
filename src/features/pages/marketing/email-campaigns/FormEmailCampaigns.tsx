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
import { useParams } from 'next/navigation'
import { getPriceLevel, addPriceLevel, updatePriceLevel } from '@/services/price-level-service';
import FileUploader from '@/components/input-file';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
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
import { PercentageOutlined } from '@ant-design/icons';
import ButtonIcon from '@/components/button/ButtonIcon';
import { productSetAtom } from '@/store/DropdownItemStore';
import Image from 'next/image';
import Segmented from '@/components/segmented'
import { uploadImages } from '@/services/upload-images';
import dynamic from 'next/dynamic';
import Divider from '@/components/divider'
import { validateSubject, borderColors } from '@/plugins/utils/utils';

const QuillInput = dynamic(() => import('@/components/quill-input'), { ssr: false, loading: () => <p>Loading editor...</p>, });


const FormEmailCampaigns: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [optionProducts] = useAtom(productSetAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionsCategories] = useAtom(categoriesAtom)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        campaign_name: initialValues ? initialValues.campaign_name : '',
        description: initialValues ? initialValues.description : '',
        from_name: initialValues ? initialValues.from_name : '',
        from_email: initialValues ? initialValues.from_email : '',
        reply_to_email: initialValues ? initialValues.reply_to_email : '',
        subject: initialValues ? initialValues.subject : '',
        preheader: initialValues ? initialValues.preheader : '',
        choose_template: initialValues ? initialValues.choose_template : '',
        content_type: initialValues ? initialValues.content_type : '',
        content: initialValues ? initialValues.content : '',
        segment: initialValues ? initialValues.segment : '',
        exclusion_lists: initialValues ? initialValues.exclusion_lists : '',
        test_type: initialValues ? initialValues.test_type : '',
        subjecta: initialValues ? initialValues.subjecta : '',
        subjectb: initialValues ? initialValues.subjectb : '',
        contenta: initialValues ? initialValues.contenta : '',
        contentb: initialValues ? initialValues.contentb : '',
        schedule: initialValues ? initialValues.schedule : '',
        throttling: initialValues ? initialValues.throttling : '',
        open_tracking: initialValues ? initialValues.open_tracking : false,
        click_tracking: initialValues ? initialValues.click_tracking : false,
        utm_builder: initialValues ? initialValues.utm_builder : '',
        unsubscribe_link: initialValues ? initialValues.unsubscribe_link : true,
        domain_status: initialValues ? initialValues.domain_status : '',
    });
    const subjectValidation = validateSubject(formData.subject);
    const preheaderValidation = validateSubject(formData.preheader);
    const [product, setProduct] = useState([{
        product_name: '',
        buy_price: '',
        rrp_price: '',
        trade_price: '',
        silver_price: '',
        gold_price: '',
        platinum_price: '',
        diamond_price: '',
        flash_sale_price: '',
        quantity: '',
    }])
    const [selectedDiscountType, setSelectedDiscountType] = useState('percent')
    const [dynamicFields, setDynamicFields] = useState<Record<string, any[]>>({
        category: [{ value: '' }],
        exclude_category: [],
        product: [],
        exclude_product: [],
    });

    console.log(dynamicFields)

    const breadcrumb = [
        { title: 'Marketing' },
        { title: 'Email Campaigns', url: routes.eCommerce.emailCampaigns },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

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

                handleChange('file_attachment')(images)
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


    const handleChangeProduct = (
        index: number,
        field: string,
        value: string | number
    ) => {
        setProduct((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return updated;
        });
    };

    const handleAddProduct = () => {
        setProduct((prev) => [
            ...prev,
            {
                product_name: '',
                buy_price: '',
                rrp_price: '',
                trade_price: '',
                silver_price: '',
                gold_price: '',
                platinum_price: '',
                diamond_price: '',
                flash_sale_price: '',
                quantity: '',
            }
        ]);
    };

    const handleRemoveProduct = (index: number) => {
        setProduct((prev) => prev.filter((_, i) => i !== index));
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

    const addDynamicItem = (field: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: [{ value: '' }, ...prev[field]],
        }));
    };

    const removeDynamicItem = (field: string, index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: prev[field].filter((_: any, i: number) => i !== index),
        }));
    };

    const updateDynamicItem = (field: string, index: any, value: string) => {
        setFormData((prev: any) => {
            const updated = [...prev[field]];
            (updated[index] as any) = { value };
            return {
                ...prev,
                [field]: updated,
            };
        });
    };

    console.log(product)


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Email Campaign' : 'Edit Email Campaign'}</h1>
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
                        <div className='row-span-2'>
                            <Textarea
                                id='description'
                                label='Description'
                                placeholder='Input Description'
                                onChange={handleChange('description')}
                                value={formData.description}
                                textareaClassname='!h-28'
                            />
                        </div>
                        <div className='grid md:grid-cols-3 gap-3'>
                            <Input
                                id='from_name'
                                label='From Name'
                                type='text'
                                placeholder='Input From Name'
                                onChange={handleChange('from_name')}
                                value={formData.from_name}
                            />
                            <Input
                                id='from_email'
                                label='From Email'
                                type='text'
                                placeholder='Input From Email'
                                onChange={handleChange('from_email')}
                                value={formData.from_email}
                            />
                            <Input
                                id='reply_to_email'
                                label='Reply To Email'
                                type='text'
                                placeholder='Input Reply To Email'
                                onChange={handleChange('reply_to_email')}
                                value={formData.reply_to_email}
                            />
                        </div>
                        <Input
                            id='subject'
                            label='Subject'
                            type='text'
                            placeholder='Input Subject'
                            onChange={handleChange('subject')}
                            value={formData.subject}
                            style={{
                                borderColor: borderColors[subjectValidation.status] ?? "#E5E7EB",
                            }}
                            notes={
                                <div className='flex gap-2 items-center'>
                                    {
                                        subjectValidation.status !== '' &&
                                        <Image
                                            src={
                                                subjectValidation.status == 'error'
                                                    ? AlertIcon
                                                    : subjectValidation.status == 'warning'
                                                        ? WarningIcon
                                                        : SuccessIcon
                                            }
                                            alt='icon-spam'
                                            width={15}
                                            height={15}
                                        />
                                    }

                                    <span
                                        className={
                                            subjectValidation.status === "error"
                                                ? "text-red-500"
                                                : subjectValidation.status === "warning"
                                                    ? "text-yellow-500"
                                                    : "text-green-500"
                                        }
                                    >
                                        {subjectValidation.message}
                                    </span>
                                </div>
                            }
                        />
                        <Input
                            id='preheader'
                            label='Preheader'
                            type='text'
                            placeholder='Input Preheader'
                            onChange={handleChange('preheader')}
                            value={formData.preheader}
                            style={{
                                borderColor: borderColors[preheaderValidation.status] ?? "#E5E7EB",
                            }}
                            notes={
                                <div className='flex gap-2 items-center'>
                                    {
                                        preheaderValidation.status !== '' &&
                                        <Image
                                            src={
                                                preheaderValidation.status == 'error'
                                                    ? AlertIcon
                                                    : preheaderValidation.status == 'warning'
                                                        ? WarningIcon
                                                        : SuccessIcon
                                            }
                                            alt='icon-spam'
                                            width={15}
                                            height={15}
                                        />
                                    }

                                    <span
                                        className={
                                            preheaderValidation.status === "error"
                                                ? "text-red-500"
                                                : preheaderValidation.status === "warning"
                                                    ? "text-yellow-500"
                                                    : "text-green-500"
                                        }
                                    >
                                        {preheaderValidation.message}
                                    </span>
                                </div>
                            }
                        />
                        <SelectInput
                            id='content_type'
                            label='Content Type'
                            placeholder='Select Content Type'
                            onChange={handleChange('content_type')}
                            value={formData.content_type}
                            options={[
                                { label: 'HTML', value: 'HTML' },
                                { label: 'MJML', value: 'MJML' },
                                { label: 'Content Editor', value: 'Content Editor' },
                            ]}
                        />
                        <SelectInput
                            id='choose_template'
                            label='Choose Template'
                            placeholder='Choose Template'
                            onChange={handleChange('choose_template')}
                            value={formData.choose_template}
                            options={[
                                { label: 'Email Campaigns Template', value: 1 }
                            ]}
                        />
                        <div className='col-span-full w-full'>
                            <QuillInput
                                value={formData.content}
                                onChange={handleChange('content')}
                                label="Content Editor"
                                className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                            />
                        </div>
                        <SelectInput
                            id='segment'
                            label='Segment'
                            placeholder='Select Segment'
                            onChange={handleChange('segment')}
                            value={formData.segment}
                            options={[
                                { label: 'Segment', value: 1 }
                            ]}
                        />
                        <SelectInput
                            id='exclusion_lists'
                            label='Exclusion Lists'
                            placeholder='Select Exclusion Lists'
                            onChange={handleChange('exclusion_lists')}
                            value={formData.exclusion_lists}
                            options={[
                                { label: 'Exclusion List', value: 1 }
                            ]}
                        />
                        <div className={`col-span-full grid ${formData.test_type == 'Subject' && 'md:grid-cols-3'} gap-3`}>
                            <SelectInput
                                id='test_type'
                                label='A/B Test Type'
                                placeholder='Select A/B Test Type'
                                onChange={handleChange('test_type')}
                                value={formData.test_type}
                                options={[
                                    { label: 'Subject', value: 'Subject' },
                                    { label: 'Content', value: 'Content' },
                                ]}
                            />
                            {
                                formData.test_type == 'Subject'
                                    ? <>
                                        <Input
                                            id='subjecta'
                                            label='Subject A'
                                            type='text'
                                            placeholder='Input Subject A'
                                            onChange={handleChange('subjecta')}
                                            value={formData.subjecta}
                                        />
                                        <Input
                                            id='subjectb'
                                            label='Subject B'
                                            type='text'
                                            placeholder='Input Subject B'
                                            onChange={handleChange('subjectb')}
                                            value={formData.subjectb}
                                        />
                                    </>
                                    : <div className='grid md:grid-cols-2 gap-3'>
                                        <Textarea
                                            id='contenta'
                                            label='Content A'
                                            placeholder='Input Content A'
                                            onChange={handleChange('contenta')}
                                            value={formData.contenta}
                                            textareaClassname='!h-20'
                                        />
                                        <Textarea
                                            id='contentb'
                                            label='Content B'
                                            placeholder='Input Content B'
                                            onChange={handleChange('contentb')}
                                            value={formData.contentb}
                                            textareaClassname='!h-20'
                                        />
                                    </div>
                            }
                        </div>

                        <DatePickerInput
                            id='schedule'
                            label='Schedule Date & Time'
                            value={formData.schedule ? dayjs(formData.schedule, 'DD-MM-YYYY HH:mm') : null}
                            onChange={(value: any, dateString: any) => handleDateChange('schedule', value, dateString)}
                            showTime
                            format='DD-MM-YYYY HH:mm'
                        />
                        <Input
                            id='throttling'
                            label='Throttling'
                            type='number'
                            placeholder='Input Throttling'
                            onChange={handleChange('throttling')}
                            value={formData.throttling}
                        />
                        <div className='col-span-full grid md:grid-cols-3 gap-3'>
                            <CheckboxInput
                                label='Open Tracking'
                                checked={formData.open_tracking}
                                onChange={handleChange('open_tracking')}
                                text='Open Tracking'
                            />
                            <CheckboxInput
                                label='Click Tracking'
                                checked={formData.click_tracking}
                                onChange={handleChange('click_tracking')}
                                text='Click Tracking'
                            />
                            <Input
                                id='utm_builder'
                                label='UTM Builder'
                                type='number'
                                placeholder='Input UTM Builder'
                                onChange={handleChange('utm_builder')}
                                value={formData.utm_builder}
                            />
                        </div>
                        <div className='col-span-full flex flex-col gap-3'>
                            <Divider />
                            <CheckboxInput
                                label='Unsubscribe Link'
                                checked={formData.unsubscribe_link}
                                onChange={handleChange('unsubscribe_link')}
                                text='Unsubscribe Link'
                            />
                        </div>

                        {/* <Input
                            id='domain_status'
                            label='Domain Auth Status'
                            type='text'
                            placeholder='Input Domain Auth Status'
                            onChange={handleChange('domain_status')}
                            value={formData.domain_status}
                        /> */}
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Email Campaign' : 'Edit Email Campaign'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content >
        </>
    );
};

export default FormEmailCampaigns;
