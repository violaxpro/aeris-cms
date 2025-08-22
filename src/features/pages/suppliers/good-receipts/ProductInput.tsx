import React, { useState } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import CheckboxInput from '@/components/checkbox';
import Button from '@/components/button'
import DatePickerInput from '@/components/date-picker';
import { TrashIcon, TrashIconRed, CancelGreyIcon } from '@public/icon';
import ButtonIcon from '@/components/button/ButtonIcon';
import dayjs from 'dayjs'

export interface ProductForm {
    sku: string
    uom: string
    qty_received: number
    qty_rejected: number
    reason: string
    serial: string
    expiry: string
    qc_result?: string
    accepted_rejected_qty?: string | number
    reason_add_serial?: string
}

interface ProductInputProps {
    productForm: ProductForm
    onChange: (form: ProductForm) => void;
    onRemove?: () => void;
    index: number;
    length?: number
    status?: string
    isDisabled?: boolean
}

const ProductInput = ({
    productForm,
    onRemove,
    onChange,
    length,
    status,
    isDisabled
}: ProductInputProps) => {
    const handleProductChange = (e: any) => {
        const { id, value } = e.target;

        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        // if (id === 'qty' || id === 'buying_price') {
        //     const qty = Number(id === 'qty' ? value : updatedProductForm.qty);
        //     const buyingPrice = Number(id === 'buying_price' ? value : updatedProductForm.buying_price);
        //     const total = qty * buyingPrice;
        //     updatedProductForm.total = Number(total.toFixed(2))
        // }

        onChange(updatedProductForm);
    };

    // const handleAddProduct = () => {
    //     onAddProduct()
    // };

    return (
        <div className='col-span-full border p-6 rounded-xl border-[#E5E7EB] flex flex-col gap-3'>
            <div className='flex justify-end'>
                <ButtonIcon
                    icon={CancelGreyIcon}
                    shape='circle'
                    variant='filled'
                    color='default'
                    onClick={onRemove}
                    disabled={isDisabled}
                />
            </div>
            <div className='grid md:grid-cols-4 gap-4 mb-2'>
                <Input
                    id='sku'
                    type='text'
                    label='SKU'
                    value={productForm.sku}
                    onChange={handleProductChange}
                    required
                    disabled={isDisabled}
                />
                <Input
                    id='uom'
                    type='text'
                    label='UOM'
                    value={productForm.uom}
                    onChange={handleProductChange}
                    required
                    disabled={isDisabled}
                />
                <div className='grid md:grid-cols-2 gap-4'>
                    <Input
                        id='qty_received'
                        type='text'
                        label='Qty Received'
                        value={productForm.qty_received}
                        onChange={handleProductChange}
                        required
                        disabled={isDisabled}
                    />
                    <Input
                        id='qty_rejected'
                        type='text'
                        label='QTY Rejected'
                        value={productForm.qty_rejected}
                        onChange={handleProductChange}
                        required
                        disabled={isDisabled}
                    />
                </div>
                <Input
                    id='reason'
                    type='text'
                    label='Reason Code'
                    value={productForm.reason}
                    onChange={handleProductChange}
                    required
                    disabled={isDisabled}
                />
                <div className='col-span-full grid md:grid-cols-2 gap-4'>
                    <Input
                        id='serial'
                        label='Serial/Lot Numbers'
                        type='text'
                        placeholder='Input Serial/Lot Numbers'
                        onChange={handleProductChange}
                        value={productForm.serial}
                        disabled={isDisabled}
                    />
                    <DatePickerInput
                        id='expiry'
                        label='Expiry '
                        value={productForm.expiry ? dayjs(productForm.expiry) : null}
                        onChange={handleProductChange}
                        disabled={isDisabled}
                    />
                </div>
                {
                    status == 'Pending' &&
                    <div className='col-span-full grid md:grid-cols-3 gap-4'>
                        <Input
                            id='qc_result'
                            label='QC Result'
                            type='text'
                            placeholder='Input QC Result'
                            onChange={handleProductChange}
                            value={productForm.qc_result ?? ""}
                            disabled={isDisabled}
                        />
                        <Input
                            id='accepted_rejected_qty'
                            label='Accepted/Rejected Qty'
                            type='text'
                            placeholder='Input Accepted/Rejected Qty'
                            onChange={handleProductChange}
                            value={productForm.accepted_rejected_qty ?? ""}
                            disabled={isDisabled}
                        />
                        <Input
                            id='reason_add_serial'
                            label='Reasons'
                            type='text'
                            placeholder='Input Reasons'
                            onChange={handleProductChange}
                            value={productForm.reason_add_serial ?? ""}
                            disabled={isDisabled}
                        />
                    </div>
                }
                {/* {
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
                } */}
            </div>
        </div>

    )
}

export default ProductInput
