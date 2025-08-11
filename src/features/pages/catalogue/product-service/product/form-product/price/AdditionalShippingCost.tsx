import React, { useState } from 'react'
import FormGroup from '@/components/form-group'
import Input from "@/components/input"
import { ChildFormProps } from '@/plugins/types/form-type'

const AdditionalShippingCost = ({ dataById, onChange }: ChildFormProps) => {
    const [shipCost, setShipCost] = useState('')
    const handleChange = (e: any) => {
        const value = e.target.value
        setShipCost(value)
        onChange?.({ add_shipping_cost: value })
    }
    // const [formData, setFormData] = useState({
    //     add_ship_cost: ''

    // });

    // const handleChange = (e: any) => {
    //     const { id, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [id]: value,
    //     }));
    // };

    return (
        <div>
            <FormGroup
                title="Additional Shipping Cost"
                description="Additional Shipping Cost"
            >
                <Input
                    id='buyingPrice'
                    label='Additional Shipping Cost'
                    type='text'
                    placeholder='Input Additional Shipping Cost'
                    onChange={handleChange}
                    value={shipCost}
                />
            </FormGroup>

        </div>
    )
}

export default AdditionalShippingCost
