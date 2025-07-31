import React, { useState } from 'react'
import EmployeeItem from '@/components/card/EmployeeItem'
import { Divider } from 'antd'
import Table from '@/components/table'
import type { TableColumnsType } from 'antd'
import ButtonIcon from '@/components/button/ButtonIcon'
import { PencilBoxIcon, ChevronLeftBlackIcon, ChevronRightBlackIcon } from '@public/icon'
import ButtonTab from '@/components/tab/ButtonTab'
import BarChart from '@/components/chart/BarChart'

const DetailInformation = () => {
    const [activeTab, setActiveTab] = useState('week');
    const categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    const data_chart = [80, 98, 100, 95]

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
        <div className='flex flex-col md:col-span-8 gap-3'>
            <div className='rounded-lg border border-[#E5E7EB] md:h-100'>
                <div className='p-6 flex flex-col gap-4'>
                    <h4 className='text-lg font-semibold'>Employee Information</h4>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-[#787878]'>Contact Information</label>
                            <EmployeeItem label='Full Name' value='Marcella Indarwati' />
                            <EmployeeItem label='National ID (NIK)' value='1234567890987615' />
                            <EmployeeItem label='Phone Number' value='+62876 7654 0092' />
                            <EmployeeItem label='Gender' value='Female' />
                            <EmployeeItem label='Location' value='-' />
                        </div>
                        <Divider type='vertical' className='!h-auto !mx-15 hidden md:block' />
                        <Divider style={{ display: 'block' }} className='block md:!hidden' />

                        <div className='flex flex-col gap-3'>
                            <label className='text-[#787878]'>Employee Information</label>
                            <EmployeeItem label='Job Role' value='UI/UX Designer' />
                            <EmployeeItem label='Employee Type' value='Full Time' />
                            <EmployeeItem label='Start Date' value='-' />
                            <EmployeeItem label='Contact Periode' value='-' />
                            <EmployeeItem label='Employment Status' value='Active' />
                        </div>
                        <Divider type='vertical' className='!h-auto !mx-15 hidden md:block' />
                        {/* <Divider className='block md:hidden !my-4' /> */}

                        <div className='flex flex-col gap-3'>
                            <label className='text-[#787878]'>Payment Details</label>
                            <EmployeeItem label='Bank Name' value='-' />
                            <EmployeeItem label='Account Number' value='-' />
                            <EmployeeItem label='Account Name' value='-' />
                            <EmployeeItem label='Monthly Salary' value='-' />
                        </div>
                    </div>
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


    )
}

export default DetailInformation
