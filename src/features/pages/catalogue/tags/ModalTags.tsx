'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'

type ModalTagsType = {
    isModalOpen: boolean
    handleCancel: () => void
}
const ModalTags = ({
    isModalOpen,
    handleCancel,
}: ModalTagsType) => {
    const [formData, setFormData] = useState({
        name: '',
    })

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }))
    }
    const handleSubmit = () => {
        console.log("ini submit");
        // Bisa simpan ke API atau state lain
    };
    return (
        <Modal
            open={isModalOpen}
            title='Add Tag'
            subtitle='Please fill in the fields for the new Tag.'
            handleCancel={handleCancel}
            labelButton='Submit'
            isBtnSave
            handleSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-3'>
                <Input
                    id='name'
                    type='text'
                    label='Tag Name'
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder='Input Tag Name'
                />
            </div>

        </Modal>
    )
}

export default ModalTags
