'use client'
import React, { act, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Image from 'next/image'
import {
    ExportIcon,
    ChevronLeftBlackIcon,
    CalendarTodayIcon,
    CalendarWeekIcon,
    CalendarMonthIcon,
    PersonIcon,
} from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import type { TableColumnsType } from 'antd'
import SelectDatePicker from '@/components/date-picker/SelectDatePicker'
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import { Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import { useRouter } from 'next/navigation'
import { Divider } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import Table from '@/components/table'
import SelectRangePicker from '@/components/date-picker/SelectRangePicker'
import ButtonTab from '@/components/tab/ButtonTab'

const index = ({ data, slug }: { data?: any, slug: any }) => {
    const [activeTab, setActiveTab] = useState('day');
    const [selectedRange, setSelectedRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
    const [openModalForm, setOpenModalForm] = useState(false)
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
            title: 'Timesheet', url: routes.eCommerce.timesheet
        },
        {
            title: 'Detail',
        },
    ]

    const tabs = [
        { key: 'day', label: 'Day' },
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
    ];


    const handleRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
        setSelectedRange(dates);
    };

    const columnsTotalSummary: TableColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
            render: (val: string) => {
                return val
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
    ]

    const columnsActivityLog: TableColumnsType<any> = [
        {
            title: 'Date',
            dataIndex: 'date',
            width: 120,
            sorter: (a: any, b: any) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
            render: (_: any, row: any) => {
                const day = dayjs(row.date).format('dddd');
                const fullDate = dayjs(row.date).format('DD MMM YYYY');

                return (
                    <div className="flex flex-col">
                        <span>{day}</span>
                        <span>{fullDate}</span>
                    </div>
                );
            }
        },
        {
            title: 'Check In',
            dataIndex: 'checkIn',
            sorter: (a: any, b: any) => dayjs(a.checkIn).valueOf() - dayjs(b.checkIn).valueOf(),
            render: (_: any, row: any) => {
                return row.checkIn
            }
        },
        {
            title: 'Break',
            dataIndex: 'break',
            width: 100,
            sorter: (a: any, b: any) => dayjs(a.break).valueOf() - dayjs(b.break).valueOf(),
            render: (_: any, row: any) => {
                return row.break
            }
        },
        {
            title: 'Check Out',
            dataIndex: 'checkOut',
            sorter: (a: any, b: any) => dayjs(a.checkOut).valueOf() - dayjs(b.checkOut).valueOf(),
            render: (_: any, row: any) => {
                return row.checkOut
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

    const weeklyActivityLog = [
        {
            date: '23 June 2025',
            checkIn: '07.00',
            break: '12.00 - 13.00',
            checkOut: '16.00',
            totalHours: '8h 00m',
        },
        {
            date: '24 June 2025',
            checkIn: '07.00',
            break: '12.00 - 13.00',
            checkOut: '16.00',
            totalHours: '8h 00m',
        },
        {
            date: '25 June 2025',
            checkIn: '07.00',
            break: '12.00 - 13.00',
            checkOut: '16.00',
            totalHours: '8h 00m',
        },
        {
            date: '26 June 2025',
            checkIn: '07.00',
            break: '12.00 - 13.00',
            checkOut: '16.00',
            totalHours: '8h 00m',
        },
        {
            date: '27 June 2025',
            checkIn: '07.00',
            break: '12.00 - 13.00',
            checkOut: '16.00',
            totalHours: '8h 00m',
        },
        {
            date: ' 28 June 2025',
            checkIn: '07.00',
            break: '12.00 - 13.00',
            checkOut: '16.00',
            totalHours: '8h 00m',
        },
    ]

    const weeklyTotalSummary = [
        { name: 'Total Hours', duration: '30h 45m' },
        { name: 'Total Overtime', duration: '8h 25m' },
        { name: 'Total Sick Leave', duration: '1' },
        { name: 'Total Vacation', duration: '2' },
        { name: 'Total Personal Leave', duration: '0' },
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
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Detail Timesheet
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
                        <div className='flex justify-around gap-4'>
                            <SelectRangePicker
                                picker='date'
                                format='MMMM DD,YYYY'
                                onChange={handleRangeChange}
                            />
                            <ButtonTab
                                tabs={tabs}
                                activeKey={activeTab}
                                onTabClick={setActiveTab}
                            />
                        </div>
                        <div className='grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-4 items-start'>
                            <div className='rounded-lg border border-[#E5E7EB] h-auto p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col justify-between mb-4 gap-2'>
                                    <div className='flex justify-between'>
                                        <h4 className='text-lg font-semibold'>{`
                                        ${activeTab == 'week'
                                                ? 'Weekly ' :
                                                activeTab == 'day' ? 'Daily '
                                                    : 'Monthly '}`
                                        }
                                            Activity Log
                                        </h4>
                                    </div>
                                    <Table
                                        columns={columnsActivityLog}
                                        dataSource={weeklyActivityLog}
                                    />
                                </div>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[490px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col mb-3 gap-4'>
                                    <h4 className='text-lg font-semibold'>{`${activeTab == 'week'
                                        ? 'Weekly  '
                                        : activeTab == 'day'
                                            ? 'Daily '
                                            : 'Monthly '}`}
                                        Total Summary</h4>
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <Table
                                        columns={columnsTotalSummary}
                                        dataSource={weeklyTotalSummary}
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
