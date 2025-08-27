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
import BoundList, { BoundForm } from './BoundList';

const FormOutbound: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
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
        qty: 0,
        price: 0,
        serial: '',
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        customer: initialValues ? initialValues.customer : '',
        warehouse: initialValues ? initialValues.warehouse : '',
        ship_to_name: initialValues ? initialValues.ship_to_name : '',
        ship_to_address: initialValues ? initialValues.ship_to_address : '',
        ship_to_phone: initialValues ? initialValues.ship_to_phone : '',
        carrier_service: initialValues ? initialValues.carrier_service : '',
        request_ship_date: initialValues ? initialValues.request_ship_date : '',
        notes: initialValues ? initialValues.notes : '',
        bills: initialValues ? initialValues.bills : '',
        currency: initialValues ? initialValues.currency : '',
        attach_remittance: initialValues ? initialValues.attach_remittance : [],
        meta_title: initialValues ? initialValues.meta_title : '',
        meta_description: initialValues ? initialValues.meta_description : '',
    });

    const breadcrumb = [
        {
            title: 'Wraheouse',
        },
        {
            title: 'Outbound (Order Fullfillment)', url: routes.eCommerce.outbound,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const addItem = () => {
        setProductForm([
            ...productForm,
            {
                sku: '',
                uom: '',
                qty: 0,
                price: 0,
                serial: '',
            }
        ])
    }

    const handleRemoveRow = (index: number) => {
        const updated = [...productForm];
        updated.splice(index, 1);
        setProductForm(updated);
    };

    const handleUpdateRow = (index: number, updatedForm: BoundForm) => {
        const updated = [...productForm];
        updated[index] = updatedForm;
        setProductForm(updated);
    };

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

                customer: formData.customer,
                warehouse: formData.warehouse,
                request_ship_date: formData.request_ship_date,
                notes: formData.notes,
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
                    {mode == 'create' ? 'Create Outbound (Order Fullfillment)' : 'Edit Outbound (Order Fullfillment)'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            <SelectInput
                                id='customer'
                                label='Customer'
                                placeholder="Select Customer"
                                onChange={(val) => handleChangeSelect('customer', val)}
                                value={formData.customer}
                                options={[
                                    { label: 'Cust A', value: 1 }
                                ]}
                            // disabled={mode == 'edit' && isDisabled}
                            />
                            <Input
                                id='warehouse'
                                label='Warehouse'
                                type='text'
                                placeholder='Input Warehouse'
                                onChange={handleChange}
                                value={formData.warehouse}
                                disabled={mode == 'edit' && isDisabled}
                            />
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='col-span-full flex flex-col gap-2'>
                                <h4 className='text-xl font-semibold'>Ship To</h4>
                                <Divider />
                            </div>
                            <Input
                                id='ship_to_name'
                                label='Name'
                                type='text'
                                placeholder='Input Name'
                                onChange={handleChange}
                                value={formData.ship_to_name}
                            // disabled={mode == 'edit' && isDisabled}
                            />
                            <Input
                                id='ship_to_phone'
                                label='Phone'
                                type='text'
                                placeholder='Input Phone'
                                onChange={handleChange}
                                value={formData.ship_to_phone}
                            // disabled={mode == 'edit' && isDisabled}
                            />
                            <Input
                                id='ship_to_address'
                                label='Address'
                                type='text'
                                placeholder='Input Address'
                                onChange={handleChange}
                                value={formData.ship_to_address}
                            // disabled={mode == 'edit' && isDisabled}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 my-5'>
                        <h1 className='text-xl font-semibold'>Product List</h1>
                        <Divider />
                        {
                            productForm.map((item, index) => {
                                return (
                                    <BoundList
                                        key={index}
                                        index={index}
                                        boundForm={item}
                                        onChange={(updateItem) => handleUpdateRow(index, updateItem)}
                                        onRemove={() => handleRemoveRow(index)}
                                        length={productForm.length}
                                    />

                                )
                            })
                        }
                        <div className='flex justify-end'>
                            <Button
                                label='Add Product'
                                icon={<Image
                                    src={PlusOutlineIcon}
                                    alt='plus-icon'
                                    width={15}
                                    height={15}
                                />}
                                onClick={addItem}
                            />
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 gap-3'>
                        <Input
                            id='carrier_service'
                            label='Carrier / Service'
                            type='text'
                            placeholder='Input Carrier / Service'
                            onChange={handleChange}
                            value={formData.carrier_service}
                        // disabled={mode == 'edit' && isDisabled}
                        />
                        <div className='row-span-2'>
                            <Textarea
                                id='notes'
                                label='Notes / Instructions'
                                placeholder='Input Notes / Instructions'
                                onChange={handleChange}
                                value={formData.notes}
                                textareaClassname='!h-28'
                            />
                        </div>
                        <DatePickerInput
                            id='request_ship_date'
                            label='Requested Ship Date'
                            value={formData.request_ship_date ? dayjs(formData.request_ship_date, 'DD-MM-YYYY') : null}
                            onChange={(value: any, dateString: any) => handleDateChange('request_ship_date', value, dateString)}
                        />

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Outbound (Order Fullfillment)' : 'Edit Outbound (Order Fullfillment)'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormOutbound;
