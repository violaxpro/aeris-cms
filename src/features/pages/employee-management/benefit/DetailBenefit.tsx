import React from 'react'
import Modal from '@/components/modal'
import Card from 'antd/es/card/Card'
import StatusTag from '@/components/tag'
import ButtonIcon from '@/components/button/ButtonIcon'
import { PencilOutlineBlueIcon, TrashIconRed } from '@public/icon'

type DetailBenefitType = {
    open: boolean
    handleCancel: () => void
    data?: any
}
const DetailBenefit = ({
    open,
    data,
    handleCancel,
}: DetailBenefitType) => {
    return (
        <Modal
            open={open}
            title='Marcella Indarwati'
            subtitle='UI/UX Designer'
            handleCancel={handleCancel}
        >
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                <Card>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center gap-3'>
                            <StatusTag status='Active' />
                            <div className='flex justify-between items-center gap-2'>
                                <ButtonIcon
                                    icon={PencilOutlineBlueIcon}
                                    width={20}
                                    color='primary'
                                    variant='filled'
                                />
                                <ButtonIcon
                                    icon={TrashIconRed}
                                    width={15}
                                    color='danger'
                                    variant='filled'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium'>Health Insurance</label>
                            <span className='text-md'>June 01, 2025 - June 01, 2026</span>
                            <span className='text-md text-gray-500'>Standard medical coverage</span>
                            <div className='flex gap-2 mt-2'>
                                <StatusTag status='Medical' />
                                <StatusTag status='Dental' />
                            </div>
                        </div>

                    </div>

                </Card>
                <Card>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center gap-3'>
                            <StatusTag status='Active' />
                            <div className='flex justify-between items-center gap-2'>
                                <ButtonIcon
                                    icon={PencilOutlineBlueIcon}
                                    width={20}
                                    color='primary'
                                    variant='filled'
                                />
                                <ButtonIcon
                                    icon={TrashIconRed}
                                    width={15}
                                    color='danger'
                                    variant='filled'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium'>Transport Allowance</label>
                            <span className='text-md'>May 01, 2025 - July 01, 2025</span>
                            <span className='text-md text-gray-500'>Up to IDR 500,000/month</span>
                            <div className='flex gap-2 mt-2'>
                                <StatusTag status='Monthly' />
                                <StatusTag status='Attendance-based' />
                            </div>
                        </div>

                    </div>

                </Card>
            </div>



        </Modal>
    )
}

export default DetailBenefit
