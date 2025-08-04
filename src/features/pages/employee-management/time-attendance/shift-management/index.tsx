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
    MoreBlackIcon,
    AddBlackIcon,
    EmployeeOrangeIcon,
    PlusFilledIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import ButtonFilter from '@/components/button/ButtonAction'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import Link from 'next/link'
import StatusTag from '@/components/tag'
import dayjs from 'dayjs';
import { employeeData, EmployeeType } from '@/plugins/types/employee-management-type'
import { Card } from '@/components/card'
import SelectDatePicker from '@/components/date-picker/SelectDatePicker'
import { Avatar } from 'antd'
import AvatarImage from "public/social-avatar.webp"
// import FormBenefit from './FormBenefit'
import { Dropdown, Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import BenefitItem from '@/components/card/DetailItem'
import DonutChart from '@/components/chart/DonutChart'
// import DetailBenefit from './DetailBenefit'
import { MoreOutlined } from '@ant-design/icons'
import CardEmployee from '@/components/card/CardEmployee'
import SelectRangePicker from '@/components/date-picker/SelectRangePicker'
import ShiftScheduler from '@/components/scheduler'
import ModalShift from './ModalShift'
import ScheduleTable from '@/components/scheduler/SchedulerShift'

const index = ({ data }: { data?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [openModalForm, setOpenModalForm] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [formData, setFormData] = useState({
        shift_type: '',
        start_time: '',
        end_time: '',
        apply_on_days: [],
        apply_on_weeks_of_month: [],
        assign_to: [],
        repeat_weekly: false
    })
    const [modalType, setModalType] = useState('employee-benefit')
    const [formMode, setFormMode] = useState('create')
    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Shift Management',
        },
    ]

    const columnsBenefitEmployee: TableColumnsType<any> = [
        {
            title: 'Employee Name',
            dataIndex: 'employee_name',
            sorter: (a: any, b: any) => a.employee_name.localeCompare().b.employee_name,
            render: (_: any, row: any) => {
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
            title: 'Role',
            dataIndex: 'role',
            sorter: (a: any, b: any) => a.role.localeCompare().b.role,
            render: (_: any, row: any) => {
                return <span>{row.role}</span>
            }
        },
        {
            title: 'Final Score',
            dataIndex: 'final_score',
            sorter: (a: any, b: any) => a.final_score - b.final_score,
            render: (_: any, row: any) => {
                return <span>{row.final_score || '-'}</span>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Done', 'Pending'];
                return status.indexOf(a.status) - status.indexOf(b.status
                )
            },
            render: (val: any) => {
                const status = val
                return (
                    <StatusTag status={status} />
                );
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, row: any) => {
                const isStatusPending = row.status == 'Pending'
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editEmployee(row.employee_id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="detail">
                            <Link href={routes.eCommerce.detailPerformance(row.employee_id)}>
                                Detail
                            </Link>
                        </Menu.Item>
                    </Menu>
                );

                if (isStatusPending) {
                    return (
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <Image
                                src={PlusFilledIcon}
                                alt='plus-icon'
                                width={20}
                                height={20}
                            />
                        </div>
                    );
                } else {
                    return (
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <Dropdown overlay={menu} trigger={['click']} >
                                <Image
                                    src={MoreBlackIcon}
                                    alt='more-icon'
                                    width={20}
                                    height={20}
                                />
                            </Dropdown >
                        </div>

                    );
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

    const handleChange = (field: string) => (
        e: any | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        let value;

        if (typeof e === 'string' || Array.isArray(e)) {
            value = e;
        } else if (typeof e === 'boolean') {
            value = e;
        } else if (e?.target?.type === 'checkbox') {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOpenModal = (type: string, mode: string) => {
        setOpenModalForm(true)
        setModalType(type)
        setFormMode(mode)
    }

    const dataChart = [
        {
            label: 'Insurance',
            sublabel: 'Health Insurance',
            value: 24,
            color: '#002B49',
        },
        {
            label: 'Allowance',
            sublabel: 'Transport Allowance',
            value: 12,
            color: '#5583F0',
        },
        {
            label: 'Scholarship',
            sublabel: 'Academic Support',
            value: 6,
            color: '#79ACFF',
        },
    ]

    const dataBenefitEmployee = [
        {
            id: 1,
            employee_id: '323212',
            employee_name: 'Yuliana Dwi',
            role: 'Front End Developer',
            status: 'Done',
            final_score: 90
        },
        {
            id: 2,
            employee_id: '323213',
            employee_name: 'Marcella Indarwati',
            role: 'UI/UX Designer',
            status: 'Pending',
            final_score: ''
        }
    ]


    const mobileMenu = (
        <Menu>
            <Menu.Item key="filter" onClick={() => setisOpenModalFilter(true)}>
                Filter
            </Menu.Item>
            <Menu.Item key="export" >
                Export
            </Menu.Item>
            <Menu.Item key="showPageSize">
                <ShowPageSize pageSize={pageSize} onChange={setPageSize} />
            </Menu.Item>
        </Menu>
    );

    const employeeData = [
        {
            key: '1',
            name: 'Marcella Indarwati',
            role: 'UI/UX Designer',
            avatar: 'https://via.placeholder.com/40',
            start_time: ['08:00 AM'],
            end_time: ['04:00 PM'],
            apply_on_days: ['Monday', 'Tuesday'],
            apply_on_week_of_mont: ['Week 1', 'Week 2'],
            type: 'Shift 1'
            // Monday: [{ type: 'Shift 1', time: '08:00 AM - 04:00 PM' }],
            // Friday: [{ type: 'Shift 1', time: '08:00 AM - 04:00 PM' }],
        },
        {
            key: '2',
            name: 'Yuliana Dwi',
            role: 'Front End Developer',
            avatar: 'https://via.placeholder.com/40',
            start_time: ['12:00 AM'],
            end_time: ['08:00 AM'],
            apply_on_days: ['Wednesday', 'Thursday'],
            apply_on_week_of_mont: ['Week 1', 'Week 4'],
            type: 'Shift 2'
        },
        {
            key: '3',
            name: 'Cahyo Nur',
            role: 'Back End Developer',
            avatar: 'https://via.placeholder.com/40',
            start_time: ['04:00 PM'],
            end_time: ['12:00 AM'],
            apply_on_days: ['Thursday', 'Friday'],
            apply_on_week_of_mont: ['Week 1', 'Week 4'],
            type: 'Shift 3'
        },
        // Tambahkan lainnya sesuai kebutuhan
    ];

    return (
        <>
            {contextHolder}
            <ModalShift
                open={openModalForm}
                handleChange={handleChange}
                formData={formData}
                handleCancel={() => setOpenModalForm(false)}
                handleSubmit={() => setOpenModalForm(false)}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Shift Management
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
                        label='Create New Shift'
                        style={{ padding: '1.2rem' }}
                        onClick={() => setOpenModalForm(true)}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className=' gap-4 items-start'>
                            <div className='flex flex-col justify-between mb-4 gap-2'>
                                <div className="flex gap-2 items-center justify-between md:hidden">
                                    <SearchTable
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onSearch={() => console.log('Searching for:', search)}
                                    />
                                    <Dropdown overlay={mobileMenu} trigger={['click']}>
                                        <button className="p-2 border rounded">
                                            <MoreOutlined />
                                        </button>
                                    </Dropdown>
                                </div>
                                <div className='md:flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hidden'>
                                    <div className='flex items-center gap-2'>
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

                                    <div className='flex gap-4 items-center'>
                                        <ButtonIcon
                                            icon={ChevronLeftIcon}
                                            className='cursor-pointer p-4'
                                            width={8}
                                        />
                                        <SelectRangePicker />
                                        <ButtonIcon
                                            icon={ChevronRightIcon}
                                            className='cursor-pointer'
                                            width={8}
                                        />
                                    </div>
                                </div>
                                <ShiftScheduler data={employeeData} />
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
