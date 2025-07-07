import React, { useState } from 'react'
import FormGroup from '@/components/form'
import Select from "@/components/select"
import CheckboxInput from '@/components/checkbox'


const ProductStockAvailability = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        stock: '',
        isBestSeller: false,
        isBackOrder: false

    });

    const handleChangeSelect = (id: string, value: string | string[]) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    console.log(formData)

    const options = [
        { value: '1', label: "End of Life" },
        { value: '2', label: 'Call Us' },
        { value: '3', label: 'In Stock' },
        { value: '4', label: 'Out of Stock' },
    ]


    return (
        <div>
            <FormGroup
                title="Stock Availability"
                description="Add your stock info here"
            >
                <Select
                    id="stock"
                    label="Stock Availability"
                    placeholder="Select Stock Availability"
                    value={formData.stock}
                    onChange={(val) => handleChangeSelect("stock", val)}
                    options={options}
                />
                <div className='flex col-span-full w-full gap-2'>
                    <CheckboxInput
                        text="Best Seller"
                        checked={formData.isBestSeller}
                        onChange={(val) => setFormData({ ...formData, isBestSeller: val })}
                    />
                    <CheckboxInput
                        text="Back Order"
                        checked={formData.isBackOrder}
                        onChange={(val) => setFormData({ ...formData, isBackOrder: val })}
                    />
                </div>
            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
        </div>
    )
}

export default ProductStockAvailability
