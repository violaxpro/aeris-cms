'use client'
import React, { act, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import ButtonAction from '@/components/button/ButtonAction'
import Image from 'next/image'
import {
    ExportIcon,
    ChevronLeftBlackIcon,
    CalendarTodayIcon,
    CalendarWeekIcon,
    CalendarMonthIcon,
    PersonIcon,
    PrintIconBlack,
    DownloadPdfIcon,
    SentEmailIcon
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
import { Card } from '@/components/card'
import DetailItem from '@/components/card/DetailItem'
import { downloadPayslipPDF, previewAndPrintPDF } from '@/services/pay-slip-service'

const DetailPaySlip = ({ data, slug }: { data?: any, slug: any }) => {
    const [activeTab, setActiveTab] = useState('week');
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
            title: 'Pay Slip', url: routes.eCommerce.paySlip
        },
        {
            title: 'Detail',
        },
    ]


    const handleRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
        setSelectedRange(dates);
    };

    const columnIncomeDeductionSummary: TableColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => a?.price - b?.price,
            render: (_: any, row: any) => {
                return <span>{row.price}</span>
            }
        },
    ]


    const columnsOvertimeSummary: TableColumnsType<any> = [
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => a?.date.localeCompare(b?.date),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a: any, b: any) => a?.description.localeCompare(b?.description),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Hours',
            dataIndex: 'hours',
            sorter: (a: any, b: any) => a?.hours.localeCompare(b?.hours),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => a?.price - b?.price,
            render: (_: any, row: any) => {
                return <span>{row.price}</span>
            }
        },
    ]


    const columnsLeaveSummary: TableColumnsType<any> = [
        {
            title: 'Leave Type',
            dataIndex: 'type',
            sorter: (a: any, b: any) => a?.type.localeCompare(b?.type),
            render: (val: string) => {
                return val
            }
        },

        {
            title: 'Eligible',
            dataIndex: 'eligible',
            sorter: (a: any, b: any) => a?.eligible.localeCompare(b?.eligible),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Used',
            dataIndex: 'used',
            sorter: (a: any, b: any) => a?.used.localeCompare(b?.used),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining',
            sorter: (a: any, b: any) => a?.remaining - b?.remaining,
            render: (_: any, row: any) => {
                return <span>{row.remaining}</span>
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

    const payslipData = {
        employee_id: '222345',
        income: [
            { name: "Base Salary", price: "Rp. 4.500.000" },
            { name: "Overtime", price: "Rp. 500.000" },
            { name: "KPI", price: "Rp. 300.000" },
            { name: "Reimbursement", price: "Rp. 300.000" },
            { name: "Bonus", price: "Rp. 300.000" },
        ],
        deductions: [
            { name: "Late Free", price: "Rp. 50.000" },
            { name: "BPJS Kesehatan", price: "Rp. 150.000" },
            { name: "BPJS Ketenagakerjaan", price: "Rp. 100.000" },
            { name: "PPh21", price: "Rp. 100.000" },
            { name: "Debt", price: "Rp. 100.000" },
        ],
        overtime: [
            {
                date: "03 June 2025",
                description: "Special Shift",
                hours: "2.5h",
                price: "Rp. 75.000",
            },
            {
                date: "05 June 2025",
                description: "Extra Work",
                hours: "1.0h",
                price: "Rp. 30.000",
            },
        ],
        leaves: [
            {
                type: "Sick Leave",
                eligible: "12/Year",
                used: "2x",
                remaining: "10x",
            },
            {
                type: "Vacation",
                eligible: "12/Year",
                used: "3x",
                remaining: "9x",
            },
            {
                type: "Personal Leave",
                eligible: "6/Year",
                used: "0x",
                remaining: "6x",
            },
        ],
        summary: {
            totalIncome: "Rp. 5.300.000",
            totalDeduction: "Rp. 300.000",
            totalReceived: "Rp. 5.000.000",
        },
    };
    const handlePrint = async (data: any) => {
        await downloadPayslipPDF(data, 'payslip');
    }

    const handlePreview = async (data: any) => {
        await previewAndPrintPDF(data, 'payslip');
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
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Pay Slip Detail
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <div className='flex items-center gap-2'>
                            <ButtonAction
                                icon={<Image
                                    src={SentEmailIcon}
                                    alt='sent-email-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Sent Email'
                            // link={routes.eCommerce.editQuote}
                            />
                            <ButtonAction
                                icon={<Image
                                    src={DownloadPdfIcon}
                                    alt='download-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Download'
                                onClick={() => handlePreview(payslipData)}
                            />
                            <ButtonAction
                                icon={<Image
                                    src={PrintIconBlack}
                                    alt='print-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Print'
                                onClick={() => handlePreview(payslipData)}
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

                </div>
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-4'>
                        <div className='grid md:grid-cols-[2fr_3fr] gap-3'>
                            <div className='rounded-lg border border-[#E5E7EB] flex flex-col gap-2  px-5 py-6 '>
                                <div className='flex justify-between'>
                                    <h4 className='text-lg font-semibold'>Pay Slip Information</h4>
                                </div>
                                <div className='grid md:grid-cols-2 mb-3 gap-2'>
                                    <DetailItem label='Start Date' value='03 June 2024' />
                                    <DetailItem label='End Date' value='06 June 2024' />
                                    <DetailItem label='Payment Method' value='Bank Transfer' />
                                    <DetailItem label='Pay Slip Status' value='Draft' />
                                </div>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] flex flex-col gap-2 px-5 py-6'>
                                <div className='flex justify-between'>
                                    <h4 className='text-lg font-semibold'>Employee Information</h4>
                                </div>
                                <div className='grid md:grid-cols-3 mb-3 gap-2'>
                                    <DetailItem label='Employee ID' value='EM-2025-0082' />
                                    <DetailItem label='Employee Name' value='Viola Yosevi' />
                                    <DetailItem label='Role' value='Front End Developer' />
                                    <DetailItem label='Email' value='viola123@gmail.com' />
                                    <DetailItem label='Phone' value='(+62) 876-6532-1109' />
                                    <DetailItem label='Address' value='Jakarta, Indonesia' />
                                </div>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-4 items-start'>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[490px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col justify-between mb-4 gap-2'>
                                    <div className='flex justify-between'>
                                        <h4 className='text-lg font-semibold'>Income Summary</h4>
                                    </div>
                                    <Table
                                        columns={columnIncomeDeductionSummary}
                                        dataSource={payslipData.income}
                                    />
                                </div>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[490px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col mb-3 gap-4'>
                                    <h4 className='text-lg font-semibold'>Deduction Summary</h4>
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <Table
                                        columns={columnIncomeDeductionSummary}
                                        dataSource={payslipData.deductions}
                                    />
                                </div>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[490px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col mb-3 gap-4'>
                                    <h4 className='text-lg font-semibold'>Overtime Summary</h4>
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <Table
                                        columns={columnsOvertimeSummary}
                                        dataSource={payslipData.overtime}
                                    />
                                </div>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-[490px] p-5 flex flex-col gap-3 overflow-auto'>
                                <div className='flex flex-col mb-3 gap-4'>
                                    <h4 className='text-lg font-semibold'>Leaves Summary</h4>
                                </div>
                                <div className='w-full flex flex-col gap-4'>
                                    <Table
                                        columns={columnsLeaveSummary}
                                        dataSource={payslipData.leaves}
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

export default DetailPaySlip
