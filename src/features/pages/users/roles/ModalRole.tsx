import React from 'react'
import Modal from '@/components/modal'
import Button from '@/components/button'
import Input from '@/components/input'

type ModalRoleType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        role: string
        permission: string
    }
    handleCancel: () => void
    handleSubmit: () => void
    formMode?: string
}
const ModalRole = ({ open, handleChange, formData, handleCancel, handleSubmit, formMode = 'create' }: ModalRoleType) => {
    return (
        <Modal
            open={open}
            title={`${formMode == 'create' ? 'Create' : 'Edit'}  Role`}
            subtitle='Please complete all fields to create a new roles.'
            handleCancel={handleCancel}
        >
            <div className='grid grid-cols-2 gap-5'>
                <Input
                    id='role'
                    type='text'
                    label='Role Name'
                    placeholder='Input Role Name '
                    onChange={handleChange('role')}
                    value={formData.role}
                />
                <Input
                    id='permission'
                    label='Permission'
                    type='text'
                    placeholder='Input Permission'
                    onChange={handleChange('permission')}
                    value={formData.permission}
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

export default ModalRole
