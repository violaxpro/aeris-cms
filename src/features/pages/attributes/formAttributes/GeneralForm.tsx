import React, { useState } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form'
import SelectInput from '@/components/select'
import AttributeSetSection from './AttributeSetSection'
import Button from '@/components/button'
import Modal from '@/components/modal'

type formProps = {
    data?: any
}
const GeneralForm = ({ data }: formProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    console.log(data)
    const [formData, setFormData] = useState({
        name: '',
        attributeSet: '',
        categories: [],
        filterable: false
    })

    const [attributeSet, setAttributeSet] = useState({
        label: '',
        value: ''
    })

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        console.log('hi')
        setIsModalOpen(false)
    }

    console.log(isModalOpen)

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeAttributeSet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAttributeSet(prev => ({
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
                    popupRender={(options: any) => (
                        <>
                            {options}
                            <div className='p-4'>
                                <Button
                                    label='Add New'
                                    onClick={showModal}
                                />
                            </div>

                        </>
                    )}

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
            {/* <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />
            <FormGroup
                title="Attribute Set"
            >
                <AttributeSetSection />
            </FormGroup> */}

            <Modal
                title='Add Attribute Sets'
                open={isModalOpen}
                isBtnSave={true}
                handleCancel={handleCancel}
            >
                <div className='flex flex-col gap-4'>
                    <Input
                        id='label'
                        label='Label'
                        type='text'
                        value={attributeSet.label}
                        onChange={handleChangeAttributeSet}
                    />
                    <Input
                        id='value'
                        label='Value'
                        type='text'
                        value={attributeSet.value}
                        onChange={handleChangeAttributeSet}
                    />
                </div>

            </Modal>
        </div>
    )
}

export default GeneralForm
