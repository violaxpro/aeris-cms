import React, { useState } from 'react'
import FormGroup from '@/components/form'
import DynamicInputList from '@/components/button-input'
import Button from "@/components/button"

const SupplierInformation = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        supplier_name: '',
        supplier_price: ''

    });

    const handleChange = (values: { name: string; price: string }[]) => {
        console.log('Updated List:', values);
    };

    return (
        <div>
            <FormGroup
                title="Supplier"
                description="Supplier information"
            >
                <DynamicInputList label="Supplier" onChange={(val) => console.log(val)} minItems={1} btnLabel='Add Supplier' />
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default SupplierInformation
