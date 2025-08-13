'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Textarea from '@/components/textarea'
import CameraInput from '@/components/input-camera'
import LocationInput from '@/components/maps/InputMaps'
import Button from '@/components/button'

type ModalFinishBreakType = {
    isModalOpen: boolean
    formData: {
        finish_break_description: string
    }
    handleChange: (field: string) => (value: any) => void
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalFinishBreak = ({
    isModalOpen,
    formData,
    handleChange,
    handleCancel,
    handleSubmit
}: ModalFinishBreakType) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleCapture = (imageData: string) => {
        console.log("Foto hasil capture:", imageData);
        // Bisa simpan ke API atau state lain
    };
    return (
        <Modal
            open={isModalOpen}
            title='Finish Break'
            subtitle='Please check in and start your working.'
            handleCancel={handleCancel}
        >
            <div className='flex flex-col gap-3'>
                <Textarea
                    id='finish_break_description'
                    label='Description'
                    value={formData.finish_break_description}
                    onChange={handleChange('finish_break_description')}
                    placeholder='If you late, please explain your reason here'
                    textareaClassname='!h-20'
                />
                <div className='flex justify-center'>
                    <Button
                        label='Continue Work'
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ModalFinishBreak
