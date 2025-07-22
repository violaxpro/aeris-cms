import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { BodyIconSwitch, HeaderIconSwitch } from '@public/icon';

type ModalStripePaymentProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        publishable_key_live: string
        publishable_key_test: string
        secret_key_live: string
        secret_key_test: string
        mode_stripe_payment: string
    }
    handleSubmit?: () => void
}

const ModalStripePayment = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalStripePaymentProps) => {
    const [field, setField] = useState(false)
    return (
        <Modal
            open={isModalOpen}
            title='Stripe Payment'
            subtitle='Edit stripe payment'
            rightButton={<CustomSwitch
                labelOn="Live Mode"
                labelOff="Test Mode"
                iconOn={BodyIconSwitch}
                iconOff={HeaderIconSwitch}
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
                        id='publishable_key_live'
                        label='Publisable Key Live'
                        type='text'
                        placeholder='Publisable Key Live'
                        onChange={handleChange}
                        value={formData.publishable_key_live}
                    />
                    <Input
                        id='secret_key_live'
                        label='Secret Key Live'
                        type='text'
                        placeholder='Secret Key Live'
                        onChange={handleChange}
                        value={formData.secret_key_live}
                    />
                    <Input
                        id='publishable_key_test'
                        label='Publisable Key Test'
                        type='text'
                        placeholder='Publisable Key Test'
                        onChange={handleChange}
                        value={formData.publishable_key_test}
                    />
                    <Input
                        id='secret_key_test'
                        label='Secret Key Test'
                        type='text'
                        placeholder='Secret Key Test'
                        onChange={handleChange}
                        value={formData.secret_key_test}
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalStripePayment
