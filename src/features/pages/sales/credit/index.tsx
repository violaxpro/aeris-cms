'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { deleteSupplierList } from '@/services/supplier-list-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { creditSupplierAtom } from '@/store/SuppliersAtom'
import { CreditSalesType } from '@/plugins/types/sales-type'
import { stripHTML } from '@/plugins/validators/common-rules'
import { Dropdown, Menu } from 'antd'
import Pagination from '@/components/pagination'
import { MoreIcon, TrashIconRed, FilterIcon, AddIcon } from '@public/icon'
import Image from 'next/image'
import ButtonAction from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ButtonDelete from '@/components/button/ButtonAction'
import StatusTag from '@/components/tag'

const index = ({ creditSalesData }: { creditSalesData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(creditSupplierAtom)
    const [search, setSearch] = useState('')

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const handleDelete = async (id: any) => {
        try {
            const res = await deleteSupplierList(id)
            if (res.success == true) {
                notifySuccess(res.message)
                setData(prev => prev.filter(item => item.id !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const breadcrumb = [
        {
            title: 'Sales',
        },
        {
            title: 'Credit',
        },
    ]
    const columns: TableColumnsType<CreditSalesType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Order Id',
            dataIndex: 'order_id',
        },
        {
            title: 'Customer',
            dataIndex: 'customer_name',
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val) => {
                const status = stripHTML(val);
                const statusCapitalized = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
                return <StatusTag status={statusCapitalized} />
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editPurchases(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="detail">
                            <Link href={routes.eCommerce.editOrder(row.id)}>
                                Detail
                            </Link>
                        </Menu.Item>


                    </Menu>
                );

                return (
                    <div className='flex items-center gap-2'>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <ButtonAction
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                        <ButtonAction
                            color='danger'
                            variant='filled'
                            size="small"
                            icon={TrashIconRed}
                        // onClick={() => setOpenModalDelete(true)}
                        />
                    </div>
                );

            }


        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(creditSalesData)
    }, [creditSalesData])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Credit Sales
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            <ShowPageSize
                                pageSize={pageSize}
                                onChange={setPageSize}
                            />

                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={() => console.log('Searching for:', search)}
                            />
                        </div>
                        {
                            selectedRowKeys.length > 0 && <ButtonDelete
                                label='Delete All'
                                icon={<Image
                                    src={TrashIconRed}
                                    alt='trash-icon'
                                    width={10}
                                    height={10}
                                />}
                                position='start'
                                style={{ padding: '1.2rem 1.7rem' }}
                                btnClassname='btn-delete-all'
                            />
                        }

                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                    <Pagination
                        current={currentPage}
                        total={data.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />

                </div>
            </Content>
        </>
    )
}

export default index
