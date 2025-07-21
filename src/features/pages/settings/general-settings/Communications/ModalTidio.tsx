import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import TextArea from '@/components/textarea'

type ModalTidioProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        header_tidio: string
        body_tidio: string
    }
    handleSubmit?: () => void
}

const ModalTidio = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalTidioProps) => {
    const [reset, setReset] = useState(true)
    const handleReset = () => {
        setReset(false)
    }
    return (
        <Modal
            open={isModalOpen}
            title='Tidio'
            subtitle='Edit or delete your Tidio data'
            isBtnSave={true}
            labelButton={reset == true ? 'Edit' : 'Save'}
            isBtnReset={reset}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            handleDelete={handleReset}
        >
            <div className='grid gap-2 my-4'>
                <Input
                    id='header_tidio'
                    label='Header'
                    type='text'
                    placeholder='Header'
                    onChange={handleChange}
                    value={formData.header_tidio}
                />
                <div className='col-span-full w-full'>
                    <TextArea
                        id='body_tidio'
                        label='Body'
                        placeholder='Body'
                        onChange={handleChange}
                        value={formData.body_tidio}
                    />
                </div>

            </div>
        </Modal >
    )
}

export default ModalTidio
