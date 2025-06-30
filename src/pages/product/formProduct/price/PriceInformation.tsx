import React, { useState } from 'react'
import FormGroup from '@/components/form'
import Input from "@/components/input"
import Button from "@/components/button"

const PriceInformation = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        buying_price: '',
        rrp: '',
        trade: '',
        silver: '',
        gold: '',
        platinum: '',
        diamond: '',
        kit_price: '',
        price_notes: ''

    });

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    return (
        <div>
            <FormGroup
                title="Price"
                description="Price information"
            >
                <Input
                    id='buyingPrice'
                    label='Buying Price'
                    type='text'
                    placeholder='Input Buying Price'
                    onChange={handleChange}
                    value={formData.buying_price}
                />
                <Input
                    id='rrp'
                    label='RRP'
                    type='text'
                    placeholder='Input RRP'
                    onChange={handleChange}
                    value={formData.rrp}
                />
                <Input
                    id='trade'
                    label='Trade'
                    type='text'
                    placeholder='Input Trade'
                    onChange={handleChange}
                    value={formData.trade}
                />
                <Input
                    id='silver'
                    label='Silver'
                    type='text'
                    placeholder='Input Silver'
                    onChange={handleChange}
                    value={formData.silver}
                />
                <Input
                    id='gold'
                    label='Gold'
                    type='text'
                    placeholder='Input Gold'
                    onChange={handleChange}
                    value={formData.gold}
                />
                <Input
                    id='platinum'
                    label='Platinum'
                    type='text'
                    placeholder='Input Platinum'
                    onChange={handleChange}
                    value={formData.platinum}
                />
                <Input
                    id='diamond'
                    label='Diamond'
                    type='text'
                    placeholder='Input Diamond'
                    onChange={handleChange}
                    value={formData.diamond}
                />
                <Input
                    id='kitPrice'
                    label='Kit Price'
                    type='text'
                    placeholder='Input Kit Price'
                    onChange={handleChange}
                    value={formData.kit_price}
                />
                <Input
                    id='notes'
                    label='Price Notes'
                    type='text'
                    placeholder='Input Price Notes'
                    onChange={handleChange}
                    value={formData.price_notes}
                />


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
