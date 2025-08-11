import React, { useState } from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select';
import SwitchInput from '@/components/switch';
import Input from '@/components/input'
import Button from '@/components/button'
import { PencilIcon } from '@public/icon'
import Image from 'next/image'

type ModalToleranceProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (field: string) => (value: any) => void
    formData: {
        tolerance_type: string
        number: number
    }
    handleSubmit?: () => void
}

const ModalTolerance = ({
    isModalOpen,
    formData,
    handleCancel,
    handleChange,
    handleSubmit,
}: ModalToleranceProps) => {

    return (
        <div>
            <Modal
                title='Tolerance Settings'
                subtitle='Please complete all fields to tolerance settings.'
                open={isModalOpen}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                isBtnSave={true}
            >
                <div className='flex flex-col gap-4'>
                    <SelectInput
                        id="tolerance_type"
                        label="Tolerance Type"
                        placeholder="Select Tolerance Type"
                        value={formData.tolerance_type}
                        onChange={handleChange("tolerance_type")}
                        options={[
                            { label: 'Weekly', value: 'weekly' },
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Yearly', value: 'yearly' },
                        ]}
                    />
                    <Input
                        id="number"
                        label="Number"
                        placeholder=""
                        value={formData.number}
                        onChange={handleChange("number")}
                        type='text'
                    />


                </div>
            </Modal>

        </div>
    )
}

export default ModalTolerance
