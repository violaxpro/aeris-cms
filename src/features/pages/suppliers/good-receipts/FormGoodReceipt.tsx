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
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import Table from '@/components/table'
import { useNotificationAntd } from '@/components/toast';
import ProductInput, { ProductForm } from './ProductInput';
import { getSupplier } from '@/services/supplier-list-service';
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import Divider from '@/components/divider'
import { PlusOutlineIcon } from '@public/icon';
import Image from 'next/image';

const FormGoodReceipt: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const isDisabled = initialValues?.putawayStatus == 'Completed'
    const { contextHolder, notifySuccess } = useNotificationAntd();
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
        po_reference: initialValues ? initialValues.po_reference : '',
        receipt_date_time: initialValues ? initialValues.receipt_date_time : '',
        receiving_warehouse: initialValues ? initialValues.receiving_warehouse : '',
        serial: initialValues ? initialValues.serial : '',
        expiry: initialValues ? initialValues.expiry : '',
        products: initialValues ? initialValues.products : '',
        notes: initialValues ? initialValues.notes : '',
    });

    const breadcrumb = [
        {
            title: 'Suppliers',
        },
        {
            title: 'Good Receipts', url: routes.eCommerce.goodReceipt,
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },

    ]


    const handleEditProduct = (index: number) => {
        const productToEdit = productList[index];
        setProductForm(productToEdit);
        setEditIndex(index);
        setShowAddProduct(true);
    }

    // const handleAddProduct = () => {
    //     if (editIndex !== null) {
    //         const updatedList = [...productList];
    //         updatedList[editIndex] = productForm;
    //         setProductList(updatedList);
    //         setEditIndex(null);
    //     } else {
    //         setProductList([...productList, productForm]);

    //     }
    //     setProductForm({
    //         sku: '',
    //         name: '',
    //         price: 0,
    //         buying_price: 0,
    //         qty: 0,
    //         total: 0,
    //     });
    // };
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


    const handleSubmit = async () => {
        try {
            const submitData = {
                po_reference: formData.po_reference,
                receipt_date_time: formData.receipt_date_time,
                receiving_warehouse: formData.receiving_warehouse,
                serial: formData.serial,
                expiry: formData.expiry,
                product: productList,

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

    const addItem = () => {
        setProductForm([
            ...productForm,
            {
                sku: '',
                uom: '',
                qty_received: 0,
                qty_rejected: 0,
                reason: '',
                serial: '',
                expiry: '',
            }
        ])
    }

    const handleRemoveRow = (index: number) => {
        const updated = [...productForm];
        updated.splice(index, 1);
        setProductForm(updated);
    };

    const handleUpdateRow = (index: number, updatedForm: any) => {
        const updated = [...productForm];
        updated[index] = updatedForm;
        setProductForm(updated);
    };

    const optionsPaymentMethod = [
        { label: 'Bank Transfer', value: 'Bank Transfer' },
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'Debit Card', value: 'Debit Card' },
        { label: 'Cheque', value: 'Cheque' },
        { label: 'Paypal', value: 'Paypal' },
        { label: 'Cash', value: 'Cash' },
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
                    {mode == 'create' ? 'Create Good Receipt' : 'Edit Good Receipt'}
                </h1>
                <Breadcrumb items={breadcrumb} />
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-3 gap-3'>
                            <SelectInput
                                id='po_reference'
                                label='Po Reference'
                                placeholder="Select Reference"
                                onChange={(val) => handleChangeSelect('po_reference', val)}
                                value={formData.po_reference}
                                options={[
                                    { label: 'PO0232', value: 1 }
                                ]}
                                disabled={isDisabled}
                            />
                            <DatePickerInput
                                id='receipt_date_time'
                                label='Receipt Date/Time '
                                value={formData.receipt_date_time ? dayjs(formData.receipt_date_time) : null}
                                onChange={(value: any, dateString: any) => handleDateChange('receipt_date_time', value, dateString)}
                                disabled={isDisabled}
                            />
                            <Input
                                id='receiving_warehouse'
                                label='Receiving Warehouse'
                                type='text'
                                placeholder='Input Receiving Warehouse'
                                onChange={handleChange}
                                value={formData.receiving_warehouse}
                                disabled={isDisabled}
                            />
                        </div>

                        <div className='flex flex-col gap-3 md:my-5'>
                            <h1 className='text-2xl font-semibold'>Product List</h1>
                            <Divider />
                            {
                                productForm.map((item, index) => {
                                    return (
                                        <ProductInput
                                            key={index}
                                            index={index}
                                            productForm={item}
                                            onChange={(updateItem) => handleUpdateRow(index, updateItem)}
                                            onRemove={() => handleRemoveRow(index)}
                                            length={productForm.length}
                                            status={initialValues?.qcStatus}
                                            isDisabled={isDisabled}
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
                                    />}
                                    onClick={addItem}
                                    disabled={isDisabled}
                                />
                            </div>
                        </div>
                        <div className='grid gap-4'>
                            <Textarea
                                id='notes'
                                label='Notes / Tags'
                                placeholder='Input Notes / Tags'
                                onChange={handleChange}
                                value={formData.notes}
                                textareaClassname='!h-20'
                            />
                        </div>
                        {/* <div className='grid grid-cols-2 gap-4 mt-2'>
                            <Input
                                id='serial'
                                label='Serial/Lot numbers'
                                type='text'
                                placeholder='Input Serial/Lot numbers'
                                onChange={handleChange}
                                value={formData.serial}
                            />
                            <DatePickerInput
                                id='expiry'
                                label='Expiry '
                                value={formData.expiry ? dayjs(formData.expiry) : null}
                                onChange={(value: any, dateString: any) => handleDateChange('expiry', value, dateString)}
                            />
                        </div> */}


                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            label={mode == 'create' ? 'Create Good Receipt' : 'Edit Good Receipt'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormGoodReceipt;
