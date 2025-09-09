'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import Textarea from '@/components/textarea'
import Button from '@/components/button'
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';
import { addService, updateService } from '@/services/services-service';

type FormServiceType = {
    openModal: boolean
    handleCancel: () => void
    modalType: string
    dataByid?: any
    slug?: string
    onSuccess?: any
}

const FormService = ({
    openModal,
    handleCancel,
    modalType,
    dataByid,
    slug,
    onSuccess
}: FormServiceType) => {
    const [optionsTax] = useAtom(taxSetAtom)
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        short_desc: '',
        buy_price: 0,
        sale_price: 0,
        tax_rate: '',
        status: false
    })
    const [taxError, setTaxError] = useState({
        name: '',
        sku: '',
        short_desc: '',
        buy_price: '',
        sale_price: '',
    });


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

    const handleSubmit = async () => {
        try {

            let errors: any = {}
            if (!formData.sku) {
                errors.sku = 'SKU is required'
            }
            if (!formData.name) {
                errors.name = 'Name is required'
            }
            if (!formData.short_desc) {
                errors.short_desc = 'Short Description is required'
            }
            if (!formData.buy_price) {
                errors.buy_price = 'Buy Price is required'
            }
            if (!formData.sale_price) {
                errors.sale_price = 'Sale price is required'
            }

            setTaxError(errors)

            if (Object.keys(errors).length > 0) {
                return;
            }
            const data = {
                id: slug || null,
                name: formData.name ?? '',
                sku: formData.sku ?? '',
                description: formData.short_desc ?? '',
                tax_class_id: formData.tax_rate || null,
                status: formData.status,
                buy_price: Number(formData.buy_price),
                price: Number(formData.sale_price)
            }

            let response
            if (dataByid?.id) {
                response = await updateService(dataByid.id, data)
            } else {
                response = await addService(data)

            }
            if (response.success == true) {
                onSuccess(response.message)
                setFormData({
                    name: '',
                    sku: '',
                    short_desc: '',
                    tax_rate: '',
                    status: false,
                    buy_price: 0,
                    sale_price: 0,
                })
            }

        } catch (error) {
            console.error(error)
        }
    }

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
                            errorMessage={taxError.sku}
                        />
                        <Input
                            id='name'
                            type='text'
                            label='Title'
                            value={formData.name}
                            onChange={handleChange('name')}
                            required
                            errorMessage={taxError.name}

                        />
                    </div>

                    <Textarea
                        id='short_desc'
                        label='Short Description'
                        value={formData.short_desc}
                        onChange={handleChange('short_desc')}
                        required
                        error={taxError.short_desc}
                    />
                    <div className={`grid grid-cols-3 gap-3`}>
                        <Input
                            id='buy_price'
                            type='number'
                            label='Buying Price'
                            value={formData.buy_price}
                            onChange={handleChange('buy_price')}
                            required
                            errorMessage={taxError.buy_price}
                        />
                        <Input
                            id='sale_price'
                            type='number'
                            label='Sale Price'
                            value={formData.sale_price}
                            onChange={handleChange('sale_price')}
                            required
                            errorMessage={taxError.sale_price}

                        />
                        <SelectInput
                            id="tax_rate"
                            label="Tax Rate"
                            placeholder="Select Tax Rate"
                            value={formData.tax_rate}
                            onChange={handleChange("tax_rate")}
                            options={optionsTax}
                        />

                    </div>

                </div>
                <div className='col-span-full flex justify-center'>
                    <Button
                        label='Save'
                        onClick={handleSubmit}
                    />
                </div>
            </div>


        </Modal >
    )
}

export default FormService
