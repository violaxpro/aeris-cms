import React, { useState } from 'react'
import Modal from '@/components/modal'
import { Timeline, Typography, Badge } from 'antd';
import Image from 'next/image'
import {
    CheckinIcon,
    BreakfastIcon,
    FinishBreakIcon,
    CheckoutBlueIcon,
    CheckoutGreyIcon,
    PinMapBlackIcon,
    PinMapGrayIcon,
    DeviceMobileIcon,
    DeviceMobileGreyIcon,
    CommentIcon,
    CommentGreyIcon,
    FlagFinishIcon,
    GalleryIcon,
    ProgressIcon
} from '@public/icon'
import dayjs from 'dayjs'
import ButtonIcon from '@/components/button/ButtonIcon';
import StatusTag from '@/components/tag';
import Button from '@/components/button'
import ModalViewPhoto from './ModalViewPhoto';

const { Text, Title, Paragraph } = Typography;

type ModalDetailAttendanceType = {
    open: boolean
    data?: any
    handleCancel: () => void
}
const ModalDetailAttendance = ({ open, data, handleCancel }: ModalDetailAttendanceType) => {
    const [openPhoto, setOpenPhoto] = useState(false)
    const [detailData, setDetailData] = useState<any>(null)
    const [attendanceType, setAttendanceType] = useState('checkin')

    const handleOpenPhoto = () => {
        setOpenPhoto(true)
        setDetailData(data)
    }
    const getIcon = (type: any) => {
        switch (type) {
            case 'checkin':
                return CheckinIcon
            case 'startbreak':
                return BreakfastIcon
            case 'finishbreak':
                return FinishBreakIcon
            case 'checkout':
                return data?.summary_attendance?.status == 'In Progress' ? CheckoutGreyIcon : CheckoutBlueIcon
            default:
                return null;
        }
    };

    return (
        <>
            <ModalViewPhoto
                open={openPhoto}
                handleCancel={() => setOpenPhoto(false)}
                data={detailData}
                attendanceType={attendanceType}
            />
            <Modal
                open={open}
                title='Attendance Record'
                subtitle={data?.employee_name}
                date={data?.date}
                handleCancel={handleCancel}
                rightButton={
                    <Button
                        label={data?.summary_attendance?.status}
                        icon={
                            <Image
                                src={data?.summary_attendance?.status === 'In Progress' ? ProgressIcon : FlagFinishIcon}
                                alt='icon'
                            />
                        }
                        shape='round'
                        variant='filled'
                        btnClassname={`!border-none ${data?.summary_attendance?.status === 'In Progress' ? '!bg-[#0397B91A] !text-[#0397B9]' : '!bg-[#C202051A] !text-[#C20205]'} `}
                    />
                }
            >
                <Timeline>
                    {data?.summary_attendance?.steps.map((step: any, idx: any) => {
                        const isDisabled = !step.device || !step.location || !step.time;
                        const getType = (type: string) => {
                            let attendanceType
                            if (type == 'checkin') {
                                attendanceType = 'Check In'
                            } else if (type == 'startbreak') {
                                attendanceType = 'Start Break'
                            } else if (type == 'finishbreak') {
                                attendanceType = 'Finish Break'
                            } else {
                                attendanceType = 'Check Out'
                            }
                            return attendanceType
                        }
                        return (
                            <Timeline.Item
                                key={idx}
                                dot={
                                    <ButtonIcon
                                        icon={getIcon(step.type)}
                                        shape='circle'
                                        variant='filled'
                                        color={isDisabled ? 'default' : 'blue'}
                                        width={15}
                                        height={15}
                                    />}
                            >
                                <div className='flex flex-col'>
                                    <div className='flex justify-between items-center -mt-2'>
                                        <label className={`text-lg font-semibold ${isDisabled ? 'text-[#787878]' : ''}`}>
                                            {/* {step.type
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/^./, (str: any) => str.toUpperCase())} */}
                                            {
                                                getType(step?.type)
                                            }
                                        </label>
                                        <div className='flex gap-2 items-center'>
                                            {
                                                (step.type == 'checkin' || step.type == 'checkout') && !isDisabled
                                                && <ButtonIcon
                                                    icon={GalleryIcon}
                                                    width={18}
                                                    height={18}
                                                    shape='circle'
                                                    variant='solid'
                                                    className='!bg-[var(--default-color)]'
                                                    onClick={() => {
                                                        if (step.type == 'checkin') {
                                                            setAttendanceType('checkin')
                                                        } else {
                                                            setAttendanceType('checkout')
                                                        }
                                                        setOpenPhoto(true)
                                                        setDetailData(data)
                                                    }}
                                                />
                                            }
                                            <Button
                                                label={step.time || '00:00:00'}
                                                shape='round'
                                                variant='filled'
                                                btnClassname={`!border-none 
                                            ${isDisabled
                                                        ? '!bg-[#F4F4F4] !text-[#787878]'
                                                        : '!bg-[#3666AA1A] !text-[#3666AA]'}`
                                                }
                                            />
                                        </div>
                                    </div>

                                    <Paragraph>
                                        <div className='flex gap-2'>
                                            <Image
                                                src={isDisabled ? DeviceMobileGreyIcon : DeviceMobileIcon}
                                                alt='device-icon'
                                            />
                                            <span className={`${isDisabled ? 'text-[#787878]' : ''}`}>
                                                {step.device || 'Employee Device'}
                                            </span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Image
                                                src={isDisabled ? PinMapGrayIcon : PinMapBlackIcon}
                                                alt='pin-map-icon'
                                            />
                                            <span className={`${isDisabled ? 'text-[#787878]' : ''}`}>
                                                {step.location || 'Employee Location'}
                                            </span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Image
                                                src={isDisabled ? CommentGreyIcon : CommentIcon}
                                                alt='comment-icon'
                                            />
                                            <span className={`${isDisabled ? 'text-[#787878]' : ''}`}>
                                                {step.comment || 'No Comment'}
                                            </span>
                                        </div>
                                    </Paragraph>
                                </div>

                            </Timeline.Item>
                        )
                    })}
                </Timeline>

            </Modal>
        </>
    )
}

export default ModalDetailAttendance
