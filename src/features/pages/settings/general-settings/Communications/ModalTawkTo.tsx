import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import TextArea from '@/components/textarea'

type ModalTawkToProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        header_tawk_to: string
        body_tawk_to: string
    }
    handleSubmit?: () => void
}

const ModalTawkTo = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalTawkToProps) => {
    const [reset, setReset] = useState(true)
    const handleReset = () => {
        setReset(false)
    }
    return (
        <Modal
            open={isModalOpen}
            title='Tawk To'
            subtitle='Edit or delete your Tawk To data'
            isBtnSave={true}
            labelButton={reset == true ? 'Edit' : 'Save'}
            isBtnReset={reset}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            handleDelete={handleReset}
        >
            <div className='grid gap-2 my-4'>
                <Input
                    id='header_tawk_to'
                    label='Header'
                    type='text'
                    placeholder='Header'
                    onChange={handleChange}
                    value={formData.header_tawk_to}
                />
                <div className='col-span-full w-full'>
                    <TextArea
                        id='body_tawk_to'
                        label='Body'
                        placeholder='Body'
                        onChange={handleChange}
                        value={formData.body_tawk_to}
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalTawkTo
