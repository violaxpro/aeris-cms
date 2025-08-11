import React, { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import Textarea from '@/components/textarea'
import dynamic from 'next/dynamic'
import Spinner from '@/components/spin'
const QuillInput = dynamic(() => import('@/components/quill-input'),
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
const FormEmail = ({
    open = false,
    handleCancel,
    onSuccess,
    databyId
}: EmailForm) => {
    const [emailData, setEmailData] = useState({
        name: '',
        html_template: '',
    })


    const handleChange = (e: any) => {
        const { id, value } = e.target
        const updated = { ...emailData, [id]: value }
        setEmailData(updated)
    }


    const handleQuillChange = (value: string) => {
        const updated = { ...emailData, html_template: value };
        setEmailData(updated)
    };

    const handleSubmit = async () => {
        try {
            const data = {
                name: emailData.name ?? '',
                html: emailData.html_template ?? '',
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
            setEmailData({
                name: databyId.name,
                html_template: databyId.html,

            })

        } else {
            setEmailData({
                name: '',
                html_template: '',
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
                    value={emailData.name}
                    type='text'
                    onChange={handleChange}
                />
                <QuillInput
                    key='html_template'
                    value={emailData.html_template}
                    onChange={handleQuillChange}
                    label="Template Content"
                    className="col-span-full [&_.ql-editor]:min-h-[50vh]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                />

            </div>

        </Modal>
    )
}

export default FormEmail
