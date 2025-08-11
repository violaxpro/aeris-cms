import React, { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import Textarea from '@/components/textarea'
import dynamic from 'next/dynamic'
import Spinner from '@/components/spin'
const QuillInput = dynamic(() =>
    import('@/components/quill-input'),
    {
        ssr: false,
        loading: () => (
            <div className="flex justify-center items-center min-h-[200px]">
                <Spinner size="large" />
            </div>
        ),
    }
);

type EmailForm = {
    open: boolean
    handleCancel: () => void
    onSuccess?: any
    databyId?: any
}
const FormSms = ({
    open = false,
    handleCancel,
    onSuccess,
    databyId
}: EmailForm) => {
    const [smsData, setSmsData] = useState({
        name: '',
        template_content: '',
    })

    const handleChange = (e: any) => {
        const { id, value } = e.target
        const updated = { ...smsData, [id]: value }
        setSmsData(updated)
    }

    const handleQuillChange = (value: string) => {
        const updated = { ...smsData, template_content: value };
        setSmsData(updated)
    };

    const handleSubmit = async () => {
        try {
            const data = {
                name: smsData.name ?? '',
                html: smsData.template_content ?? '',
            }

            let response
            // if (databyId?.id) {
            //     response = await updateTaxes(databyId.id, data)
            // } else {
            //     response = await addTaxes(data)

            // }
            // if (response.success == true) {
            //     onSuccess(response.message)
            // }

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        if (databyId) {
            setSmsData({
                name: databyId.name,
                template_content: databyId.text,

            })

        } else {
            setSmsData({
                name: '',
                template_content: '',
            })
        }

    }, [databyId, open])

    return (
        <Modal
            title='Create Email Template'
            open={open}
            isBtnSave={true}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-2'>
                <Input
                    id='name'
                    label='Template Name'
                    placeholder='Template Name'
                    value={smsData.name}
                    type='text'
                    onChange={handleChange}
                />
                <QuillInput
                    key='template_content'
                    value={smsData.template_content}
                    onChange={handleQuillChange}
                    label="Template Content"
                    className="col-span-full [&_.ql-editor]:min-h-[50vh]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                />

            </div>

        </Modal>
    )
}

export default FormSms
