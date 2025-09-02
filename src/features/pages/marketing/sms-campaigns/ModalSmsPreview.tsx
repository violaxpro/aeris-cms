import React, { useState } from 'react'
import Modal from '@/components/modal'
import Divider from '@/components/divider'
import { GmailIcon, CancelIcon } from '@public/icon';
import Image from 'next/image';
import Button from '@/components/button'

type ModalSmsPreviewProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleSubmit?: any
}

const ModalSmsPreview = ({
    handleCancel,
    isModalOpen,
    handleSubmit
}: ModalSmsPreviewProps) => {
    const [formSms, setFormSms] = useState({
        from: 'Alarm Expert Australia',
        to: ['+61 400 123 456', '+61 400 123 459']
    })
    const handleClick = () => {
        console.log('Claim your discount!')
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                title='Preview Message'
                handleCancel={handleCancel}
                iconLeftTitle={GmailIcon}
            >
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-4 items-center'>
                        <span className='w-10'>From:</span>
                        <div className='border border-gray-300 p-3 rounded-lg w-full '>
                            <span>{formSms.from}</span>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <span className='w-10'>To:</span>
                        <div className='border border-gray-300 p-3 rounded-lg w-full'>
                            <div className='flex gap-3'>
                                {
                                    formSms.to.map((item: any, index: number) => (
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
                </div>
            </Modal>

        </>

    )
}

export default ModalSmsPreview
