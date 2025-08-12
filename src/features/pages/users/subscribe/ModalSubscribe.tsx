import React from 'react'
import Modal from '@/components/modal'
import Button from '@/components/button'
import Input from '@/components/input'

type ModalSubscribeType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        email: string
    }
    handleCancel: () => void
    handleSubmit: () => void
    formMode?: string
}
const ModalSubscribe = ({ open, handleChange, formData, handleCancel, handleSubmit, formMode = 'create' }: ModalSubscribeType) => {
    return (
        <Modal
            open={open}
            title={`${formMode == 'create' ? 'Add' : 'Edit'}  Subscribe`}
            subtitle='Please input email to create new subscribe.'
            handleCancel={handleCancel}
        >
            <div className='grid gap-3'>
                <Input
                    id='email'
                    type='text'
                    label='Email'
                    placeholder='Input Email '
                    onChange={handleChange('role')}
                    value={formData.email}
                />

                <div className='col-span-full flex justify-center '>
                    <Button
                        label='Submit'
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ModalSubscribe
