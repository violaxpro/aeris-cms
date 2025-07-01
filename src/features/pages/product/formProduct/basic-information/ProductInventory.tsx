import React, { useState } from 'react'
import FormGroup from '@/components/form'
import Input from "@/components/input"
import Select from "@/components/select"


const ProductInventory = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        sku: '',
        sku2: '',
        mpn: '',
        inventory_management: '',
        qty: '',

    });

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    const handleChangeSelect = (id: string, value: string | string[]) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    console.log(formData)

    const optionsInventoryManagement = [
        { value: '1', label: "Don't Track Inventory" },
        { value: '2', label: 'Track Inventory' },
    ]


    return (
        <div>
            <FormGroup
                title="Inventory"
                description="Add your product inventory info here for the product."
            >
                <Input
                    id='sku'
                    label='SKU'
                    type='text'
                    placeholder='Input SKU'
                    onChange={handleChange}
                    value={formData.sku}
                />
                <Input
                    id='sku2'
                    label='SKU2'
                    type='text'
                    placeholder='Input SKU2'
                    onChange={handleChange}
                    value={formData.sku2}
                />
                <Input
                    id='mpn'
                    label='MPN'
                    type='text'
                    placeholder='Input MPN'
                    onChange={handleChange}
                    value={formData.mpn}
                />
                <Select
                    id="inventoryManagement"
                    label="Inventory Management"
                    placeholder="Select Inventory Management"
                    value={formData.inventory_management}
                    onChange={(val) => handleChangeSelect("inventory_management", val)}
                    options={optionsInventoryManagement}
                />
                {
                    formData.inventory_management == '2' &&
                    <Input
                        id='qty'
                        label='Qty'
                        type='number'
                        placeholder='qty'
                        onChange={handleChange}
                        value={formData.qty}
                    />
                }
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
        </div>
    )
}

export default ProductInventory
