import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { BodyIconSwitch, HeaderIconSwitch } from '@public/icon';

type ModalApplePaymentProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        merchant_id: string
        domain_verification: string
        payment_processor: string
        mode_apple: string
    }
    handleSubmit?: () => void

}

const ModalApplePayment = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalApplePaymentProps) => {
    const [field, setField] = useState(false)
    return (
        <Modal
            open={isModalOpen}
            title='Apple Payment'
            subtitle='Edit apple payment'
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
                        id='merchant_id'
                        label='Merchant ID'
                        type='text'
                        placeholder='Merchant ID'
                        onChange={handleChange}
                        value={formData.merchant_id}
                        className='mb-2'
                    />
                    <Input
                        id='domain_verification'
                        label='Domain Verification'
                        type='text'
                        placeholder='Domain Verification'
                        onChange={handleChange}
                        value={formData.domain_verification}
                        className='mb-2'
                    />
                    <Input
                        id='payment_processor'
                        label='Payment Processor'
                        type='text'
                        placeholder='Payment Processor'
                        onChange={handleChange}
                        value={formData.payment_processor}
                        className='mb-2'
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalApplePayment
