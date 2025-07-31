import React, { useState } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'
import { TrashIcon, TrashIconRed } from '@public/icon';
import ButtonIcon from '@/components/button/ButtonIcon';

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
    onChange: (form: ProductForm) => void;
    onRemove?: () => void;
    index: number;
    length?: number
}

const ProductInput = ({
    productForm,
    onRemove,
    onChange,
    length
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

        onChange(updatedProductForm);
    };

    // const handleAddProduct = () => {
    //     onAddProduct()
    // };

    return (
        <div>
            <div className='grid md:grid-cols-7 gap-4 mb-2'>
                <Input
                    id='sku'
                    type='text'
                    label='SKU'
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
                {
                    onRemove && <div className='flex item-ends justify-center mt-4 '>
                        {
                            length && length <= 1 ?
                                <ButtonIcon
                                    icon={TrashIcon}
                                    width={20}
                                    height={20}
                                    className='btn-trash-item !h-10 !w-15'
                                /> :
                                <ButtonIcon
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
        </div>

    )
}

export default ProductInput
