import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import Button from '@/components/button'

type ModalCustomerProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        name: string
    }
}

const ModalCustomer = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
}: ModalCustomerProps) => {
    const [openModalEdit, setOpenModalEdit] = useState(false)

    const handleSubmit = () => {
        setOpenModalEdit(false)
    }


    return (
        <>
            <Modal
                open={isModalOpen}
                title='Create New Customer'
                subtitle='Please complete all fields to create an another customer'
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
            >
                <div className='grid md:grid-cols-2 gap-4 my-4'>
                    <div className='col-span-full'>
                        <Input
                            id='name'
                            label='Name'
                            type='text'
                            placeholder='Input Name'
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>

                    <div className='col-span-full flex justify-center'>
                        <Button
                            label='Submit'
                            onClick={() => console.log('hi')}
                            style={{ padding: '1.2rem 2rem' }}
                        />

                    </div>
                </div>
            </Modal >
        </>

    )
}

export default ModalCustomer
