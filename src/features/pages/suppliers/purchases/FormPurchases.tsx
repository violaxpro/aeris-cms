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

const FormPurchases: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [optionSupplier, setOptionSupplier] = useState([])
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [date, setDate] = useState<any | null>(null);
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState({
        sku: '',
        name: '',
        price: 0,
        buying_price: 0,
        qty: 0,
        total: 0,
    });
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        purchaseId: initialValues ? initialValues.purchase_id : '',
        user: initialValues ? initialValues.user : '',
        reference: initialValues ? initialValues.reference : '',
        order_id: initialValues ? initialValues.order_id : '',
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
            title: 'Purchases', url: routes.eCommerce.purchases
        },
        { title: mode == 'create' ? 'Create Purchases' : 'Edit Purchases' },
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

    const handleAddProduct = () => {
        if (editIndex !== null) {
            const updatedList = [...productList];
            updatedList[editIndex] = productForm;
            setProductList(updatedList);
            setEditIndex(null);
        } else {
            setProductList([...productList, productForm]);

        }
        setProductForm({
            sku: '',
            name: '',
            price: 0,
            buying_price: 0,
            qty: 0,
            total: 0,
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

    const options = [
        { label: 'WAITING', value: 'WAITING' },
        { label: 'RECEIVE', value: 'RECEIVE' }
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
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode == 'create' ? 'Create Purchases' : 'Edit Purchases'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='flex flex-col gap-2 mt-2'>
                                <Input
                                    id='purchaseId'
                                    label='Purchase ID'
                                    type='text'
                                    placeholder='Input Purchase Id'
                                    onChange={handleChange}
                                    value={formData.purchaseId}
                                />
                                <Input
                                    id='order_id'
                                    label='Order ID'
                                    type='text'
                                    placeholder='Input Order ID'
                                    onChange={handleChange}
                                    value={formData.order_id}
                                />
                                <Input
                                    id='reference'
                                    label='Reference'
                                    type='text'
                                    placeholder='Input Reference'
                                    onChange={handleChange}
                                    value={formData.reference}
                                />
                                <SelectInput
                                    id='supplierName'
                                    label='Supplier Name'
                                    placeholder="Select Supplier"
                                    onChange={(val) => handleChangeSelect('supplierName', val)}
                                    value={formData.supplierName}
                                    options={optionSupplier}
                                />
                            </div>
                            <div>
                                <SelectInput
                                    id='paymentMethod'
                                    label='Payment Method'
                                    placeholder="Select Payment Method"
                                    onChange={(val) => handleChangeSelect('paymentMethod', val)}
                                    value={formData.paymentMethod}
                                    options={optionSupplier}
                                />
                                <SelectInput
                                    id='deliveryMethod'
                                    label='Delivery Method'
                                    placeholder="Select Delivery Method"
                                    onChange={(val) => handleChangeSelect('deliveryMethod', val)}
                                    value={formData.deliveryMethod}
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
                            </div>
                        </div>

                        <div className='mt-4'>
                            <h1 className='text-lg font-bold'>Product List</h1>
                            <Button
                                label='Add Product'
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788] mt-3"
                                onClick={() => setShowAddProduct(!showAddProduct)}
                            />
                            {
                                showAddProduct &&
                                <ProductInput
                                    productForm={productForm}
                                    setProductForm={setProductForm}
                                    onAddProduct={handleAddProduct}
                                />
                            }
                            <div className='mt-2'>
                                <Table
                                    columns={columns}
                                    dataSource={productList}
                                />
                            </div>

                        </div>

                        <div className='flex justify-end gap-2 mt-2'>
                            <div className='flex flex-col gap-1'>
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


                        <div className='grid  gap-3 mt-2'>
                            <div className='grid md:grid-cols-2 gap-2'>
                                <div>
                                    <Textarea
                                        id='delivery_note'
                                        label='Delivery Address'
                                        value={formData.delivery_note}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Textarea
                                        id='internal_note'
                                        label='Attention'
                                        value={formData.internal_note}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Input
                                    id='reference'
                                    label='Telephone'
                                    type='text'
                                    onChange={handleChange}
                                    value={formData.reference}
                                />
                                <div>
                                    <Textarea
                                        id='internal_note'
                                        label='Delivery Instruction'
                                        value={formData.internal_note}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='grid  gap-3 mt-2'>
                            <h1 className='text-lg font-bold'>Notes</h1>
                            <div className='grid md:grid-cols-2 gap-2'>
                                <div>
                                    <Textarea
                                        id='delivery_note'
                                        label='Note'
                                        value={formData.delivery_note}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>


                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                            label={mode == 'create' ? 'Create Purchases' : 'Edit Purchases'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormPurchases;
