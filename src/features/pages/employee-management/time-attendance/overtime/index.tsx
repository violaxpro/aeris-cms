'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Image from 'next/image'
import {
    AddIcon,
    MoreIcon,
    TrashIconRed,
    FilterIcon,
    EmployeeIcon,
    ArrowLeft,
    ArrowRight,
    ExportIcon,
    EyeIcon,
    CancelIcon
} from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import ButtonFilter from '@/components/button/ButtonAction'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import Link from 'next/link'
import StatusTag from '@/components/tag'
import dayjs from 'dayjs';
import { OvertimeType, overtimeData } from '@/plugins/types/employee-management-type'
import { Card } from '@/components/card'
import SelectDatePicker from '@/components/date-picker/SelectDatePicker'
import { Avatar } from 'antd'
import AvatarImage from "public/social-avatar.webp"
import ButtonTab from '@/components/tab/ButtonTab'

const index = ({ data }: { data?: any }) => {
    const [activeTab, setActiveTab] = useState('recap');
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(0)
    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Time & Attendance',
        },
        {
            title: 'Overtime',
        },
    ]

    const columns: TableColumnsType<OvertimeType> = [
        {
            title: 'Overtime Date',
            dataIndex: 'overtime_date',
            sorter: (a: any, b: any) => {
                return new Date(a.overtime_date).getTime() - new Date(b.overtime_date).getTime()
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.overtime_date}</span>
                    </div>
                </div>

            }
        },
        {
            title: 'Employee Name',
            dataIndex: 'employee_name',
            sorter: (a: any, b: any) => a.employee_name.localeCompare().b.employee_name,
            render: (_: any, row: any) => {
                // return row.status !== 'Draft'
                //     ? <Link href={routes.eCommerce.detailOrder(row.employee_name)}>
                //         {row.status !== 'Draft' ? row.employee_name : '-'}
                //     </Link>
                //     : <span>-</span>
                return <div className="flex w-full gap-1 items-center">
                    <Avatar style={{ backgroundColor: '#87d068' }} src={AvatarImage.src} />
                    <div className="flex flex-col justify-start gap-1">
                        <span>{row.employee_name}</span>
                        <span className=' text-gray-500'>{row.position}</span>
                    </div>
                </div>

            }
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            sorter: (a: any, b: any) => a.start_time.localeCompare(b.start_time),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.start_time}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            sorter: (a: any, b: any) => a.end_time.localeCompare(b.end_time),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.end_time}</span>
                    </div>
                </div>
            }
        },

        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a: any, b: any) => a.duration.localeCompare(b.duration),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.duration}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a: any, b: any) => a.description.localeCompare(b.description),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.description || '-'}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Attachment',
            dataIndex: 'attachment',
            sorter: (a: any, b: any) => a.attachment.localeCompare(b.attachment),
            render: (_: any, row: any) => {

                return <div className="flex flex-col w-full items-center">
                    <ButtonIcon
                        icon={EyeIcon}
                        width={20}
                        height={20}
                    />
                </div>


            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Pending', 'Rejected', 'Approved'];
                return status.indexOf(a.status) - status.indexOf(b.status
                )
            },
            render: (val: any) => {
                const status = val
                if (activeTab == 'requested') {
                    return <div className="flex w-full items-center gap-2">
                        <Button
                            label='Approve'
                        />
                        <ButtonIcon
                            icon={CancelIcon}
                            width={15}
                            height={15}
                        />
                    </div>
                } else {
                    return <StatusTag status={status} type='overtime' />
                }
            }
        },
    ]

    const months = [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        // dst...
    ];


    const tabs = [
        { key: 'recap', label: 'Recap' },
        { key: 'requested', label: 'Requested', badgeCount: overtimeData?.filter((item, index) => item.status === 'Pending').length },
    ];



    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Overtime
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <Button
                        icon={<Image
                            src={AddIcon}
                            alt='add-icon'
                            width={15}
                            height={15}
                        />}
                        label='Add Request'
                        link={routes.eCommerce.createOvertime}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between mb-4 gap-2'>
                            <div className='flex items-center gap-2'>
                                <ButtonTab
                                    tabs={tabs}
                                    activeKey={activeTab}
                                    onTabClick={setActiveTab}
                                />
                            </div>
                            <div className='flex items-center gap-2'>
                                <SearchTable
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onSearch={() => console.log('Searching for:', search)}
                                />
                                <SelectDatePicker
                                    value={selectedMonth}
                                    onChange={(selected) => setSelectedMonth(selected)}
                                    options={months}
                                />
                                {
                                    activeTab == 'recap' && <Button
                                        icon={<Image
                                            src={ExportIcon}
                                            alt='export-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Export'
                                        style={{ padding: '1.2rem' }}
                                    // link={routes.eCommerce.editQuote}
                                    />
                                }

                            </div>

                        </div>
                        <Table
                            columns={columns}
                            dataSource={overtimeData}
                        />
                        <Pagination
                            current={currentPage}
                            total={overtimeData.length}
                            pageSize={pageSize}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>

                </div>
            </Content>

        </>
    )
}

export default index
