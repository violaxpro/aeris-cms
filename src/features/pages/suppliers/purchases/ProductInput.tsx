import React, { useState } from 'react'
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';
import Input from "@/components/input"
import SelectInput from '@/components/select';
import DatePickerInput from '@/components/date-picker';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'
import { TrashIcon, TrashIconRed, CancelGreyIcon } from '@public/icon';
import ButtonIcon from '@/components/button/ButtonIcon';
import dayjs from 'dayjs'

export interface ProductForm {
    sku: string
    name: string
    uom: string
    price: number
    buying_price: number
    qty: number
    total: number
    tax_rate: string
    warehouse: string
    promised_date: string
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
    const [optionsTax] = useAtom(taxSetAtom)

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

    const handleChangeSelect = (id: string, value: any) => {
        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        onChange(updatedProductForm);
    };


    // const handleAddProduct = () => {
    //     onAddProduct()
    // };

    return (
        <div className='col-span-full border p-6 rounded-xl border-[#E5E7EB] flex flex-col gap-3'>
            <div className='grid md:grid-cols-[1fr_2fr_1fr_70px_1fr_1fr_1fr_1fr_1fr_50px] gap-4 mb-2'>
                <Input
                    id='sku'
                    type='text'
                    label='SKU'
                    value={productForm.sku}
                    onChange={handleProductChange}
                />
                <Input
                    id='name'
                    type='text'
                    label='Description'
                    value={productForm.name}
                    onChange={handleProductChange}
                />
                <Input
                    id='uom'
                    type='text'
                    label='UOM'
                    value={productForm.uom}
                    onChange={handleProductChange}
                    required
                // disabled={isDisabled}
                />
                <Input
                    id='qty'
                    type='text'
                    label='QTY'
                    value={productForm.qty}
                    onChange={handleProductChange}

                />
                <Input
                    id='price'
                    type='text'
                    label='Unit Cost'
                    value={productForm.price}
                    onChange={handleProductChange}
                />
                <SelectInput
                    id="tax_rate"
                    label="Tax Rate"
                    placeholder="Select Tax Rate"
                    value={productForm.tax_rate}
                    onChange={(val) => handleChangeSelect('tax_rate', val)}
                    options={optionsTax}
                />
                <SelectInput
                    id="warehouse"
                    label="Warehouse / Bin"
                    placeholder="Select Warehouse/Bin"
                    value={productForm.warehouse}
                    onChange={(val) => handleChangeSelect('warehouse', val)}
                    options={[
                        { label: 'Seadan Pranatta', value: 1 }
                    ]}
                />
                <DatePickerInput
                    id='expiry'
                    label='Expiry '
                    value={productForm.promised_date ? dayjs(productForm.promised_date) : null}
                    onChange={handleProductChange}
                // disabled={isDisabled}
                />
                <Input
                    id='total'
                    type='text'
                    label='Amount'
                    value={productForm.total}
                    onChange={handleProductChange}
                />
                {
                    onRemove && <div className='flex item-ends justify-center pt-5 '>
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
