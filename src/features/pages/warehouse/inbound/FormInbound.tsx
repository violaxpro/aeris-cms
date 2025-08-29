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
import InboundList, { InboundListType } from './InboundList';
import ReceiptList, { ReceiptListType } from './ReceiptList';

const FormInbound: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
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
        items: [{
            sku: '',
            qty: 0,
            unit_cost: 0,
            tax_id: '',
            tax_value: 0,
            tax_amount: 0,
            total_amount: 0
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
        notes: initialValues ? initialValues.notes : '',
        bin: initialValues ? initialValues.bin : '',
        qty: initialValues ? initialValues.qty : '',
        terms: initialValues ? initialValues.terms : '',
        currency: initialValues ? initialValues.currency : '',
        attach_remittance: initialValues ? initialValues.attach_remittance : [],
        eta: initialValues ? initialValues.eta : '',
    });

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Inbound', url: routes.eCommerce.inbound,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const addItem = (list_type: "items" | "receipts") => {
        const newItem: InboundListType = {
            sku: "",
            qty: 0,
            unit_cost: 0,
            tax_id: "",
            tax_value: 0,
            tax_amount: 0,
            total_amount: 0,
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
                warehouse: formData.warehouse,
                notes: formData.notes,
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
                    {mode == 'create' ? 'Create Inbound' : 'Edit Inbound'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            <SelectInput
                                id='supplier'
                                label='Supplier'
                                placeholder="Select Supplier"
                                onChange={(val) => handleChangeSelect('supplier', val)}
                                value={formData.supplier}
                                options={optionSupplier}
                            // disabled={mode == 'edit' && isDisabled}
                            />
                            <SelectInput
                                id='warehouse'
                                label='Warehouse'
                                placeholder='Select Warehouse'
                                onChange={handleChange}
                                value={formData.warehouse}
                                options={[
                                    { label: 'Seadan', value: 1 }
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
                                    <InboundList
                                        key={index}
                                        index={index}
                                        productForm={item}
                                        onChange={(updateItem) => handleUpdateRow('items', index, updateItem)}
                                        onRemove={() => handleRemoveRow('items', index)}
                                        length={formData.items.length}
                                        inboundStatus={initialValues?.status}
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
                    {
                        (initialValues?.status !== 'Draft'
                            && initialValues?.status !== 'Sent') &&
                        <div className='flex flex-col gap-3 my-5'>
                            <h1 className='text-xl font-semibold'>Receipts (GRN)</h1>
                            <Divider />
                            {
                                formData.receipts.map((item, index) => {
                                    return (
                                        <ReceiptList
                                            key={index}
                                            index={index}
                                            productForm={item}
                                            onChange={(updateItem) => handleUpdateRow('receipts', index, updateItem)}
                                            onRemove={() => handleRemoveRow('receipts', index)}
                                            length={formData.receipts.length}
                                            inboundStatus={initialValues?.status}
                                        />

                                    )
                                })
                            }
                            <div className='flex justify-end'>
                                <Button
                                    label='Add Receipt'
                                    icon={<Image
                                        src={PlusOutlineIcon}
                                        alt='plus-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    onClick={() => addItem('receipts')}
                                />
                            </div>
                        </div>
                    }

                    <div className='grid md:grid-cols-2 gap-3'>
                        <DatePickerInput
                            id='eta'
                            label='ETA'
                            value={formData.eta ? dayjs(formData.eta, 'DD-MM-YYYY') : null}
                            onChange={(value: any, dateString: any) => handleDateChange('eta', value, dateString)}
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
                        <div className='grid md:grid-cols-2 gap-3'>
                            <Input
                                id='terms'
                                label='Terms'
                                type='text'
                                placeholder='Input Terms'
                                onChange={handleChange}
                                value={formData.terms}
                            // disabled={mode == 'edit' && isDisabled}
                            />
                            <Input
                                id='currency'
                                label='Currency'
                                type='text'
                                placeholder='Input Currency'
                                onChange={handleChange}
                                value={formData.currency}
                            // disabled={mode == 'edit' && isDisabled}
                            />

                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Inbound' : 'Edit Inbound'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormInbound;
