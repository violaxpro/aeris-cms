import React, { useState } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'
import { TrashIcon, TrashIconRed } from '@public/icon';
import ButtonAction from '@/components/button/ButtonIcon';

export interface ProductForm {
    sku: string
    name: string
    price: string
    return_type: string
    current_serial_number: string
    reason: string
    product_return: boolean
    status: string
}

interface ProductInputProps {
    productForm: ProductForm
    // setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>
    // onAddProduct: () => void
    onChange: (form: ProductForm) => void;
    onRemove?: () => void;
    index: number;
    length?: number
}

const ProductReturn = ({
    productForm,
    // setProductForm,
    // onAddProduct
    onChange,
    onRemove,
    index,
    length,
}: ProductInputProps) => {
    const handleProductChange = (e: any) => {
        const { id, value } = e.target;
        const updated = { ...productForm, [id]: value }
        onChange(updated);
    };

    const handleProductCheckbox = (field: string, checked: boolean) => {
        const updated = { ...productForm, [field]: checked }
        onChange(updated);
    };


    // const handleAddProduct = () => {
    //     onAddProduct()
    // };

    return (
        <div className='grid md:grid-cols-[1fr_2fr_1fr_1fr_1.5fr_1fr_1fr_50px] gap-4 mb-6'>
            <Input
                id='sku'
                type='text'
                label='Product SKU'
                value={productForm.sku}
                onChange={handleProductChange}
                className='mb-1'
                required

            />
            <Input
                id='name'
                type='text'
                label='Name'
                value={productForm.name}
                onChange={handleProductChange}
                className='mb-1'
                required


            />
            <Input
                id='price'
                type='text'
                label='Price'
                value={productForm.price}
                onChange={handleProductChange}
                className='mb-1'
                required

            />
            {/* <Input
                id='return_type'
                type='text'
                label='Return Type'
                value={productForm.return_type}
                onChange={handleProductChange}
                className='mb-1'
                required

            /> */}
            <Input
                id='current_serial_number'
                type='text'
                label='Current Serial Number'
                value={productForm.current_serial_number}
                onChange={handleProductChange}
                className='mb-1'
                required

            />
            <Input
                id='reason'
                type='text'
                label='Reason'
                value={productForm.reason}
                onChange={handleProductChange}
                className='mb-1'
                required

            />
            <SelectInput
                id='return_type'
                label='Return Type'
                placeholder='Select Return Type'
                value={productForm.return_type}
                onChange={handleProductChange}
                options={[
                    { label: 'Change new product', value: 'Change new product' },
                    { label: 'Credit', value: 'Credit' },
                    { label: 'Refund', value: 'Refund' },
                    { label: 'Other', value: 'Other' },
                ]}
            />
            <SelectInput
                id='status'
                label='Status'
                placeholder='Select Status'
                value={productForm.status}
                onChange={handleProductChange}
                options={[
                    { label: 'Waiting', value: 'Waiting' },
                    { label: 'Approved', value: 'Approved' },
                    { label: 'Rejected', value: 'Rejected' },
                ]}
            />

            {
                onRemove && <div className='flex item-ends justify-center mt-4 '>
                    {
                        length && length <= 1 ?
                            <ButtonAction
                                icon={TrashIcon}
                                width={20}
                                height={20}
                                className='btn-trash-item !h-10 !w-15'
                            /> :
                            <ButtonAction
                                color='danger'
                                variant='filled'
                                size="small"
                                icon={TrashIconRed}
                                width={15}
                                height={15}
                                className='!h-10 !w-15'

                                onClick={onRemove}
                            />
                    }

                </div>
            }
        </div>

    )
}

export default ProductReturn
