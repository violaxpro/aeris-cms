'use client'
import React, { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import { useCreateTag, useUpdateTag } from '@/core/hooks/use-tag'
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
    const { mutate: createTagMutate } = useCreateTag()
    const { mutate: updateTagMutate } = useUpdateTag(databyId?.id ?? '')
    const [formErrors, setFormErrors] = useState({
        name: '',
    })
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
    const handleSubmit = () => {
        let errors: any = {}
        if (!formData.name) {
            errors.name = 'Name is required'
        }
        setFormErrors(errors)

        if (Object.keys(errors).length > 0) {
            return;
        }
        const data = {
            name: formData.name,
        }

        if (databyId?.id) {
            updateTagMutate(data)
        } else {
            createTagMutate(data)
        }
        onSuccess?.()
        setFormData({ name: '' })
        setOpenModalOpen(false)

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
                        errorMessage={formErrors.name}
                    />
                </div>

            </Modal>
        </>
    )
}

export default ModalTags
