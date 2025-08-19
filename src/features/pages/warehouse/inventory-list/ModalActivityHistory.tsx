import React, { useState } from 'react'
import Modal from '@/components/modal'
import Timeline from '@/components/timeline'
import Image from 'next/image'
import {
    BoxIcon,
    BoxOutIcon,
    ArrowReturnIcon,
    TransferStockIcon,
    ReservationOrderIcon,
    ReturnIcon,
    CheckinIcon,
    BreakfastIcon,
    FinishBreakIcon,
    CheckoutBlueIcon,
    CheckoutGreyIcon,
    ProgressIcon
} from '@public/icon'
import Button from '@/components/button'
import dayjs from 'dayjs'

type ModalActivityHistoryType = {
    open: boolean
    data?: any
    handleCancel: () => void
}

const ItemProductHistory = ({ label, value }: { label: string, value: string }) => {
    return <div className='flex flex-row'>
        <label className='w-30 font-semibold'>{label}</label>
        <span>{value}</span>
    </div>
}
const ModalActivityHistory = ({ open, data, handleCancel }: ModalActivityHistoryType) => {
    const [openPhoto, setOpenPhoto] = useState(false)
    const [detailData, setDetailData] = useState<any>(null)
    const [attendanceType, setAttendanceType] = useState('checkin')
    console.log(data)

    const handleOpenPhoto = (item: any) => {
        setOpenPhoto(true)
        setDetailData(data)
        setAttendanceType(item.type);
    }

    const getIcon = (type: any) => {
        switch (type) {
            case 'stock_in':
                return BoxIcon
            case 'stock_out':
                return BoxOutIcon
            case 'transfer':
                return TransferStockIcon
            case 'reservation':
                return ReservationOrderIcon
            case 'rma':
                return ReturnIcon
            case 'rma_replace':
                return ArrowReturnIcon

            default:
                return null;
        }
    };

    if (!data) return null
    return (
        <>
            <Modal
                open={open}
                title={data.location}
                handleCancel={handleCancel}
                rightButton={
                    <Button
                        label={data.status}
                        icon={
                            <Image
                                src={ProgressIcon}
                                alt='icon'
                            />
                        }
                        shape='round'
                        variant='filled'
                        btnClassname={`!border-non !bg-[#0397B91A] !text-[#0397B9] `}
                    />
                }
            >
                <div className='flex flex-col gap-8'>
                    <div className='flex md:flex-row flex-col justify-between'>
                        <div>
                            <ItemProductHistory label='Replace' value={data.serial_number} />
                            <ItemProductHistory label='Old' value={data.old_serial_number} />
                            <ItemProductHistory label='Purchase Date' value={dayjs(data.purchase_date).format('DD/MM/YYYY, HH:MM')} />
                            <ItemProductHistory label='Warranty Start' value={dayjs(data.warranty_start).format('DD/MM/YYYY, HH:MM')} />
                        </div>
                        <div>
                            <ItemProductHistory label='Order ID' value={data.order_id} />
                            <ItemProductHistory label='PO' value={data.po_number} />
                            <ItemProductHistory label='Sold Date' value={dayjs(data.sold_date).format('DD/MM/YYYY, HH:MM')} />
                            <ItemProductHistory label='Warranty End' value={dayjs(data.warranty_end).format('DD/MM/YYYY, HH:MM')} />
                        </div>
                    </div>
                    <Timeline
                        data={data.history_detail}
                        getIcon={getIcon}
                    />

                </div>

            </Modal>
        </>
    )
}

export default ModalActivityHistory
