'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import SelectInput from '@/components/select'
import Textarea from "@/components/textarea"

type ModalFaqType = {
    isModalOpen: boolean
    handleCancel: () => void
}
const ModalFaq = ({
    isModalOpen,
    handleCancel,
}: ModalFaqType) => {
    const [formData, setFormData] = useState({
        category: '',
        question: '',
        answer: '',
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

    console.log(formData)
    return (
        <Modal
            open={isModalOpen}
            title='Add FAQ'
            subtitle='Please fill in the fields for the new FAQ.'
            handleCancel={handleCancel}
            labelButton='Submit'
            isBtnSave
            handleSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-3'>
                <SelectInput
                    id="category"
                    label="Category"
                    placeholder="Select Category"
                    value={formData.category}
                    onChange={(val) => handleChange("category", val)}
                    options={[
                        { label: 'General Information', value: 1 }
                    ]}
                />
                <Input
                    id='question'
                    type='text'
                    label='Question'
                    value={formData.question}
                    onChange={(e) => handleChange('question', e.target.value)}
                    placeholder='Input Question'
                />
                <Textarea
                    id='answer'
                    label='Answer'
                    value={formData.answer}
                    onChange={(e) => handleChange('answer', e.target.value)}
                    placeholder='Input answer'
                    textareaClassname='!h-30'
                />
            </div>

        </Modal>
    )
}

export default ModalFaq
