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
import { deleteReturnSupplier } from '@/services/return-supplier'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { returnSupplierAtom } from '@/store/SuppliersAtom'
import { returnData, ReturnSupplierType } from '@/plugins/types/suppliers-type'
import { stripHTML } from '@/plugins/validators/common-rules'
import dayjs from 'dayjs'
import Pagination from '@/components/pagination'
import {
    MoreIcon,
    TrashIconRed,
    AddIcon,
    PrintIconBlack,
    EmailBlackIcon,
    StatusIcon,
    DuplicateIcon,
    WalletIcon,
    PencilIconBlue
} from '@public/icon'
import Image from 'next/image'
import ButtonIcon from '@/components/button/ButtonIcon'
import ButtonAction from '@/components/button/ButtonAction'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import StatusTag from '@/components/tag'

const index = ({ returnSupplierData }: { returnSupplierData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(returnSupplierAtom)
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState<ReturnSupplierType[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = async (id: any) => {
        try {
            const res = await deleteReturnSupplier(id)
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
            title: 'RMA',
        },
        {
            title: 'RMA Suppliers',
        },
    ]
    const columns: TableColumnsType<ReturnSupplierType> = [
        {
            title: 'Order ID',
            dataIndex: 'order_id',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier_name',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            render: (val) => {
                return <span>${val}</span>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val) => {
                const status = stripHTML(val);
                return <StatusTag status={status} type='supplier' />
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (created_at: string) => {
                const date = dayjs(created_at).format('DD MMMM, YYYY')
                return date
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <ButtonIcon
                        color='primary'
                        variant='filled'
                        size="small"
                        icon={PencilIconBlue}
                    // onClick={() => router.push(routes.eCommerce.editAttributes(row.id))}
                    />
                    <ButtonIcon
                        color='danger'
                        variant='filled'
                        size="small"
                        icon={TrashIconRed}
                        onClick={() => handleOpenModalDelete(row.id)}
                    />
                </div >
            ),
        },
    ]

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(returnData)
    }, [returnData])
    return (

        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Return Suppliers
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
                        label='Add Return Supplier'
                        link={routes.eCommerce.createReturnSupplier}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <div className='flex justify-between mb-4 gap-2'>
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
                            selectedRowKeys.length > 0 &&
                            <div className='flex  gap-3'>
                                <ButtonAction
                                    icon={<Image
                                        src={PrintIconBlack}
                                        alt='print-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Print'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    onClick={() => console.log('hi')}
                                />
                                <ButtonAction
                                    icon={<Image
                                        src={EmailBlackIcon}
                                        alt='email-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Email'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    onClick={() => console.log('hi')}
                                />
                                <ButtonAction
                                    icon={<Image
                                        src={StatusIcon}
                                        alt='status-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Status'
                                    style={{ padding: '1.2rem 1.7rem' }}
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
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    onClick={() => console.log('hi')}
                                />
                                {
                                    selectedRowKeys.length == 1 &&
                                    <ButtonAction
                                        icon={<Image
                                            src={WalletIcon}
                                            alt='paynow-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        label='Pay Now'
                                        style={{ padding: '1.2rem 1.7rem' }}
                                        onClick={() => console.log('hi')}
                                    />
                                }
                                <ButtonAction
                                    label='Delete All'
                                    icon={<Image
                                        src={TrashIconRed}
                                        alt='trash-icon'
                                        width={10}
                                        height={10}
                                    />}
                                    // onClick={() => setisOpenModalFilter(true)}
                                    position='start'
                                    style={{ padding: '1.2rem 1.7rem' }}
                                    btnClassname='btn-delete-all'
                                />
                            </div>
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
