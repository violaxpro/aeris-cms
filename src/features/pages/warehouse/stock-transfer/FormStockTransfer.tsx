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
import StockTransferList, { StockTransferListType } from './StockTransferList';

const FormStockTransfer: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
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
        from_warehouse: initialValues ? initialValues.from_warehouse : '',
        to_warehouse: initialValues ? initialValues.to_warehouse : '',
        items: [{
            sku: '',
            qty: 0,
            from_bin: '',
            to_bin: ''
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
        carrier: initialValues ? initialValues.carrier : '',
        tracking_number: initialValues ? initialValues.tracking_number : '',
        discrepancies: initialValues ? initialValues.discrepancies : '',
    });

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Stock Transfers (Inter Warehouse)', url: routes.eCommerce.stockTransfer,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const addItem = (list_type: "items" | "receipts") => {
        const newItem: StockTransferListType = {
            sku: '',
            qty: 0,
            from_bin: '',
            to_bin: ''
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
                from_warehouse: formData.from_warehouse,
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
                    {mode == 'create' ? 'Create Stock Transfers (Inter Warehouse)' : 'Edit Stock Transfers (Inter Warehouse)'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            <SelectInput
                                id='from_warehouse'
                                label='From Warehouse'
                                placeholder='Select Warehouse'
                                onChange={(val) => handleChangeSelect('from_warehouse', val)}
                                value={formData.from_warehouse}
                                options={[
                                    { label: 'Seadan', value: 1 }
                                ]}
                            />
                            <SelectInput
                                id='to_warehouse'
                                label='To Warehouse'
                                placeholder='Select Warehouse'
                                onChange={(val) => handleChangeSelect('to_warehouse', val)}
                                value={formData.to_warehouse}
                                options={[
                                    { label: 'Melbourne Central', value: 1 }
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
                                    <StockTransferList
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
                    <div className={`grid gap-3 ${initialValues == 'Received' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        <div className={`col-span-full grid gap-3 ${initialValues?.status == 'Received' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            <SelectInput
                                id='reason_code'
                                label='Reason Code'
                                placeholder='Select Reason Code'
                                onChange={(val) => handleChangeSelect('reason_code', val)}
                                value={formData.reason_code}
                                options={[
                                    { label: 'Rebalance', value: 'Rebalance' },
                                    { label: 'Allocated', value: 'Allocated' },
                                    { label: 'Other', value: 'Other' },
                                ]}
                            />
                            {
                                initialValues?.status == 'Received' &&
                                <Input
                                    id='discrepancies'
                                    label='Discrepancies'
                                    type='text'
                                    placeholder='Input Discrepancies'
                                    onChange={handleChange}
                                    value={formData.discrepancies}
                                // disabled={mode == 'edit' && isDisabled}
                                />
                            }
                        </div>
                        {
                            (initialValues?.status == 'In Transit'
                                || initialValues?.status == 'Received')
                            &&
                            <div className='col-span-full grid md:grid-cols-2 gap-3'>
                                <Input
                                    id='carrier'
                                    label='Carrier'
                                    type='text'
                                    placeholder='Input Carrier'
                                    onChange={handleChange}
                                    value={formData.carrier}
                                // disabled={mode == 'edit' && isDisabled}
                                />
                                <Input
                                    id='tracking_number'
                                    label='Tracking Number'
                                    type='text'
                                    placeholder='Input Tracking Number'
                                    onChange={handleChange}
                                    value={formData.tracking_number}
                                // disabled={mode == 'edit' && isDisabled}
                                />
                            </div>
                        }
                        <div className='col-span-full'>
                            <Textarea
                                id='notes'
                                label='Notes / Instructions'
                                placeholder='Input Notes / Instructions'
                                onChange={handleChange}
                                value={formData.notes}
                                textareaClassname='!h-28'
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Stock Transfers (Inter Warehouse)' : 'Edit Stock Transfers (Inter Warehouse)'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormStockTransfer;
