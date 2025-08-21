import React, { useState } from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select';
import SwitchInput from '@/components/switch';
import Input from '@/components/input'
import Button from '@/components/button'
import { PencilIcon } from '@public/icon'
import Image from 'next/image'

type ModalCapacityProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: (field: string) => (value: any) => void
    formData: {
        capacity: string
        monday: number
        tuesday: number
        wednesday: number
        thursday: number
        friday: number
        saturday: number
        sunday: number
        weekly_total: string
        weekly_hours: string
    }
    handleSubmit?: () => void
    leaveType: string
}

const ModalCapacity = ({
    isModalOpen,
    formData,
    handleCancel,
    handleChange,
    handleSubmit,
    leaveType = 'full_time'
}: ModalCapacityProps) => {
    return (
        <div>
            <Modal
                title='Capacity Settings'
                subtitle='Please complete all fields to setting employee capacity.'
                open={isModalOpen}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                isBtnSave={true}
            >
                <div className='flex flex-col gap-4'>
                    <SelectInput
                        id="capacity"
                        label="Capacity"
                        placeholder="Select Capacity"
                        value={formData.capacity}
                        onChange={handleChange("capacity")}
                        options={[
                            { label: 'Daily', value: 'daily' },
                            { label: 'Weekly', value: 'weekly' },
                        ]}
                    />
                    {
                        formData.capacity == 'daily' ?
                            <div className='grid md:grid-cols-2 gap-3'>
                                <Input
                                    id="monday"
                                    label="Monday"
                                    placeholder="0h"
                                    value={formData.monday}
                                    onChange={handleChange("monday")}
                                    type='text'
                                    divClassName='flex gap-4'
                                    labelClassName='w-40'
                                />
                                <Input
                                    id="thursday"
                                    label="Thursday"
                                    placeholder="0h"
                                    value={formData.thursday}
                                    onChange={handleChange("thursday")}
                                    type='text'
                                    divClassName='flex gap-4'
                                    labelClassName='w-40'
                                />
                                <Input
                                    id="tuesday"
                                    label="Tuesday"
                                    placeholder="0h"
                                    value={formData.tuesday}
                                    onChange={handleChange("tuesday")}
                                    type='text'
                                    divClassName='flex gap-4'
                                    labelClassName='w-40'
                                />
                                <Input
                                    id="friday"
                                    label="Friday"
                                    placeholder="0h"
                                    value={formData.friday}
                                    onChange={handleChange("friday")}
                                    type='text'
                                    divClassName='flex gap-4'
                                    labelClassName='w-40'
                                />
                                <Input
                                    id="wednesday"
                                    label="Wednesday"
                                    placeholder="0h"
                                    value={formData.wednesday}
                                    onChange={handleChange("wednesday")}
                                    type='text'
                                    labelClassName='w-40'
                                    divClassName='flex gap-4'
                                />
                                <Input
                                    id="saturday"
                                    label="Saturday"
                                    placeholder="0h"
                                    value={formData.saturday}
                                    onChange={handleChange("saturday")}
                                    type='text'
                                    divClassName='flex gap-4'
                                    labelClassName='w-40'
                                />
                                <div className='col-span-full'>
                                    <Input
                                        id="sunday"
                                        label="Sunday"
                                        placeholder="0h"
                                        value={formData.sunday}
                                        onChange={handleChange("sunday")}
                                        type='text'
                                        divClassName='flex gap-4'
                                        labelClassName='w-38'
                                        inputClassname='md:w-full'
                                    />
                                </div>
                                <div className='col-span-full flex justify-between mt-3'>
                                    <label className='text-sm font-medium text-gray-700'>Weekly Total</label>
                                    <span>0h</span>
                                </div>
                            </div>
                            :
                            <div>
                                <Input
                                    id="weekly_hours"
                                    label="Weekly Hours"
                                    placeholder="0h"
                                    value={formData.weekly_hours}
                                    onChange={handleChange("weekly_hours")}
                                    type='text'
                                    divClassName='flex justify-between gap-4'
                                />
                            </div>
                    }
                </div>
            </Modal>

        </div>
    )
}

export default ModalCapacity
