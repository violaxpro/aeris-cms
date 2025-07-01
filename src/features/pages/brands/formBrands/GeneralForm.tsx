import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form'

type formProps = {
    data?: any
}
const GeneralForm = ({ data }: formProps) => {
    console.log(data)
    const [formData, setFormData] = useState({
        name: '',
        discountPercent: '',
        isStatus: false
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    return (
        <div className='flex flex-col gap-2'>
            <FormGroup
                title="General Information"
            >
                <Input
                    id='name'
                    label='Name'
                    type='text'
                    value={data ? data.text : formData.name}
                    onChange={handleChange}
                />
                <Input
                    id='discount'
                    label='Discount Percent'
                    type='number'
                    value={data ? data.text : formData.discountPercent}
                    onChange={handleChange}
                />
                <Checkbox
                    label='Status'
                    text='Enable the brand'
                    onChange={(val) => setFormData({ ...formData, isStatus: val })}
                    checked={formData.isStatus}
                />
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default GeneralForm
