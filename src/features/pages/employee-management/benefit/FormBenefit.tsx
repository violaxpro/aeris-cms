import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import Textarea from '@/components/textarea'
import Input from '@/components/input'
import DatePickerInput from '@/components/date-picker'
import dayjs from 'dayjs'

type FormBenefitType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        employee_name: string | string[]
        benefit_name: string
        start_date: string
        end_date: string
        description: string
        benefit_type: string
        tags: string[]
    }
    handleCancel: () => void
    handleSubmit: () => void
    modalType: string
    formMode: string
}
const FormBenefit = ({ open,
    handleChange,
    formData,
    handleCancel,
    handleSubmit,
    modalType = 'employee-benefit',
    formMode = 'create'
}: FormBenefitType) => {


    const getTitle = (modalType: string | null, formMode?: string | null) => {
        if (!modalType) return '';

        switch (modalType) {
            case 'employee-benefit':
                return formMode == 'create' ? 'Add Employee Benefit' : 'Edit Employee Benefit';
            case 'benefit':
                return formMode == 'create' ? 'Add Benefit' : 'Edit Benefit';
            default:
                return '';
        }
    };
    return (
        <Modal
            open={open}
            title={getTitle(modalType, formMode)}
            subtitle='Please complete all fields to create a new data.'
            handleCancel={handleCancel}
        >
            <div className='grid gap-5'>
                {
                    modalType == 'employee-benefit' &&
                    <SelectInput
                        id='employee_name'
                        modeType='multiple'
                        label='Employee Name'
                        placeholder='Input Employee name'
                        onChange={handleChange('employee_name')}
                        value={formData.employee_name}
                        options={[
                            { label: 'Marcella', value: 'marcela' },
                            { label: 'Viola', value: 'viola' },
                        ]}
                        required
                    />
                }
                <Input
                    id='benefit_name'
                    label='Benefit Name'
                    type='text'
                    placeholder='Input Benefit Name'
                    onChange={handleChange('benefit_name')}
                    value={formData.benefit_name}
                    required
                />
                {
                    modalType == 'benefit' &&
                    <Input
                        id='benefit_type'
                        label='Benefit Type'
                        type='text'
                        placeholder='Input Benefit Type'
                        onChange={handleChange('benefit_type')}
                        value={formData.benefit_type}
                        required
                    />
                }
                {
                    modalType == 'employee-benefit' &&
                    <div className='grid grid-cols-2 gap-4'>
                        <DatePickerInput
                            id='start_date'
                            label='Start Date'
                            value={formData.start_date ? dayjs(formData.start_date) : null}
                            onChange={handleChange('start_date')}
                            placeholder='Select Start Date'
                            required
                        />
                        <DatePickerInput
                            id='end_date'
                            label='End Date'
                            value={formData.end_date ? dayjs(formData.end_date) : null}
                            onChange={handleChange('end_date')}
                            placeholder='Select End Date'
                            required
                        />
                    </div>
                }
                <Textarea
                    id='description'
                    label='Description'
                    placeholder='Input Description'
                    onChange={handleChange('description')}
                    value={formData.description}
                    textareaClassname='!h-20'
                />
                {
                    modalType == 'benefit' &&
                    <Input
                        id='tags'
                        label='Tags/Coverage'
                        type='text'
                        placeholder='Input Tags/Coverage'
                        onChange={handleChange('tags')}
                        value={formData.tags}
                        required
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

export default FormBenefit
