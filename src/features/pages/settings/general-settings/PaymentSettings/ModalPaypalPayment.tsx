import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { TestModeIcon, LiveModeIcon } from '@public/icon';

type ModalPaypalPaymentProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        client_id_live: string
        client_secret_live: string
        client_id_sandbox: string
        client_key_sandbox: string
        mode_paypal: string
    }
    handleSubmit?: () => void
}

const ModalPaypalPayment = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalPaypalPaymentProps) => {
    const [field, setField] = useState(false)
    return (
        <Modal
            open={isModalOpen}
            title='Paypal Payment'
            subtitle='Edit paypal payment'
            rightButton={<CustomSwitch
                labelOn="Live Mode"
                labelOff="Test Mode"
                iconOn={LiveModeIcon}
                iconOff={TestModeIcon}
                onToggle={(state) => setField(state)}
                size='md'
            />}
            isBtnSave={true}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        >
            <div className='grid my-4'>
                <div className='grid col-span-full w-full gap-4'>
                    <Input
                        id='client_id_live'
                        label='Client ID Live'
                        type='text'
                        placeholder='Client ID Live'
                        onChange={handleChange}
                        value={formData.client_id_live}
                    />
                    <Input
                        id='client_secret_live'
                        label='Client Secret Live'
                        type='text'
                        placeholder='Client Secret Live'
                        onChange={handleChange}
                        value={formData.client_secret_live}
                    />
                    <Input
                        id='client_id_sandbox'
                        label='Client ID Sandbox'
                        type='text'
                        placeholder='Client ID Sandbox'
                        onChange={handleChange}
                        value={formData.client_id_sandbox}
                    />
                    <Input
                        id='payment_processor'
                        label='Client Key Sandbox'
                        type='text'
                        placeholder='Client Key Sandbox'
                        onChange={handleChange}
                        value={formData.client_key_sandbox}
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalPaypalPayment
