import React, { useState } from 'react'
import Modal from '@/components/modal'
import FileUploader from '@/components/input-file';
import { uploadImages } from '@/services/upload-images';
import Textarea from '@/components/textarea'
import { useNotificationAntd } from '@/components/toast';

type ModalNotesProps = {
    isModalOpen: boolean
    setIsModalOpen: any
    modalType?: string | null
    buttonType?: string | null
}

const ModalNotes = ({
    isModalOpen,
    setIsModalOpen,
    modalType,
    buttonType
}: ModalNotesProps) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        transaction_proof: [],
        notes: ''
    })
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleDelete = (id: any) => {
        setOpenModalDelete(true)
    }

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }))

    }

    const handleSuccess = async (file: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'product');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                handleChange('transaction_proof', images)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    const handleSubmit = () => {
        setIsModalOpen(false)
        notifySuccess('Notes has been successfully added')
    }

    console.log(formData)
    return (
        <>
            {contextHolder}
            <Modal
                open={isModalOpen}
                title='Add Notes'
                subtitle='Please complete all fields to add notes.'
                handleCancel={() => setIsModalOpen(false)}
                isBtnSave={true}
                labelButton='Submit'
                handleSubmit={handleSubmit}
            >
                <div className='grid gap-4 my-4'>
                    <FileUploader
                        label='Transaction Proof'
                        action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                        multiple={true}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        isUpload={isLoading}
                        fileList={formData.transaction_proof?.map((img: any, index: any) => {
                            return {
                                uid: `${index}`,
                                name: img.name ?? img.url,
                                status: 'done',
                                url: img.url
                            }
                        })}
                    />
                    <Textarea
                        id='notes'
                        label='Notes'
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        textareaClassname='!h-20'
                        placeholder='Input notes here'
                    />
                </div>
            </Modal >
        </>

    )
}

export default ModalNotes
