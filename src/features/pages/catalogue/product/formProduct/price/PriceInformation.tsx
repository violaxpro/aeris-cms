import React, { useState } from 'react'
import FormGroup from '@/components/form'
import Input from "@/components/input"
import Button from "@/components/button"
import { ChildFormProps } from '@/plugins/types/form-type'

const PriceInformation = ({
    dataById,
    onChange,
    formDataCreate
}: ChildFormProps) => {
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        const updated = { ...formDataCreate.tab_price, [id]: value }
        onChange(updated)
        // setFormData(prev => {
        //     const updated = { ...prev, [id]: value }
        //     onChange(updated)
        //     return updated
        // });
    };

    return (
        <div>
            <FormGroup
                title="Price"
                description="Price information"
            >
                <Input
                    id='buying_price'
                    label='Buying Price'
                    type='text'
                    placeholder='Input Buying Price'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.buying_price}
                />
                <Input
                    id='rrp'
                    label='RRP'
                    type='text'
                    placeholder='Input RRP'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.rrp}
                />
                <Input
                    id='trade'
                    label='Trade'
                    type='text'
                    placeholder='Input Trade'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.trade}
                />
                <Input
                    id='silver'
                    label='Silver'
                    type='text'
                    placeholder='Input Silver'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.silver}
                />
                <Input
                    id='gold'
                    label='Gold'
                    type='text'
                    placeholder='Input Gold'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.gold}
                />
                <Input
                    id='platinum'
                    label='Platinum'
                    type='text'
                    placeholder='Input Platinum'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.platinum}
                />
                <Input
                    id='diamond'
                    label='Diamond'
                    type='text'
                    placeholder='Input Diamond'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.diamond}
                />
                {/* <Input
                    id='kitPrice'
                    label='Kit Price'
                    type='text'
                    placeholder='Input Kit Price'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.kit_price}
                />
                <Input
                    id='notes'
                    label='Price Notes'
                    type='text'
                    placeholder='Input Price Notes'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.price_notes}
                /> */}


            </FormGroup>
            <div className='flex justify-end gap-3'>
                <Button
                    label='View Price History'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                />
                <Button
                    label='Save'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                />
            </div>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default PriceInformation
