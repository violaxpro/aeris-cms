import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import Checkbox from "@/components/checkbox"
import FormGroup from '@/components/form'
import SelectInput from '@/components/select'
import AttributeSetSection from './AttributeSetSection'
import Button from '@/components/button'
import Modal from '@/components/modal'
import { useAtom } from 'jotai'
import { categoriesAtom, attributeSetAtom } from '@/store/DropdownItemStore'
import { addAttributeSet, getAttributeSet } from '@/services/attribute-set-service'
import { ChildFormProps } from '@/plugins/interfaces/form-interface'

type formProps = {
    data?: any
}
const GeneralForm = ({ dataChild, onChange }: ChildFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [optionAttributeSet, setOptionAttributeSet] = useAtom(attributeSetAtom)
    const [optionCategories] = useAtom(categoriesAtom)
    const [formData, setFormData] = useState({
        name: dataChild ? dataChild.name : '',
        attributeSet: dataChild ? dataChild.attribute_set : '',
        categories: dataChild && dataChild.categories
            ? typeof dataChild.categories === 'string'
                ? JSON.parse(dataChild.categories)
                : dataChild.categories
            : [],

        filterable: dataChild ? dataChild.filterable :false
    })

    const [attributeSet, setAttributeSet] = useState({
        name: ''
    })

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        console.log('hi')
        setIsModalOpen(false)
    }

    console.log(formData, dataChild)

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        onChange({ [id]: value })
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
        onChange({ [id]: value })
    };

    const handleCheckbox = (val: boolean) => {
        const updated = { ...formData, filterable: val }
        setFormData(updated)
        onChange(updated)
    }

    const handleSubmitAttributeSet = async () => {
        try {
            await addAttributeSet({ name: attributeSet.name });
            const updatedAttributeSets = await getAttributeSet();
            const option = updatedAttributeSets.data.map((opt: any) => ({
                label: opt.name,
                value: opt.id
            }))
            setOptionAttributeSet(option);
            setAttributeSet({ name: '' })
            setIsModalOpen(false)

        } catch (error) {
            console.error(error)
        }
    }

    console.log(optionAttributeSet)

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
                    value={formData.name}
                    onChange={handleChange}
                />
                <SelectInput
                    id='attributeSet'
                    label="Attribute Set"
                    placeholder="Attribute Set"
                    value={formData.attributeSet}
                    onChange={(e) => handleChangeSelect('attributeSet', e)}
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
                    options={optionCategories}
                />
                <Checkbox
                    label='Filterable'
                    text='Check this to enable this attribute'
                    onChange={handleCheckbox}
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
                handleSubmit={handleSubmitAttributeSet}
            >
                <div className='flex flex-col gap-4'>
                    <Input
                        id='name'
                        label='Name'
                        type='text'
                        value={attributeSet.name}
                        onChange={handleChangeAttributeSet}
                    />
                </div>

            </Modal>
        </div>
    )
}

export default GeneralForm
