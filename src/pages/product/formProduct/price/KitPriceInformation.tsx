import React, { useState } from 'react'
import FormGroup from '@/components/form'
import DynamicInputList from '@/components/button-input'

const KitPriceInformation = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        kitprice_name: '',
        kitprice_price: ''

    });

    const handleChange = (values: { name: string; price: string }[]) => {
        console.log('Updated List:', values);
    };

    return (
        <div>
            <FormGroup
                title="Kit Price"
                description="Kit Price information"
            >
                <DynamicInputList label="Kit Price" onChange={(val) => console.log(val)} minItems={1} btnLabel='Add Kit Price' />
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default KitPriceInformation
