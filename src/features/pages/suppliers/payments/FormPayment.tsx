'use client'
import React, { useState, useEffect } from 'react';
import type { TableColumnsType } from 'antd'
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import FileUploader from '@/components/input-file';
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import Table from '@/components/table'
import { useNotificationAntd } from '@/components/toast';
import { getSupplier } from '@/services/supplier-list-service';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import Divider from '@/components/divider'
import { PlusOutlineIcon } from '@public/icon';
import Image from 'next/image';
import { uploadImages } from '@/services/upload-images';

const FormPayment: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const isDisabled = initialValues?.status !== 'Failed'
    const [isLoading, setIsLoading] = useState(false)
    const [optionSupplier, setOptionSupplier] = useState([])
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [date, setDate] = useState<any | null>(null);
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        sku: '',
        uom: '',
        qty_received: 0,
        qty_rejected: 0,
        reason: '',
        serial: '',
        expiry: '',
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        supplier: initialValues ? initialValues.supplier : '',
        funding_account: initialValues ? initialValues.funding_account : '',
        payment_date: initialValues ? initialValues.payment_date : '',
        method: initialValues ? initialValues.method : '',
        bills: initialValues ? initialValues.bills : '',
        currency: initialValues ? initialValues.currency : '',
        notes: initialValues ? initialValues.notes : '',
        attach_remittance: initialValues ? initialValues.attach_remittance : [],
        meta_title: initialValues ? initialValues.meta_title : '',
        meta_description: initialValues ? initialValues.meta_description : '',
    });

    const breadcrumb = [
        {
            title: 'Suppliers',
        },
        {
            title: 'Payments', url: routes.eCommerce.payments,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]

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

                const updated: any = { ...formData, images: images, }
                setFormData(updated);
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

                supplier: formData.supplier,
                funding_account: formData.funding_account,
                payment_date: formData.payment_date,
                method: formData.method,
                bills: formData.bills,
                currency: formData.currency,
            }
            console.log(submitData)
            localStorage.setItem('products', JSON.stringify(submitData))
            router.push(routes.eCommerce.order)
            // let response;
            // response = await updatePriceLevel(slug, submitData)

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

    const optionsPaymentMethod = [
        { label: 'Bank Transfer', value: 'Bank Transfer' },
        // { label: 'Credit Card', value: 'Credit Card' },
        // { label: 'Debit Card', value: 'Debit Card' },
        { label: 'Cheque', value: 'Cheque' },
        { label: 'Gateway', value: 'Gateway' },
        // { label: 'Paypal', value: 'Paypal' },
        // { label: 'Cash', value: 'Cash' },
    ]

    const optionsDeliveryMethod = [
        { label: 'Dropship', value: 'Dropship' },
        { label: 'Ship to Warehouse', value: 'Ship to Warehouse' },
    ]

    console.log(formData, productForm)

    // useEffect(() => {
    //     const newSubtotal = productList.reduce((acc, item) => acc + Number(item.total || 0), 0);
    //     const discount = Number(formData.discount || 0)
    //     const shipping_fee = Number(formData.shipping_fee || 0)
    //     const tax = Number(formData.gst || 0)
    //     const total = newSubtotal - discount + shipping_fee + tax
    //     setFormData(prev => ({
    //         ...prev,
    //         subtotal: newSubtotal.toString(),
    //         total: total.toString()
    //     }));
    // }, [productList, formData.discount, formData.shipping_fee, formData.gst]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSupplier()

                const suppliers = res.data.map((sup: any) => ({
                    label: sup.name,
                    value: sup.id
                }))
                setOptionSupplier(suppliers)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

    }, [])

    console.log(initialValues)


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">
                    {mode == 'create' ? 'Create Payment' : 'Edit Payment'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-3 gap-3'>
                            <SelectInput
                                id='supplier'
                                label='Supplier'
                                placeholder="Select Supplier"
                                onChange={(val) => handleChangeSelect('supplier', val)}
                                value={formData.supplier}
                                options={optionSupplier}
                                disabled={mode == 'edit' && isDisabled}
                            />
                            <Input
                                id='funding_account'
                                label='Funding Account'
                                type='text'
                                placeholder='Input Funding Account'
                                onChange={handleChange}
                                value={formData.funding_account}
                                disabled={mode == 'edit' && isDisabled}
                            />
                            <DatePickerInput
                                id='payment_date'
                                label='Payment / Scheduled Date '
                                value={formData.payment_date ? dayjs(formData.payment_date, 'DD-MM-YYYY') : null}
                                onChange={(value: any, dateString: any) => handleDateChange('payment_date', value, dateString)}
                                disabled={mode == 'edit' && isDisabled}
                            />
                            <SelectInput
                                id='method'
                                label='Method'
                                placeholder="Select Method"
                                onChange={(val) => handleChangeSelect('method', val)}
                                value={formData.method}
                                options={optionsPaymentMethod}
                                disabled={initialValues?.status === 'Released' || initialValues?.status === 'Reconciled'}
                            />
                            <SelectInput
                                id='bills'
                                label='Bills'
                                placeholder="Select Bills"
                                onChange={(val) => handleChangeSelect('bills', val)}
                                value={formData.bills}
                                options={[
                                    { label: 'BILL-1919', value: 1 }
                                ]}
                                disabled={initialValues?.status === 'Released' || initialValues?.status === 'Reconciled'}
                            />
                            <Input
                                id='currency'
                                label='Currency'
                                type='text'
                                placeholder='Input Currency'
                                onChange={handleChange}
                                value={formData.currency}
                                disabled={initialValues?.status === 'Released' || initialValues?.status === 'Reconciled'}
                            />
                            {
                                initialValues?.status == 'Released' &&
                                <div className='col-span-full grid md:grid-cols-2 gap-3'>
                                    <Textarea
                                        id='notes'
                                        label='Notes / Tags'
                                        placeholder='Input Notes / Tags'
                                        onChange={handleChange}
                                        value={formData.notes}
                                        textareaClassname='!h-20'
                                    />
                                    <FileUploader
                                        label='Attach Remittance'
                                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                        multiple={true}
                                        onSuccess={handleSuccess}
                                        onError={handleError}
                                        isUpload={isLoading}
                                        fileList={formData.attach_remittance?.map((img: any, index: any) => {
                                            return {
                                                uid: `${index}`,
                                                name: img.name ?? img.url,
                                                status: 'done',
                                                url: img.url
                                            }
                                        })}
                                    />
                                </div>
                            }
                            {
                                initialValues?.status == 'Reconciled' &&
                                <div className='col-span-full grid md:grid-cols-2 gap-3'>
                                    <Textarea
                                        id='meta_title'
                                        label='Meta Title'
                                        value={formData.meta_title}
                                        onChange={handleChange}
                                    // notes={
                                    //     <span className={isTitleInvalid ? 'text-red-500' : 'text-gray-400'}>
                                    //         min.55 / max.65, Character {titleLength}
                                    //     </span>
                                    // }
                                    />
                                    <Textarea
                                        id='meta_description'
                                        label='Meta Description'
                                        value={formData.meta_description}
                                        onChange={handleChange}
                                    // notes={
                                    //     <span className={isDescInvalid ? 'text-red-500' : 'text-gray-400'}>
                                    //         min.145 / max.165, Character {descLength}
                                    //     </span>
                                    // }
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Payment' : 'Edit Payment'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormPayment;
