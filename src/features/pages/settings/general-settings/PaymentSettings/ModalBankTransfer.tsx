import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import TextArea from '@/components/textarea'
import CustomSwitch from '@/components/switch/CustomSwitch';
import { TestModeIcon, LiveModeIcon } from '@public/icon';

type ModalBankTransferProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        label: string
        description: string
        instruction: string
        bank_name: string
        bank_account_name: string
        bank_bsb: string
        bank_account_number: string
        mode_bank_transfer: string
    }
    handleSubmit?: () => void

}

const ModalBankTransfer = ({
    handleCancel,
    handleChange,
    isModalOpen,
    formData,
    handleSubmit
}: ModalBankTransferProps) => {
    const [field, setField] = useState(false)
    return (
        <Modal
            open={isModalOpen}
            title='Bank Transfer'
            subtitle='Edit bank transfer'
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
                    <div className='grid grid-cols-2 gap-3'>
                        <Input
                            id='label'
                            label='Label'
                            type='text'
                            placeholder='Label'
                            onChange={handleChange}
                            value={formData.label}
                        />
                        <Input
                            id='bank_account_name'
                            label='Bank Account Name'
                            type='text'
                            placeholder='Bank Account Name'
                            onChange={handleChange}
                            value={formData.bank_account_name}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <Input
                            id='bank_bsb'
                            label='Bank BSB'
                            type='text'
                            placeholder='Bank BSB'
                            onChange={handleChange}
                            value={formData.bank_bsb}
                        />
                        <Input
                            id='bank_account_number'
                            label='Bank Account Number'
                            type='text'
                            placeholder='Bank Account Number'
                            onChange={handleChange}
                            value={formData.bank_account_number}
                        />
                    </div>
                    <TextArea
                        id='description'
                        label='Description'
                        placeholder='Description'
                        onChange={handleChange}
                        value={formData.description}
                        textareaClassname='!h-20'
                    />
                    <TextArea
                        id='instruction'
                        label='Instruction'
                        placeholder='Instruction'
                        onChange={handleChange}
                        value={formData.instruction}
                        textareaClassname='!h-20'
                    />
                </div>
            </div>
        </Modal >
    )
}

export default ModalBankTransfer
