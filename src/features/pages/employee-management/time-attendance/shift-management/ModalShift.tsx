import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import Textarea from '@/components/textarea'
import Input from '@/components/input'
import DatePickerInput from '@/components/date-picker'
import TimePickerInput from '@/components/time-picker'
import SwitchInput from '@/components/switch'
import dayjs from 'dayjs'
import FileUploader from '@/components/input-file'
import { uploadImages } from '@/services/upload-images'
import CheckboxGroup from '@/components/checkbox/CheckboxGroup'

type ModalShiftType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        shift_type: string
        start_time: string
        end_time: string
        apply_on_days: string[]
        apply_on_weeks_of_month: string[]
        assign_to: string[],
        repeat_weekly: boolean
    }
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalShift = ({ open, handleChange, formData, handleCancel, handleSubmit }: ModalShiftType) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const handleSuccess = async (file: any) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', file);          // field harus sama dengan API
            formData.append('path_name', 'product');
            const res = await uploadImages(formData)
            if (res.success == true) {
                const images = [{
                    name: file.name,
                    url: res?.data?.public_url,
                    default: true,
                    alt_image: file.name
                }]

                handleChange('file_attachment')(images)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleError = (file: any) => {
        console.error('Failed to upload:', file);
    };

    const days_option = [
        { label: 'Monday', value: 'Monday', className: 'label-1' },
        { label: 'Tuesday', value: 'Tuesday', className: 'label-2' },
        { label: 'Wednesday', value: 'Wednesday', className: 'label-3' },
        { label: 'Thursday', value: 'Thursday', className: 'label-4' },
        { label: 'Friday', value: 'Friday', className: 'label-5' },
        { label: 'Saturday', value: 'Saturday', className: 'label-6' },
    ];
    const weeks_option = [
        { label: 'Week 1', value: 'Week 1', className: 'label-1' },
        { label: 'Week 2', value: 'Week 2', className: 'label-2' },
        { label: 'Week 3', value: 'Week 3', className: 'label-3' },
        { label: 'Week 4', value: 'Week 4', className: 'label-4' },
    ];

    console.log(formData)

    return (
        <Modal
            open={open}
            title='Create New Shift'
            subtitle='Please complete all fields to create a new shift schedule.'
            handleCancel={handleCancel}
        >
            <div className='grid gap-5'>
                <SelectInput
                    id='shift_type'
                    label='Shift Type'
                    value={formData.shift_type}
                    onChange={handleChange('shift_type')}
                    placeholder='Select Shift Type'
                    options={[
                        { label: 'Shift 1', value: 'Shift 1' },
                        { label: 'Shift 2', value: 'Shift 2' },
                        { label: 'Shift 3', value: 'Shift 3' },
                    ]}
                />
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
                <CheckboxGroup
                    label='Apply on Days'
                    options={days_option}
                    value={formData.apply_on_days}
                    onChange={handleChange('apply_on_days')}
                />
                <CheckboxGroup
                    label='Apply on Weeks'
                    options={weeks_option}
                    value={formData.apply_on_weeks_of_month}
                    onChange={handleChange('apply_on_weeks_of_month')}
                />
                <SelectInput
                    id='assign_to'
                    label='Assign To'
                    value={formData.assign_to}
                    onChange={handleChange('assign_to')}
                    placeholder='Select Assign To'
                    modeType='multiple'
                    options={[
                        { label: 'Viola', value: 'Viola' },
                        { label: 'Marcella', value: 'Marcella' },
                        { label: 'Yuliana', value: 'Yuliana' },
                    ]}
                />
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Repeat Weekly</label>
                        <p className='text-sm text-gray-400'>Repeat this shift every week as needed.</p>
                    </div>
                    <SwitchInput
                        checked={formData.repeat_weekly}
                        onChange={handleChange('repeat_weekly')}
                    />
                </div>


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

export default ModalShift
