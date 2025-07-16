import React, { useState } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'

export interface ProductForm {
    sku: string
    name: string
    price: string
    return_type: string
    current_serial_number: string
    reason: string
    product_return: boolean
}

interface ProductInputProps {
    productForm: ProductForm
    setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>
    onAddProduct: () => void
}

const ProductReturn = ({
    productForm,
    setProductForm,
    onAddProduct
}: ProductInputProps) => {
    const handleProductChange = (e: any) => {
        const { id, value } = e.target;
        setProductForm((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleProductCheckbox = (field: string, checked: boolean) => {
        setProductForm((prev) => ({
            ...prev,
            [field]: checked
        }));
    };


    const handleAddProduct = () => {
        onAddProduct()
    };

    return (
        <div className='grid md:grid-cols-7 gap-4 mb-6'>
            <Input
                id='sku'
                type='text'
                label='Product SKU'
                value={productForm.sku}
                onChange={handleProductChange}
                className='mb-1'
            />
            <Input
                id='name'
                type='text'
                label='Name'
                value={productForm.name}
                onChange={handleProductChange}
                className='mb-1'

            />
            <Input
                id='price'
                type='text'
                label='Price'
                value={productForm.price}
                onChange={handleProductChange}
                className='mb-1'
            />
            <Input
                id='return_type'
                type='text'
                label='Return Type'
                value={productForm.return_type}
                onChange={handleProductChange}
                className='mb-1'
            />
            {/* <SelectInput
                id='return_type'
                label='Return Type'
                placeholder='Select Return Type'
                value={productForm.return_type}
                onChange={(val) => setProductForm((prev: any) => ({ ...prev, return_type: val }))}
                options={[
                    { label: 'Replace', value: 'Replace' },
                    { label: 'Repair', value: 'Repair' },
                    { label: 'Refund', value: 'Refund' },
                ]}
            /> */}
            <Input
                id='current_serial_number'
                type='text'
                label='Current Serial Number'
                value={productForm.current_serial_number}
                onChange={handleProductChange}
                className='mb-1'

            />
            <Input
                id='reason'
                type='text'
                label='Reason'
                value={productForm.reason}
                onChange={handleProductChange}
                className='mb-1'
            />
            <div className='flex flex-col'>
                <CheckboxInput
                    label='Product Return'
                    checked={productForm.product_return}
                    onChange={(val) => handleProductCheckbox('product_return', val)}
                    text={productForm.product_return == true ? 'True' : 'False'}
                />
            </div>
            <Button
                label='Save'
                btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                onClick={handleAddProduct}
            />
        </div>

    )
}

export default ProductReturn
