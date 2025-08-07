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
    ChevronRightIcon,
    ClipboardPendingIcon,
    ProductivityIcon,
    ChartAverageIcon
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
import { Dropdown, Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import BenefitItem from '@/components/card/DetailItem'
import DonutChart from '@/components/chart/DonutChart'
// import DetailBenefit from './DetailBenefit'
import { MoreOutlined } from '@ant-design/icons'
import CardEmployee from '@/components/card/CardEmployee'
import SelectRangePicker from '@/components/date-picker/SelectRangePicker'
import ShiftSchedulerAntd from '@/components/scheduler'
import ModalPerformance from './ModalPerformance'
import Tabs, { Tab } from '@/components/tab'
import Organizational from './branch-performance'


const index = ({ data }: { data?: any }) => {
    const [activeTab, setActiveTab] = useState<string>('employee-performance');
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [openModalForm, setOpenModalForm] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [formData, setFormData] = useState({
        employee_name: '',
        role: '',
        kpi_score: '',
        attendance_score: '',
        work_quality: '',
        teamwork_communication: '',
        dicipline_compliance: '',
        evaluation_notes: ''
    })
    const [modalType, setModalType] = useState('employee-benefit')
    const [formMode, setFormMode] = useState('create')
    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Performance',
        },
    ]

    const tabs: Tab[] = [
        { key: 'employee-performance', label: 'Employee Perfromance' },
        { key: 'branch-performance', label: 'Branch Perfromance' },

    ];
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
                        <Menu.Item key="edit" onClick={() => handleOpenModal('edit')}>
                            Edit
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
                        <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleOpenModal('create')}>
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
        const value = typeof e === 'string' || Array.isArray(e)
            ? e
            : e.target.value;

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOpenModal = (type: string) => {
        setOpenModalForm(true)
        setModalType(type)
        // setFormMode(mode)
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

    return (
        <>
            {contextHolder}
            <ModalPerformance
                open={openModalForm}
                handleChange={handleChange}
                formData={formData}
                handleCancel={() => setOpenModalForm(false)}
                handleSubmit={() => setOpenModalForm(false)}
                modalType={modalType}
            // formMode={formMode}
            />

            <div className="mt-6 mb-0">
                <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start mx-6'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Performance
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
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
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    borderClass='w-full'
                />
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    {
                        activeTab == 'employee-performance' ?
                            <div className='flex flex-col gap-4'>
                                <div className='grid md:grid-cols-4 gap-4'>
                                    <Card title='Employee Evaluated' icon={EmployeeIcon}>
                                        <span className='text-4xl font-semibold text-[#0A3353]'>53</span>
                                    </Card>
                                    <Card title='Pending Evaluations' icon={ClipboardPendingIcon} bgIcon='bg-[#FF9E021A]' width={20}>
                                        <span className='text-4xl font-semibold text-[#0A3353]'>14</span>
                                    </Card>
                                    <Card title='Employee Productivity' icon={ProductivityIcon} bgIcon='bg-[#01933B1A]' width={20}>
                                        <span className='text-4xl font-semibold text-[#0A3353]'>82%</span>
                                    </Card>
                                    <Card title='Avg. Score' icon={ChartAverageIcon} bgIcon='bg-[#A329041A]'>
                                        <span className='text-4xl font-semibold text-[#0A3353]'>82,6</span>
                                    </Card>

                                </div>

                                <div className='grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-4 items-start'>
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
                                            columns={columnsBenefitEmployee}
                                            dataSource={dataBenefitEmployee}
                                        />
                                        <Pagination
                                            current={currentPage}
                                            total={dataBenefitEmployee.length}
                                            pageSize={pageSize}
                                            onChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                    <div>
                                        <div className='rounded-lg border border-[#E5E7EB] md:h-[auto] p-5 flex flex-col gap-3 overflow-auto'>
                                            <div className='flex justify-between items-center mb-3'>
                                                <h4 className='text-lg font-semibold'>Top Performance</h4>
                                                <ButtonIcon
                                                    icon={EmployeeOrangeIcon}
                                                    width={15}
                                                    color='orange'
                                                    variant='filled'
                                                />
                                            </div>
                                            <div className='w-full flex flex-col gap-4'>
                                                <CardEmployee name='Marcella Indarwati' role='UI/UX Designer' score={4.5} />
                                                <CardEmployee name='Viola Yosevi' role='Front End Developer' score={4} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <Organizational />
                    }

                </div>
            </Content>

        </>
    )
}

export default index
