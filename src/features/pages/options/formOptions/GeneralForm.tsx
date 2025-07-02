import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form'
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
                    id="type"
                    label="Type"
                    placeholder="Select Type"
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
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
            <ValuesForm type={selectedType} />

        </div>
    )
}

export default GeneralForm
