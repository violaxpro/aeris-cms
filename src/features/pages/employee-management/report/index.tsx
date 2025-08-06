'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Image from 'next/image'
import {
    EmployeeIcon,
    ExportIcon,
    MoreBlackIcon,
    EmployeeOrangeIcon,
    PlusFilledIcon,
    LegendPurpleIcon
} from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import type { TableColumnsType } from 'antd'
import Link from 'next/link'
import StatusTag from '@/components/tag'
import { Card } from '@/components/card'
import SelectDatePicker from '@/components/date-picker/SelectDatePicker'
import { Avatar } from 'antd'
import AvatarImage from "public/social-avatar.webp"
import { Dropdown, Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import CardTopPerformanceReport from '@/components/card/CardTopPerformanceReport'
import Progress from '@/components/progress'
import ButtonTab from '@/components/tab/ButtonTab'
import BarChart from '@/components/chart/BarChart'
import AreaChart from '@/components/chart/AreaChart'
import dayjs, { Dayjs } from 'dayjs'

const index = ({ data }: { data?: any }) => {
    const [attendanceTab, setAttendanceTab] = useState('week');
    const [overtimeTab, setOvertimeTab] = useState('week');
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
    const [openModalForm, setOpenModalForm] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [formData, setFormData] = useState({
        employee_name: [],
        benefit_name: '',
        start_date: '',
        end_date: '',
        description: '',
        benefit_type: '',
        tags: []
    })
    const [modalType, setModalType] = useState('employee-benefit')
    const [formMode, setFormMode] = useState('create')
    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Report',
        },
    ]
    const categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const categories_month = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    const seriesName = ['On Time', 'Late', 'Absent', 'On Leave'];
    const data_chart = [
        [44, 55, 41, 64, 70, 50],
        [53, 32, 33, 52, 30, 45],
        [50, 20, 60, 35, 55, 80],
        [20, 45, 55, 76, 90, 20],
    ];
    const data_chart_month = [
        [44, 55, 41, 64],
        [40, 50, 40, 60],
        [30, 70, 35, 65],
        [45, 55, 45, 59],
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
        const value = typeof e === 'string' || Array.isArray(e)
            ? e
            : e.target.value;

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

    const tabs = [
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
    ];

    const overtime_analytics_data_week = [
        {
            name: 'Week 1',
            data: [10, 20, 15, 30, 25, 40, 50]
        }
    ]

    const overtime_analytics_data_month = [
        {
            name: 'Overtime Analytics',
            data: [55, 35, 65, 60]
        },
    ]
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Report
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <SelectDatePicker
                            value={selectedMonth}
                            onChange={(val) => setSelectedMonth(val || dayjs())}
                        />
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

                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className='grid md:grid-cols-[2fr_345px] gap-3'>
                            <div className='rounded-lg border border-[#E5E7EB] md:max-h-160 overflow-auto p-6'>
                                <div className='flex flex-col mb-3'>
                                    <h4 className='text-lg font-semibold'>Attendance Analytics</h4>
                                    <div className='flex md:flex-row flex-col md:justify-between md:items-center mt-2'>
                                        <div className='flex gap-4 items-center'>
                                            <h4 className='md:text-3xl text-[#0A3353]'>60
                                                <span className='text-[#9D9D9D] text-sm'> On Time</span>
                                            </h4>
                                            <h4 className='md:text-3xl text-[#0A3353]'>5
                                                <span className='text-[#9D9D9D] text-sm'> Late</span>
                                            </h4>
                                            <h4 className='md:text-3xl text-[#0A3353]'>2
                                                <span className='text-[#9D9D9D] text-sm'> Absent</span>
                                            </h4>
                                            <h4 className='md:text-3xl text-[#0A3353]'>8
                                                <span className='text-[#9D9D9D] text-sm'> On Leave</span>
                                            </h4>
                                        </div>
                                        <ButtonTab
                                            tabs={tabs}
                                            activeKey={attendanceTab}
                                            onTabClick={setAttendanceTab}
                                        />
                                    </div>

                                </div>
                                <div className='overflow-y-auto'>
                                    <BarChart
                                        categories={attendanceTab == 'week' ? categories : categories_month}
                                        data={attendanceTab == 'week' ? data_chart : data_chart_month}
                                        title=""
                                        seriesName={seriesName}
                                        color={['#3666AA', '#4B8BE5', '#FF928A', '#CECECE']}
                                        height={450}
                                        columnWidth='70%'
                                        fill_type='solid'
                                    />
                                </div>

                            </div>
                            <div className='grid gap-3'>
                                <Card title='Active Employee Rate' icon={EmployeeIcon} className='md:max-h-50'>
                                    <div className='flex flex-col gap-5'>
                                        <span className='text-2xl font-semibold text-[#0A3353]'>96%</span>
                                        <Progress
                                            completed={96}
                                            total={100}
                                            size={[270, 15]}
                                            strokeColor="#3666AA"
                                            isShowLabelProgress={false}
                                        />
                                    </div>
                                </Card>
                                <Card title='Weekly Attendance Rate' icon={EmployeeIcon} className='md:max-h-50'>
                                    <div className='flex flex-col gap-5'>
                                        <span className='text-2xl font-semibold text-[#0A3353]'>92%</span>
                                        <Progress
                                            completed={92}
                                            total={100}
                                            size={[270, 15]}
                                            strokeColor="#3666AA"
                                            isShowLabelProgress={false}
                                        />
                                    </div>

                                </Card>
                                <Card title='Avg. Performance Score' icon={EmployeeIcon} className='md:max-h-50'>
                                    <div className='flex flex-col gap-5'>
                                        <span className='text-2xl font-semibold text-[#0A3353]'>82.6</span>
                                        <Progress
                                            completed={82.6}
                                            total={100}
                                            size={[270, 15]}
                                            strokeColor="#3666AA"
                                            isShowLabelProgress={false}
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>


                        <div className='grid md:grid-cols-[1fr_2fr] grid-cols-1 gap-4 items-start'>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[665px] p-5 flex flex-col gap-3 overflow-auto'>
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
                                    <CardTopPerformanceReport name='Marcella Indarwati' role='UI/UX Designer' score={4.5} />
                                    <CardTopPerformanceReport name='Viola Yosevi' role='Front End Developer' score={4} />
                                    <CardTopPerformanceReport name='Marcella Indarwati' role='UI/UX Designer' score={4.5} />
                                    <CardTopPerformanceReport name='Viola Yosevi' role='Front End Developer' score={4} />
                                    <CardTopPerformanceReport name='Marcella Indarwati' role='UI/UX Designer' score={4.5} />
                                </div>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[665px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col justify-between mb-4 gap-2'>
                                    <div className='flex justify-between'>
                                        <h4 className='text-lg font-semibold'>Overtime Analytics</h4>
                                        <ButtonTab
                                            tabs={tabs}
                                            activeKey={overtimeTab}
                                            onTabClick={setOvertimeTab}
                                        />
                                    </div>
                                    <AreaChart
                                        categories={overtimeTab == 'week' ? categories : categories_month}
                                        series={overtimeTab == 'week' ? overtime_analytics_data_week : overtime_analytics_data_month}
                                        showLegend={false}
                                        color={'#8979FF'}
                                        height={500}
                                    />
                                    <div className='flex gap-4 justify-center'>
                                        <div className='flex gap-2'>
                                            <Image
                                                src={LegendPurpleIcon}
                                                alt='legend-icon'
                                            />
                                            <span>Week 1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
