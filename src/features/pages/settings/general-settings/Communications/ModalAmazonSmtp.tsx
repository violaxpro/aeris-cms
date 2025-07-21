import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import SelectInput from '@/components/select';

type ModalAmazonSmtpProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        endpoint_ses: string
        access_key_id: string
        secret_key: string
        email_from: string
        smtp_port: string
        security_type_amazon: string
    }
    handleSubmit?: () => void
}

const ModalAmazonSmtp = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalAmazonSmtpProps) => {
    const [reset, setReset] = useState(true)
    const handleReset = () => {
        setReset(false)
    }

    const optionsSecurityType = [
        { label: "SSL", value: 'ssl' },
        { label: "TLS", value: 'tls' },
        { label: "STARTTLS", value: 'starttls' },
        { label: "No Security", value: 'nosecurity' }
    ]
    return (
        <Modal
            open={isModalOpen}
            title='AWS SMTP'
            subtitle='Please complete all fields to edit the address'
            isBtnSave={true}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        >
            <div className='grid md:grid-cols-2 gap-2 my-4'>
                <div className='col-span-full'>
                    <Input
                        id='endpoint_ses'
                        label='Endpoint Ses'
                        type='text'
                        placeholder='Endpoint Ses'
                        onChange={handleChange}
                        value={formData.endpoint_ses}
                    />
                </div>

                <Input
                    id='access_key_id'
                    label='Access Key ID'
                    type='email'
                    placeholder='Access Key ID'
                    onChange={handleChange}
                    value={formData.access_key_id}
                />
                <Input
                    id='secret_key'
                    label='Secret Key'
                    type='text'
                    placeholder='Secret Key'
                    onChange={handleChange}
                    value={formData.secret_key}
                />
                <div className='grid md:grid-cols-3 gap-3 col-span-full'>
                    <Input
                        id='email_from'
                        label='Email From'
                        type='text'
                        placeholder='Email From'
                        onChange={handleChange}
                        value={formData.email_from}
                    />
                    <Input
                        id='smtp_port'
                        label='SMTP Port'
                        type='text'
                        placeholder='SMTP Port'
                        onChange={handleChange}
                        value={formData.smtp_port}
                    />
                    <SelectInput
                        id='security_type_amazon'
                        label='Security Type'
                        value={formData.security_type_amazon}
                        onChange={(selected) => handleChange({
                            target: {
                                id: 'security_type',
                                value: selected
                            }
                        })}
                        options={optionsSecurityType}
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalAmazonSmtp
