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

type ModalTimesheetType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        name: string
        timesheet_type: string
        status_timesheet: string
        reason: string
        start_date_time: any
        end_date_time: any
        description: string
        file_attachment: string[]
    }
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalTimesheet = ({ open, handleChange, formData, handleCancel, handleSubmit }: ModalTimesheetType) => {
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

    console.log(formData)

    return (
        <Modal
            open={open}
            title='Add Timesheet'
            subtitle='Please complete all fields to add new timesheet today.'
            handleCancel={handleCancel}
        >
            <div className='grid gap-5'>
                <SelectInput
                    id='name'
                    label='Name'
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder='Select Name'
                    options={[
                        { label: 'Shift 1', value: 'Shift 1' },
                        { label: 'Shift 2', value: 'Shift 2' },
                        { label: 'Shift 3', value: 'Shift 3' },
                    ]}
                />

                <div className={`grid ${formData.timesheet_type == 'Check In' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                    <SelectInput
                        id='timesheet_type'
                        label='Timesheet Type'
                        value={formData.timesheet_type}
                        onChange={handleChange('timesheet_type')}
                        placeholder='Select Timesheet Type'
                        options={[
                            { label: 'Check In', value: 'Check In' },
                            { label: 'Break', value: 'Break' },
                            { label: 'Finish Break', value: 'Finish Break' },
                            { label: 'Check Out', value: 'Check Out' },
                            { label: 'Request Overtime', value: 'Request Overtime' },
                        ]}
                    />
                    {
                        formData.timesheet_type == 'Check In' &&
                        <SelectInput
                            id='status_timesheet'
                            label='Status Timesheet'
                            value={formData.status_timesheet}
                            onChange={handleChange('status_timesheet')}
                            placeholder='Select Status Timesheet'
                            options={[
                                { label: 'On Time', value: 'On Time' },
                                { label: 'Late', value: 'Late' },
                            ]}
                        />
                    }
                </div>
                {
                    formData.timesheet_type == 'Request Overtime' &&
                    <>
                        <div className='grid grid-cols-2 gap-4'>
                            <DatePickerInput
                                id='start_time'
                                label='Start Date & Time'
                                value={formData.start_date_time}
                                onChange={handleChange('start_date_time')}
                                showTime={true}
                            />

                            <DatePickerInput
                                id='end_time'
                                label='End Date & Time'
                                value={formData.end_date_time}
                                onChange={handleChange('end_date_time')}
                                showTime={true}
                            />
                        </div>
                        <Textarea
                            id='description'
                            placeholder='Input description'
                            label='Description'
                            value={formData.reason}
                            onChange={handleChange('description')}
                            textareaClassname='!h-20'
                        />
                        <FileUploader
                            label='File Attachment'
                            action="https://api-dev.alarmexpert.com.au/admin/product/cdn/upload"
                            multiple={true}
                            onSuccess={handleSuccess}
                            onError={handleError}
                            isUpload={isLoading}
                            fileList={formData.file_attachment?.map((img: any, index: any) => {
                                return {
                                    uid: `${index}`,
                                    name: img.name ?? img.url,
                                    status: 'done',
                                    url: img.url
                                }
                            })}
                        />
                    </>

                }
                {
                    formData.timesheet_type !== 'Request Overtime' && formData.status_timesheet == 'Late' && <Textarea
                        id='reason'
                        placeholder='Explain reason here'
                        label='Explain Reason'
                        value={formData.reason}
                        onChange={handleChange('reason')}
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

export default ModalTimesheet
