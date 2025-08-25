import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import Popover from '@/components/popover'
import Link from 'next/link'
import Image from 'next/image';
import { routes } from '@/config/routes';
import { EditOutlined } from '@ant-design/icons';
import Textarea from '@/components/textarea'
import { addressData } from '@/plugins/types/settings-type';
import { TrashIconRed, PencilIconBlue, PlusOutlineIcon } from '@public/icon';
import ButtonIcon from '@/components/button/ButtonIcon';
import Button from '@/components/button'

type ModalTrackingNumberProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleChange: any
    handleSubmit: any
    formData: {
        courier_name: string
        tracking_number: string[]
    }
    modalType?: string | null
    buttonType?: string | null
}

const ModalTrackingNumber = ({
    handleCancel,
    handleChange,
    handleSubmit,
    isModalOpen,
    formData,
    modalType,
    buttonType
}: ModalTrackingNumberProps) => {
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleDelete = (id: any) => {
        setOpenModalDelete(true)
    }

    const addItem = () => {
        const updated = [...formData.tracking_number, ""];
        handleChange("tracking_number", updated);
    };

    const updateItem = (index: number, value: string) => {
        const updated = [...formData.tracking_number];
        updated[index] = value;
        handleChange("tracking_number", updated);
    };

    const removeItem = (index: number) => {
        const updated = formData.tracking_number.filter((_, i) => i !== index);
        handleChange("tracking_number", updated);
    };



    return (
        <>
            <Modal
                open={isModalOpen}
                title='Add Tracking Number'
                subtitle='Please fill in all input fields to create a new tracking number.'
                handleCancel={handleCancel}
                isBtnSave={true}
                handleSubmit={handleSubmit}
            >
                <div className='grid gap-4 my-4'>
                    {/* option dari data shipping method */}
                    <SelectInput
                        id='courier_name'
                        label='Courier Name'
                        allowClear
                        placeholder='Select Courier Name'
                        onChange={(value) => handleChange("courier_name", value)}
                        value={formData.courier_name}
                        options={[
                            { label: 'Australia Post', value: 'Australia Post' }
                        ]}
                    />
                    {
                        formData.courier_name && formData.tracking_number.map((item: any, index: number) => {
                            return (
                                <div key={index} className='flex gap-2 items-center'>
                                    <Input
                                        id='tracking_number'
                                        label='Tracking Number'
                                        type='text'
                                        placeholder='Input Tracking Number'
                                        onChange={(e) => handleChange("tracking_number", e.target.value.split(","))}
                                        value={item.value}
                                        divClassName='w-full'
                                    />
                                    <div className='flex pt-4 items-center'>
                                        {
                                            index === formData.tracking_number.length - 1 ?
                                                <Button
                                                    icon={<Image
                                                        src={PlusOutlineIcon}
                                                        alt='plus-icon'
                                                        width={15}
                                                    />}
                                                    onClick={addItem}
                                                />
                                                :
                                                <ButtonIcon
                                                    color='danger'
                                                    variant='filled'
                                                    size="small"
                                                    icon={TrashIconRed}
                                                    width={15}
                                                    height={15}
                                                    className='!h-10 !w-10'
                                                    onClick={() => removeItem(index)}
                                                />
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </Modal >
        </>

    )
}

export default ModalTrackingNumber
