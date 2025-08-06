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
    LegendPurpleIcon,
    ChevronLeftBlackIcon,
    CalendarTodayIcon,
    CalendarWeekIcon,
    CalendarMonthIcon,
    PersonIcon,
    ChevronLeftIcon,
    ChevronRightIcon
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
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import { Dropdown, Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import CardTopPerformanceReport from '@/components/card/CardTopPerformanceReport'
import Progress from '@/components/progress'
import ButtonTab from '@/components/tab/ButtonTab'
import BarChart from '@/components/chart/BarChart'
import AreaChart from '@/components/chart/AreaChart'
import { useRouter } from 'next/navigation'
import { Divider } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import Table from '@/components/table'
import SelectRangePicker from '@/components/date-picker/SelectRangePicker'

const index = ({ data, slug }: { data?: any, slug: any }) => {
    const [activeTab, setActiveTab] = useState('today');
    const [selectedRange, setSelectedRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const router = useRouter()
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
            title: 'Timesheet',
        },
    ]


    const handleRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
        setSelectedRange(dates);
    };

    const columnsOvertimeSummary: TableColumnsType<any> = [
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (val: string) => {
                const date = dayjs(val).format('DD/MM/YYYY')
                return date
            }
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a: any, b: any) => a.duration.localeCompare().b.duration,
            render: (_: any, row: any) => {
                return <span>{row.duration}</span>
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a: any, b: any) => a.description.localeCompare().b.description,
            render: (_: any, row: any) => {
                return <span>{row.description}</span>
            }
        },
    ]

    const columnsDailyActivityLog: TableColumnsType<any> = [
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (_: any, row: any) => {
                const date = dayjs(row.date).format('DD/MM/YYYY')
                const week = row.date
                return activeTab == 'month' ? week : date
            }
        },
        {
            title: 'Task',
            dataIndex: 'tasks',
            render: (tasks: any[]) => {
                return (
                    <div className="flex flex-col gap-2">
                        {tasks.map((item, idx) => (
                            <div key={idx} className='flex flex-col'>
                                <span>{item.task}</span>
                                <span className="text-xs text-gray-500">{item.duration}</span>
                            </div>
                        ))}
                    </div>
                );
            }
        },
        {
            title: 'Total Hour',
            dataIndex: 'totalHours',
            sorter: (a: any, b: any) => a.totalHours.localeCompare().b.totalHours,
            render: (_: any, row: any) => {
                return <span>{row.totalHours}</span>
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

    const dataOvertime = [
        {
            date: "June 3, 2025",
            duration: "2h 30m",
            description: "Tight project deadline",
        },
        {
            date: "June 20, 2025",
            duration: "4h 00m",
            description: "Work delay due to technical issues",
        },
        {
            date: "June 20, 2025",
            duration: "1h 25m",
            description: "-",
        },
        {
            date: "June 25, 2025",
            duration: "2h 00m",
            description: "System or feature testing",
        },
        {
            date: "June 27, 2025",
            duration: "3h 30m",
            description: "-",
        },
        {
            date: "June 30, 2025",
            duration: "0h 45m",
            description: "-",
        },
    ];

    const dataDailyActivityLog = [
        {
            date: "June 23, 2025",
            tasks: [
                { task: "Attendance Page", duration: "3h 25m" },
                { task: "Timesheet Page", duration: "4h 15m" },
                { task: "Shift Management Page", duration: "0h 20m" },
            ],
            totalHours: "8h 00m",
        },
        {
            date: "June 24, 2025",
            tasks: [
                { task: "Shift Management Page", duration: "5h 00m" },
                { task: "Leave and Permit Page", duration: "4h 25m" },
            ],
            totalHours: "9h 25m",
        },
        {
            date: "June 25, 2025",
            tasks: [
                { task: "Leave and Permit Page", duration: "3h 00m" },
                { task: "Overtime Page", duration: "5h 00m" },
            ],
            totalHours: "8h 00m",
        },
        {
            date: "June 26, 2025",
            tasks: [
                { task: "Overtime Page", duration: "4h 10m" },
                { task: "Employee Page", duration: "8h 00m" },
            ],
            totalHours: "12h 10m",
        },
        {
            date: "June 27, 2025",
            tasks: [
                { task: "Performance Page", duration: "8h 00m" },
            ],
            totalHours: "8h 00m",
        },
        {
            date: "June 28, 2025",
            tasks: [
                { task: "Performance Page", duration: "4h 00m" },
            ],
            totalHours: "4h 00m",
        },
    ];

    const dataWeek = dataDailyActivityLog?.find(log => log.date === "June 26, 2025")

    const monthActivityLog: any = [
        {
            date: "Week 1 (June 1 - June 7)",
            tasks: [
                { task: "Attendance Page", duration: "3h 25m" },
                { task: "Timesheet Page", duration: "4h 15m" },
                { task: "Shift Management Page", duration: "0h 20m" },
            ],
            totalHours: "32h 00m",
        },
        {
            date: "Week 2 (June 8 - June 14)",
            tasks: [
                { task: "Attendance Page", duration: "3h 25m" },
                { task: "Timesheet Page", duration: "4h 15m" },
                { task: "Shift Management Page", duration: "0h 20m" },
            ],
            totalHours: "36h 30m",
        },
        {
            date: "Week 3 (June 15 - June 21)",
            tasks: [
                { task: "Attendance Page", duration: "3h 25m" },
                { task: "Timesheet Page", duration: "4h 15m" },
                { task: "Shift Management Page", duration: "0h 20m" },
            ],
            totalHours: "40h 00m",
        },
        {
            date: "Week 4 (June 22 - June 28)",
            tasks: [
                { task: "Attendance Page", duration: "3h 25m" },
                { task: "Timesheet Page", duration: "4h 15m" },
                { task: "Shift Management Page", duration: "0h 20m" },
            ],
            totalHours: "49h 35m", // dari data dailyActivityLog
        },
    ];




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
        { key: 'today', label: 'Today' },
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
                            Timesheet
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
                        <div className='grid gap-3'>
                            <div className='flex items-center gap-4'>
                                <ButtonIcon
                                    icon={ChevronLeftBlackIcon}
                                    shape='circle'
                                    onClick={() => router.push(routes.eCommerce.timesheet)}
                                    className='cursor-pointer'
                                />
                                <span className='text-lg font-semibold'>Timesheet Details</span>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] md:max-h-160 overflow-auto px-10 py-6'>
                                <div className='flex flex-col mb-3'>
                                    <div className='flex md:flex-row flex-col md:items-center mt-2'>
                                        <div className='flex gap-4 w-80 items-center'>
                                            <Avatar style={{ backgroundColor: '#87d068' }} url={AvatarImage} />
                                            <div className="flex flex-col justify-start gap-1">
                                                <h4 className='text-lg font-semibold'>Marcella</h4>
                                                <span className=' text-gray-500'>UI/UX Designer</span>
                                            </div>
                                            <Divider type='vertical' style={{ height: 120 }} />
                                        </div>
                                        <div className='flex flex-col w-full gap-3 px-6'>
                                            <h4 className='text-xl font-semibold'>Work Hours Summary</h4>
                                            <div className='grid md:grid-cols-4 gap-4'>
                                                <div className='flex gap-3 items-center'>
                                                    <div className={`bg-[#00809D1A] p-2 rounded-md`}>
                                                        <Image
                                                            src={CalendarTodayIcon}
                                                            alt='icon'
                                                            width={15}
                                                            height={15}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className='text-gray-600 text-lg'>Avg/Day</label>
                                                        <span className='text-lg'>8h 20m</span>
                                                    </div>
                                                </div>
                                                <div className='flex gap-3 items-center'>
                                                    <div className={`bg-[#00809D1A] p-2 rounded-md`}>
                                                        <Image
                                                            src={CalendarWeekIcon}
                                                            alt='icon'
                                                            width={15}
                                                            height={15}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className='text-gray-600 text-lg'>Weekly Hours</label>
                                                        <span className='text-lg'>44h 40m</span>
                                                    </div>
                                                </div>
                                                <div className='flex gap-3 items-center'>
                                                    <div className={`bg-[#00809D1A] p-2 rounded-md`}>
                                                        <Image
                                                            src={CalendarMonthIcon}
                                                            alt='icon'
                                                            width={15}
                                                            height={15}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className='text-gray-600 text-lg'>Monthly Hours</label>
                                                        <span className='text-lg'>158h 10m</span>
                                                    </div>
                                                </div>
                                                <div className='flex gap-3 items-center'>
                                                    <div className={`bg-[#00809D1A] p-2 rounded-md`}>
                                                        <Image
                                                            src={PersonIcon}
                                                            alt='icon'
                                                            width={15}
                                                            height={15}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className='text-gray-600 text-lg'>Days Present</label>
                                                        <span className='text-lg'>30 days</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-4 items-start'>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[550px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col mb-3 gap-4'>
                                    <h4 className='text-lg font-semibold'>Overtime Summary</h4>
                                    <div className='flex gap-3'>
                                        <div className='flex flex-col w-full'>
                                            <label className='text-gray-400'>Total Overtime Days</label>
                                            <span className='font-medium'>3 Days</span>
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label className='text-gray-400'>Total Overtime Hours</label>
                                            <span className='font-medium'>44h 40m</span>
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label className='text-gray-400'>Avg Overtime/Day</label>
                                            <span className='font-medium'>2h 30m</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <Table
                                        columns={columnsOvertimeSummary}
                                        dataSource={dataOvertime}
                                    />
                                </div>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[665px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col justify-between mb-4 gap-2'>
                                    <div className='flex justify-between'>
                                        <h4 className='text-lg font-semibold'>Daily Activity Log</h4>
                                        <ButtonTab
                                            tabs={tabs}
                                            activeKey={activeTab}
                                            onTabClick={setActiveTab}
                                        />
                                    </div>
                                    {
                                        activeTab == 'week' ?
                                            <div className='flex gap-4 items-center justify-between'>
                                                <ButtonIcon
                                                    icon={ChevronLeftIcon}
                                                    className='cursor-pointer !h-10 !w-10'
                                                    width={8}
                                                />
                                                <SelectRangePicker
                                                    picker='date'
                                                    format='MMMM DD,YYYY'
                                                    onChange={handleRangeChange}
                                                />
                                                <ButtonIcon
                                                    icon={ChevronRightIcon}
                                                    className='cursor-pointer !h-10 !w-10'
                                                    width={8}
                                                />
                                            </div>
                                            : <div className='flex flex-col gap-2'>
                                                <span className='text-gray-500 text-md'>{activeTab == 'month' ? 'This month' : ' Monday,'}</span>
                                                <span className='text-lg'>{activeTab == 'month' ? 'June' : 'June 23, 2025'}</span>
                                            </div>

                                    }


                                    <Table
                                        columns={columnsDailyActivityLog}
                                        dataSource={
                                            activeTab == 'today'
                                                ? [dataWeek]
                                                : activeTab == 'week'
                                                    ? dataDailyActivityLog
                                                    : monthActivityLog
                                        }
                                    />
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
