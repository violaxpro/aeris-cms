import React from 'react'
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
    DeviceMobileIcon,
    CommentIcon
} from '@public/icon'
import dayjs from 'dayjs'
import ButtonIcon from '@/components/button/ButtonIcon';

const { Text, Title, Paragraph } = Typography;

type ModalDetailAttendanceType = {
    open: boolean
    data?: any
    handleCancel: () => void
}
const ModalDetailAttendance = ({ open, data, handleCancel }: ModalDetailAttendanceType) => {
    const getIcon = (type: any) => {
        switch (type) {
            case 'checkin':
                return CheckinIcon
            case 'startbreak':
                return BreakfastIcon
            case 'finishbreak':
                return FinishBreakIcon
            case 'checkout':
                return CheckoutBlueIcon
            default:
                return null;
        }
    };
    return (
        <Modal
            open={open}
            title='Attendance Record'
            subtitle='Marcella Indarwati'
            date='Wednesday, 7 August 2025'
            handleCancel={handleCancel}
            rightButton={<Badge
                status={data?.status === 'In Progress' ? 'processing' : 'success'}
                text={data?.status}
            />}
        >
            <div className="mb-4">

            </div>

            <Timeline>
                {data?.steps.map((step: any, idx: any) => (
                    <Timeline.Item key={idx} dot={
                        <ButtonIcon
                            icon={getIcon(step.type)}
                            shape='circle'
                            variant='filled'
                            color='blue'
                            width={15}
                            height={15}
                        />}>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between items-center'>
                                <label className='text-lg font-semibold'>
                                    {step.type
                                        .replace(/([A-Z])/g, ' $1')
                                        .replace(/^./, (str: any) => str.toUpperCase())}
                                </label>
                                <Text type="secondary">{step.time || '00:00:00'}</Text>
                            </div>

                            <Paragraph>
                                <div className='flex gap-2'>
                                    <Image
                                        src={DeviceMobileIcon}
                                        alt='device-icon'
                                    />
                                    {step.device || 'Employee Device'}
                                </div>
                                <div className='flex gap-2'>
                                    <Image
                                        src={PinMapBlackIcon}
                                        alt='pin-map-icon'
                                    />
                                    {step.location || 'Employee Location'}
                                </div>
                                <div className='flex gap-2'>
                                    <Image
                                        src={CommentIcon}
                                        alt='comment-icon'
                                    />
                                    {step.comment || 'No Comment'}
                                </div>
                            </Paragraph>
                        </div>

                    </Timeline.Item>
                ))}
            </Timeline>

        </Modal>
    )
}

export default ModalDetailAttendance
