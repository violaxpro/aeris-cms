import React, { useState } from 'react'
import Modal from '@/components/modal'
import TextArea from '@/components/textarea'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { BodyIconSwitch, HeaderIconSwitch } from '@public/icon';

type ModalTawkToProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        header_tawk_to: string
        body_tawk_to: string
    }
    handleSubmit?: () => void
}

const ModalTawkTo = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalTawkToProps) => {
    const [field, setField] = useState(false)
    return (
        <Modal
            open={isModalOpen}
            title='Tawk To'
            subtitle='Edit Tawk To data '
            rightButton={<CustomSwitch
                labelOn="Body"
                labelOff="Header"
                iconOn={BodyIconSwitch}
                iconOff={HeaderIconSwitch}
                onToggle={(state) => setField(state)}
                size='md'
            />}
            isBtnSave={true}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        >
            <div className='grid gap-2 my-4'>
                <div className='col-span-full w-full'>
                    <TextArea
                        id={`${field ? 'body_tawk_to' : 'header_tawk_to'} `}
                        placeholder='Copy here'
                        onChange={handleChange}
                        value={field ? formData.body_tawk_to : formData.header_tawk_to}
                        textareaClassname='!h-30'
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalTawkTo
