import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';
import { getProduct } from '@/services/products-service';

export interface ItemListProps {
    item: string
    description: string
    qty: number
    unit_price: number
    account: string
    tax_rate: any
    region: string
    amount: number
}

interface ItemInputProps {
    itemForm: ItemListProps
    // setItemForm: React.Dispatch<React.SetStateAction<ItemListProps>>
    // onAddItem: () => void
    onChange: (form: ItemListProps) => void;
    onRemove?: () => void;
    index: number;
    length?: number
}

const ItemList = ({
    itemForm,
    onChange,
    onRemove,
    index,
    length,
}: ItemInputProps) => {
    const [optionsTax] = useAtom(taxSetAtom)
    const [items, setItems] = useState([])
    const [taxError, setTaxError] = useState('')
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

        onChange(updatedForm);
    };

    const handleChangeSelect = (id: string, value: any) => {
        let updateItem = {
            ...itemForm,
            [id]: value
        };

        // Cari data tax di options
        const selectedTax: any = optionsTax.find((t: any) => t.value === value);

        const taxRate = selectedTax ? Number(selectedTax.value) : 0;

        // Re-hit total dengan tax kalau ada qty & buying_price
        const qty = Number(updateItem.qty) || 0;
        const buyingPrice = Number(updateItem.unit_price) || 0;
        const baseTotal = qty * buyingPrice;

        const taxAmount = (baseTotal * taxRate) / 100;

        updateItem.amount = Number((baseTotal + taxAmount).toFixed(2));

        onChange(updateItem);
    };

    const handleSelectProduct = (productName: string) => {
        const selectedProduct: any = items.find((p: any) => p.name === productName);
        if (selectedProduct) {
            const updatedForm = {
                ...itemForm,
                item: selectedProduct.name,
            };
            onChange(updatedForm);
        }
    };

    // const handleAddItem = () => {
    //     if (!itemForm.tax_rate) {
    //         setTaxError('Tax Rate is required');
    //         return;
    //     } else {
    //         setTaxError('');
    //     }
    //     onAddItem()
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProduct()
                if (res.data) {
                    setItems(res.data)
                }

            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

    }, [])

    return (
        <div>
            <div className='grid md:grid-cols-8 gap-4 mb-2'>
                <SelectInput
                    id='item'
                    label='Item'
                    value={itemForm.item}
                    onChange={(val: any) => handleSelectProduct(val)}
                    options={items.map((p: any) => ({
                        label: p.name,
                        value: p.name,
                    }))}
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
                <SelectInput
                    id='tax_rate'
                    label='Tax Rate'
                    placeholder="Select Tax Rate"
                    value={itemForm.tax_rate}
                    onChange={(val) => handleChangeSelect("tax_rate", val)}
                    options={optionsTax}
                    error={taxError}
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
        </div>

    )
}

export default ItemList
