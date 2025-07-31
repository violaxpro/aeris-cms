import React, { useState } from 'react'
import Input from '@/components/input'
import DatePickerInput from '@/components/date-picker'
import dayjs from 'dayjs'
import SelectInput from '@/components/select'
import { Divider } from 'antd'

const EditInformation = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        nik: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        location: '',
        job_role: '',
        employee_type: '',
        joining_date: '',
        contract_periode: '',
        employement_status: '',
        bank_name: '',
        account_number: '',
        account_name: '',
        monthly_salary: ''
    })

    const handleChange = (field: string) => (
        e: any
    ) => {
        const value = typeof e === 'string' || Array.isArray(e)
            ? e
            : e.target.value;

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className='rounded-lg border border-[#E5E7EB] md:col-span-8 max-h-150'>
            <div className='p-6 grid md:grid-cols-2 gap-4'>
                <div className='col-span-full'>
                    <h4 className='text-lg font-semibold'>General Information</h4>
                </div>
                <Input
                    id='full_name'
                    type='text'
                    label='Full Name'
                    value={formData.full_name}
                    onChange={handleChange('full_name')}
                />
                <Input
                    id='nik'
                    type='text'
                    label='National ID (NIK)'
                    value={formData.nik}
                    onChange={handleChange('nik')}
                />
                <Input
                    id='email'
                    type='text'
                    label='Email Address'
                    value={formData.email}
                    onChange={handleChange('email')}
                />
                <Input
                    id='phone_number'
                    type='text'
                    label='Phone Number'
                    value={formData.phone_number}
                    onChange={handleChange('phone_number')}
                />
                <div className='grid md:grid-cols-2 gap-4'>
                    <DatePickerInput
                        id='date_of_birth'
                        label='Date of Birth'
                        value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null}
                        onChange={handleChange('date_of_birth')}
                    />
                    <SelectInput
                        id='gender'
                        label='Gender'
                        value={formData.gender}
                        onChange={handleChange('gender')}
                        options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]}
                    />
                </div>
                <Input
                    id='location'
                    type='text'
                    label='Location'
                    value={formData.location}
                    onChange={handleChange('location')}
                />
                <div className='col-span-full'>
                    <Divider />
                </div>

                <div className='col-span-full'>
                    <h4 className='text-lg font-semibold'>Employee Details</h4>
                </div>
                <SelectInput
                    id='job_role'
                    label='Role/Division'
                    placeholder='Select Role'
                    onChange={handleChange('job_role')}
                    options={[
                        { label: 'Front End Developer', value: 'Front End Developer' },
                        { label: 'Back End Developer', value: 'Back End Developer' },
                        { label: 'UI/UX Designer', value: 'UI/UX Designer' },
                        { label: 'Quality Assurance', value: 'Quality Assurance' },
                        { label: 'System Analyst', value: 'System Analyst' },
                    ]}
                    value={formData.job_role}
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
                <div className='grid md:grid-cols-2 gap-4'>
                    <DatePickerInput
                        id='joining_date'
                        label='Joining Date'
                        value={formData.joining_date ? dayjs(formData.joining_date) : null}
                        onChange={handleChange('joining_date')}
                    />
                    <Input
                        id='contract_periode'
                        type='text'
                        label='Contract Periode'
                        value={formData.contract_periode}
                        onChange={handleChange('contract_periode')}
                    />
                </div>

                <SelectInput
                    id='employement_status'
                    label='Employment Status'
                    placeholder='Select Employment Status'
                    onChange={handleChange('employement_status')}
                    options={[
                        { label: 'Active', value: 'Active' },
                        { label: 'Non-Active', value: 'Non-Active' },
                    ]}
                    value={formData.employement_status}
                />

                <div className='col-span-full'>
                    <Divider />
                </div>

                <div className='col-span-full'>
                    <h4 className='text-lg font-semibold'>Payment Details</h4>
                </div>
                <Input
                    id='bank_name'
                    type='text'
                    label='Bank Name'
                    value={formData.bank_name}
                    onChange={handleChange('bank_name')}
                />
                <Input
                    id='account_number'
                    type='text'
                    label='Account Number'
                    value={formData.account_number}
                    onChange={handleChange('account_number')}
                />
                <Input
                    id='account_name'
                    type='text'
                    label='Account Name'
                    value={formData.account_name}
                    onChange={handleChange('account_name')}
                />
                <Input
                    id='monthly_salary'
                    type='text'
                    label='Monthly Salary'
                    value={formData.monthly_salary}
                    onChange={handleChange('monthly_salary')}
                />
            </div>
        </div>

    )
}

export default EditInformation
