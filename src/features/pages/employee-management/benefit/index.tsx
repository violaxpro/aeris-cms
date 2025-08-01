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
    EmployeeOrangeIcon
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
import FormBenefit from './FormBenefit'
import { Dropdown, Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import BenefitItem from '@/components/card/DetailItem'
import DonutChart from '@/components/chart/DonutChart'
import DetailBenefit from './DetailBenefit'
import { MoreOutlined } from '@ant-design/icons'

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
            title: 'Benefit',
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
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Active', 'Non-Active'];
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
            title: 'Benefit',
            dataIndex: 'benefits',
            sorter: (a: any, b: any) => a.benefit.localeCompare().b.benefit,
            render: (_: any, row: any) => {
                const benefits = row?.benefits?.map((item: any) => item.name).join(', ')
                return <span>{benefits}</span>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editEmployee(row.employee_id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="detail" onClick={() => setOpenModalDetail(true)}>
                            Detail
                        </Menu.Item>

                    </Menu>
                );

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
        },
    ]

    const columnsBenefit: TableColumnsType<any> = [
        {
            title: 'Benefit Name',
            dataIndex: 'benefit_name',
            sorter: (a: any, b: any) => a.benefit_name.localeCompare().b.benefit_name,
            render: (_: any, row: any) => {
                return <span>{row.benefit_name}</span>

            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a: any, b: any) => a.type.localeCompare().b.type,
            render: (_: any, row: any) => {
                return <span>{row.type}</span>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Active', 'Non-Activer'];
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
            title: 'Total Recipient',
            dataIndex: 'total_recipient',
            sorter: (a: any, b: any) => a.total_recipient - b.total_recipient,
            render: (_: any, row: any) => {
                return <span>{row.total_recipient} Employees</span>
            }
        },
        {
            title: 'Tags/Coverage',
            dataIndex: 'tags',
            sorter: (a: any, b: any) => a.tags.localeCompare().b.tags,
            render: (_: any, row: any) => {
                return <span>{row.tags}</span>
            }
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editEmployee(row.employee_id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="detail">
                            <Link href={routes.eCommerce.detailEmployee(row.employee_id)}>
                                Detail
                            </Link>
                        </Menu.Item>

                    </Menu>
                );

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

    const dataBenefitEmployee = [{
        id: 1,
        employee_name: 'Yuliana Dwi',
        role: 'Front End Developer',
        status: 'Active',
        benefits: [
            {
                id: 1,
                name: 'Accident Assurance'
            },
            {
                id: 2,
                name: 'Transport Allowance'
            }
        ]
    }]


    const dataBenefits = [{
        id: 1,
        benefit_name: 'Health Insurance',
        type: 'Insurance',
        status: 'Active',
        tags: ['Medical', 'Dental'],
    }]

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
            <FormBenefit
                open={openModalForm}
                handleChange={handleChange}
                formData={formData}
                handleCancel={() => setOpenModalForm(false)}
                handleSubmit={() => setOpenModalForm(false)}
                modalType={modalType}
                formMode={formMode}
            />
            <DetailBenefit
                open={openModalDetail}
                handleCancel={() => setOpenModalDetail(false)}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Benefit
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <Button
                            icon={<Image
                                src={AddBlackIcon}
                                alt='add-icon'
                                width={15}
                                height={15}
                            />}
                            label='Benefit Type'
                            onClick={() => handleOpenModal('benefit', 'create')}
                            btnClassname='btn-action !text-black'
                        />
                        <Button
                            icon={<Image
                                src={AddIcon}
                                alt='add-icon'
                                width={15}
                                height={15}
                            />}
                            label='Employee Benefit'
                            onClick={() => handleOpenModal('employee-benefit', 'create')}
                        />
                    </div>

                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className='grid md:grid-cols-4 gap-4'>
                            <Card title='Total Benefit' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>12</span>
                            </Card>
                            <Card title='Benefit Activated' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>10</span>
                            </Card>
                            <Card title='Covered Employees' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>13</span>
                            </Card>
                            <Card title='Benefits Expiring Soon' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>17</span>
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
                                        <h4 className='text-lg font-semibold'>Benefit Type</h4>
                                        <ButtonIcon
                                            icon={EmployeeOrangeIcon}
                                            width={15}
                                            color='orange'
                                            variant='filled'
                                        />
                                    </div>
                                    <div className='w-full max-w-[320px] mx-auto'>
                                        <DonutChart
                                            series={[10, 9, 8]} // jumlah per kategori
                                            labels={['Insurance', 'Allowance', 'Scholarship']}
                                        />
                                    </div>
                                    <div>
                                        <div className='flex flex-col gap-4'>
                                            <label className='text-gray-500'>Benefit Type</label>
                                            <BenefitItem label='Insurance' value={[
                                                { label: 'Health Insurance', number: 24 },
                                                { label: 'Accident Insurance', number: 12 },
                                            ]} />
                                            <BenefitItem label='Allowance' value={{ label: 'Transport Allowance', number: 24 }} />
                                            <BenefitItem label='Scholarship' value={{ label: 'University Scholarships', number: 24 }} />
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
