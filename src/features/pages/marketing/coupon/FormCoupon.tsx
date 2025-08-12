'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
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
import { CancelGreyIcon, PlusOutlineIcon, DollarIcon, TrashIconRed } from '@public/icon';
import { PercentageOutlined } from '@ant-design/icons';
import ButtonIcon from '@/components/button/ButtonIcon';
import { productSetAtom } from '@/store/DropdownItemStore';
import Image from 'next/image';
import Segmented from '@/components/segmented'
import { uploadImages } from '@/services/upload-images';

const FormCoupon: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const [optionProducts] = useAtom(productSetAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionsCategories] = useAtom(categoriesAtom)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        coupon_name: initialValues ? initialValues.coupon_name : '',
        code: initialValues ? initialValues.code : '',
        discount_type: initialValues ? initialValues.discount_type : '',
        discount_value: initialValues ? initialValues.discount_value : '',
        is_free_shipping: initialValues ? initialValues.is_free_shipping : false,
        start_date: initialValues ? initialValues.start_date : '',
        end_date: initialValues ? initialValues.end_date : '',
        minimum_spend: initialValues ? initialValues.minimum_spend : '',
        maximum_spend: initialValues ? initialValues.maximum_spend : '',
        image: initialValues ? initialValues.image : [],
        product: initialValues ? initialValues.product : [{ value: '' }],
        category: initialValues ? initialValues.category : [{ value: '' }],
        exclude_product: initialValues ? initialValues.exclude_product : [{ value: '' }],
        exclude_category: initialValues ? initialValues.exclude_category : [{ value: '' }],
        exclude_price: initialValues ? initialValues.exclude_price : '',
        usage_limit_per_coupon: initialValues ? initialValues.usage_limit_per_coupon : '',
        usage_limit_per_customer: initialValues ? initialValues.usage_limit_per_customer : '',

    });
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
        { title: 'Coupon', url: routes.eCommerce.coupon },
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
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Coupon' : 'Edit Coupon'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }} className='flex flex-col gap-8'>
                    <div className='grid md:grid-cols-4 gap-3'>
                        <Input
                            id='coupon_name'
                            label='Coupon Name'
                            type='text'
                            placeholder='Input Coupon Name'
                            onChange={handleChange('coupon_name')}
                            value={formData.coupon_name}
                            style={{ marginTop: '0.8rem' }}
                        />
                        <Input
                            id='code'
                            label='Code'
                            type='text'
                            placeholder='Input Code'
                            onChange={handleChange('code')}
                            value={formData.code}
                            style={{ marginTop: '0.8rem' }}
                        />
                        <Input
                            id='discount_type'
                            label='Discount Type'
                            type='number'
                            onChange={handleChange('discount_type')}
                            value={formData.discount_type}
                            suffix={
                                selectedDiscountType == 'percent' && <PercentageOutlined />
                            }
                            prefix={
                                selectedDiscountType == 'fixed' &&
                                <Image
                                    src={DollarIcon}
                                    alt='dollar-icon'
                                    width={8}
                                    height={8}
                                />
                            }
                            segmented={
                                <div className='mb-1'>
                                    <Segmented
                                        size='small'
                                        value={selectedDiscountType}
                                        onChange={(selected: any) => setSelectedDiscountType(selected)}
                                        options={[
                                            { label: 'Percent', value: 'percent' },
                                            { label: 'Fixed', value: 'fixed' }
                                        ]}
                                    />
                                </div>
                            }
                        />
                        <div className='flex items-center'>
                            <CheckboxInput
                                label='Free Shipping'
                                checked={formData.is_free_shipping}
                                onChange={handleChange('is_free_shipping')}
                                text='Use Free Shipping'
                            />
                        </div>
                        <div className='col-span-full grid md:grid-cols-[1fr_1fr_2fr] gap-3'>
                            <DatePickerInput
                                id='start_date'
                                label='Start Date'
                                value={formData.start_date ? dayjs(formData.start_date) : null}
                                onChange={handleChange('start_date')}
                                placeholder='Select Start Date'
                            // required
                            />
                            <DatePickerInput
                                id='end_date'
                                label='End Date'
                                value={formData.end_date ? dayjs(formData.end_date) : null}
                                onChange={handleChange('end_date')}
                                placeholder='Select End Date'
                            // required
                            />
                            <div className='row-span-2'>
                                <FileUploader
                                    label='File Attachment'
                                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                    multiple={true}
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    isUpload={isLoading}
                                    fileList={formData.image?.map((img: any, index: any) => {
                                        return {
                                            uid: `${index}`,
                                            name: img.name ?? img.url,
                                            status: 'done',
                                            url: img.url
                                        }
                                    })}
                                />
                            </div>

                            <Input
                                id='minimum_spend'
                                label='Minimum Spend'
                                type='text'
                                placeholder='Input Minimum Spend'
                                onChange={handleChange('minimum_spend')}
                                value={formData.minimum_spend}
                            />
                            <Input
                                id='maximum_spend'
                                label='Maximum Spend'
                                type='text'
                                placeholder='Input Maximum Spend'
                                onChange={handleChange('maximum_spend')}
                                value={formData.maximum_spend}
                            />

                        </div>
                        <div className='col-span-full grid md:grid-cols-2 gap-3'>
                            <div className='flex flex-col gap-2'>
                                {formData.category.map((item: any, index: number) => (
                                    <div key={index} className='flex gap-2'>
                                        <Input
                                            id='category'
                                            label='Category'
                                            type='text'
                                            placeholder='Input Category'
                                            onChange={handleChange('category')}
                                            value={item.value}
                                            divClassName='w-full'
                                        />
                                        {
                                            index === 0 ?
                                                <Button
                                                    icon={<Image
                                                        src={PlusOutlineIcon}
                                                        alt='add-icon'
                                                        width={15}
                                                        height={15}
                                                    />}
                                                    onClick={() => addDynamicItem('category')}
                                                    style={{ height: '5vh', marginTop: '1.2rem' }}
                                                />
                                                : <ButtonIcon
                                                    icon={TrashIconRed}
                                                    onClick={() => removeDynamicItem('category', index)}
                                                    style={{ height: '5vh', marginTop: '1.2rem' }}
                                                    color='danger'
                                                    variant='filled'
                                                    width={15}
                                                    height={15}
                                                    className='!h-10 !w-15'
                                                />
                                        }

                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-col gap-2'>
                                {
                                    formData.exclude_category.map((item: any, index: number) => (
                                        <div key={index} className='flex gap-2 w-full'>
                                            <Input
                                                id='exclude_category'
                                                label='Exclude Category'
                                                type='text'
                                                placeholder='Input Exclude Category'
                                                onChange={handleChange('exclude_category')}
                                                value={item.value}
                                                divClassName='w-full'
                                            />
                                            {
                                                index === 0 ?
                                                    <Button
                                                        icon={<Image
                                                            src={PlusOutlineIcon}
                                                            alt='add-icon'
                                                            width={15}
                                                            height={15}
                                                        />}
                                                        onClick={() => addDynamicItem('exclude_category')}
                                                        style={{ height: '5vh', marginTop: '1.2rem' }}
                                                    />
                                                    : <ButtonIcon
                                                        icon={TrashIconRed}
                                                        onClick={() => removeDynamicItem('exclude_category', index)}
                                                        style={{ height: '5vh', marginTop: '1.2rem' }}
                                                        color='danger'
                                                        variant='filled'
                                                        width={15}
                                                        height={15}
                                                        className='!h-10 !w-15'
                                                    />
                                            }
                                        </div>
                                    ))
                                }

                            </div>

                            <div className='flex flex-col gap-2'>
                                {
                                    formData.product.map((item: any, index: number) => (
                                        <div key={index} className='flex gap-2 w-full'>
                                            <Input
                                                id='product'
                                                label='Product'
                                                type='text'
                                                placeholder='Input Product'
                                                onChange={handleChange('product')}
                                                value={item.value}
                                                divClassName='w-full'
                                            />
                                            {
                                                index === 0 ?
                                                    <Button
                                                        icon={<Image
                                                            src={PlusOutlineIcon}
                                                            alt='add-icon'
                                                            width={15}
                                                            height={15}
                                                        />}
                                                        onClick={() => addDynamicItem('product')}
                                                        style={{ height: '5vh', marginTop: '1.2rem' }}
                                                    />
                                                    : <ButtonIcon
                                                        icon={TrashIconRed}
                                                        onClick={() => removeDynamicItem('product', index)}
                                                        style={{ height: '5vh', marginTop: '1.2rem' }}
                                                        color='danger'
                                                        variant='filled'
                                                        width={15}
                                                        height={15}
                                                        className='!h-10 !w-15'
                                                    />
                                            }
                                        </div>
                                    ))
                                }

                            </div>

                            <div className='flex flex-col gap-2'>
                                {
                                    formData.exclude_product.map((item: any, index: number) => (
                                        <div key={index} className='flex gap-2 w-full'>
                                            <Input
                                                id='exclude_product'
                                                label='Exclude Product'
                                                type='text'
                                                placeholder='Input Exclude Product'
                                                onChange={handleChange('exclude_product')}
                                                value={item.value}
                                                divClassName='w-full'
                                            />
                                            {
                                                index === 0 ?
                                                    <Button
                                                        icon={<Image
                                                            src={PlusOutlineIcon}
                                                            alt='add-icon'
                                                            width={15}
                                                            height={15}
                                                        />}
                                                        onClick={() => addDynamicItem('exclude_product')}
                                                        style={{ height: '5vh', marginTop: '1.2rem' }}
                                                    />
                                                    : <ButtonIcon
                                                        icon={TrashIconRed}
                                                        onClick={() => removeDynamicItem('exclude_product', index)}
                                                        style={{ height: '5vh', marginTop: '1.2rem' }}
                                                        color='danger'
                                                        variant='filled'
                                                        width={15}
                                                        height={15}
                                                        className='!h-10 !w-15'
                                                    />
                                            }
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                        <div className='col-span-full grid md:grid-cols-3 gap-3'>
                            <Input
                                id='exclude_price'
                                label='Exclude Price'
                                type='text'
                                placeholder='Input Exclude Price'
                                onChange={handleChange('exclude_price')}
                                value={formData.exclude_price}
                            />
                            <Input
                                id='usage_limit_per_coupon'
                                label='Usage Limit Per Coupon'
                                type='text'
                                placeholder='Input Usage Limit Per Coupon'
                                onChange={handleChange('usage_limit_per_coupon')}
                                value={formData.usage_limit_per_coupon}
                            />
                            <Input
                                id='usage_limit_per_customer'
                                label='Usage Limit Per Customer'
                                type='text'
                                placeholder='Input Usage Limit Per Customer'
                                onChange={handleChange('usage_limit_per_customer')}
                                value={formData.usage_limit_per_customer}
                            />

                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode === 'create' ? 'Create Coupon' : 'Edit Coupon'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormCoupon;
