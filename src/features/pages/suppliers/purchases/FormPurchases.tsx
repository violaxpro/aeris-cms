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
import { Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FormPurchases: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionSupplier, setOptionSupplier] = useState([])
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [date, setDate] = useState<any | null>(null);
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        sku: '',
        name: '',
        price: 0,
        buying_price: 0,
        qty: 0,
        total: 0,
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        purchase_number: initialValues ? initialValues.purchase_number : '',
        user: initialValues ? initialValues.user : '',
        reference: initialValues ? initialValues.reference : '',
        order_number: initialValues ? initialValues.order_number : '',
        supplierName: initialValues ? initialValues.supplier_name : '',
        deliveryMethod: initialValues ? initialValues.delivery_method : '',
        paymentMethod: initialValues ? initialValues.payment_method : '',
        date: initialValues ? initialValues.date : '',
        deliveryDate: initialValues ? initialValues.delivery_date : '',
        po_number: initialValues ? initialValues.po_number : '',
        billing_address: initialValues ? initialValues.billing_address : '',
        shipping_address: initialValues ? initialValues.shipping_address : '',
        order_reference: initialValues ? initialValues.order_reference : '',
        delivery_note: initialValues ? initialValues.delivery_note : '',
        internal_note: initialValues ? initialValues.internal_note : '',
        delivery_instruction: initialValues ? initialValues.delivery_instruction : '',
        telephone: initialValues ? initialValues.telephone : '',
        note: initialValues ? initialValues.note : '',
        subtotal: initialValues ? initialValues.subtotal : '',
        product: initialValues ? initialValues.product : [],
        discount: initialValues ? initialValues.discount : '',
        shipping_fee: initialValues ? initialValues.shipping_fee : '',
        gst: initialValues ? initialValues.gst : '',
        total: initialValues ? initialValues.total : '',
    });

    const breadcrumb = [
        { title: 'Supplier' },
        {
            title: 'Purchase Orders', url: routes.eCommerce.purchases
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },
    ];

    const columns: TableColumnsType<ProductForm> = [
        {
            title: 'Product SKU',
            dataIndex: 'sku',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Buying Price',
            dataIndex: 'buying_price',
        },
        {
            title: 'QTY',
            dataIndex: 'qty',
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_: any, row: any, index: number) => {
                console.log(row)
                return <Button
                    label="Edit"
                    onClick={() => handleEditProduct(index)}
                />
            }
        },

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

    const handleDateChange = (field: 'date' | 'deliveryDate', value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };


    const handleSubmit = async () => {
        try {
            const submitData = {
                user: formData.user,
                po_number: formData.po_number,
                billing_address: formData.billing_address,
                shipping_address: formData.shipping_address,
                order_reference: formData.order_reference,
                product: productList,
                delivery_note: formData.delivery_note,
                internal_note: formData.internal_note,
                subtotal: Number(formData.subtotal),
                discount: Number(formData.discount),
                shipping_fee: Number(formData.shipping_fee),
                gst: Number(formData.gst),
                total: Number(formData.total)
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
                name: '',
                price: 0,
                buying_price: 0,
                // trade: 0,
                // silver: 0,
                // gold: 0,
                // platinum: 0,
                // diamond: 0,
                qty: 0,
                // tax_rate: '',
                // tax_amount: 0,
                total: 0,
            }
        ])
    }

    const handleRemoveRow = (index: number) => {
        const updated = [...productForm];
        updated.splice(index, 1);
        setProductForm(updated);
    };

    const handleUpdateRow = (index: number, updatedForm: ProductForm) => {
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

    useEffect(() => {
        const newSubtotal = productList.reduce((acc, item) => acc + Number(item.total || 0), 0);
        const discount = Number(formData.discount || 0)
        const shipping_fee = Number(formData.shipping_fee || 0)
        const tax = Number(formData.gst || 0)
        const total = newSubtotal - discount + shipping_fee + tax
        setFormData(prev => ({
            ...prev,
            subtotal: newSubtotal.toString(),
            total: total.toString()
        }));
    }, [productList, formData.discount, formData.shipping_fee, formData.gst]);

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


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode == 'create' ? 'Create Purchase Order' : 'Edit Purchase Order'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div>
                        <div className='grid grid-cols-4 gap-3'>
                            <SelectInput
                                id='supplierName'
                                label='Supplier Name'
                                placeholder="Select Supplier"
                                onChange={(val) => handleChangeSelect('supplierName', val)}
                                value={formData.supplierName}
                                options={optionSupplier}
                            />
                            <DatePickerInput
                                id='date'
                                label='Date '
                                value={formData.date ? dayjs(formData.date) : null}
                                onChange={(value: any, dateString: any) => handleDateChange('date', value, dateString)}
                            />
                            <DatePickerInput
                                id='deliveryDate'
                                label='Delivery Date '
                                value={formData.deliveryDate ? dayjs(formData.deliveryDate) : null}
                                onChange={(value: any, dateString: any) => handleDateChange('deliveryDate', value, dateString)}
                            />
                            <Input
                                id='reference'
                                label='Reference'
                                type='text'
                                placeholder='Input Reference'
                                onChange={handleChange}
                                value={formData.reference}
                            />
                            <Input
                                id='purchase_number'
                                label='Purchase Number'
                                type='text'
                                placeholder='Input Purchase Number'
                                onChange={handleChange}
                                value={formData.purchase_number}
                            />
                            <Input
                                id='order_number'
                                label='Order Number'
                                type='text'
                                placeholder='Input Order Number'
                                onChange={handleChange}
                                value={formData.order_number}
                            />
                            <SelectInput
                                id='paymentMethod'
                                label='Payment Method'
                                placeholder="Select Payment Method"
                                onChange={(val) => handleChangeSelect('paymentMethod', val)}
                                value={formData.paymentMethod}
                                options={optionsPaymentMethod}
                            />
                            <SelectInput
                                id='deliveryMethod'
                                label='Delivery Method'
                                placeholder="Select Delivery Method"
                                onChange={(val) => handleChangeSelect('deliveryMethod', val)}
                                value={formData.deliveryMethod}
                                options={optionsDeliveryMethod}
                            />
                        </div>

                        <div className='md:my-10'>
                            <h1 className='text-lg font-bold'>Product List</h1>
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
                                        />

                                    )
                                })
                            }
                            <Divider />
                            <div className='flex justify-end'>
                                <Button
                                    label='Add Product'
                                    icon={<PlusOutlined />}
                                    onClick={addItem}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-[4fr_1fr] gap-4 mt-2'>
                            <div className='grid md:grid-cols-2 gap-2'>
                                <Textarea
                                    id='delivery_note'
                                    label='Delivery Address'
                                    value={formData.delivery_note}
                                    onChange={handleChange}
                                />

                                <Textarea
                                    id='internal_note'
                                    label='Attention'
                                    value={formData.internal_note}
                                    onChange={handleChange}
                                />
                                <div className='grid grid-flow-col grid-rows-3 col-span-full gap-2'>
                                    <div className='col-span-2'>
                                        <Input
                                            id='telephone'
                                            label='Telephone'
                                            type='text'
                                            onChange={handleChange}
                                            value={formData.telephone}
                                        />
                                    </div>
                                    <div className='col-span-2 row-span-2'>
                                        <Textarea
                                            id='delivery_instruction'
                                            label='Delivery Instruction'
                                            value={formData.delivery_instruction}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='row-span-3'>
                                        <Textarea
                                            id='note'
                                            label='Note'
                                            value={formData.note}
                                            onChange={handleChange}
                                            textareaClassname='!h-30'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='grid'>
                                <Input
                                    id='subtotal'
                                    label='Subtotal'
                                    type='number'
                                    onChange={handleChange}
                                    value={Number(formData.subtotal).toFixed(2)}
                                    disabled
                                    divClassName='flex gap-3 items-center'
                                    className='w-full'
                                />
                                <Input
                                    id='discount'
                                    label='Discount'
                                    type='number'
                                    onChange={handleChange}
                                    value={formData.discount}
                                    divClassName='flex gap-3 items-center'
                                    className='w-full'

                                />
                                <Input
                                    id='shipping_fee'
                                    label='Shipping Fee'
                                    type='number'
                                    onChange={handleChange}
                                    value={formData.shipping_fee}
                                    divClassName='flex gap-3 items-center'
                                    className='w-full'
                                />
                                <Input
                                    id='gst'
                                    label='GST or Tax'
                                    type='number'
                                    onChange={handleChange}
                                    value={formData.gst}
                                    divClassName='flex gap-3 items-center'
                                    className='w-full'
                                />
                                <Input
                                    id='total'
                                    label='Total'
                                    type='number'
                                    onChange={handleChange}
                                    value={Number(formData.total).toFixed(2)}
                                    disabled
                                    divClassName='flex gap-3 items-center'
                                    className='w-full'
                                />
                            </div>
                        </div>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode == 'create' ? 'Create Purchase Order' : 'Edit Purchase Order'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormPurchases;
