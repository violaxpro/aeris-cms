import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import Textarea from '@/components/textarea'
import TimePickerInput from '@/components/time-picker'
import Segmented from '@/components/segmented'

type ModalDetailAttendanceType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        check_in: string
        start_break: string
        finish_break: string
        check_out: string
        is_claim_overtime: string
        overtime_reason: string
    }
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalDetailAttendance = ({ open, handleChange, formData, handleCancel, handleSubmit }: ModalDetailAttendanceType) => {
    console.log(formData)
    return (
        <Modal
            open={open}
            title='Attendance Detail'
            date='Thursday, 7 August 2025'
            subtitle='Marcella Indarwati'
            handleCancel={handleCancel}
        >
            <div className='grid md:grid-cols-4 gap-5'>
                <TimePickerInput
                    id='check_in'
                    label='Check In'
                    value={formData.check_in}
                    onChange={(val) => handleChange('check_in')(val)}
                />
                <TimePickerInput
                    id='start_break'
                    label='Start Break'
                    value={formData.start_break}
                    onChange={(val) => handleChange('start_break')(val)}
                />
                <TimePickerInput
                    id='finish_break'
                    label='Finish Break'
                    value={formData.finish_break}
                    onChange={(val) => handleChange('finish_break')(val)}
                />
                <TimePickerInput
                    id='check_out'
                    label='Check Out'
                    value={formData.check_out}
                    onChange={(val) => handleChange('check_out')(val)}
                />

                <div className='col-span-full grid grid-cols-2 '>
                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700'>Detected Overtime</label>
                        <span className='text-xl font-medium'>1 hour 15 minutes</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700'>Would you like to claim overtime?</label>
                        <div>
                            <Segmented
                                size='small'
                                value={formData.is_claim_overtime}
                                onChange={(selected: any) => handleChange('is_claim_overtime')(selected)}
                                options={[
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' }
                                ]}
                            />
                        </div>
                    </div>
                </div>
                {
                    formData.is_claim_overtime == 'yes' &&
                    <div className='col-span-full'>
                        <Textarea
                            id='overtime_reason'
                            label='Please provide a reason below'
                            value={formData.overtime_reason}
                            onChange={(val) => handleChange('overtime_reason')(val)}
                            textareaClassname='!h-20'
                            placeholder='e.g., Completed urgent customer request, system update, late meeting, etc.'
                            required
                        />
                    </div>
                }

                <div className='col-span-full flex justify-center '>
                    <Button
                        label='Save'
                        onClick={handleSubmit}
                        style={{ padding: '1.2rem 2rem' }}
                        btnClassname={
                            `!w-auto !text-white hover:!border-inherit ${formData.is_claim_overtime === ''
                                ? '!bg-[#A9A8A8]'
                                : '!bg-[var(--default-color)]'
                            }`
                        }
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ModalDetailAttendance
