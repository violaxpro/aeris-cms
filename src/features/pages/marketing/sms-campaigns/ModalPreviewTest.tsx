import React, { useState } from 'react'
import Modal from '@/components/modal'
import SelectInput from '@/components/select'
import Image from 'next/image'
import Input from "@/components/input"
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import Divider from '@/components/divider'
import Link from 'next/link'
import { GmailIcon, SentEmailWhiteIcon, InfoIcon } from '@public/icon';
import ButtonAction from '@/components/button/ButtonAction';
import Button from '@/components/button'

type ModalPreviewTestProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleSubmit?: any
}

const ModalPreviewTest = ({
    handleCancel,
    isModalOpen,
    handleSubmit
}: ModalPreviewTestProps) => {
    const [formEmail, setFormEmail] = useState({
        from: '+61 400 123 419',
        to: ['+61 400 123 456', '+61 400 123 459']
    })
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleDelete = (id: any) => {
        setOpenModalDelete(true)
    }

    const handleClick = (data: any) => {
        console.log(data)
    }

    const handleChange = (e: any) => {
        const { id, value } = e.target
        setFormEmail((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                title='Preview & Test - SMS Campaign'
                handleCancel={handleCancel}
                iconLeftTitle={GmailIcon}
            >
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-4 items-center'>
                        <span className='w-10'>From:</span>
                        <div className='p-3 w-full '>
                            <span>Australia | Twillio | {formEmail.from}</span>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <span className='w-13'>To:</span>
                        <div className='flex gap-3 w-full'>
                            <SelectInput
                                id='to'
                                onChange={handleChange}
                                value={formEmail.to}
                                options={[
                                    { label: '+62813874124', value: '+62813874124' }
                                ]}
                                selectClassName='w-full'
                                className='w-full'
                            />
                        </div>
                    </div>
                    {/* <Input
                        id='to'
                        label='To:'
                        onChange={handleChange}
                        value={formEmail.to}
                        type='text'
                        divClassName='flex'
                        inputClassname='w-full'
                        labelClassName='w-15'
                    /> */}
                    {/* <div className='flex gap-4 items-center'>
                        <span className='w-10'>To:</span>
                        <div className='border border-gray-300 p-3 rounded-lg w-full'>
                            <div className='flex gap-3'>
                                {
                                    formEmail.to.map((item: any, index: number) => (
                                        <div className='bg-gray-200 rounded-full flex justify-between gap-3 px-2' key={index}>
                                            <span>{item}</span>
                                            <Image
                                                src={CancelIcon}
                                                alt='cancel-icon'
                                                className='cursor-pointer'
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div> */}
                    <div className="flex justify-end space-y-4 text-sm ">
                        <div className='max-w-xs bg-[#0A3353] text-white p-4 rounded-tr-4xl rounded-tl-4xl rounded-bl-4xl'>
                            <p>
                                FLASH SALE! Get 30% OFF home alarms today only.
                            </p>

                            <ul className="space-y-1">
                                <li>
                                    🛒 Shop now: alarmexpert.com/sale
                                </li>
                                <li>
                                    ⏰ End at 11:59 PM.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 p-4 bg-gray-100 rounded-xl'>
                        <div className='flex justify-between items-center'>
                            <p className='font-bold text-gray-600 text-lg'>Message Details</p>
                            <Image src={InfoIcon} alt='info-icon' />
                        </div>
                        <div className="flex gap-3 justify-between">
                            <div className='flex gap-2'>
                                <span className='w-20'>Characters</span>
                                <span>:</span>
                                <span>120</span>
                            </div>
                            <div className='flex gap-2'>
                                <span className='w-20'> Segments </span>
                                <span>:</span>
                                <span>1</span>
                            </div>
                            <div className='flex gap-2'>
                                <span className='w-20'> Est. Cost </span>
                                <span>:</span>
                                <span> $0.045 per recipient</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end gap-3 items-center'>
                        <ButtonAction
                            label='Cancel'
                            onClick={handleCancel}
                        />
                        <Button
                            label='Send Test Now'
                            icon={<Image
                                src={SentEmailWhiteIcon}
                                alt='send-icon'
                                width={15}
                                height={15}
                            />}
                            onClick={() => {
                                handleSubmit()
                                // setChooseTracking({})
                                // handleCancel()
                            }}
                        />
                    </div>
                </div>
            </Modal>

        </>

    )
}

export default ModalPreviewTest
