'use client'
import React, { useState } from 'react'
import EmployeeItem from '@/components/card/DetailItem'
import { Divider } from 'antd'
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import {
    PencilBoxIcon,
    ChevronLeftBlackIcon,
    ChevronRightBlackIcon,
    ExportIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowRight
} from '@public/icon'
import ButtonTab from '@/components/tab/ButtonTab'
import BarChart from '@/components/chart/BarChart'
import { useRouter } from 'next/navigation'
import Avatar from '@/components/avatar'
import AvatarImage from "public/social-avatar.webp"
import { routes } from '@/config/routes'
import { Content } from 'antd/es/layout/layout'
import Button from '@/components/button'
import Image from 'next/image'
import Breadcrumb from '@/components/breadcrumb'
import SelectRangePicker from '@/components/date-picker/SelectRangePicker'
import Rate from '@/components/rate'

const DetailPerformance = ({ slug }: { slug?: any }) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('week');
    const categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    const data_chart = [80, 98, 100, 95]


    const breadcrumb = [
        {
            title: 'Employee Management',
        },
        {
            title: 'Peformance', url: routes.eCommerce.performance
        },
        { title: 'Detail' },
    ]

    const columns: TableColumnsType<any> = [
        {
            title: 'Payroll ID',
            dataIndex: 'payroll_id',
            sorter: (a: any, b: any) => a?.payroll_id.localeCompare(b?.payroll_id),
            render: (_: any, row: any) => {
                return row.payroll_id
            }
        },
        {
            title: 'Periode',
            dataIndex: 'periode',
            sorter: (a: any, b: any) => a.periode.localeCompare(b.periode),
            render: (val: any) => {
                return val
            }
        },
        {
            title: 'Net Pay',
            dataIndex: 'net_pay',
            sorter: (a: any, b: any) => a.net_pay.localeCompare(b.net_pay),
            render: (val: any) => {
                return <span>${val}</span>
            }
        },
    ]

    const data = [
        {
            payroll_id: '10290',
            periode: 'October',
            net_pay: 5000
        },
        {
            payroll_id: '10290',
            periode: 'October',
            net_pay: 5000
        },
        {
            payroll_id: '10290',
            periode: 'October',
            net_pay: 5000
        },
        {
            payroll_id: '10290',
            periode: 'October',
            net_pay: 5000
        },
    ]

    const tabs = [
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
    ];

    return (
        <> <div className="mt-6 mx-6 mb-0">
            <div className='flex md:flex-row flex-col md:justify-between md:items-center items-start'>
                <div>
                    <h1 className='text-xl font-bold'>
                        Peformance
                    </h1>
                    <Breadcrumb
                        items={breadcrumb}
                    />
                </div>
                <div className='flex gap-4 items-center'>
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
                    <Button
                        icon={<Image
                            src={ExportIcon}
                            alt='export-icon'
                            width={15}
                            height={15}
                        />}
                        label='Export'
                    />
                </div>

            </div>
        </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                        <div className='flex flex-col gap-3 md:col-span-3'>
                            <div className='flex items-center gap-4'>
                                <ButtonIcon
                                    icon={ChevronLeftBlackIcon}
                                    shape='circle'
                                    onClick={() => router.push(routes.eCommerce.employee)}
                                    className='cursor-pointer'
                                />
                                <span className='text-lg font-semibold'>Performance Details</span>
                            </div>
                            <div className='rounded-lg border border-[#E5E7EB] p-4'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col items-center gap-3'>
                                        <Avatar
                                            url={AvatarImage}
                                            className='!border !border-[#FFF36D] !p-1'
                                        />
                                        <div className='flex flex-col items-center'>
                                            <h4 className='text-lg font-semibold'>Marcella Indarwati</h4>
                                            <span className='text-md text-[#A19F9F]'>UI/UX Designer</span>
                                        </div>

                                        <div className='flex items-center gap-4'>
                                            <Rate value={4.5} />
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-[#787878]'>Employee Information</label>
                                        <div className='grid grid-cols-2'>
                                            <EmployeeItem label='KPI Score' value='9.5' />
                                            <EmployeeItem label='Attendance' value='8.5' />
                                            <EmployeeItem label='Work Quality' value='8' />
                                            <EmployeeItem label='Team Work & Communication' value='9' />
                                        </div>
                                        <EmployeeItem label='Dicipline & Compliance' value='9' />
                                        <EmployeeItem label='Evaluation Notes' value='Marcella performs excellently with strong discipline and teamwork. Refining design details can further improve her output.' />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col md:col-span-9 gap-3'>
                            <div className='rounded-lg border border-[#E5E7EB] md:h-100 overflow-auto p-6'>
                                <div className='flex flex-col justify-between'>
                                    <h4 className='text-lg font-semibold'>Key Performance Indicator</h4>
                                    <div className='flex gap-5'>
                                        <h1 className='md:text-2xl font-semibold'>95.3%</h1>
                                        <Image
                                            src={ArrowRight}
                                            alt='arrow-right'
                                        />
                                        <label>9.5/10</label>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <BarChart
                                        categories={categories}
                                        data={data_chart}
                                        title=""
                                        seriesName="June 2025"
                                        color="#3666AA"
                                        height={300}
                                    />
                                </div>
                            </div>
                            <div className='md:grid md:grid-cols-[2fr_1fr] flex flex-col gap-3'>
                                <div className='rounded-lg border border-[#E5E7EB] md:h-75 p-5'>
                                    <div className='flex justify-between items-center mb-3'>
                                        <h4 className='text-lg font-semibold'>Activity Chart</h4>
                                        <ButtonTab
                                            tabs={tabs}
                                            activeKey={activeTab}
                                            onTabClick={setActiveTab}
                                        />
                                        <Image
                                            src={ArrowRight}
                                            alt='arrow-right'
                                        />
                                        <label>9.5/10</label>
                                    </div>
                                    <div className='overflow-y-auto md:h-[200px]'>
                                        <BarChart
                                            categories={categories}
                                            data={data_chart}
                                            title=""
                                            seriesName="June 2025"
                                            color="#3666AA"
                                            height={300}
                                        />
                                    </div>

                                </div>
                                <div className='rounded-lg border border-[#E5E7EB] md:h-[300px] p-5'>
                                    <div className='flex justify-between items-center mb-3'>
                                        <h4 className='text-lg font-semibold'>Payroll History</h4>
                                        <ButtonIcon
                                            icon={PencilBoxIcon}
                                            color='primary'
                                            variant='filled'
                                            size="small"
                                            width={15}
                                        />


                                    </div>
                                    <div className='overflow-y-auto md:h-[200px]'>
                                        <Table
                                            columns={columns}
                                            dataSource={data}
                                        />
                                        <div className='flex justify-between mt-2'>
                                            <ButtonIcon
                                                icon={ChevronLeftBlackIcon}
                                                width={8}
                                            />
                                            <ButtonIcon
                                                icon={ChevronRightBlackIcon}
                                                width={15}
                                            />
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

export default DetailPerformance
