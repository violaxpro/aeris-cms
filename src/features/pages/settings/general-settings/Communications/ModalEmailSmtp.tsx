import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import SelectInput from '@/components/select';

type ModalEmailSmtpProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        host: string
        email: string
        email_port: string
        username: string
        password: string
        mail: string
        security_type: string
        phone_number: string
    }
    handleSubmit?: () => void
}

const ModalEmailSmtp = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalEmailSmtpProps) => {
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
            title='Email SMTP'
            subtitle='Please complete all fields to edit the address'
            isBtnSave={true}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        >
            <div className='grid md:grid-cols-2 gap-2 my-4'>
                <Input
                    id='host'
                    label='Host/Email Server'
                    type='text'
                    placeholder='Host/Email Server'
                    onChange={handleChange}
                    value={formData.host}
                />
                <Input
                    id='email'
                    label='Email Address'
                    type='email'
                    placeholder='Email Address'
                    onChange={handleChange}
                    value={formData.email}
                />
                <Input
                    id='email_port'
                    label='Email Port'
                    type='text'
                    placeholder='Email Port'
                    onChange={handleChange}
                    value={formData.email_port}
                />
                <SelectInput
                    id='security_type'
                    label='Security Type'
                    value={formData.security_type}

                    onChange={(selected) => handleChange({
                        target: {
                            id: 'security_type',
                            value: selected
                        }
                    })}
                    options={optionsSecurityType}
                />
                <div className='grid md:grid-cols-2 gap-3'>
                    <Input
                        id='username'
                        label='Username'
                        type='text'
                        placeholder='Username'
                        onChange={handleChange}
                        value={formData.username}
                    />
                    <Input
                        id='password'
                        label='Password'
                        type='password'
                        placeholder='Password'
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <Input
                    id='mail'
                    label='Mail Encryption'
                    type='text'
                    placeholder='Mail Encryption'
                    onChange={handleChange}
                    value={formData.mail}
                />
            </div>
        </Modal >
    )
}

export default ModalEmailSmtp
