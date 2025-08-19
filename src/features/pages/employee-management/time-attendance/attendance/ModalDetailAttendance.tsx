import React, { useState } from 'react'
import Modal from '@/components/modal'
import Timeline from '@/components/timeline'
import Image from 'next/image'
import {
    CheckinIcon,
    BreakfastIcon,
    FinishBreakIcon,
    CheckoutBlueIcon,
    CheckoutGreyIcon,
    FlagFinishIcon,
    ProgressIcon
} from '@public/icon'
import Button from '@/components/button'
import ModalViewPhoto from './ModalViewPhoto';

type ModalDetailAttendanceType = {
    open: boolean
    data?: any
    handleCancel: () => void
}
const ModalDetailAttendance = ({ open, data, handleCancel }: ModalDetailAttendanceType) => {
    const [openPhoto, setOpenPhoto] = useState(false)
    const [detailData, setDetailData] = useState<any>(null)
    const [attendanceType, setAttendanceType] = useState('checkin')

    const handleOpenPhoto = (item: any) => {
        setOpenPhoto(true)
        setDetailData(data)
        setAttendanceType(item.type);
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

    const getLabel = (type: string) => {
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
    console.log(detailData)
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
                <Timeline
                    data={data?.summary_attendance?.steps}
                    getIcon={getIcon}
                    availableImage={true}
                    onOpenPhoto={handleOpenPhoto}
                    getLabel={getLabel}
                />

            </Modal>
        </>
    )
}

export default ModalDetailAttendance
