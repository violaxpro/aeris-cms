import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import Textarea from '@/components/textarea'
import Input from '@/components/input'
import DatePickerInput from '@/components/date-picker'
import TimePickerInput from '@/components/time-picker'
import dayjs from 'dayjs'
import FileUploader from '@/components/input-file'
import { uploadImages } from '@/services/upload-images'

type ModalLeavePermitType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        full_name: string
        leave_type: string
        start_date: string
        end_date: string
        date: string
        end_time: string
        description: string
        file_attachment: string[]
    }
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalLeavePermit = ({ open, handleChange, formData, handleCancel, handleSubmit }: ModalLeavePermitType) => {
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
    return (
        <Modal
            open={open}
            title='Add Leave or Permit'
            subtitle='Please complete all fields to create a new request.'
            handleCancel={handleCancel}
        >
            <div className='grid gap-5'>
                <Input
                    id='full_name'
                    label='Full Name'
                    type='text'
                    placeholder='Input Full name'
                    onChange={handleChange('full_name')}
                    value={formData.full_name}
                />
                <SelectInput
                    id='leave_type'
                    label='Leave Type'
                    value={formData.leave_type}
                    onChange={handleChange('leave_type')}
                    options={[
                        { label: 'Annual Leave', value: 'Annual Leave' },
                        { label: 'Sick Permit', value: 'Sick Permit' },
                        { label: 'Personal Permit', value: 'Personal Permit' },
                        { label: 'Bereveament Leave', value: 'Bereveament Leave' },
                        { label: 'Early Leave', value: 'Early Leave' },
                    ]}
                />
                <div className='grid grid-cols-2 gap-4'>
                    {
                        formData.leave_type == 'Early Leave'
                            ?
                            <>
                                <DatePickerInput
                                    id='date'
                                    label='Date'
                                    value={formData.date ? dayjs(formData.date) : null}
                                    onChange={handleChange('date')}
                                />
                                <TimePickerInput
                                    id='end_time'
                                    label='End Time'
                                    value={formData.end_time}
                                    onChange={(val) => handleChange('end_time')(val)}
                                />
                            </>
                            :
                            <>
                                <DatePickerInput
                                    id='start_date'
                                    label='Start Date'
                                    value={formData.start_date ? dayjs(formData.start_date) : null}
                                    onChange={handleChange('start_date')}
                                />

                                <DatePickerInput
                                    id='end_date'
                                    label='End Date'
                                    value={formData.end_date ? dayjs(formData.end_date) : null}
                                    onChange={handleChange('end_date')}
                                />
                            </>
                    }

                </div>
                <Textarea
                    id='description'
                    label='Description'
                    placeholder='Input description'
                    onChange={handleChange('description')}
                    value={formData.description}
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

export default ModalLeavePermit
