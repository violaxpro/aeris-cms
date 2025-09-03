'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { BrandType } from '@/data/brands-data'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { deleteBrand } from '@/services/brands-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { inventoryListAtom } from '@/store/WarehouseAtom'
import ButtonAction from '@/components/button/ButtonAction'
import ButtonIcon from '@/components/button/ButtonIcon'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/modal/ConfirmModal'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue, ActivityHistoryYellowIcon } from '@public/icon'
import Divider from '@/components/divider'
import dayjs from 'dayjs'
import StatusTag from '@/components/tag'
import ModalActivityHistory from './ModalActivityHistory'

const InventoryListsHistory = ({ historyData, slug }: { historyData?: any, slug: string }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()
    const [data, setData] = useAtom(inventoryListAtom)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [search, setSearch] = useState('')
    const [openActivityHistory, setOpenActivityHistory] = useState(false)
    const [dataActivityHistory, setDataActivityHistory] = useState(null)
    const handleDelete = async (id: any) => {
        try {
            const res = await deleteBrand(id)
            if (res.success == true) {
                notifySuccess(res.message)
                setData(prev => prev.filter(item => item.id !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleOpenModalHistory = (data: any) => {
        setOpenActivityHistory(true)
        setDataActivityHistory(data)

    }
    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Inventory Managements', url: routes.eCommerce.inventoryList
        },
        {
            title: slug
        }
    ]
    const columns: TableColumnsType<any> = [
        {
            title: 'Serial Number',
            dataIndex: 'serial_number',
            sorter: (a: any, b: any) => a?.serial_number.localeCompare(b?.serial_number)
        },
        {
            title: 'Location',
            dataIndex: 'location',
            sorter: (a: any, b: any) => a?.location.localeCompare(b?.location)
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            sorter: (a: any, b: any) => a?.po_number.localeCompare(b?.po_number)

        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => dayjs(a?.date).valueOf() - dayjs(b?.date).valueOf(),
            render: (_: any, row: any) => {
                const date = dayjs(row?.date).format('DD/MM/YYYY, HH:mm')
                return date
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Available']
                return status.indexOf(a?.status) - status.indexOf(b?.status)
            },
            render: (_: any, row: any) => {
                return <StatusTag status={row?.status} type='warehouse' />
            }
        },
        {
            title: 'Last Updated',
            dataIndex: 'last_updated',
            sorter: (a: any, b: any) => dayjs(a?.last_updated?.date).valueOf() - dayjs(b?.last_updated?.date).valueOf(),
            render: (_: any, row: any) => {
                const date = dayjs(row?.last_updated?.date).format('MMM DD, YYYY')
                const name = row?.last_updated?.name
                return <div className='flex flex-col'>
                    <span>{date}</span>
                    <span>by {name}</span>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                return (
                    <div className="flex items-center justify-end gap-3 pe-4" onClick={(e) => e.stopPropagation()}>
                        <ButtonIcon
                            color='yellow'
                            variant='filled'
                            size="small"
                            icon={ActivityHistoryYellowIcon}
                            width={15}
                            onClick={() => handleOpenModalHistory(row)}
                        />
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editPriceLevel(row.id))}
                        />
                        <ButtonIcon
                            color='danger'
                            variant='filled'
                            size="small"
                            icon={TrashIconRed}
                            onClick={() => handleOpenModalDelete(row.id)}
                        />
                    </div >
                );
            }
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(historyData?.activity_history)
    }, [historyData])

    console.log(historyData)
    return (
        <>
            {contextHolder}
            <ModalActivityHistory
                open={openActivityHistory}
                data={dataActivityHistory}
                handleCancel={() => setOpenActivityHistory(false)}
            />
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this inventory list history?'
            />
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    Inventory Managements
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>

            <Content className="mb-0">
                <div className='flex flex-col gap-4 bg-[#fff] p-6 min-h-[360px]'>
                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold text-lg'>{historyData?.sku}</span>
                        <span>{historyData?.name}</span>
                        <Divider />
                    </div>
                    <div className='flex justify-between mb-4'>
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
                            />
                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={() => console.log('Searching for:', search)}
                            />
                        </div>
                        {
                            selectedRowKeys.length > 0 && <ButtonAction
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
                        }


                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        onRowClick={(record) => {
                            // setDataDetail(record)
                            // setFormMode('detail')
                            setOpenActivityHistory(true);
                        }}
                    />
                    <Pagination
                        current={currentPage}
                        total={data?.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default InventoryListsHistory
