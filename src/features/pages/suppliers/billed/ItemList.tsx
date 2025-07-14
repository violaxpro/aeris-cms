import React, { useState } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'

export interface ItemListProps {
    item: string
    description: string
    qty: number
    unit_price: number
    account: string
    tax_rate: number
    region: string
    amount: number
}

interface ItemInputProps {
    itemForm: ItemListProps
    setItemForm: React.Dispatch<React.SetStateAction<ItemListProps>>
    onAddItem: () => void
}

const ItemList = ({
    itemForm,
    setItemForm,
    onAddItem
}: ItemInputProps) => {
    const handleChange = (e: any) => {
        const { id, value } = e.target;

        let updatedForm = {
            ...itemForm,
            [id]: value
        };

        if (id === 'qty' || id === 'unit_price' || id === 'tax_rate') {
            const qty = Number(id === 'qty' ? value : updatedForm.qty);
            const unitPrice = Number(id === 'unit_price' ? value : updatedForm.unit_price);
            const tax = Number(id === 'tax_rate' ? value : updatedForm.tax_rate);
            const subtotal = qty * unitPrice;
            const total = subtotal * (1 + (tax / 100));
            updatedForm.amount = Number(total.toFixed(2))
        }

        setItemForm(updatedForm);
    };

    const handleAddItem = () => {
        onAddItem()
    };

    return (
        <div>
            <div className='grid md:grid-cols-8 gap-4 mb-2'>
                <Input
                    id='item'
                    type='text'
                    label='Item'
                    value={itemForm.item}
                    onChange={handleChange}
                    className='mb-1'
                />
                <Input
                    id='description'
                    type='text'
                    label='Description'
                    value={itemForm.description}
                    onChange={handleChange}
                    className='mb-1'

                />
                <Input
                    id='qty'
                    type='text'
                    label='Qty'
                    value={itemForm.qty}
                    onChange={handleChange}
                    className='mb-1'
                />
                <Input
                    id='unit_price'
                    type='text'
                    label='Unit Price'
                    value={itemForm.unit_price}
                    onChange={handleChange}
                    className='mb-1'
                />
                <Input
                    id='account'
                    type='text'
                    label='Account'
                    value={itemForm.account}
                    onChange={handleChange}
                    className='mb-1'

                />
                <Input
                    id='tax_rate'
                    type='text'
                    label='Tax Rate'
                    value={itemForm.tax_rate}
                    onChange={handleChange}
                    className='mb-1'
                />
                <Input
                    id='region'
                    type='text'
                    label='Region'
                    value={itemForm.region}
                    onChange={handleChange}
                    className='mb-1'
                />
                <Input
                    id='amount'
                    type='text'
                    label='Amount'
                    value={itemForm.amount}
                    onChange={handleChange}
                    className='mb-1'
                />
            </div>

            <Button
                label='Save'
                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                onClick={handleAddItem}
            />
        </div>

    )
}

export default ItemList
