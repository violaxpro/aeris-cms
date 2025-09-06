import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form-group'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import ValuesForm from './ValuesForm'

type formProps = {
    data?: any
}

const GeneralForm = ({ data }: formProps) => {
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        is_required: false
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

        let selectedGroupLabel = '';

        for (const group of optionsType) {
            if (group.options.some(option => option.value === value)) {
                selectedGroupLabel = group.label;
                break;
            }
        }
        setSelectedType(selectedGroupLabel);
    };

    const optionsType = [
        {
            label: 'Text',
            options: [
                { label: 'Field', value: 'field' },
                { label: 'Textarea', value: 'textarea' },
            ],
        },
        {
            label: 'Select',
            options: [
                { label: 'Dropdown', value: 'dropdown' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Custom Checkbox', value: 'custom_checkbox' },
                { label: 'Radio Button', value: 'radio_button' },
                { label: 'Custom Radio Button', value: 'custom_radio_button' },
                { label: 'Multiple Select', value: 'multiple_select' },
            ],
        },
        {
            label: 'Date',
            options: [
                { label: 'Date', value: 'date' },
                { label: 'Date & Time', value: 'date_time' },
                { label: 'Time', value: 'time' },
            ],
        },
    ];

    return (
        <div className='flex flex-col gap-10'>
            <FormGroup
                title="General Information"
                description='General information about the attribute'
                childClassName='grid md:grid-cols-3 gap-4'
            >
                <Input
                    id='name'
                    label='Name'
                    type='text'
                    value={formData.name || undefined}
                    onChange={handleChange}
                    placeholder='Color'
                />

                <SelectInput
                    id="type"
                    label="Type"
                    placeholder="Field"
                    value={formData.type || undefined}
                    onChange={(val) => handleChangeSelect("type", val)}
                    options={optionsType}
                />
                <Checkbox
                    label='Required'
                    text='This option is required'
                    onChange={(val) => setFormData({ ...formData, is_required: val })}
                    checked={formData.is_required}
                />

            </FormGroup>
            <ValuesForm type={selectedType} />

        </div>
    )
}

export default GeneralForm
