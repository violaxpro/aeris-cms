'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Image from 'next/image'
import {
    AddIcon,
    TrashIconRed,
    PencilYellowIcon,
    EyeIcon,
    PrintIconBlack,
    EmailBlackIcon,
    StatusIcon,
    DuplicateIcon,
    DownloadPdfIcon,
    SendIcon
} from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import Pagination from '@/components/pagination'
import ButtonAction from '@/components/button/ButtonAction'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import Link from 'next/link'
import StatusTag from '@/components/tag'
import dayjs, { Dayjs } from 'dayjs';
import { employeeData, EmployeeType } from '@/plugins/types/employee-management-type'
import { Card } from '@/components/card'
import SelectDatePicker from '@/components/date-picker/SelectDatePicker'
import { Avatar } from 'antd'
import AvatarImage from "public/social-avatar.webp"
// import ModalEmployee from './ModalEmployee'
import { downloadPayslipPDF, previewAndPrintPDF } from '@/services/pay-slip-service'
import { Dropdown, Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'

const index = ({ data }: { data?: any }) => {
    const router = useRouter()
    const today = dayjs(); // Hari ini
    const [activeDay, setActiveDay] = useState(today)
    const days = Array.from({ length: 9 }, (_, i) =>
        // today.add(dayOffset + i, 'day')
        activeDay.clone().add(i - 4, 'day')
    );
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [search, setSearch] = useState('')
    const [openModalForm, setOpenModalForm] = useState(false)
    const [formData, setFormData] = useState({
        nik: '',
        full_name: '',
        gender: '',
        date_of_birth: '',
        email: '',
        phone_number: '',
        employee_type: '',
        role: ''
    })
    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Payslip',
        },
    ]

    const columns: TableColumnsType<EmployeeType> = [
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
            title: 'Start Date',
            dataIndex: 'start_date',
            sorter: (a: any, b: any) => a.start_date.localeCompare().b.start_date,
            render: (_: any, row: any) => {
                return <span>{row.start_date || '30 June 2025'}</span>
            }
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            sorter: (a: any, b: any) => a.end_date.localeCompare().b.end_date,
            render: (_: any, row: any) => {
                return <span>{row.end_date || '30 July 2025'}</span>
            }
        },
        {
            title: 'Status',
            dataIndex: 'slip_status',
            sorter: (a: any, b: any) => {
                const status = ['Draft', 'Completed'];
                return status.indexOf(a.slip_status) - status.indexOf(b.slip_status)
            },
            render: (val: any) => {
                const status = val
                return (
                    <StatusTag status={status} type='employee_management' />
                );

            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, row: any) => {
                return (
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <ButtonIcon
                            icon={EyeIcon}
                            width={20}
                            height={20}
                            onClick={() => router.push(routes.eCommerce.detailPaySlip(row.id))}
                            color='blue'
                            variant='filled'
                        />
                        <ButtonIcon
                            icon={PencilYellowIcon}
                            width={15}
                            height={20}
                            onClick={() => router.push(routes.eCommerce.editPaySlip(row.id))}
                            color='yellow'
                            variant='filled'
                            size="middle"
                        />
                        <ButtonIcon
                            icon={TrashIconRed}
                            width={15}
                            height={20}
                            onClick={() => router.push(routes.eCommerce.detailPaySlip(row.id))}
                            color='danger'
                            variant='filled'
                            size="middle"
                        />
                    </div>

                );

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

    return (
        <>
            {contextHolder}
            {/* <ModalEmployee
                open={openModalForm}
                handleChange={handleChange}
                formData={formData}
                handleCancel={() => setOpenModalForm(false)}
                handleSubmit={() => setOpenModalForm(false)}
            /> */}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Payslip
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-3'>
                        <SelectDatePicker
                            value={selectedMonth}
                            onChange={(val) => setSelectedMonth(val || dayjs())}
                        />
                        <Button
                            icon={<Image
                                src={AddIcon}
                                alt='add-icon'
                                width={15}
                                height={15}
                            />}
                            label='Create Payslip'
                            onClick={() => setOpenModalForm(true)}
                        />
                    </div>

                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between mb-4 gap-2'>
                            <div className='flex items-center gap-2'>
                                <SearchTable
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onSearch={() => console.log('Searching for:', search)}
                                />

                            </div>
                            {
                                selectedRowKeys.length > 0 &&
                                <div className='flex gap-3 items-center'>
                                    <ButtonAction
                                        icon={<Image
                                            src={PrintIconBlack}
                                            alt='print-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Print'
                                        onClick={() => console.log('hi')}
                                    />
                                    <ButtonAction
                                        icon={<Image
                                            src={SendIcon}
                                            alt='send-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Send'
                                        onClick={() => console.log('hi')}
                                    />
                                    <ButtonAction
                                        icon={<Image
                                            src={DownloadPdfIcon}
                                            alt='download-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Download'
                                        onClick={() => handlePrint(payslipData)}
                                    />
                                    <ButtonAction
                                        icon={<Image
                                            src={StatusIcon}
                                            alt='status-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Status'
                                        onClick={() => console.log('hi')}
                                    />
                                    <ButtonAction
                                        icon={<Image
                                            src={DuplicateIcon}
                                            alt='duplicate-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Duplicate'
                                        onClick={() => console.log('hi')}
                                    />
                                    <ButtonAction
                                        label='Delete All'
                                        icon={<Image
                                            src={TrashIconRed}
                                            alt='trash-icon'
                                            width={10}
                                            height={10}
                                        />}
                                        onClick={() => setisOpenModalFilter(true)}
                                        position='start'
                                        btnClassname='btn-delete-all'
                                    />
                                </div>
                            }

                        </div>
                        <Table
                            columns={columns}
                            dataSource={employeeData}
                            withSelectableRows
                            selectedRowKeys={selectedRowKeys}
                            onSelectChange={setSelectedRowKeys}
                        />
                        <Pagination
                            current={currentPage}
                            total={employeeData.length}
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
