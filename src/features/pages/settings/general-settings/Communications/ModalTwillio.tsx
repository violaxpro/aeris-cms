import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"

type ModalTwillioProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    formData: {
        twillio_id_key: string
        auth_token: string
        twillio_phone_number: string
    }
    handleSubmit?: () => void
}

const ModalTwillio = ({
    handleCancel,
    handleChange,
    handleSubmit,
    isModalOpen,
    formData,
}: ModalTwillioProps) => {
    const [reset, setReset] = useState(true)
    const handleReset = () => {
        setReset(false)
    }
    return (
        <Modal
            open={isModalOpen}
            title='Twillio'
            subtitle='Edit twillio data'
            isBtnSave={true}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            handleDelete={handleReset}
        >
            <div className='grid gap-4 my-4'>
                <Input
                    id='twillio_id_key'
                    label='Twillio ID KEY'
                    type='text'
                    placeholder='Enter here'
                    onChange={handleChange}
                    value={formData.twillio_id_key}
                />
                <Input
                    id='auth_token'
                    label='Auth Token'
                    type='text'
                    placeholder='Enter here'
                    onChange={handleChange}
                    value={formData.auth_token}
                />
                <Input
                    id='twillio_phone_number'
                    label='Twillio Phone Number'
                    type='text'
                    placeholder='+61xxxx'
                    onChange={handleChange}
                    value={formData.twillio_phone_number}
                />
            </div>
        </Modal>
    )
}

export default ModalTwillio
