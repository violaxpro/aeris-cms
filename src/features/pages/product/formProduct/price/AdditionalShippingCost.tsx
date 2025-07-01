import React, { useState } from 'react'
import FormGroup from '@/components/form'
import Input from "@/components/input"

const AdditionalShippingCost = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        add_ship_cost: ''

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
                title="Additional Shipping Cost"
                description="Additional Shipping Cost"
            >
                <Input
                    id='buyingPrice'
                    label='Additional Shipping Cost'
                    type='text'
                    placeholder='Input Additional Shipping Cost'
                    onChange={handleChange}
                    value={formData.add_ship_cost}
                />
            </FormGroup>

        </div>
    )
}

export default AdditionalShippingCost
