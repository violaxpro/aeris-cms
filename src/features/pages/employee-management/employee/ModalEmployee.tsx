import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import Textarea from '@/components/textarea'
import Input from '@/components/input'
import DatePickerInput from '@/components/date-picker'
import dayjs from 'dayjs'

type ModalEmployeeType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        nik: string
        full_name: string
        gender: string
        date_of_birth: string
        email: string
        phone_number: string
        employee_type: string
        role: string
    }
    handleCancel: () => void
    handleSubmit: () => void
}
const ModalEmployee = ({ open, handleChange, formData, handleCancel, handleSubmit }: ModalEmployeeType) => {
    return (
        <Modal
            open={open}
            title='Add Employee'
            subtitle='Please complete all fields to add new employee today.'
            handleCancel={handleCancel}
        >
            <div className='grid gap-5'>
                <Input
                    id='nik'
                    type='text'
                    label='National ID (NIK)'
                    placeholder='Input National ID (NIK)'
                    onChange={handleChange('nik')}
                    value={formData.nik}
                />
                <Input
                    id='full_name'
                    label='Full Name'
                    type='text'
                    placeholder='Input Full name'
                    onChange={handleChange('full_name')}
                    value={formData.full_name}
                />
                <div className='grid grid-cols-2 gap-4'>
                    <SelectInput
                        id='gender'
                        label='Gender'
                        placeholder='Select Gender'
                        onChange={handleChange('gender')}
                        options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]}
                        value={formData.gender}
                    />
                    <DatePickerInput
                        id='date_of_birth'
                        label='Date of Birth'
                        value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null}
                        onChange={handleChange('date_of_birth')}
                    />
                    <Input
                        id='email'
                        label='Email Address'
                        type='text'
                        placeholder='Input Email Address'
                        onChange={handleChange('email')}
                        value={formData.email}
                    />
                    <Input
                        id='phone_number'
                        label='Phone Number'
                        type='text'
                        placeholder='Input Phone Number'
                        onChange={handleChange('phone_number')}
                        value={formData.phone_number}
                    />
                    <SelectInput
                        id='employee_type'
                        label='Employee Type'
                        placeholder='Select Employee Type'
                        onChange={handleChange('employee_type')}
                        options={[
                            { label: 'Full Time', value: 'Full Time' },
                            { label: 'Part Time', value: 'Part Time' },
                            { label: 'Freelance', value: 'Freelance' },
                            { label: 'Casual', value: 'Casual' },
                        ]}
                        value={formData.employee_type}
                    />
                    <SelectInput
                        id='role/Division'
                        label='Role/Division'
                        placeholder='Select Role'
                        onChange={handleChange('role')}
                        options={[
                            { label: 'Front End Developer', value: 'Front End Developer' },
                            { label: 'Back End Developer', value: 'Back End Developer' },
                            { label: 'UI/UX Designer', value: 'UI/UX Designer' },
                            { label: 'Quality Assurance', value: 'Quality Assurance' },
                            { label: 'System Analyst', value: 'System Analyst' },
                        ]}
                        value={formData.role}
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

export default ModalEmployee
