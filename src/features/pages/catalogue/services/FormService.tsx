'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import Textarea from '@/components/textarea'
import Button from '@/components/button'
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';

type FormServiceType = {
    openModal: boolean
    handleCancel: () => void
    modalType: string
}

const FormService = ({
    openModal,
    handleCancel,
    modalType
}: FormServiceType) => {
    const [optionsTax] = useAtom(taxSetAtom)
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        short_desc: '',
        buy_price: 0,
        sale_price: 0,
        tax_rate: ''
    })
    const [taxError, setTaxError] = useState('');

    const handleChange = (field: string) => (
        e: any
    ) => {
        const value = typeof e === 'string' || Array.isArray(e)
            ? e
            : e.target.value;

        if (field === 'name') {
            formData.short_desc = value
        }

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    console.log(formData)

    return (
        <Modal
            open={openModal}
            title={`${modalType == 'create' ? 'Create' : 'Edit'} Service`}
            handleCancel={handleCancel}
        >
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-3'>
                        <Input
                            id='sku'
                            type='text'
                            label='SKU'
                            value={formData.sku}
                            onChange={handleChange('sku')}
                            required
                        />
                        <Input
                            id='name'
                            type='text'
                            label='Title'
                            value={formData.name}
                            onChange={handleChange('name')}
                            required
                        />
                    </div>

                    <Textarea
                        id='short_desc'
                        label='Short Description'
                        value={formData.short_desc}
                        onChange={handleChange('short_desc')}
                        required
                    />
                    <div className={`grid grid-cols-3 gap-3`}>
                        <Input
                            id='buy_price'
                            type='number'
                            label='Buying Price'
                            value={formData.buy_price}
                            onChange={handleChange('buy_price')}
                            required
                        />
                        <Input
                            id='sale_price'
                            type='number'
                            label='Sale Price'
                            value={formData.sale_price}
                            onChange={handleChange('sale_price')}
                            required
                        />
                        <SelectInput
                            id="tax_rate"
                            label="Tax Rate"
                            placeholder="Select Tax Rate"
                            value={formData.tax_rate}
                            onChange={handleChange("tax_rate")}
                            options={optionsTax}
                            error={taxError}
                        />

                    </div>

                </div>
                <div className='col-span-full flex justify-center'>
                    <Button
                        label='Save'
                        onClick={() => console.log('hi')}
                        style={{ padding: '1.2rem 2rem' }}
                    />
                </div>
            </div>


        </Modal >
    )
}

export default FormService
