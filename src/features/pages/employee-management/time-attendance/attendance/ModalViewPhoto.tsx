import React from 'react'
import Modal from '@/components/modal'
import Image from 'next/image'
import dayjs from 'dayjs'

type ModalViewPhotoType = {
    open: boolean
    data?: any
    handleCancel: () => void
    attendanceType: string
}
const ModalViewPhoto = ({ open, data, handleCancel, attendanceType }: ModalViewPhotoType) => {
    const findImage = data?.summary_attendance?.steps?.find((item: any) => {
        return item?.type?.includes(attendanceType)
    })
    console.log(findImage)
    return (
        <Modal
            open={open}
            title={attendanceType == 'checkin' ? 'Check In' : 'Check Out'}
            subtitle={data?.employee_name}
            date={data?.date}
            handleCancel={handleCancel}
        >
            <Image
                src={findImage?.image}
                alt='image'
                width={600}
                height={0}
            />
        </Modal>
    )
}

export default ModalViewPhoto
