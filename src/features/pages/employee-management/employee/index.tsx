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
    UserNewIcon,
    MaleIcon,
    FemaleIcon
} from '@public/icon'
import { routes } from '@/config/routes'
import { useNotificationAntd } from '@/components/toast'
import { Content } from 'antd/es/layout/layout'
import ButtonFilter from '@/components/button/ButtonAction'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonAction from '@/components/button/ButtonIcon'
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
import ModalEmployee from './ModalEmployee'
import { Dropdown, Menu } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'

const index = ({ data }: { data?: any }) => {
    const today = dayjs(); // Hari ini
    const [activeDay, setActiveDay] = useState(today)
    const days = Array.from({ length: 9 }, (_, i) =>
        // today.add(dayOffset + i, 'day')
        activeDay.clone().add(i - 4, 'day')
    );
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(0)
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
            title: 'Employee',
        },
    ]

    const columns: TableColumnsType<EmployeeType> = [
        {
            title: 'Employee ID',
            dataIndex: 'employee_id',
            sorter: (a: any, b: any) => a.employee_id.localeCompare().b.employee_id,
            render: (_: any, row: any) => {
                return <span>{row.employee_id}</span>

            }
        },
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
            title: 'Joining Date',
            dataIndex: 'joining_date',
            sorter: (a: any, b: any) => a.joining_date.localeCompare().b.joining_date,
            render: (_: any, row: any) => {
                return <span>{row.joining_date}</span>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a: any, b: any) => a.email.localeCompare().b.email,
            render: (_: any, row: any) => {
                return <span>{row.email}</span>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Draft', 'Approved', 'Processing', 'Awaiting Stock', 'Packed', 'Ready for Pickup', 'Shipped', 'In Transit',
                    'Out of Delivery'
                ];
                return status.indexOf(a.status) - status.indexOf(b.status
                )
            },
            render: (val: any) => {
                const status = val
                return (
                    <StatusTag status={status} type='attendance' />
                );

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



    return (
        <>
            {contextHolder}
            <ModalEmployee
                open={openModalForm}
                handleChange={handleChange}
                formData={formData}
                handleCancel={() => setOpenModalForm(false)}
                handleSubmit={() => setOpenModalForm(false)}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Employee
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
                        label='Add Employee'
                        onClick={() => setOpenModalForm(true)}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex flex-col gap-4'>
                        <div className='grid md:grid-cols-4 gap-4'>
                            <Card title='Total Employees' icon={EmployeeIcon}>
                                <span className='text-2xl font-bold'>60</span>
                            </Card>
                            <Card title='New Employees' icon={UserNewIcon}>
                                <span className='text-2xl font-bold'>3</span>
                            </Card>
                            <Card title='Male Employees' icon={MaleIcon} width={20}>
                                <span className='text-2xl font-bold'>2</span>
                            </Card>
                            <Card title='Female Employees' icon={FemaleIcon}>
                                <span className='text-2xl font-bold'>1</span>
                            </Card>

                        </div >

                        <div className='flex justify-between mb-4 gap-2'>
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
                            columns={columns}
                            dataSource={employeeData}
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
