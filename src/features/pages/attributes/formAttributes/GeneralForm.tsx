import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form'
import SelectInput from '@/components/select'
import AttributeSetSection from './AttributeSetSection'

type formProps = {
    data?: any
}
const GeneralForm = ({ data }: formProps) => {
    console.log(data)
    const [formData, setFormData] = useState({
        name: '',
        attributeSet: '',
        categories: [],
        filterable: false
    })

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

    const optionAttributeSet = [
        { label: 'Brands A', value: 'Brands A' },
        { label: 'Brands B', value: 'Brands B' }

    ]

    const optionsCategories = [
        { value: '1', label: 'Category A' },
        { value: '2', label: 'Category B' },
    ]
    return (
        <div className='flex flex-col gap-2'>
            <FormGroup
                title="General Information"
                description='General information about the attribute'
            >
                <Input
                    id='name'
                    label='Name'
                    type='text'
                    value={data ? data.text : formData.name}
                    onChange={handleChange}
                />
                <SelectInput
                    id='attributeSet'
                    label="Attribute Set"
                    placeholder="Attribute Set"
                    value={formData.attributeSet}
                    onChange={(e) => handleChangeSelect('brands', e)}
                    options={optionAttributeSet}
                />
                <SelectInput
                    id="categories"
                    modeType='multiple'
                    label="Categories"
                    placeholder="Select Categories"
                    value={formData.categories || undefined}
                    onChange={(val) => handleChangeSelect("categories", val)}
                    options={optionsCategories}
                />
                <Checkbox
                    label='Filterable'
                    text='Check this to enable this attribute'
                    onChange={(val) => setFormData({ ...formData, filterable: val })}
                    checked={formData.filterable}
                />

            </FormGroup>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
            <FormGroup
                title="Attribute Set"
            >
                <AttributeSetSection />
            </FormGroup>

        </div>
    )
}

export default GeneralForm
