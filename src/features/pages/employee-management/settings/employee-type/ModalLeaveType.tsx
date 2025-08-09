import React, { useState } from 'react'
import Modal from '@/components/modal'
import SwitchInput from '@/components/switch';
import Input from '@/components/input'
import Button from '@/components/button'
import { PencilIcon } from '@public/icon'
import Image from 'next/image'

type ModalLeaveTypeProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (e: any) => void
    formData: {
        annual_leave_time: number
        sick_permit_time: number
        personal_permit_time: number
        sick_leave_time: number
        holiday_leave_time: number
        early_leave_time: number
    }
    handleSubmit?: () => void
    leaveType: string
}

const ModalLeaveType = ({
    isModalOpen,
    formData,
    handleCancel,
    handleChange,
    handleSubmit,
    leaveType = 'full_time'
}: ModalLeaveTypeProps) => {
    const [checkAnnualLeave, setCheckAnnualLeave] = useState(false)
    const [checkSickPermit, setCheckSickPermit] = useState(false)
    const [checkPersonalPermit, setCheckPersonalPermit] = useState(false)
    const [checkEarlyLeave, setCheckEarlyLeave] = useState(false)
    const [checkSickLeave, setCheckSickLeave] = useState(false)
    const [checkHolidayLeave, setCheckHolidayLeave] = useState(false)
    return (
        <div>
            <Modal
                title='Leave Type'
                subtitle={`${leaveType == 'full_time' ? 'Full' : 'Part'}  time leave type settings.`}
                open={isModalOpen}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                isBtnSave={true}
            >
                <div className='flex flex-col gap-4'>
                    <div className='col-span-full border p-6 rounded-xl' style={{ borderColor: '#E5E7EB' }} >
                        <div className='col-span-full flex gap-3 justify-between items-center'>
                            <h4 className='text-lg font-semibold'>Annual Leave</h4>
                            <div className='flex gap-3'>
                                <SwitchInput
                                    checked={checkAnnualLeave}
                                    onChange={(value) =>
                                        setCheckAnnualLeave(value)
                                    }
                                />
                            </div>
                        </div>
                        {
                            checkAnnualLeave &&
                            <div className='mt-2'>
                                <Input
                                    id='annual_leave_time'
                                    label='Times'
                                    value={formData.annual_leave_time}
                                    onChange={handleChange}
                                    type='number'
                                    placeholder='Input number'
                                    suffix='/Year'
                                />
                            </div>
                        }
                    </div>
                    {
                        leaveType == 'full_time' ?
                            <>
                                <div className='col-span-full border p-6 rounded-xl' style={{ borderColor: '#E5E7EB' }} >
                                    <div className='col-span-full flex gap-3 justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Sick Permit</h4>
                                        <div className='flex gap-3'>
                                            <SwitchInput
                                                checked={checkSickPermit}
                                                onChange={(value) =>
                                                    setCheckSickPermit(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {
                                        checkSickPermit &&
                                        <div className='mt-2'>
                                            <Input
                                                id='sick_permit_time'
                                                label='Times'
                                                value={formData.sick_permit_time}
                                                onChange={handleChange}
                                                type='number'
                                                placeholder='Input number'
                                                suffix='/Year'
                                            />
                                        </div>
                                    }
                                </div>
                                <div className='col-span-full border p-6 rounded-xl' style={{ borderColor: '#E5E7EB' }} >
                                    <div className='col-span-full flex gap-3 justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Personal Permit</h4>
                                        <div className='flex gap-3'>
                                            <SwitchInput
                                                checked={checkPersonalPermit}
                                                onChange={(value) =>
                                                    setCheckPersonalPermit(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {
                                        checkPersonalPermit &&
                                        <div className='mt-2'>
                                            <Input
                                                id='personal_permit_time'
                                                label='Times'
                                                value={formData.personal_permit_time}
                                                onChange={handleChange}
                                                type='number'
                                                placeholder='Input number'
                                                suffix='/Year'
                                            />
                                        </div>
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div className='col-span-full border p-6 rounded-xl' style={{ borderColor: '#E5E7EB' }} >
                                    <div className='col-span-full flex gap-3 justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Sick Leave</h4>
                                        <div className='flex gap-3'>
                                            <SwitchInput
                                                checked={checkSickLeave}
                                                onChange={(value) =>
                                                    setCheckSickLeave(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {
                                        checkSickLeave &&
                                        <div className='mt-2'>
                                            <Input
                                                id='sick_leave_time'
                                                label='Times'
                                                value={formData.sick_leave_time}
                                                onChange={handleChange}
                                                type='number'
                                                placeholder='Input number'
                                                suffix='/Year'
                                            />
                                        </div>
                                    }
                                </div>
                                <div className='col-span-full border p-6 rounded-xl' style={{ borderColor: '#E5E7EB' }} >
                                    <div className='col-span-full flex gap-3 justify-between items-center'>
                                        <h4 className='text-lg font-semibold'>Holiday Leave</h4>
                                        <div className='flex gap-3'>
                                            <SwitchInput
                                                checked={checkHolidayLeave}
                                                onChange={(value) =>
                                                    setCheckHolidayLeave(value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {
                                        checkHolidayLeave &&
                                        <div className='mt-2'>
                                            <Input
                                                id='holiday_leave_time'
                                                label='Times'
                                                value={formData.holiday_leave_time}
                                                onChange={handleChange}
                                                type='number'
                                                placeholder='Input number'
                                                suffix='/Year'
                                            />
                                        </div>
                                    }
                                </div>
                            </>
                    }
                    <div className='col-span-full border p-6 rounded-xl' style={{ borderColor: '#E5E7EB' }} >
                        <div className='col-span-full flex gap-3 justify-between items-center'>
                            <h4 className='text-lg font-semibold'>Early Leave</h4>
                            <div className='flex gap-3'>
                                <SwitchInput
                                    checked={checkEarlyLeave}
                                    onChange={(value) =>
                                        setCheckEarlyLeave(value)
                                    }
                                />
                            </div>
                        </div>
                        {
                            checkEarlyLeave &&
                            <div className='mt-2'>
                                <Input
                                    id='early_leave_time'
                                    label='Times'
                                    value={formData.early_leave_time}
                                    onChange={handleChange}
                                    type='number'
                                    placeholder='Input number'
                                    suffix='/Year'
                                />
                            </div>
                        }
                    </div>
                </div>

            </Modal>

        </div>
    )
}

export default ModalLeaveType
