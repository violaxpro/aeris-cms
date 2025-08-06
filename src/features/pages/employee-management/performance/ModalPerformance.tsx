import React from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Button from '@/components/button'
import Textarea from '@/components/textarea'
import Input from '@/components/input'
import DatePickerInput from '@/components/date-picker'
import dayjs from 'dayjs'

type ModalPerformanceType = {
    open: boolean
    handleChange: (field: string) => (value: any) => void
    formData: {
        employee_name: string
        role: string
        kpi_score: string
        attendance_score: string
        work_quality: string
        teamwork_communication: string
        dicipline_compliance: string
        evaluation_notes: string
    }
    handleCancel: () => void
    handleSubmit: () => void
    modalType?: string
}
const ModalPerformance = ({ open, handleChange, formData, handleCancel, handleSubmit, modalType = 'create' }: ModalPerformanceType) => {
    return (
        <Modal
            open={open}
            title={`${modalType == 'create' ? 'Add' : 'Edit'}  Evaluation`}
            subtitle='Please complete all fields to create a new evaluations.'
            handleCancel={handleCancel}
        >
            <div className='grid grid-cols-2 gap-5'>
                <Input
                    id='employee_name'
                    type='text'
                    label='Employee Name'
                    placeholder='Input Employee Name '
                    onChange={handleChange('employee_name')}
                    value={formData.employee_name}
                />
                <Input
                    id='role'
                    label='Job Role'
                    type='text'
                    placeholder='Input Job Role'
                    onChange={handleChange('role')}
                    value={formData.role}
                />
                <Input
                    id='kpi_score'
                    label='KPI Score'
                    type='text'
                    placeholder='Input KPI Score'
                    onChange={handleChange('kpi_score')}
                    value={formData.kpi_score}
                />
                <Input
                    id='attendance_score'
                    label='Attendance Score'
                    type='text'
                    placeholder='Input Attendance Score'
                    onChange={handleChange('attendance_score')}
                    value={formData.attendance_score}
                />
                <Input
                    id='work_quality'
                    label='Work Quality'
                    type='text'
                    placeholder='Input Work Quality Score(1-10)'
                    onChange={handleChange('work_quality')}
                    value={formData.work_quality}
                />
                <Input
                    id='teamwork_communication'
                    label='Teamwork & Communications'
                    type='text'
                    placeholder='Input Teamwork & Communications Score (1-10)'
                    onChange={handleChange('teamwork_communication')}
                    value={formData.teamwork_communication}
                />
                <div className='grid gap-5 col-span-full'>
                    <Input
                        id='dicipline_compliance'
                        label='Dicipline & Compliance'
                        type='text'
                        placeholder='Input Dicipline & Compliance Score (1-10)'
                        onChange={handleChange('dicipline_compliance')}
                        value={formData.dicipline_compliance}
                    />
                    <Textarea
                        id='evaluation_notes'
                        label='Evaluation Notes'
                        placeholder='Input Evaluation Notes'
                        onChange={handleChange('evaluation_notes')}
                        value={formData.evaluation_notes}
                        textareaClassname='!h-20'
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

export default ModalPerformance
