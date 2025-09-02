import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import Divider from '@/components/divider'
import Link from 'next/link'
import Image from 'next/image';
import { GmailIcon, SentEmailWhiteIcon, CancelIcon } from '@public/icon';
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
        from: 'Alarm Expert Australia admin@alarmexpert.com.au',
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
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-4 items-center'>
                        <span className='w-10'>From:</span>
                        <div className='border border-gray-300 p-3 rounded-lg w-full '>
                            <span>{formEmail.from}</span>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
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
                    </div>
                    <Divider />
                    <div>
                        <span className='font-bold'>Message Body</span>
                    </div>
                    <Divider />
                    <div className="space-y-4 text-sm">
                        <p>
                            🔥 Flash Sale Alert! 🔥
                        </p>

                        <ul className="space-y-1">
                            <p>Today Only – Get 30% OFF all home alarm products.</p>
                            <li>
                                🛒 Shop now: www.alarmexpert.com/sale
                            </li>
                            <li>
                                ⏰ Hurry! Offer ends tonight at 11:59 PM.
                            </li>

                        </ul>
                        <p>
                            Best regards,<br />
                            <span className='font-bold'>Alarm Expert Australia Team</span>
                        </p>
                    </div>
                    <Divider />
                    <div className='flex flex-col gap-3'>
                        <p className='font-bold'>Message Details</p>
                        <Divider />
                        <div className="space-y-1 space-x-3">
                            <div className='flex gap-2 w-fdivl'>
                                <span className='w-20'>Characters</span>
                                <span>:</span>
                                <span>120</span>
                            </div>
                            <div className='flex gap-2 w-full'>
                                <span className='w-20'> Segments </span>
                                <span>:</span>
                                <span>1</span>
                            </div>
                            <div className='flex gap-2 w-full'>
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
