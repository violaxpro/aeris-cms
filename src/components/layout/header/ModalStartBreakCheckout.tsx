'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal'
import Textarea from '@/components/textarea'
import CameraInput from '@/components/input-camera'
import LocationInput from '@/components/maps/InputMaps'
import Button from '@/components/button'
import ButtonTab from '@/components/tab/ButtonTab'
import Segmented from '@/components/segmented'

type ModalStartBreakCheckoutType = {
    isModalOpen: boolean
    formData: {
        is_checkout: boolean
        check_out_photo: string[]
        check_out_detected_overtime: string
        check_out_is_claim_overtime: string
        check_out_reason: string
        check_out_location: string
    }
    handleChange: (field: string) => (value: any) => void
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalStartBreakCheckout = ({
    isModalOpen,
    formData,
    handleChange,
    handleCancel,
    handleSubmit
}: ModalStartBreakCheckoutType) => {
    const [activeTab, setActiveTab] = useState('start-break');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const tabs = [
        { key: 'start-break', label: 'Start Break' },
        { key: 'checkout', label: 'Checkout' },
    ];

    console.log(formData)
    return (
        <Modal
            open={isModalOpen}
            title={activeTab == 'start-break' ? 'Start Break' : 'Check Out'}
            subtitle={activeTab == 'start-break' ? 'Pause work and start your break now.' : 'Check out now, and claim your overtime if any.'}
            handleCancel={handleCancel}
        >
            <div className='flex flex-col gap-3'>
                <ButtonTab
                    tabs={tabs}
                    activeKey={activeTab}
                    onTabClick={setActiveTab}
                />
                {
                    activeTab == 'checkout' &&
                    <>
                        <CameraInput
                            onChange={(file) => {
                                setSelectedFile(file);
                            }}
                            preview={selectedFile ? URL.createObjectURL(selectedFile) : null}
                        />
                        <div className='col-span-full grid grid-cols-2 '>
                            <div className='flex flex-col'>
                                <label className='text-sm font-medium text-gray-700'>Detected Overtime</label>
                                <span className='text-xl font-medium'>0 hour 0 minutes</span>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm font-medium text-gray-700'>Would you like to claim overtime?</label>
                                <div>
                                    <Segmented
                                        size='small'
                                        value={formData.check_out_is_claim_overtime}
                                        onChange={(selected: any) => handleChange('check_out_is_claim_overtime')(selected)}
                                        options={[
                                            { label: 'Yes', value: 'yes' },
                                            { label: 'No', value: 'no' }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            formData.check_out_is_claim_overtime == 'yes' &&
                            <div className='col-span-full'>
                                <Textarea
                                    id='check_out_reason'
                                    label='Please provide a reason below'
                                    value={formData.check_out_reason}
                                    onChange={(val) => handleChange('check_out_reason')(val)}
                                    textareaClassname='!h-20'
                                    placeholder='e.g., Completed urgent customer request, system update, late meeting, etc.'
                                />
                            </div>
                        }
                        <LocationInput
                        />

                    </>

                }
                <div className='flex justify-center'>
                    <Button
                        label={activeTab == 'start-break' ? 'Break Now' : 'Check Out Now'}
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ModalStartBreakCheckout
