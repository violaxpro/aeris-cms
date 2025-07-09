import React, { useState } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'

export interface ProductForm {
    sku: string
    name: string
    price: number
    buying_price: number
    qty: number
    total: number
}

interface ProductInputProps {
    productForm: ProductForm
    setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>
    onAddProduct: () => void
}

const ProductInput = ({
    productForm,
    setProductForm,
    onAddProduct
}: ProductInputProps) => {
    const handleProductChange = (e: any) => {
        const { id, value } = e.target;

        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        if (id === 'qty' || id === 'buying_price') {
            const qty = Number(id === 'qty' ? value : updatedProductForm.qty);
            const buyingPrice = Number(id === 'buying_price' ? value : updatedProductForm.buying_price);
            const total = qty * buyingPrice;
            updatedProductForm.total = Number(total.toFixed(2))
        }

        setProductForm(updatedProductForm);
    };

    const handleAddProduct = () => {
        onAddProduct()
    };

    return (
        <div>
            <div className='grid md:grid-cols-7 gap-4 mb-2'>
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
                    label='Product Name'
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
                    id='buying_price'
                    type='text'
                    label='Buying Price'
                    value={productForm.buying_price}
                    onChange={handleProductChange}
                    className='mb-1'
                />
                <Input
                    id='qty'
                    type='text'
                    label='QTY'
                    value={productForm.qty}
                    onChange={handleProductChange}
                    className='mb-1'

                />
                <Input
                    id='total'
                    type='text'
                    label='Total'
                    value={productForm.total}
                    onChange={handleProductChange}
                    className='mb-1'
                />
            </div>

            <Button
                label='Save'
                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                onClick={handleAddProduct}
            />
        </div>

    )
}

export default ProductInput
