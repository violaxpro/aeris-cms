'use client'
import React, { useState, useEffect } from 'react';
import type { TableColumnsType } from 'antd'
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Image from 'next/image';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import Table from '@/components/table'
import { useNotificationAntd } from '@/components/toast';
import ProductInput, { ProductForm } from '../ProductInput';
import { PlusOutlined, PercentageOutlined } from '@ant-design/icons';
import { DollarIcon } from '@public/icon';
import { Divider } from 'antd';
import Segmented from '@/components/segmented'
import OrderSummary from '../OrderSummary';
import ButtonCancel from '@/components/button/ButtonAction'

const FormQuote: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        sku: '',
        name: '',
        price: 0,
        buying_price: 0,
        qty: 0,
        // tax: '',
        total: 0,
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        customer_name: initialValues ? initialValues.customer_name : '',
        user: initialValues ? initialValues.user : '',
        payment_method: initialValues ? initialValues.payment_method : '',
        po_number: initialValues ? initialValues.po_number : '',
        billing_address: initialValues ? initialValues.billing_address : '',
        shipping_address: initialValues ? initialValues.shipping_address : '',
        order_reference: initialValues ? initialValues.order_reference : '',
        subtotal: initialValues ? initialValues.subtotal : '',
        product: initialValues ? initialValues.product : [],
        discount: initialValues ? initialValues.discount : '',
        shipping_fee: initialValues ? initialValues.shipping_fee : '',
        gst: initialValues ? initialValues.gst : '',
        total: initialValues ? initialValues.total : '',
        coupon_apply: initialValues ? initialValues.coupon_apply : '',
        discount_type: initialValues ? initialValues.discount_type : '',
        shipping_method: initialValues ? initialValues.shipping_method : '',
        delivery_note: initialValues ? initialValues.delivery_note : '',
        internal_note: initialValues ? initialValues.internal_note : '',

    });
    const [selectedDiscountType, setSelectedDiscountType] = useState('percent')
    const [profitHidden, setProfitHidden] = useState(true)

    const breadcrumb = [
        { title: 'Sales' },
        {
            title: 'Quote', url: routes.eCommerce.quote
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
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, row: any, index: number) => {
                console.log(row)
                return <div className='flex gap-2'>
                    <Button
                        label="Edit"
                        onClick={() => handleEditProduct(index)}
                    />
                    <Button
                        label="Delete"
                        onClick={() => handleDeleteProduct(index)}
                    />
                </div>
            }
        },

    ]

    const handleEditProduct = (index: number) => {
        const productToEdit = productList[index];
        setProductForm(productToEdit);
        setEditIndex(index);
        setShowAddProduct(true);
    }

    const handleDeleteProduct = (index: number) => {
        setProductList(prev => prev.filter((_, i) => i !== index));
    };

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
    //         tax: '',
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

    const handleSubmit = async () => {
        try {
            const submitData = {
                user: formData.user,
                po_number: formData.po_number,
                billing_address: formData.billing_address,
                shipping_address: formData.shipping_address,
                order_reference: formData.order_reference,
                product: productList,
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
                qty: 0,
                // tax: '',
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


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-5 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode == 'create' ? 'Create Quotes' : 'Edit Quotes'}</h1>
                <Breadcrumb items={breadcrumb} />
                <Divider />
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex flex-col gap-5'>
                        <div className='grid gap-3'>
                            <div className='grid md:grid-cols-4 gap-4 mt-2'>
                                <Input
                                    id='customer_name'
                                    label='Customer Name'
                                    type='text'
                                    placeholder='Input Customer Name'
                                    onChange={handleChange}
                                    value={formData.customer_name}
                                    required
                                />
                                <SelectInput
                                    id='payment_method'
                                    label='Payment Method'
                                    placeholder='Select Payment Method'
                                    onChange={(selected) => handleChangeSelect('payment_method', selected)}
                                    value={formData.payment_method}
                                    options={[
                                        { label: 'Paypal', value: 'Paypal' }
                                    ]}
                                    required
                                />
                                <Input
                                    id='po_number'
                                    label='PO Number'
                                    type='text'
                                    placeholder='Input PO Number'
                                    onChange={handleChange}
                                    value={formData.po_number}
                                    required
                                />
                                <Input
                                    id='order_reference'
                                    label='Order Reference'
                                    type='text'
                                    placeholder='Input Order Reference'
                                    onChange={handleChange}
                                    value={formData.order_reference}
                                    required
                                />
                            </div>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <SelectInput
                                    id='billing_address'
                                    label='Billing Address'
                                    placeholder='Select Billing Address'
                                    onChange={(selected) => handleChangeSelect('billing_address', selected)}
                                    value={formData.billing_address}
                                    options={[
                                        { label: 'Jl. Rambutan', value: 'Jl. Rambutan' }
                                    ]}
                                    required
                                />
                                <SelectInput
                                    id='shipping_address'
                                    label='Shipping Address'
                                    placeholder='Select Shipping Address'
                                    onChange={(selected) => handleChangeSelect('shipping_address', selected)}
                                    value={formData.shipping_address}
                                    options={[
                                        { label: 'Jl. Rambutan', value: 'Jl. Rambutan' }
                                    ]}
                                    required
                                />
                                {/* <Textarea
                                    id='billing_address'
                                    label='Biiling Address'
                                    value={formData.billing_address}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                    required
                                />
                                <Textarea
                                    id='shipping_address'
                                    label='Shipping Address'
                                    value={formData.shipping_address}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                    required
                                /> */}
                            </div>
                        </div>

                        <div >
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
                            {/* {
                                showAddProduct &&
                                <ProductInput
                                    productForm={productForm}
                                    setProductForm={setProductForm}
                                    onAddProduct={handleAddProduct}
                                />
                            } */}
                            {/* <div className='mt-2'>
                                <Table
                                    columns={columns}
                                    dataSource={productList}
                                />
                            </div> */}

                        </div>

                        <div className='grid md:grid-cols-[3fr_3fr_6fr] gap-3'>
                            <Input
                                id='coupon_apply'
                                label='Coupon Apply'
                                type='number'
                                onChange={handleChange}
                                value={formData.coupon_apply}
                                suffix={
                                    <Button
                                        label='Apply'
                                    />
                                }
                                style={{ marginTop: '1rem' }}

                            />
                            <Input
                                id='discount_type'
                                label='Discount Type'
                                type='number'
                                onChange={handleChange}
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
                                    <div className='mb-2'>
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
                            <SelectInput
                                id='shipping_method'
                                label='Shipping Method'
                                placeholder='Select Shipping Method'
                                onChange={(selected) => handleChangeSelect('shipping_method', selected)}
                                value={formData.shipping_method}
                                options={[
                                    { label: 'Free Shipping', value: 'Free SHipping' },
                                    { label: 'Local Pickup', value: 'Local Pickup' },
                                    { label: 'Drop Off', value: 'Drop Off' },
                                    { label: 'Flat Rate', value: 'Flat Rate' }
                                ]}
                                selectClassName='!mt-[1rem]'
                                required
                            />
                        </div>

                        <div className='grid md:grid-cols-12 gap-3 mt-5'>
                            <div className='grid grid-cols-2 col-span-9 gap-3'>
                                <Textarea
                                    id='delivery_note'
                                    label='Delivery Notes'
                                    value={formData.delivery_note}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                />
                                <Textarea
                                    id='internal_note'
                                    label='Internal Notes'
                                    value={formData.internal_note}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                />
                            </div>

                            <div className='grid col-span-3 gap-1 '>
                                <OrderSummary
                                    profitHidden={profitHidden}
                                    onReveal={() => setProfitHidden(false)}
                                    profit={100}
                                    subtotal={1130.4}
                                    shippingFee={50}
                                    discount={5}
                                    gstRate={0.1}
                                />
                            </div>

                        </div>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end gap-3">
                        <ButtonCancel
                            label='Cancel'
                            onClick={() => router.push(routes.eCommerce.quote)}
                        />
                        <Button
                            label={mode == 'create' ? 'Create Quote' : 'Edit Quote'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormQuote;
