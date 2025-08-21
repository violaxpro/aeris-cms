'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
    DownloadIcon,
    EyeIcon
} from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import ButtonAction from '@/components/button/ButtonAction'
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
import { mapShiftsToDays, getDatesByDay, getTimeDiffInMinutes } from '@/plugins/utils/utils'
import ProgressBar from '@/components/progress'

const index = ({ data }: { data?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()
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
                // total jam kerja perusahaan
                const workingTime = 8 * 60
                const workEndTime = '16:00';

                //ambil data attendance berdasarkan day (check in dan checkout)
                const attendanceForDay = record.attendance?.find((a: any) => a.date === dateLabelsByDay[day]);
                let completed = 0,
                    hoursWorking = 0,
                    minutesWorking = 0,
                    progressColor = ''
                if (attendanceForDay) {
                    const checkIn = attendanceForDay ? attendanceForDay.check_in : '00:00';
                    const checkOut = attendanceForDay ? attendanceForDay.check_out : '00:00';

                    // total minutes working per day
                    const totalWorkingPerDay = getTimeDiffInMinutes(checkIn, checkOut)

                    // convert total minutes to hours working
                    hoursWorking = Math.floor(totalWorkingPerDay / 60)
                    minutesWorking = totalWorkingPerDay % 60

                    // progress bar
                    // const totalOvertime = getTimeDiffInMinutes(workEndTime, checkOut)
                    // convert total minutes overtime
                    // const hoursOvertime = Math.floor(totalOvertime / 60)
                    // const minutesOvertime = totalOvertime % 60
                    completed = attendanceForDay ? attendanceForDay.is_claim_overtime == 'yes' ? hoursWorking : 8 : 0

                    progressColor = attendanceForDay.is_claim_overtime == 'yes'
                        ? '#C20205' : attendanceForDay?.leave_type ? '#FF7601' : '#3666AA'
                    console.log(attendanceForDay?.leave_type)
                }

                return <div>
                    {
                        attendanceForDay?.leave_type
                            ? <label>{`${attendanceForDay?.leave_type}`}</label>
                            : <label>{`${hoursWorking}h ${minutesWorking}m`}</label>
                    }

                    <ProgressBar
                        completed={completed}
                        total={8}
                        isShowLabelProgress={false}
                        strokeColor={progressColor}
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
            render: (_: any, record: any) => {
                return <div>
                    <label>20h 35m</label>
                    <ProgressBar
                        completed={20}
                        total={100}
                        isShowLabelProgress={false}
                        strokeColor="#3666AA"
                        size='small'
                        width={100}
                    />
                </div>
            }
        },
        {
            title: 'Action',
            width: 50,
            key: 'action',
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full items-center" onClick={(e) => e.stopPropagation()}>
                    <ButtonIcon
                        icon={EyeIcon}
                        width={20}
                        height={20}
                        onClick={() => router.push(routes.eCommerce.detailTimesheet(row.id))}
                    />
                </div>


            }
        }

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
            id: 1,
            name: 'Marcella Indarwati',
            role: 'UI/UX Designer',
            avatar: 'https://via.placeholder.com/40',
            start_time: ['08:00 AM'],
            end_time: ['04:00 PM'],
            apply_on_days: ['Monday', 'Tuesday'],
            apply_on_week_of_mont: ['Week 1', 'Week 2'],
            type: 'Shift 1',
            attendance: [
                {
                    date: 'Aug 04, 2025',
                    check_in: '07:56',
                    start_break: '12:05',
                    finish_break: '13:02',
                    check_out: '16:07',
                    ovrtime: '0h',
                    is_claim_overtime: 'no',
                    leave_type: ''

                },
                {
                    date: 'Aug 05, 2025',
                    check_in: '08:00',
                    start_break: '12:02',
                    finish_break: '13:05',
                    check_out: '17:20',
                    ovrtime: '1h 20m',
                    is_claim_overtime: 'yes',
                    leave_type: ''

                }
            ]

        },
        {
            id: 2,
            name: 'Yuliana Dwi',
            role: 'Front End Developer',
            avatar: 'https://via.placeholder.com/40',
            start_time: ['12:00 AM'],
            end_time: ['08:00 AM'],
            apply_on_days: ['Wednesday', 'Thursday'],
            apply_on_week_of_mont: ['Week 1', 'Week 4'],
            type: 'Shift 2',
            attendance: [
                {
                    date: 'Aug 04, 2025',
                    check_in: '07:56',
                    start_break: '12:05',
                    finish_break: '13:02',
                    check_out: '16:07',
                    ovrtime: '0h',
                    is_claim_overtime: 'no',
                    leave_type: ''
                },
                {
                    date: 'Aug 05, 2025',
                    check_in: '08:00',
                    start_break: '12:02',
                    finish_break: '13:05',
                    check_out: '17:20',
                    ovrtime: '1h 20m',
                    is_claim_overtime: 'yes',
                    leave_type: ''
                },
                {
                    date: 'Aug 06, 2025',
                    check_in: '00:00',
                    start_break: '00:00',
                    finish_break: '00:00',
                    check_out: '00:00',
                    ovrtime: '0h 0m',
                    is_claim_overtime: 'no',
                    leave_type: 'Sick Leave'
                }
            ]
        },
        {
            id: 3,
            name: 'Cahyo Nur',
            role: 'Back End Developer',
            avatar: 'https://via.placeholder.com/40',
            start_time: ['04:00 PM'],
            end_time: ['12:00 AM'],
            apply_on_days: ['Thursday', 'Friday'],
            apply_on_week_of_mont: ['Week 1', 'Week 4'],
            type: 'Shift 3',
            attendance: [
                {
                    date: 'Aug 04, 2025',
                    check_in: '07:56',
                    start_break: '12:05',
                    finish_break: '13:02',
                    check_out: '16:07',
                    ovrtime: '0h',
                    is_claim_overtime: 'no',
                    leave_type: ''

                },
                {
                    date: 'Aug 05, 2025',
                    check_in: '08:00',
                    start_break: '12:02',
                    finish_break: '13:05',
                    check_out: '17:20',
                    ovrtime: '1h 20m',
                    is_claim_overtime: 'yes',
                    leave_type: ''

                }
            ]
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
                                        <ButtonAction
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
                                        <SelectRangePicker
                                            picker='date'
                                            format='MMMM DD,YYYY'
                                            onChange={handleRangeChange}
                                        />
                                        <ButtonAction
                                            icon={<Image
                                                src={DownloadIcon}
                                                alt='download-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            label='Download PDF'
                                        // onClick={() => handlePrint(invoiceData)}
                                        />

                                        <Button
                                            icon={<Image
                                                src={ExportIcon}
                                                alt='export-icon'
                                                width={15}
                                                height={15}
                                            />}
                                            label='Export'
                                        // link={routes.eCommerce.editQuote}
                                        />
                                    </div>
                                </div>
                                <Table
                                    columns={columns}
                                    dataSource={processedData}
                                    expandable={{
                                        expandedRowRender: (record) => {
                                            const detailRows = [
                                                { label: 'Check In', key: 'check_in', default: '00:00' },
                                                { label: 'Start Break', key: 'start_break', default: '00:00' },
                                                { label: 'Finish Break', key: 'finish_break', default: '00:00' },
                                                { label: 'Check Out', key: 'check_out', default: '00:00' },
                                                { label: 'Overtime', key: 'ovrtime', default: '0h' },
                                            ];

                                            // Ambil semua tanggal dari attendance lalu urutkan sesuai kebutuhan
                                            const attendanceDate = record.attendance
                                                ? record.attendance.map((a: any) => a.date)
                                                : [];
                                            const dateTableHeader = days.map((day) => {
                                                return dateLabelsByDay[day]
                                            })

                                            return (
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        minWidth: '1000px',
                                                        gridTemplateColumns: '250px repeat(6, 1fr) 100px 80px', // Sesuaikan lebar dengan tabel aslinya
                                                        fontSize: '0.85rem',
                                                        padding: '8px 4rem',
                                                    }}
                                                >
                                                    {/* Baris per detail (Check In, Start Break, dst.) */}
                                                    {detailRows.map((row) => (
                                                        <>
                                                            {/* Label (tempat sejajar dengan kolom Employee Name) */}
                                                            <div style={{ textAlign: 'left', paddingRight: '8px', fontWeight: 'bold' }}>{row.label}</div>

                                                            {/* Data Tanggal */}
                                                            {dateTableHeader.map((date, idx) => {
                                                                const att = record.attendance?.find((a: any) => a.date === date);
                                                                return (
                                                                    <div key={idx} style={{ textAlign: 'center' }}>
                                                                        {att && att[row.key] ? att[row.key] : row.default}
                                                                    </div>
                                                                );
                                                            })}

                                                            {/* Kolom kosong untuk Total Time dan Action */}
                                                            <div></div>
                                                            <div></div>
                                                        </>
                                                    ))}
                                                </div>
                                            );
                                        },
                                        // rowExpandable: (record) => record.attendance && record.attendance.length > 0
                                    }}
                                    detailRoutes={(slug) => routes.eCommerce.detailTimesheet(slug)}
                                    getRowValue={(record) => record.id}
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
