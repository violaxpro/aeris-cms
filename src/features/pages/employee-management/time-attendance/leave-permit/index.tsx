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
import { LeavePermitType, leavePermitData } from '@/plugins/types/employee-management-type'
import { Card } from '@/components/card'
import SelectDatePicker from '@/components/date-picker/SelectDatePicker'
import { Avatar } from 'antd'
import AvatarImage from "public/social-avatar.webp"
import ButtonTab from '@/components/tab/ButtonTab'
import ModalLeavePermit from './ModalLeavePermit'
import CalendarComponent from '@/components/calendar'
import dayjs, { Dayjs } from 'dayjs';

const index = ({ data }: { data?: any }) => {
    const [activeTab, setActiveTab] = useState('recap');
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());

    const [openModalForm, setOpenModalForm] = useState(false)
    const [formData, setFormData] = useState({
        full_name: '',
        start_time: '',
        end_time: '',
        description: '',
        file_attachment: [],
        leave_type: '',
        start_date: '',
        end_date: '',
        date: '',
    })
    const dataPending = leavePermitData?.filter((item, index) => item.status === 'Pending')

    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Time & Attendance',
        },
        {
            title: 'Leave & Permit',
        },
    ]

    const columns: TableColumnsType<LeavePermitType> = [
        {
            title: 'Employee Name',
            dataIndex: 'employee_name',
            sorter: (a: any, b: any) => a.employee_name.localeCompare().b.employee_name,
            render: (_: any, row: any) => {
                return <div className="flex w-full gap-1 items-center">
                    <Avatar style={{ backgroundColor: '#87d068' }} src={AvatarImage.src} />
                    <div className="flex flex-col justify-start gap-1">
                        <span>{row.employee_name}</span>
                        <span className=' text-gray-500'>{row.email}</span>
                    </div>
                </div>

            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            sorter: (a: any, b: any) => a.role.localeCompare().b.role,
            render: (_: any, row: any) => {
                return <span>{row.role}</span>

            }
        },
        {
            title: 'Leave Type',
            dataIndex: 'leave_type',
            sorter: (a: any, b: any) => a.leave_type.localeCompare().b.leave_type,
            render: (_: any, row: any) => {
                return <span>{row.leave_type}</span>

            }
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            sorter: (a: any, b: any) => a.start_date.localeCompare(b.start_date),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.start_date}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            sorter: (a: any, b: any) => a.end_date.localeCompare(b.end_date),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.end_date}</span>
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
                    return <StatusTag status={status} type='time' />
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
        { key: 'requested', label: 'Requested', badgeCount: dataPending.length },
        { key: 'calendar', label: 'Calendar' },

    ];

    const handleChange = (field: string) => (
        e: any
    ) => {
        let value
        if (dayjs.isDayjs(e) || e === null) {
            value = e ? e.format('YYYY-MM-DD') : '';
        }
        // Jika event input biasa
        else if (e && typeof e === 'object' && 'target' in e) {
            value = e.target.value;
        }
        // Jika string langsung dari Select
        else {
            value = e;
        }
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };



    return (
        <>
            {contextHolder}
            <ModalLeavePermit
                open={openModalForm}
                handleChange={handleChange}
                formData={formData}
                handleCancel={() => setOpenModalForm(false)}
                handleSubmit={() => setOpenModalForm(false)}
            />
            <div className="mt-6 mx-4 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Leave & Permit
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
                        onClick={() => setOpenModalForm(true)}
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
                                    onChange={(val) => setSelectedMonth(val || dayjs())}
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
                        {
                            activeTab == 'calendar'
                                ? <CalendarComponent />
                                :
                                <>
                                    <Table
                                        columns={columns}
                                        dataSource={activeTab == 'recap' ? leavePermitData : dataPending}
                                    />
                                    <Pagination
                                        current={currentPage}
                                        total={activeTab == 'recap' ? leavePermitData.length : dataPending.length}
                                        pageSize={pageSize}
                                        onChange={(page) => setCurrentPage(page)}
                                    />
                                </>
                        }

                    </div>

                </div>
            </Content>

        </>
    )
}

export default index
