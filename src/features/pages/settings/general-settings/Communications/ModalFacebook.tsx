import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import TextArea from '@/components/textarea'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { BodyIconSwitch, HeaderIconSwitch } from '@public/icon';

type ModalFacebookProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        header_facebook: string
        body_facebook: string
    }
    handleSubmit?: () => void
}

const ModalFacebook = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalFacebookProps) => {
    const [field, setField] = useState(false)
    return (
        <Modal
            open={isModalOpen}
            title='Facebook'
            subtitle='Edit Facebook data '
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
                        id={`${field ? 'body_facebook' : 'header_facebook'} `}
                        placeholder='Copy here'
                        onChange={handleChange}
                        value={field ? formData.body_facebook : formData.header_facebook}
                        textareaClassname='!h-30'
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalFacebook
