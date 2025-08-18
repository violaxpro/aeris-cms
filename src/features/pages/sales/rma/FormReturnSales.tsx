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
import ProductReturn, { ProductForm } from './ProductReturn';
import Table from '@/components/table'
import Divider from '@/components/divider'
import { PlusOutlineIcon } from '@public/icon';
import Image from 'next/image';
import ButtonCancel from '@/components/button/ButtonAction'
import { formatCurrency } from '@/plugins/utils/utils';

const FormReturnSales: React.FC<FormProps> = ({ mode, initialValues, slug, dataTable }) => {
    const [optionBrands] = useAtom(brandsAtom)
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd();

    const [optionsCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        order_id: initialValues ? initialValues.order_id : '',
        customer_submit_request: initialValues ? initialValues.customer_submit_request : '',
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
        { title: 'RMA Sales', url: routes.eCommerce.returnSales },
        { title: mode === 'create' ? 'Create' : 'Edit' },
    ];

    // const handleAddProduct = () => {
    //     setProductList([...productList, productForm]);
    //     setProductForm({
    //         sku: '',
    //         name: '',
    //         price: '',
    //         return_type: '',
    //         current_serial_number: '',
    //         reason: '',
    //         product_return: false
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
                order_id: formData.order_id,
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
                <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Return Sales' : 'Edit Return Sales'}</h1>
                <Breadcrumb items={breadcrumb} />
                <Divider />
            </div>

            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex flex-col gap-5'>
                        <div className='grid md:grid-cols-2 gap-2'>
                            <SelectInput
                                id='order_id'
                                label='Order ID'
                                value={formData.order_id}
                                placeholder='Select Order ID'
                                onChange={(val) => handleChangeSelect('order_id', val)}
                                options={[
                                    { label: 'ORD890342', value: '1' },
                                    { label: 'ORD890343', value: '2' },
                                ]}
                                required
                            />
                            <SelectInput
                                id='customer_submit_request'
                                label='Customer Submit Request'
                                value={formData.customer_submit_request}
                                placeholder='Select Customer Submit Request'
                                onChange={(val) => handleChangeSelect('customer_submit_request', val)}
                                options={[
                                    { label: 'Web Portal', value: 'web-portal' },
                                    { label: 'Email', value: 'email' },
                                    { label: 'Phone', value: 'phone' },
                                    { label: 'Chat', value: 'chat' },
                                ]}
                                required
                            />
                            {/* <SelectInput
                                id='sales_person'
                                label='Sales Person'
                                placeholder='Select Sales Person'
                                value={formData.sales_person}
                                onChange={(val) => handleChangeSelect('sales_person', val)}
                                required
                            /> */}
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
                                        <ProductReturn
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
                        {/* <div className='mt-4'>
                        <div className='mb-4'>
                            <h1 className='text-xl font-bold'>Product List</h1>
                            <Button
                                label='Add Product'
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788] mt-4"
                                onClick={() => setShowAddProduct(!showAddProduct)}
                            />
                        </div>
                        {showAddProduct && (
                            <ProductReturn
                                productForm={productForm}
                                setProductForm={setProductForm}
                                onAddProduct={handleAddProduct}
                            />
                        )}
                        <Table
                            columns={columns}
                            dataSource={productList}
                        />

                        <div className='grid md:grid-cols-2 gap-4 mt-6'>
                            <div>
                                <Textarea
                                    id='notes'
                                    label='Notes'
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='grid md:grid-cols-3 gap-3'>
                                <Input
                                    id='subtotal'
                                    label='Sub Total($)'
                                    type='text'
                                    placeholder='Input Sub Total'
                                    onChange={handleChange}
                                    value={formData.subtotal}

                                />
                                <Input
                                    id='tax_include'
                                    label='Tax Include($)'
                                    type='text'
                                    placeholder='Input Tax Include'
                                    onChange={handleChange}
                                    value={formData.tax_include}
                                />
                                <Input
                                    id='total'
                                    label='Total($)'
                                    type='text'
                                    placeholder='Input Total'
                                    onChange={handleChange}
                                    value={formData.total}
                                />
                            </div>

                        </div>
                    </div> */}
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
                            <ButtonCancel
                                label='Cancel'
                                onClick={() => router.push(routes.eCommerce.returnSales)}
                            />
                            <Button
                                label={mode === 'create' ? 'Create Return Sales' : 'Edit Return Sales'}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
};

export default FormReturnSales;
