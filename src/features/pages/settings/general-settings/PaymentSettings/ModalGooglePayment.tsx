import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { BodyIconSwitch, HeaderIconSwitch } from '@public/icon';

type ModalGooglePaymentProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        merchant_id_google: string
        merchant_name_google: string
        payment_processor_google: string
        mode_google: string
    }
    handleSubmit?: () => void

}

const ModalGooglePayment = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalGooglePaymentProps) => {
    const [field, setField] = useState(false)
    return (
        <Modal
            open={isModalOpen}
            title='Google Payment'
            subtitle='Edit google payment'
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
                        id='merchant_id_google'
                        label='Merchant ID'
                        type='text'
                        placeholder='Merchant ID'
                        onChange={handleChange}
                        value={formData.merchant_id_google}
                        className='mb-2'
                    />
                    <Input
                        id='merchant_name_google'
                        label='Merchant Name'
                        type='text'
                        placeholder='Merchant Name'
                        onChange={handleChange}
                        value={formData.merchant_name_google}
                        className='mb-2'
                    />
                    <Input
                        id='payment_processor_google'
                        label='Payment Processor'
                        type='text'
                        placeholder='Payment Processor'
                        onChange={handleChange}
                        value={formData.payment_processor_google}
                        className='mb-2'
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalGooglePayment
