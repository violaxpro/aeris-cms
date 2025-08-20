'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import FileUploader from '@/components/input-file'
import { uploadImages } from '@/services/upload-images'

type ModalUploadType = {
    isModalOpen: boolean
    handleCancel: () => void
}
const ModalUpload = ({
    isModalOpen,
    handleCancel,
}: ModalUploadType) => {
    const [formData, setFormData] = useState({
        files: [],
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }))
    }
    const handleSubmit = () => {
        console.log("ini submit");
        // Bisa simpan ke API atau state lain
    };

    const handleSuccess = async (file: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'rma_sales');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                const updated: any = { ...formData, files: images, }
                setFormData(updated);
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
    return (
        <Modal
            open={isModalOpen}
            title='Upload Files'
            subtitle='Please upload files here.'
            handleCancel={handleCancel}
            labelButton='Upload'
            isBtnSave
            handleSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-3'>
                <FileUploader
                    label='File'
                    action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                    multiple={true}
                    onSuccess={handleSuccess}
                    onError={handleError}
                    isUpload={isLoading}
                    fileList={formData.files?.map((img: any, index: any) => {
                        return {
                            uid: `${index}`,
                            name: img.name ?? img.url,
                            status: 'done',
                            url: img.url
                        }
                    })}
                />
            </div>

        </Modal>
    )
}

export default ModalUpload
