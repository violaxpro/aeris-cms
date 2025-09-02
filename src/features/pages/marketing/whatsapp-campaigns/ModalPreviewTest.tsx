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
        test_numbers: ['+61 400 123 456', '+61 400 123 459']
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
                title='Preview & Test - Whatsapp Campaign'
                handleCancel={handleCancel}
                iconLeftTitle={GmailIcon}
            >
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-4 items-center'>
                        <span className='w-50'>Test Number(s):</span>
                        <div className='border border-gray-300 p-3 rounded-lg w-full'>
                            <div className='flex gap-3'>
                                {
                                    formEmail.test_numbers.map((item: any, index: number) => (
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
                        <span className='font-bold'>Rendered Template Preview</span>
                    </div>
                    <Divider />
                    <div className="space-y-4 text-sm">
                        <p>
                            Winter Safety Promo!
                        </p>

                        <p>
                            Protect Your Home – 20% Off Alarm Systems.
                            Keep your loved ones safe this season with our reliable alarm systems.
                            For a limited time, enjoy 20% off and experience greater peace of mind during the winter months.
                        </p>

                        <p>
                            🛒 Shop now: www.alarmexpert.com/sale
                        </p>

                        <p>
                            Best regards,<br />
                            <span className='font-bold'>Alarm Expert Australia Team</span>
                        </p>
                    </div>
                    <Divider />
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
