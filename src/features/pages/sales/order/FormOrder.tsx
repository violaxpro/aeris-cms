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
import { PlusOutlined, PercentageOutlined } from '@ant-design/icons';
import { DollarIcon } from '@public/icon';
import Divider from '@/components/divider'
import Segmented from '@/components/segmented'
import OrderSummary from '../OrderSummary';
import Image from 'next/image';
import ButtonCancel from '@/components/button/ButtonAction'
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import ModalAddress from './ModalAddress';
import ModalCustomer from './ModalCustomer';

const FormOrder: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        sku: '',
        name: '',
        price: 0,
        buying_price: 0,
        trade: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
        diamond: 0,
        qty: 0,
        tax_rate: '',
        tax_amount: 0,
        total: 0,
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        customer_name: initialValues ? initialValues.customer_name : '',
        user: initialValues ? initialValues.user : '',
        payment_method: initialValues ? initialValues.payment_method : '',
        po_number: initialValues ? initialValues.po_number : '',
        issues_date: initialValues ? initialValues.issues_date : dayjs().format('DD-MM-YYYY'),
        due_date: initialValues ? initialValues.due_date : '',
        billing_address: initialValues ? initialValues.billing_address : '',
        shipping_address: initialValues ? initialValues.shipping_address : '',
        order_reference: initialValues ? initialValues.order_reference : '',
        subtotal: initialValues ? initialValues.subtotal : '',
        product: initialValues ? initialValues.product : [],
        discount: initialValues ? initialValues.discount : '',
        shipping_fee: initialValues ? initialValues.shipping_fee : '',
        tax: initialValues ? initialValues.tax : '',
        tax_rate: initialValues ? initialValues.tax_rate : '',
        gst: initialValues ? initialValues.gst : '',
        total: initialValues ? initialValues.total : '',
        coupon_apply: initialValues ? initialValues.coupon_apply : '',
        discount_type: initialValues ? initialValues.discount_type : '',
        shipping_method: initialValues ? initialValues.shipping_method : '',
        delivery_note: initialValues ? initialValues.delivery_note : '',
        internal_note: initialValues ? initialValues.internal_note : '',

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
    const [selectedDiscountType, setSelectedDiscountType] = useState('percent')
    const [profitHidden, setProfitHidden] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState<'billing' | 'shipping' | null>(null);
    const [buttonType, setButtonType] = useState<'oneof' | 'new' | null>(null);
    const [formAddress, setFormAddress] = useState({
        address: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
    })
    const [formCustomer, setFormCustomer] = useState({
        name: '',
    })
    const [openModalCustomer, setOpenModalCustomer] = useState(false)

    const breadcrumb = [
        { title: 'Sales' },
        {
            title: 'Invoice / Order', url: routes.eCommerce.order
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },
    ];

    const optionsTax = [
        { label: 'Tax Exclusive', value: 'tax-exclusive' },
        { label: 'Tax Inclusive', value: 'tax-inclusive' },
        { label: 'No Tax', value: 'no-tax' }
    ]

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
    //         // tax: '',
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

    const addItem = () => {
        setProductForm([
            ...productForm,
            {
                sku: '',
                name: '',
                price: 0,
                buying_price: 0,
                trade: 0,
                silver: 0,
                gold: 0,
                platinum: 0,
                diamond: 0,
                qty: 0,
                tax_rate: '',
                tax_amount: 0,
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

    const handleDateChange = (field: string, value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateString,
        }));
    };

    const handleChangeAddress = (e: any) => {
        const { id, value } = e.target;
        setFormAddress((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeCustomer = (e: any) => {
        const { id, value } = e.target;
        setFormCustomer((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleOpenModal = (btnType: 'oneof' | 'new', modalType: 'billing' | 'shipping') => {
        setModalType(modalType);
        setButtonType(btnType)
        setOpenModal(true);
    }


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

    const dataCustomer = [
        {
            name: 'Ola',
            billing_address: 'Jl.Rambutan',
            shipping_address: 'Jl. Cempaka'
        }
    ]

    const optionsCustomer = dataCustomer.map((customer) => ({
        label: customer.name,
        value: customer.name,
        billing_address: customer.billing_address,
        shipping_address: customer.shipping_address
    }));


    return (
        <>
            {contextHolder}
            <ModalAddress
                isModalOpen={openModal}
                handleCancel={() => setOpenModal(false)}
                handleChange={handleChangeAddress}
                formData={formAddress}
                modalType={modalType}
                buttonType={buttonType}
            />
            <ModalCustomer
                isModalOpen={openModalCustomer}
                handleCancel={() => setOpenModalCustomer(false)}
                handleChange={handleChangeCustomer}
                formData={formCustomer}
            />
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode == 'create' ? 'Create Invoice / Order' : 'Edit Invoice / Order'}</h1>
                <Breadcrumb items={breadcrumb} />
                <Divider />
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-xl font-semibold'>Customer Details</h1>
                        <Divider />
                        <div className='grid gap-3'>
                            <div className={`grid md:grid-cols-[2fr_1fr_repeat(3,1fr)] gap-4 mt-2`}>
                                <SelectInput
                                    id='customer_name'
                                    label='Customer Name'
                                    placeholder='Select Customer Name'
                                    onChange={(selected) => {
                                        handleChangeSelect('customer_name', selected);

                                        // cari data lengkap customer yang dipilih
                                        const selectedCustomer = optionsCustomer.find((item) => item.value === selected);

                                        if (selectedCustomer) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                customer_name: selectedCustomer.value,
                                                billing_address: selectedCustomer.billing_address,
                                                shipping_address: selectedCustomer.shipping_address
                                            }));
                                        }
                                    }}
                                    value={formData.customer_name}
                                    options={optionsCustomer}
                                    popupRender={(options: any) => (
                                        <>
                                            {options}
                                            <div className='p-4 flex'>
                                                <Button
                                                    label='Add New Customer'
                                                    onClick={() => setOpenModalCustomer(true)}
                                                    hasWidth='w-full'
                                                />
                                            </div>

                                        </>
                                    )}
                                    required
                                />
                                {/* <Input
                                    id='customer_name'
                                    label='Customer Name'
                                    type='text'
                                    placeholder='Input Customer Name'
                                    onChange={handleChange}
                                    value={formData.customer_name}
                                    required
                                /> */}
                                {/* <SelectInput
                                        id='payment_method'
                                        label='Payment Method'
                                        placeholder='Select Payment Method'
                                        onChange={(selected) => handleChangeSelect('payment_method', selected)}
                                        value={formData.payment_method}
                                        options={[
                                            { label: 'Paypal', value: 'Paypal' }
                                        ]}
                                        required
                                    /> */}

                                {/* <Input
                                    id='po_number'
                                    label='PO Number'
                                    type='text'
                                    placeholder='Input PO Number'
                                    onChange={handleChange}
                                    value={formData.po_number}
                                    required
                                /> */}
                                <Input
                                    id='order_reference'
                                    label='Order Reference'
                                    type='text'
                                    placeholder='Input Order Reference'
                                    onChange={handleChange}
                                    value={formData.order_reference}
                                    required
                                />
                                <DatePickerInput
                                    id='issues_date'
                                    label='Issues Date'
                                    value={formData.issues_date ? dayjs(formData.issues_date, 'DD-MM-YYYY') : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('issues_date', value, dateString)}
                                />
                                <DatePickerInput
                                    id='due_date'
                                    label='Due Date'
                                    value={formData.due_date ? dayjs(formData.due_date, 'DD-MM-YYYY') : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('due_date', value, dateString)}
                                />
                                <SelectInput
                                    id='tax'
                                    label='Tax'
                                    placeholder='Select Tax'
                                    onChange={(selected) => handleChangeSelect('tax', selected)}
                                    value={formData.tax}
                                    options={optionsTax}
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
                                    popupRender={(options: any) => (
                                        <>
                                            {options}
                                            <div className='p-4 flex gap-3'>
                                                <Button
                                                    label='Add One of Billing Address'
                                                    onClick={() => handleOpenModal('oneof', 'billing')}
                                                    hasWidth='w-full'
                                                />
                                                <Button
                                                    label='Add Billing Address'
                                                    onClick={() => handleOpenModal('new', 'billing')}
                                                    hasWidth='w-full'
                                                />
                                            </div>

                                        </>
                                    )}
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
                                    popupRender={(options: any) => (
                                        <>
                                            {options}
                                            <div className='p-4 flex gap-3'>
                                                <Button
                                                    label='Add One of Shipping Address'
                                                    onClick={() => handleOpenModal('oneof', 'shipping')}
                                                    hasWidth='w-full'
                                                />
                                                <Button
                                                    label='Add Shipping Address'
                                                    onClick={() => handleOpenModal('new', 'shipping')}
                                                    hasWidth='w-full'
                                                />
                                            </div>

                                        </>
                                    )}
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

                        <div className='flex flex-col gap-3 my-5'>
                            <h1 className='text-xl font-semibold'>Product List</h1>
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
                                        hasHeight={false}
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
                            <div className='grid md:grid-cols-2 md:col-span-9 gap-3'>
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

                            <div className='grid md:col-span-3 gap-1 '>
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
                            onClick={() => router.push(routes.eCommerce.order)}
                        />
                        <Button
                            label={mode == 'create' ? 'Create Invoice / Order' : 'Edit Invoice / Order'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormOrder;
