'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import Textarea from '@/components/textarea'

type ModalNeedSupportType = {
    isModalOpen: boolean
    handleCancel: () => void
}
const ModalNeedSupport = ({
    isModalOpen,
    handleCancel,
}: ModalNeedSupportType) => {
    const [formData, setFormData] = useState({
        subject: '',
        description: ''
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
            title='Need Support?'
            subtitle='Describe your issue or request for help.'
            handleCancel={handleCancel}
            labelButton='Submit'
            isBtnSave
            handleSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-3'>
                <Input
                    id='subject'
                    type='text'
                    label='Subject / Case'
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder='Input Subject / Case'
                />
                <Textarea
                    id='description'
                    label='Please explain it briefly'
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder='Explain description'
                    textareaClassname='!h-20'
                />
            </div>

        </Modal>
    )
}

export default ModalNeedSupport
