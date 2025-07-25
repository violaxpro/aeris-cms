'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Image from 'next/image'
import { AddIcon, MoreIcon, TrashIconRed, FilterIcon, EmployeeIcon, ArrowLeft, ArrowRight, ExportIcon } from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import ButtonFilter from '@/components/button/ButtonAction'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonAction from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import Link from 'next/link'
import StatusTag from '@/components/tag'
import dayjs from 'dayjs';
import { attendanceData, AttendanceType } from '@/plugins/types/employee-management-type'
import { Card } from '@/components/card'
import SelectDatePicker from '@/components/date-picker/SelectDatePicker'

const index = ({ data }: { data?: any }) => {
    const today = dayjs(); // Hari ini
    const [dayOffset, setDayOffset] = useState(0);
    const [activeDay, setActiveDay] = useState(today)
    const days = Array.from({ length: 9 }, (_, i) =>
        // today.add(dayOffset + i, 'day')
        activeDay.clone().add(i - 4, 'day')
    );
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
            title: 'Attendance',
        },
    ]

    const columns: TableColumnsType<any> = [
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
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.employee_name}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        <span className=' text-gray-500'>{row.position}</span>
                    </div>
                </div>

            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Draft', 'Approved', 'Processing', 'Awaiting Stock', 'Packed', 'Ready for Pickup', 'Shipped', 'In Transit',
                    'Out of Delivery'
                ];
                return status.indexOf(a.status) - status.indexOf(b.status
                )
            },
            render: (val: any) => {
                const status = val
                return (
                    <StatusTag status={status} type='attendance' />
                );

            }
        },
        {
            title: 'Check In',
            dataIndex: 'check_in',
            sorter: (a: any, b: any) => a.check_in.localeCompare(b.check_in),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.check_in}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Break',
            dataIndex: 'break',
            sorter: (a: any, b: any) => a.break.localeCompare(b.break),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.break}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Check Out',
            dataIndex: 'check_out',
            sorter: (a: any, b: any) => a.check_out.localeCompare(b.check_out),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.check_out}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Overtime',
            dataIndex: 'overtime',
            sorter: (a: any, b: any) => a.overtime.localeCompare(b.overtime),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.overtime}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Notes',
            dataIndex: 'note',
            sorter: (a: any, b: any) => a.note.localeCompare(b.note),
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.note || '-'}</span>
                    </div>
                </div>
            }
        },
    ]

    const months = [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        // dst...
    ];


    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Attendance
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
                        label='Add Attendance'
                        link={routes.eCommerce.createAttendance}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className='grid md:grid-cols-4 gap-4'>
                            <Card title='On Time' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>60</span>
                            </Card>
                            <Card title='Late' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>3</span>
                            </Card>
                            <Card title='Absent' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>2</span>
                            </Card>
                            <Card title='On Leave' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>1</span>
                            </Card>

                        </div >

                        <div className='grid md:grid-cols-[50px_repeat(9,1fr)_50px] gap-4 items-center'>
                            <div
                                onClick={() => {
                                    // setDayOffset(prev => prev - 1);
                                    setActiveDay(prev => prev.clone().subtract(1, 'days'));
                                }}
                                className="flex items-center justify-center border min-h-[100px] rounded-xl border-[#E5E7EB] hover:bg-gray-200 transition"
                            >
                                <Image
                                    src={ArrowLeft}
                                    alt='arrow-icon'
                                    width={25}
                                    height={25}
                                />
                            </div>
                            {
                                days.map((date, index) => {
                                    const isToday = date.isSame(today, 'day');
                                    const isActive = date.isSame(activeDay, 'day');
                                    const month = date.format('MMMM');
                                    const day = date.format('D');
                                    const dayName = date.format('dddd');
                                    const bgClass = isActive
                                        ? 'bg-[#3666AA] text-white min-h-[120px] shadow-lg scale-[1.05]'
                                        : 'bg-white text-black min-h-[100px]';
                                    return (
                                        <div
                                            key={index}
                                            className={`
                                                    border p-4 rounded-xl border-[#E5E7EB]
                                                    transition-all duration-300 ease-in-out
                                                    flex justify-center overflow-auto
                                                    ${bgClass}
                                                }`}
                                        >
                                            <div className='flex flex-col items-center gap-2'>
                                                <h4>{month}</h4>
                                                <span className={`${isActive && 'text-2xl font-semibold'}`}>{day}</span>
                                                <span className={`${isActive && 'text-lg font-semibold'}`}>{isToday ? 'Today' : dayName}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div
                                onClick={() => {
                                    // setDayOffset(prev => prev + 1);
                                    setActiveDay(prev => prev.clone().add(1, 'days'));
                                }}
                                className="flex items-center justify-center border min-h-[100px] rounded-xl border-[#E5E7EB] hover:bg-gray-200 transition"
                            >
                                <Image
                                    src={ArrowRight}
                                    alt='arrow-icon'
                                    width={25}
                                    height={25}
                                />
                            </div>

                        </div>
                        <div className='flex justify-between mb-4 gap-2'>
                            <div className='flex items-center gap-2'>
                                <ShowPageSize
                                    pageSize={pageSize}
                                    onChange={setPageSize}
                                />
                                <ButtonFilter
                                    label='Filter by'
                                    icon={<Image
                                        src={FilterIcon}
                                        alt='filter-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    onClick={() => setisOpenModalFilter(true)}
                                    position='end'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                />
                                <SearchTable
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onSearch={() => console.log('Searching for:', search)}
                                />

                            </div>
                            <div className='flex items-center gap-2'>
                                <SelectDatePicker
                                    value={selectedMonth}
                                    onChange={(selected) => setSelectedMonth(selected)}
                                    options={months}
                                />
                                <Button
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
                            </div>

                        </div>
                        <Table
                            columns={columns}
                            dataSource={attendanceData}
                        />
                        <Pagination
                            current={currentPage}
                            total={attendanceData.length}
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
