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
import { Space } from 'antd'
import Link from 'next/link'
import StatusTag from '@/components/tag'
import dayjs, { Dayjs } from 'dayjs'
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
import ModalTimesheet from './ModalTimesheet'
import ScheduleTable from '@/components/scheduler/SchedulerShift'
import ButtonTab from '@/components/tab/ButtonTab'
import LineAreaChart from '@/components/chart/LineAreaChart'
import AreaChart from '@/components/chart/AreaChart'
import { mapShiftsToDays } from '@/plugins/utils/utils'
import ProgressBar from '@/components/progress'

const index = ({ data }: { data?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [activeTab, setActiveTab] = useState('day');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [openModalForm, setOpenModalForm] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        timesheet_type: '',
        status_timesheet: '',
        reason: '',
        start_date_time: '',
        end_date_time: '',
        description: '',
        file_attachment: []
    })
    const [modalType, setModalType] = useState('employee-benefit')
    const [formMode, setFormMode] = useState('create')
    const [selectedRange, setSelectedRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Timesheet',
        },
    ]
    const tabs = [
        { key: 'day', label: 'Day' },
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
    ];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const getDatesByDay = (
        start: dayjs.Dayjs | null,
        end: dayjs.Dayjs | null,
        days: string[]
    ) => {
        const result: Record<string, string> = {};

        let baseDate = dayjs(); // default hari ini
        let weekStart = baseDate.startOf('week').add(1, 'day'); // start dari Senin minggu ini

        if (start && end) {
            // Kalau ada range yang dipilih, pakai start-nya aja dan lanjut 6 hari ke depan
            for (let i = 0; i < days.length; i++) {
                const date = start.clone().add(i, 'day');
                result[days[i]] = date.format('MMM DD, YYYY');
            }
        } else {
            // Kalau belum pilih range, pakai minggu berjalan
            for (let i = 0; i < days.length; i++) {
                const date = weekStart.clone().add(i, 'day');
                result[days[i]] = date.format('MMM DD, YYYY');
            }
        }

        return result;
    };


    const dateLabelsByDay = getDatesByDay(
        selectedRange ? selectedRange[0] : null,
        selectedRange ? selectedRange[1] : null,
        days
    );

    const columns: TableColumnsType<any> = [
        {
            title: 'Employee Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 250,
            render: (_: any, record: any) => (
                <Space>
                    <Avatar src={record.avatar} />
                    <div>
                        <strong>{record.name}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>{record.role}</div>
                    </div>
                </Space>
            ),
        },
        ...days.map((day) => ({
            title: dateLabelsByDay[day]
                ? <div className='flex flex-col'>
                    <span>{day}</span>
                    <span>{dateLabelsByDay[day]}</span>
                </div>
                : day,
            key: day,
            width: 100,
            render: (_: any, record: any) => {
                const shift = record.shiftsMapped[day];

                // Default cell kosong tapi tetap tampil
                return <div>
                    <label>3h 11m</label>
                    <ProgressBar
                        completed={70}
                        total={100}
                        isShowLabelProgress={false}
                        strokeColor="#3666AA"
                        size='small'
                        width={100}
                    />
                </div>


            },
        })),
        {
            title: 'Total Time',
            dataIndex: 'total_time',
            key: 'total_time',
            width: 50,
            render: (_: any, record: any) => (
                <div>
                    <label>3h 11m</label>
                    <ProgressBar
                        completed={20}
                        total={100}
                        isShowLabelProgress={false}
                        strokeColor="#3666AA"
                        size='small'
                        width={100}
                    />
                </div>
            ),
        },

    ];

    const handleChange = (field: string) => (
        e: any | React.ChangeEvent<HTMLInputElement> | Dayjs | null
    ) => {
        let value;

        if (dayjs.isDayjs(e) || e === null) {
            value = e; // ini untuk DatePicker (Dayjs)
        } else if (typeof e === 'string' || Array.isArray(e)) {
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


    const handleRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
        console.log(dates)
        setSelectedRange(dates);
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

    const processedData = employeeData.map((item: any) => ({
        ...item,
        shiftsMapped: mapShiftsToDays(days, item),
    }));

    const chartLabels = ['June 30, 2025', '', '', '', '', '', ''];
    const series: any = [
        {
            name: 'Total TIme',
            data: [40, 60, 45, 70, 65, 80, 75]
        },
    ];


    return (
        <>
            {contextHolder}
            <ModalTimesheet
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
                            Timesheet
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
                        label='Add Timesheet'
                        style={{ padding: '1.2rem' }}
                        onClick={() => setOpenModalForm(true)}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <h4 className='text-xl font-medium'>Total Time Worked</h4>
                            <div className='flex md:flex-row flex-col md:items-center md:justify-between mt-4'>
                                <label className='text-[#0A3353] md:text-3xl text-lg font-medium'>384hr 20mins</label>
                                <ButtonTab
                                    tabs={tabs}
                                    activeKey={activeTab}
                                    onTabClick={setActiveTab}
                                />
                            </div>
                            <p className='text-gray-500'>
                                <span className='text-black font-medium'>
                                    {
                                        activeTab == 'day' ? '+12% ' :
                                            activeTab == 'week' ? '+9% ' : '+23% '
                                    }
                                </span>
                                from
                                {
                                    activeTab == 'day' ? ' yesterday' :
                                        activeTab == 'week' ? ' last week' : ' last month'
                                }

                            </p>
                            <LineAreaChart
                                data={series[0].data}
                                categories={chartLabels}
                                totalTimeText="362hr 45min Total Time"
                            />
                        </div>
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

                                    <div className='flex gap-4 items-center'>
                                        <ButtonIcon
                                            icon={ChevronLeftIcon}
                                            className='cursor-pointer p-4'
                                            width={8}
                                        />
                                        <SelectRangePicker
                                            picker='date'
                                            format='MMMM DD,YYYY'
                                            onChange={handleRangeChange}
                                        />
                                        <ButtonIcon
                                            icon={ChevronRightIcon}
                                            className='cursor-pointer'
                                            width={8}
                                        />
                                    </div>
                                </div>
                                <Table
                                    columns={columns}
                                    dataSource={processedData}
                                    scroll={{ x: 'max-content' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

        </>
    )
}

export default index
