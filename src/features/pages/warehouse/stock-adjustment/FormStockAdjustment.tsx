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
import { supplierSetAtom } from '@/store/DropdownItemStore';
import ReceiptList, { ReceiptListType } from '../inbound/ReceiptList';
import StockAdjustmentList, { StockAdjustmentListType } from './StockAdjustmentList';

const FormStockAdjustment: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
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
        supplier: initialValues ? initialValues.supplier : '',
        warehouse: initialValues ? initialValues.warehouse : '',
        zone: initialValues ? initialValues.zone : '',
        bin: initialValues ? initialValues.bin : '',
        items: [{
            sku: '',
            qty: 0,
            bin: '',
            serial: '',
            note: ''
        }],
        receipts: [{
            sku: '',
            grn_number: '',
            date: '',
            receiver: '',
            discrepancies: '',
            qty_receipts: 0,
            qty_remaining: 0,
        }],
        reason_code: initialValues ? initialValues.reason_code : '',
        notes: initialValues ? initialValues.notes : '',
        images: initialValues ? initialValues.images : [],
        posted_schedule: initialValues ? initialValues.posted_schedule : '',
        minor_notes: initialValues ? initialValues.minor_notes : '',
    });

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Stock Adjustments', url: routes.eCommerce.stockAdjustment,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const addItem = (list_type: "items" | "receipts") => {
        const newItem: StockAdjustmentListType = {
            sku: '',
            qty: 0,
            bin: '',
            serial: '',
            note: ''
        };

        const newReceipt: ReceiptListType = {
            sku: '',
            grn_number: '',
            date: '',
            receiver: '',
            discrepancies: '',
            qty_receipts: 0,
            qty_remaining: 0,
        };

        setFormData((prev: any) => ({
            ...prev,
            [list_type]: [...prev[list_type], list_type == 'items' ? newItem : newReceipt],
        }));
    };

    const handleRemoveRow = (list_type: "items" | "receipts", index: number) => {
        setFormData((prev: any) => {
            const updatedItems = [...prev[list_type]];
            updatedItems.splice(index, 1);
            return {
                ...prev,
                [list_type]: updatedItems,
            };
        });
    };

    const handleUpdateRow = (
        list_type: "items" | "receipts",
        index: number,
        updatedForm: any
    ) => {
        setFormData((prev: any) => {
            const updatedItems = [...prev[list_type]];
            updatedItems[index] = updatedForm;
            return {
                ...prev,
                [list_type]: updatedItems,
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
                notes: formData.notes,
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
                    {mode == 'create' ? 'Create Stock Adjustment' : 'Edit Stock Adjustment'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='grid md:grid-cols-3 gap-3'>
                            <SelectInput
                                id='warehouse'
                                label='Warehouse'
                                placeholder='Select Warehouse'
                                onChange={(val) => handleChangeSelect('warehouse', val)}
                                value={formData.warehouse}
                                options={[
                                    { label: 'Seadan', value: 1 }
                                ]}
                            />
                            <div className='grid md:grid-cols-2 gap-3'>
                                <SelectInput
                                    id='zone'
                                    label='Bin (Optional)'
                                    placeholder='Select Zone'
                                    onChange={(val) => handleChangeSelect('zone', val)}
                                    value={formData.zone}
                                    options={[
                                        { label: 'ZONE1', value: 1 }
                                    ]}
                                />
                                <SelectInput
                                    id='bin'
                                    label='Zone (Optional)'
                                    placeholder='Select Bin'
                                    onChange={(val) => handleChangeSelect('bin', val)}
                                    value={formData.bin}
                                    options={[
                                        { label: 'BIN2', value: 1 }
                                    ]}
                                />
                            </div>
                            <SelectInput
                                id='reason_code'
                                label='Reason Code'
                                placeholder='Select Reason Code'
                                onChange={(val) => handleChangeSelect('reason_code', val)}
                                value={formData.reason_code}
                                options={[
                                    { label: 'Damage', value: 'Damage' },
                                    { label: 'Shrinkage', value: 'Shrinkage' },
                                    { label: 'Found', value: 'Found' },
                                    { label: 'Reclass', value: 'Reclass' },
                                    { label: 'Reopening', value: 'Reopening' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 my-5'>
                        <h1 className='text-xl font-semibold'>Product List</h1>
                        <Divider />
                        {
                            formData.items.map((item, index) => {
                                return (
                                    <StockAdjustmentList
                                        key={index}
                                        index={index}
                                        productForm={item}
                                        onChange={(updateItem) => handleUpdateRow('items', index, updateItem)}
                                        onRemove={() => handleRemoveRow('items', index)}
                                        length={formData.items.length}
                                        status={initialValues?.status}
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
                                onClick={() => addItem('items')}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 my-5'>
                        <h1 className='text-xl font-semibold'>Evidence</h1>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <FileUploader
                                label='Photos'
                                action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                                multiple={true}
                                onSuccess={handleSuccess}
                                onError={handleError}
                                isUpload={isLoading}
                                fileList={formData.images?.map((img: any, index: any) => {
                                    return {
                                        uid: `${index}`,
                                        name: img.name ?? img.url,
                                        status: 'done',
                                        url: img.url
                                    }
                                })}
                            />
                            <Textarea
                                id='notes'
                                label='Notes'
                                value={formData.notes}
                                onChange={handleChange}
                                textareaClassname='!h-20'
                            />
                        </div>
                        {
                            initialValues?.status == 'Approved' &&
                            <>
                                <DatePickerInput
                                    id='posted_schedule'
                                    label='Posted Schedule'
                                    value={formData.posted_schedule ? dayjs(formData.posted_schedule, 'DD-MM-YYYY HH:mm') : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('posted_schedule', value, dateString)}
                                    showTime
                                    format='DD-MM-YYYY HH:mm'
                                />
                                <Textarea
                                    id='minor_notes'
                                    label='Minor Notes'
                                    value={formData.minor_notes}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                />
                            </>
                        }
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Stock Adjustment' : 'Edit Stock Adjustment'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormStockAdjustment;
