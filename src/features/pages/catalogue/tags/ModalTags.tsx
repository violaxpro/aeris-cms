'use client'
import React, { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import { addTags, updateTags } from '@/services/tags-service'
import { useNotificationAntd } from '@/components/toast'

type ModalTagsType = {
    isModalOpen: boolean
    setOpenModalOpen?: any
    handleCancel: () => void
    actionType: string
    slug?: string
    onSuccess?: any
    databyId?: any
}
const ModalTags = ({
    isModalOpen,
    setOpenModalOpen,
    handleCancel,
    onSuccess,
    databyId
}: ModalTagsType) => {
    const [formData, setFormData] = useState({
        name: '',
    })
    const { contextHolder, notifySuccess } = useNotificationAntd()

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }))
    }
    const handleSubmit = async () => {
        try {
            const data = {
                name: formData.name,
            }

            let response;
            if (databyId?.id) {
                response = await updateTags(databyId?.id, data)
            } else {
                response = await addTags(data)
            }

            if (response.success == true) {
                notifySuccess(response.message)
                onSuccess?.()
                setOpenModalOpen(false)
            }

        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if (databyId) {
            setFormData({
                name: databyId.name,
            })

        } else {
            setFormData({
                name: '',
            })
        }

    }, [databyId, isModalOpen])


    return (
        <>
            {contextHolder}
            <Modal
                open={isModalOpen}
                title='Add Tag'
                subtitle='Please fill in the fields for the new Tag.'
                handleCancel={handleCancel}
                labelButton='Submit'
                isBtnSave
                handleSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-3'>
                    <Input
                        id='name'
                        type='text'
                        label='Tag Name'
                        value={formData.name || undefined}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder='e.g. Smartphone, 4K TV, Gaming Laptop, Wireless, Apple, Samsung'
                    />
                </div>

            </Modal>
        </>
    )
}

export default ModalTags
