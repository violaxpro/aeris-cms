import React, { useState } from 'react'
import Modal from '@/components/modal'
import Input from "@/components/input"
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import Divider from '@/components/divider'
import Link from 'next/link'
import Image from 'next/image';
import { GmailIcon, SentEmailWhiteIcon } from '@public/icon';
import ButtonAction from '@/components/button/ButtonAction';
import Button from '@/components/button'

type ModalSendTrackingNumberProps = {
    isModalOpen: boolean
    handleCancel: () => void
    trackingData: any
    handleSubmit?: any
}

const ModalSendTrackingNumber = ({
    handleCancel,
    isModalOpen,
    trackingData,
    handleSubmit
}: ModalSendTrackingNumberProps) => {
    const [chooseTracking, setChooseTracking] = useState<any>({})
    const [openModalPreviewEmail, setOpenModalPreviewEmail] = useState(false)
    const [formEmail, setFormEmail] = useState({
        from: 'Alarm Expert Australia admin@alarmexpert.com.au',
        to: 'Andi Saputra andisr@gmail.com'
    })
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const handleDelete = (id: any) => {
        setOpenModalDelete(true)
    }

    const dummyTrackingData = [
        {
            id: 1,
            courier_name: 'Australian Post',
            tracking_number: ['31A1111111111']
        },
        {
            id: 2,
            courier_name: 'DHL Express',
            tracking_number: ['31A222222222222222', '31A3333333333333']
        },
        {
            id: 3,
            courier_name: 'Sendle',
            tracking_number: ['31A44444444444444']
        }
    ]

    const handleClick = (data: any) => {
        console.log(data)
        setOpenModalPreviewEmail(true)
        setChooseTracking(data)
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
            {/* {
                isModalOpen &&
              
            } */}
            <Modal
                open={openModalPreviewEmail}
                title='New Message'
                handleCancel={() => setOpenModalPreviewEmail(false)}
                iconLeftTitle={GmailIcon}
            >
                <div className='flex flex-col gap-3'>
                    <Input
                        id='from'
                        label='From:'
                        type='text'
                        value={formEmail.from}
                        onChange={handleChange}
                        prefix={
                            <Avatar style={{ backgroundColor: '#87d068' }} url={AvatarImage} size='default' />
                        }
                        divClassName='flex gap-4'
                        labelClassName='w-10'
                        inputClassname='md:w-full'
                    />
                    <Input
                        id='to'
                        label='To:'
                        type='text'
                        value={formEmail.to}
                        onChange={handleChange}
                        prefix={
                            <Avatar style={{ backgroundColor: '#87d068' }} url={AvatarImage} size='default' />
                        }
                        divClassName='flex gap-4'
                        labelClassName='w-10'
                        inputClassname='md:w-full'
                    />
                    <Divider />
                    <div>
                        <span>Order #12345 Shipped – Alarm Expert</span>
                    </div>
                    <Divider />
                    <div className="space-y-4 text-sm">
                        <p>
                            Hi Andi Saputra,
                        </p>
                        <p>
                            Thank you for shopping with <b>Alarm Expert Australia</b>.<br />
                            We’re pleased to let you know that your order <b>#12345</b> has been approved and is now on its way to you.
                        </p>

                        <p>Here are your shipping details:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                <b>Courier:</b> {chooseTracking?.courier}
                            </li>
                            <li>
                                <b>Tracking Number:</b> {chooseTracking?.trackingNumber}
                            </li>
                            <li>
                                <b>Track your shipment:</b>{" "}
                                <Link href={`https://www.dhl.com/track?num=${chooseTracking?.trackingNumber}`}>
                                    https://www.dhl.com/track?num={chooseTracking?.trackingNumber}
                                </Link>
                            </li>
                        </ul>

                        <p>
                            You can use the link above to monitor the delivery status in real time.
                        </p>

                        <p>
                            If you have any questions or need further assistance, please don’t hesitate to contact our support team.
                        </p>

                        <p>
                            Best regards,<br />
                            <b>Alarm Expert Australia Team</b>
                        </p>
                    </div>
                    <Divider />

                    <div className='flex justify-end gap-3 items-center'>
                        <ButtonAction
                            label='Cancel'
                            onClick={() => {
                                setOpenModalPreviewEmail(false)
                                setChooseTracking({})
                            }}
                        />
                        <Button
                            label='Send Now'
                            icon={<Image
                                src={SentEmailWhiteIcon}
                                alt='send-icon'
                                width={15}
                                height={15}
                            />}
                            onClick={() => {
                                handleSubmit()
                                // setChooseTracking({})
                                setOpenModalPreviewEmail(false)
                                // handleCancel()
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                open={isModalOpen}
                title='Send Tracking Number'
                subtitle='Please select one of the tracking numbers below.'
                handleCancel={handleCancel}
            >
                <div className='grid md:grid-cols-2 gap-4 my-4'>
                    {dummyTrackingData.flatMap(item =>
                        item.tracking_number.map(trackingNumber => ({
                            courier: item.courier_name,
                            trackingNumber
                        }))
                    ).map((data, index) => {
                        const isActive = chooseTracking?.trackingNumber == data.trackingNumber
                        return (
                            <div
                                key={index}
                                className={`border p-4 rounded-xl 
                                    ${isActive ? 'bg-[#3666AA0D] text-[#3666AA] border-solid border-[#3666AA]'
                                        : 'border-[#E5E7EB] border-dashed'
                                    }
                                    `}
                                onClick={() => handleClick(data)}
                            >
                                <label className="text-gray-500">Tracking Number {index + 1}</label>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">{data.courier}</span>
                                    <span className="text-lg font-medium">{data.trackingNumber}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Modal >
        </>

    )
}

export default ModalSendTrackingNumber
