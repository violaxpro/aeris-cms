'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Textarea from '@/components/textarea'
import CameraInput from '@/components/input-camera'
import LocationInput from '@/components/maps/InputMaps'
import Button from '@/components/button'

type ModalCheckInType = {
    isModalOpen: boolean
    formData: {
        check_in_photo: string[]
        check_in_description: string
        check_in_location: string
        check_in_device: string
    }
    handleChange: (field: string) => (value: any) => void
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalCheckIn = ({
    isModalOpen,
    formData,
    handleChange,
    handleCancel,
    handleSubmit
}: ModalCheckInType) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleCapture = (imageData: string) => {
        console.log("Foto hasil capture:", imageData);
        // Bisa simpan ke API atau state lain
    };
    return (
        <Modal
            open={isModalOpen}
            title='Check In'
            subtitle='Please check in and start your working now.'
            handleCancel={handleCancel}
        >
            <div className='flex flex-col gap-3'>
                <CameraInput
                    onChange={(file) => {
                        setSelectedFile(file);
                    }}
                    preview={selectedFile ? URL.createObjectURL(selectedFile) : null}
                />

                {/* {selectedFile && (
                <p>File name: {selectedFile.name}</p>
            )} */}
                <LocationInput
                />

                <Textarea
                    id='check_in_description'
                    label='Description'
                    value={formData.check_in_description}
                    onChange={handleChange('check_in_description')}
                    placeholder='If you late, please explain your reason here'
                    textareaClassname='!h-20'
                />
                <div className='flex justify-center'>
                    <Button
                        label='Check In Now'
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ModalCheckIn
