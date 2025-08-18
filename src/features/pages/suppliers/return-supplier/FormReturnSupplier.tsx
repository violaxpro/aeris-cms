'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import type { TableColumnsType } from 'antd'
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import { routes } from '@/config/routes';
import { addSupplierList, updateSupplierList } from '@/services/supplier-list-service';
import { useAtom } from 'jotai';
import { brandsAtom, categoriesAtom } from '@/store/DropdownItemStore';
import { useNotificationAntd } from '@/components/toast';
import ProductInput from './ProductInput';
import Table from '@/components/table'
import { ProductForm } from './ProductInput';
import Divider from '@/components/divider'
import Image from 'next/image';
import { PlusOutlineIcon } from '@public/icon';
import { formatCurrency } from '@/plugins/utils/utils';
import ButtonAction from '@/components/button/ButtonAction'


const FormReturnSupplier: React.FC<FormProps> = ({ mode, initialValues, slug, dataTable }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();

    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        rma_type: initialValues ? initialValues.rma_type : '',
        supplier_or_vendor: initialValues ? initialValues.supplier_or_vendor : '',
        rma_id: initialValues ? initialValues.rma_id : '',
        supplier_invoice: initialValues ? initialValues.supplier_invoice : '',
        order_number: initialValues ? initialValues.order_number : '',
        shipping_type: initialValues ? initialValues.shipping_type : '',
        supplier_or_vendor_address: initialValues ? initialValues.supplier_or_vendor_address : '',
        return_option: initialValues ? initialValues.return_option : '',
        sales_person: initialValues ? initialValues.sales_person : '',
        status: initialValues ? initialValues.status : '',
        product: initialValues ? initialValues.product : [],
        internal_notes: initialValues ? initialValues.internal_notes : '',
        customers_notes: initialValues ? initialValues.customers_notes : '',
        subtotal: initialValues ? initialValues.subtotal : '',
        tax_include: initialValues ? initialValues.tax_include : '',
        total: initialValues ? initialValues.total : ''
    });
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        sku: '',
        name: '',
        price: '',
        return_type: '',
        current_serial_number: '',
        reason: '',
        product_return: false,
        status: '',
        evidence: [],
        product_condition: '',
        packaging_condition: '',
        is_no_missing_part: false,
        is_serial_number_match: false
    }]);

    const breadcrumb = [
        { title: 'RMA' },
        { title: 'RMA Suppliers', url: routes.eCommerce.returnSupplier },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    const addItem = () => {
        setProductForm([
            ...productForm,
            {
                sku: '',
                name: '',
                price: '',
                return_type: '',
                current_serial_number: '',
                reason: '',
                product_return: false,
                status: '',
                evidence: [],
                product_condition: '',
                packaging_condition: '',
                is_no_missing_part: false,
                is_serial_number_match: false
            }
        ])
    }

    const handleRemoveRow = (index: number) => {
        const updated = [...productForm];
        updated.splice(index, 1);
        setProductForm(updated);
    };

    const handleUpdateRow = (index: number, updatedForm: ProductForm) => {
        const updated: any = [...productForm];
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

    const handleSubmit = async () => {
        try {
            const submitData = {
                order_number: formData.order_number,
                sales_person: formData.sales_person,
                status: formData.status,
                internal_notes: formData.internal_notes,
                prodcut: formData.product,
                subtotal: formData.subtotal,
                tax_include: formData.tax_include,
                total: formData.total,
            }

            let response;
            // if (mode == 'edit' && slug) {
            //     response = await updateSupplierList(slug, submitData)
            // } else {
            //     response = await addSupplierList(submitData)
            // }

            // if (response.success == true) {
            //     notifySuccess(response.message)
            //     setTimeout(() => {
            //         router.push(routes.eCommerce.supplierList)
            //     }, 2000);
            // }
        } catch (error) {
            console.error(error)
        }

    }

    const optionStatus = [
        { label: 'COMPLETED', value: 'COMPLETED' },
        { label: 'PENDING', value: 'PENDING' },
    ]

    const columns: TableColumnsType<ProductForm> = [
        {
            title: 'SKU',
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
            title: 'Return Type',
            dataIndex: 'return_type',
        },
        {
            title: 'Current Serial Number',
            dataIndex: 'current_serial_number',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
        },
        {
            title: 'Product Return',
            dataIndex: 'product_return',
            render: (val) => {
                if (val == true) {
                    return 'True'
                } else {
                    return 'False'
                }
            }
        },
    ]

    console.log(productList)
    useEffect(() => {
        const newSubtotal = productList.reduce((acc, item) => acc + Number(item.price || 0), 0);
        setFormData(prev => ({
            ...prev,
            subtotal: newSubtotal.toString(),
            total: (newSubtotal + Number(prev.tax_include || 0)).toString()
        }));
    }, [productList, formData.tax_include]);


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create RMA Suppliers' : 'Edit RMA Suppliers'}</h1>
                <Breadcrumb items={breadcrumb} />
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }} className='flex flex-col gap-5'>
                    <div className='grid md:grid-cols-5 gap-2'>
                        <SelectInput
                            id='rma_type'
                            label='RMA Type'
                            placeholder='Select RMA Type'
                            value={formData.rma_type}
                            onChange={(val) => handleChangeSelect('rma_type', val)}
                            options={[
                                { label: 'To Supplier', value: 'To Supplier' },
                                { label: 'To Vendor', value: 'To Vendor' },

                            ]}
                        />
                        <SelectInput
                            id='supplier_or_vendor'
                            label='Supplier/Vendor'
                            placeholder='Select Supplier/Vendor'
                            value={formData.supplier_or_vendor}
                            onChange={(val) => handleChangeSelect('supplier_or_vendor', val)}
                        />
                        <SelectInput
                            id='order_number'
                            label='Order Number'
                            value={formData.order_number}
                            placeholder='Select Order Number'
                            onChange={(val) => handleChangeSelect('order_number', val)}
                        />
                        <SelectInput
                            id='rma_id'
                            label='RMA ID'
                            value={formData.rma_id}
                            placeholder='Select related customer if any'
                            onChange={(val) => handleChangeSelect('rma_id', val)}
                        />
                        <SelectInput
                            id='supplier_invoice'
                            label='Supplier Invoice#'
                            value={formData.supplier_invoice}
                            placeholder='Select if any'
                            onChange={(val) => handleChangeSelect('supplier_invoice', val)}
                        />
                        <div className='col-span-full grid md:grid-cols-3 gap-2'>
                            <SelectInput
                                id='shipping_type'
                                label='Shipping Type'
                                value={formData.shipping_type}
                                placeholder='Select Shipping Type'
                                onChange={(val) => handleChangeSelect('shipping_type', val)}
                                options={[
                                    { label: 'Customer Drop-Ship to Vendor', value: 'Customer Drop-Ship to Vendor' },
                                    { label: 'Warehouse Ship to Vendor', value: 'Warehouse Ship to Vendor' },
                                    { label: 'Warehouse Consolidation', value: 'Warehouse Consolidation' },
                                    { label: 'Vendor-Provided Label', value: 'Vendor-Provided Label' },
                                    { label: 'Third-Party Logistics', value: 'Third-Party Logistics' },
                                    { label: 'Drop-Off at Vendor Service Center', value: 'Drop-Off at Vendor Service Center' }
                                ]}
                            />
                            <SelectInput
                                id='supplier_or_vendor_address'
                                label='Supplier/Vendor Address'
                                value={formData.supplier_or_vendor_address}
                                placeholder='Select Supplier/Vendor Address'
                                onChange={(val) => handleChangeSelect('supplier_or_vendor_address', val)}
                            />
                            <SelectInput
                                id='return_option'
                                label='Return Options'
                                value={formData.return_option}
                                placeholder='Select Options'
                                onChange={(val) => handleChangeSelect('return_option', val)}
                                options={[
                                    { label: 'Vendor Ships Direct to Warehouse', value: 'Vendor Ships Direct to Warehouse' },
                                    { label: 'Vendor Ships Direct to Customer (Drop-Ship)', value: 'Vendor Ships Direct to Customer (Drop-Ship)' },
                                    { label: 'Vendor Pickup & Return via Consolidation', value: 'Vendor Pickup & Return via Consolidation' },
                                    { label: 'Customer Pickup at Vendor Service Center', value: 'Customer Pickup at Vendor Service Center' },
                                    { label: 'Vendor Uses 3PL to Deliver to Us', value: 'Vendor Uses 3PL to Deliver to Us' },
                                    { label: 'Vendor Credit Only – No Physical Return', value: 'Vendor Credit Only – No Physical Return' }
                                ]}
                            />
                        </div>

                        {/* <SelectInput
                            id='status'
                            label='Status'
                            placeholder='Select Status'
                            value={formData.status}
                            onChange={(val) => handleChangeSelect('status', val)}
                            options={optionStatus}
                        /> */}
                    </div>
                    <div className='flex flex-col gap-4'>
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
                        <div className='flex justify-end'>
                            <Button
                                label='Add Product'
                                icon={<Image
                                    src={PlusOutlineIcon}
                                    alt='plus-icon'
                                    width={15}
                                />}
                                onClick={addItem}
                            />
                        </div>

                    </div>
                    <div className='grid md:grid-cols-12 gap-3 mt-5'>
                        <div className='grid md:grid-cols-2 col-span-10 gap-3'>
                            <Textarea
                                id='customers_notes'
                                label='Customer Notes'
                                value={formData.internal_notes}
                                onChange={handleChange}
                                textareaClassname='!h-20'
                            />
                            <Textarea
                                id='internal_notes'
                                label='Internal Notes'
                                value={formData.internal_notes}
                                onChange={handleChange}
                                textareaClassname='!h-20'
                            />
                        </div>
                        <div className='flex items-center md:col-span-2 gap-3'>
                            <div className="text-sm text-black w-full">
                                <div className="flex justify-between mb-1">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(formData.subtotal)}</span>
                                </div>

                                <div className="flex justify-between mb-1">
                                    <span>Tax Include</span>
                                    <span>{formatCurrency(formData.tax_include)}</span>
                                </div>
                                <hr className="my-2 border-gray-300" />
                                <div className="flex justify-between font-bold text-base">
                                    <span>Total</span>
                                    <span>{formatCurrency(formData.total)}</span>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <ButtonAction
                            label='Cancel'
                            onClick={() => router.push(routes.eCommerce.returnSupplier)}
                        />
                        <Button
                            label={mode === 'create' ? 'Create RMA Supplier' : 'Edit RMA Supplier'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormReturnSupplier;
