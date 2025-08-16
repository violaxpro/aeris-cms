import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import ButtonIcon from '@/components/button/ButtonIcon'
import Textarea from '@/components/textarea'
import TimePickerInput from '@/components/time-picker'
import DatePickerInput from '@/components/date-picker'
import Segmented from '@/components/segmented'
import dayjs from 'dayjs'
import Image from 'next/image'
import { PlusOutlineIcon, TrashIconRed } from '@public/icon'

type ModalAttendanceType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        name: string
        attendance_type: string
        date: string
        status_type: string
        start_time: string
        end_time: string
        explain_reason: string
        check_in: string
        start_break: string
        finish_break: string
        check_out: string
        time: any[],
        is_claim_overtime: string
        overtime_reason: string
        internal_notes: string
    }
    handleCancel: () => void
    handleSubmit: () => void
    formMode: string
}
const ModalAttendance = ({ open, handleChange, formData, handleCancel, handleSubmit, formMode = 'create' }: ModalAttendanceType) => {
    const addTime = () => {
        const newTime = {
            check_in: '',
            start_break: '',
            finish_break: '',
            check_out: ''
        }
        handleChange('time')([...(formData.time || []), newTime])
    }

    // hapus blok tertentu
    const removeTime = (index: number) => {
        const updated = formData.time.filter((_, i) => i !== index)
        handleChange('time')(updated)
    }
    console.log(formData)
    return (
        <Modal
            open={open}
            title={formMode == 'create' ? 'Create New Attendance' : 'Edit Attendance'}
            subtitle={formMode == 'create' ? 'Please complete all fields to add new attendance today.' : 'Marcella Indarwati'}
            date={formMode == 'edit' && 'Thursday, 7 August 2025'}
            handleCancel={handleCancel}
        >
            <div className='grid grid-cols-2 gap-5'>
                {
                    formMode == 'create' &&
                    <>
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
                        <DatePickerInput
                            id='date'
                            label='Date'
                            value={formData.date ? dayjs(formData.date) : null}
                            onChange={(val) => handleChange('date')(val)}
                        />
                    </>
                }

                <div className='col-span-full'>
                    {
                        formData.time.map((item: any, index: number) => {
                            return <div key={index} className='grid md:grid-cols-[repeat(4,1fr)_50px] gap-2 items-center mb-2'>
                                <TimePickerInput
                                    id='check_in'
                                    label='Check In'
                                    value={item.check_in}
                                    onChange={(val) => {
                                        const updated = [...formData.time]
                                        updated[index].check_in = val
                                        handleChange('time')(updated)
                                    }}
                                />
                                <TimePickerInput
                                    id='start_break'
                                    label='Start Break'
                                    value={item.start_break}
                                    onChange={(val) => {
                                        const updated = [...formData.time]
                                        updated[index].start_break = val
                                        handleChange('time')(updated)
                                    }}
                                />
                                <TimePickerInput
                                    id='finish_break'
                                    label='Finish Break'
                                    value={item.finish_break}
                                    onChange={(val) => {
                                        const updated = [...formData.time]
                                        updated[index].finish_break = val
                                        handleChange('time')(updated)
                                    }}
                                />
                                <TimePickerInput
                                    id='check_out'
                                    label='Check Out'
                                    value={item.check_out}
                                    onChange={(val) => {
                                        const updated = [...formData.time]
                                        updated[index].check_out = val
                                        handleChange('time')(updated)
                                    }}
                                />

                                <div className='pt-6'>
                                    {
                                        index === 0 &&
                                        <Button
                                            icon={<Image
                                                src={PlusOutlineIcon}
                                                alt='plus-icon'
                                            />}
                                            onClick={addTime}
                                        />
                                    }
                                    {
                                        index > 0 &&
                                        <ButtonIcon
                                            color='danger'
                                            variant='filled'
                                            size="small"
                                            icon={TrashIconRed}
                                            width={15}
                                            height={15}
                                            className='!h-10 !w-12'
                                            onClick={() => removeTime(index)}
                                        />
                                    }

                                </div>
                            </div>
                        })
                    }
                </div>

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
                        />
                    </div>
                }
                <div className='col-span-full'>
                    <Textarea
                        id='internal_notes'
                        label='Internal Notes'
                        value={formData.internal_notes}
                        onChange={(val) => handleChange('internal_notes')(val)}
                        textareaClassname='!h-20'
                        placeholder='e.g., enter a reason why you need to create attendance manually'
                    />
                </div>
                {/* <div className='grid grid-cols-2 gap-4'>
                    <SelectInput
                        id='attendance_type'
                        label='Attendance Type'
                        placeholder='Select Attendance Type'
                        onChange={handleChange('attendance_type')}
                        options={[
                            { label: 'Check In', value: 'Check In' },
                            { label: 'Start Break', value: 'Start Break' },
                            { label: 'Finish Break', value: 'Finish Break' },
                            { label: 'Check Out', value: 'Check Out' },
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
                <div className='grid grid-cols-2 gap-4'>
                    <TimePickerInput
                        id='start_time'
                        label='Start Time'
                        value={formData.start_time}
                        onChange={(val) => handleChange('start_time')(val)}
                    />
                    <TimePickerInput
                        id='end_time'
                        label='End Time'
                        value={formData.end_time}
                        onChange={(val) => handleChange('end_time')(val)}
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
                } */}

                <div className='col-span-full flex justify-center '>
                    {
                        formMode == 'create'
                            ? <Button
                                label='Submit'
                                onClick={handleSubmit}
                                style={{ padding: '1.2rem 2rem' }}
                            /> : <Button
                                label='Save'
                                onClick={handleSubmit}
                                disabled={formData.is_claim_overtime == '' && true}
                                style={{ padding: '1.2rem 2rem' }}
                                btnClassname={
                                    `!w-auto !text-white hover:!border-inherit ${formData.is_claim_overtime === ''
                                        ? '!bg-[#A9A8A8]'
                                        : '!bg-[var(--default-color)]'
                                    }`
                                }
                            />
                    }

                </div>
            </div>

        </Modal>
    )
}

export default ModalAttendance
