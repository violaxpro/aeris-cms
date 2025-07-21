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
import ProductInput, { ProductForm } from '../ProductInput';

const FormOrder: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState({
        sku: '',
        name: '',
        price: 0,
        buying_price: 0,
        qty: 0,
        tax: '',
        total: 0,
    });
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        user: initialValues ? initialValues.user : '',
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
    const [formErrors, setFormErrors] = useState({
        user: '',
        billing_address: '',
        shipping_address: '',
        subtotal: '',
        product: '',
        shipping_fee: '',
        gst: '',
        total: '',
    });

    const breadcrumb = [
        { title: 'Sales' },
        {
            title: 'Order', url: routes.eCommerce.order
        },
        { title: mode == 'create' ? 'Create Order' : 'Edit Order' },
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
            title: 'Tax Fee',
            dataIndex: 'tax',
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_: any, row: any, index: number) => {
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
            tax: '',
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

    const handleSubmit = async () => {
        const newErrors = {
            user: '',
            billing_address: '',
            shipping_address: '',
            subtotal: '',
            product: '',
            shipping_fee: '',
            gst: '',
            total: '',
        };

        if (!formData.user.trim()) newErrors.user = 'User is required';
        if (!formData.billing_address.trim()) newErrors.billing_address = 'Billing Address is required';
        if (!formData.shipping_address.trim()) newErrors.shipping_address = 'Shipping Address is required';

        if (!formData.subtotal || Number(formData.subtotal) <= 0) newErrors.subtotal = 'Subtotal must be greater than 0';
        if (productList.length === 0) newErrors.product = 'At least one product is required';
        if (!formData.shipping_fee || Number(formData.shipping_fee) <= 0) newErrors.shipping_fee = 'Shipping Fee is required';
        if (!formData.gst || Number(formData.gst) <= 0) newErrors.gst = 'GST/Tax is required';
        if (!formData.total || Number(formData.total) <= 0) newErrors.total = 'Total must be greater than 0';

        const hasErrors = Object.values(newErrors).some((v) => v !== '');

        if (hasErrors) {
            setFormErrors(newErrors);
            return;
        } else {
            setFormErrors({
                user: '',
                billing_address: '',
                shipping_address: '',
                subtotal: '',
                product: '',
                shipping_fee: '',
                gst: '',
                total: '',
            });
        }
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


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className="text-xl font-bold mb-4">{mode == 'create' ? 'Create Order' : 'Edit Order'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mt-4 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='flex flex-col gap-2 mt-2'>
                                <Input
                                    id='user'
                                    label='User'
                                    type='text'
                                    placeholder='Input User'
                                    onChange={handleChange}
                                    value={formData.user}
                                    errorMessage={formErrors.user}
                                />
                                <Input
                                    id='po_number'
                                    label='PO Number'
                                    type='text'
                                    placeholder='Input PO Number'
                                    onChange={handleChange}
                                    value={formData.po_number}
                                />
                                <Input
                                    id='order_reference'
                                    label='Order Reference'
                                    type='text'
                                    placeholder='Input Order Reference'
                                    onChange={handleChange}
                                    value={formData.order_reference}
                                />
                            </div>
                            <div>
                                <Textarea
                                    id='billing_address'
                                    label='Biiling Address'
                                    value={formData.billing_address}
                                    onChange={handleChange}
                                    error={formErrors.billing_address}
                                />
                                <Textarea
                                    id='shipping_address'
                                    label='Shipping Address'
                                    value={formData.shipping_address}
                                    onChange={handleChange}
                                    error={formErrors.shipping_address}
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
                                {
                                    formErrors.product && <p className="text-red-500 text-xs mt-1">{formErrors.product}</p>
                                }

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
                                    divClassName='flex gap-3 items-center w-full'
                                    className='w-full'
                                    errorMessage={formErrors.subtotal}
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
                                    errorMessage={formErrors.shipping_fee}
                                />
                                <Input
                                    id='gst'
                                    label='GST or Tax'
                                    type='number'
                                    onChange={handleChange}
                                    value={formData.gst}
                                    divClassName='flex gap-3 items-center'
                                    className='w-full'
                                    errorMessage={formErrors.gst}
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
                                    errorMessage={formErrors.total}

                                />
                            </div>

                        </div>

                        {
                            mode == 'create' &&
                            <div className='grid  gap-3 mt-2'>
                                <h1 className='text-lg font-bold'>Notes</h1>
                                <div className='grid md:grid-cols-2 gap-2'>
                                    <div>
                                        <Textarea
                                            id='delivery_note'
                                            label='Delivery Notes'
                                            value={formData.delivery_note}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Textarea
                                            id='internal_note'
                                            label='Internal Notes'
                                            value={formData.internal_note}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                            </div>
                        }

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end">
                        <Button

                            label={mode == 'create' ? 'Create Order' : 'Edit Order'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormOrder;
