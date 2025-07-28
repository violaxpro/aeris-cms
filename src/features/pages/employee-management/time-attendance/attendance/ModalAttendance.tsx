import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import Textarea from '@/components/textarea'

type ModalAttendanceType = {
    open: boolean
    handleChange: (field: string) => (value: string | string[] | React.ChangeEvent<HTMLTextAreaElement>) => void
    formData: {
        name: string
        attendance_type: string
        status_type: string
        explain_reason: string
    }
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalAttendance = ({ open, handleChange, formData, handleCancel, handleSubmit }: ModalAttendanceType) => {
    return (
        <Modal
            open={open}
            title='Add Attendance'
            subtitle='Please complete all fields to add new attendance today.'
            handleCancel={handleCancel}
        >
            <div className='grid gap-5'>
                <SelectInput
                    id='name'
                    label='Name'
                    placeholder='Select Name'
                    onChange={handleChange('name')}
                    options={[
                        { label: 'Ola', value: '1' }
                    ]}
                    value={formData.name}
                />
                <div className='grid grid-cols-2 gap-4'>
                    <SelectInput
                        id='attendance_type'
                        label='Attendance Type'
                        placeholder='Select Attendance Type'
                        onChange={handleChange('attendance_type')}
                        options={[
                            { label: 'Type 1', value: '1' }
                        ]}
                        value={formData.attendance_type}
                    />
                    <SelectInput
                        id='status_type'
                        label='Status Type'
                        placeholder='Select Status Type'
                        onChange={handleChange('status_type')}
                        options={[
                            { label: 'On Time', value: 'On Time' },
                            { label: 'Late', value: 'Late' }
                        ]}
                        value={formData.status_type}
                    />
                </div>
                {
                    formData.status_type == 'Late' && <Textarea
                        id='explain_reason'
                        label='Explain Reason'
                        placeholder='Explain here'
                        onChange={handleChange('explain_reason')}
                        value={formData.explain_reason}
                        textareaClassname='!h-20'
                    />
                }

                <div className='col-span-full flex justify-center '>
                    <Button
                        label='Submit'
                        onClick={handleSubmit}
                        style={{ padding: '1.2rem 2rem' }}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ModalAttendance
