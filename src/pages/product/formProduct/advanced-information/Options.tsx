import React, { useState } from 'react'
import FormGroup from '@/components/form'
import DynamicInputList from '@/components/button-input'
import Button from "@/components/button"

type ListOption = {
    name: string;
    type: string;
    optRequired: boolean;
    globalOptions: []
};
const OptionsInformation = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        globalOptions: [],
        optionName: '',
        optionType: '',
        optionRequired: false,
    });

    const handleChange = (values: { name: string; price: string }[]) => {
        console.log('Updated List:', values);
    };

    const [items, setItems] = useState<ListOption[]>([]);

    return (
        <div>
            <FormGroup
                title="Options"
                description="Options information about the product"
            >
                <DynamicInputList
                    label="Options Type"
                    fieldType="select"
                    btnLabel="Add Options"
                    selectOptions={[
                        { label: 'Ukuran', value: 'size' },
                        { label: 'Warna', value: 'color' },
                    ]}
                    onChange={(val) => console.log(val)}
                />

            </FormGroup>
            <div className='flex justify-end gap-3 mt-2'>
                <Button
                    label='Save'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                />
            </div>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default OptionsInformation
