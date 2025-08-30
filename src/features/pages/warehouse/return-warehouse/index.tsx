'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { rmaDummyData } from '@/plugins/types/warehouse-type'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined, MoreOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import StatusTag from '@/components/tag'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { deleteBrand } from '@/services/brands-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { branchListAtom } from '@/store/WarehouseAtom'
import ButtonAction from '@/components/button/ButtonAction'
import ButtonIcon from '@/components/button/ButtonIcon'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/modal/ConfirmModal'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue } from '@public/icon'

const index = ({ inboundDatas }: { inboundDatas?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()
    const [data, setData] = useAtom(branchListAtom)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [search, setSearch] = useState('')

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

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Returns (RMA / Reverse Logistics)',
        },
    ]
    const columns: TableColumnsType<any> = [
        {
            title: 'Return Number',
            dataIndex: 'rma_no',
            sorter: (a: any, b: any) => a?.rma_no.localeCompare(b?.rma_no)
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            sorter: (a: any, b: any) => a?.customer.localeCompare(b?.customer),
            render: (_: any, row: any) => {
                return row.customer
            }
        },
        {
            title: 'Origin Doc (Order/Shipped)',
            dataIndex: 'origin_doc',
            width: 200,
            sorter: (a: any, b: any) => a?.origin_doc.localeCompare(b?.origin_doc),
            render: (_: any, row: any) => {
                return row.origin_doc
            }
        },
        {
            title: 'Reason Code',
            dataIndex: 'reason_code',
            sorter: (a: any, b: any) => a?.reason_code.localeCompare(b?.reason_code),
            render: (_: any, row: any) => {
                return row.reason_code
            }
        },
        {
            title: 'Qty',
            sorter: (a: any, b: any) => a?.qty - b?.qty,
            dataIndex: 'qty',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val: any) => {
                return <StatusTag status={val} type='rma-warehouse' />
            }
        },
        {
            title: 'Disposition',
            dataIndex: 'disposition',
        },
        {
            title: 'Age (days)',
            dataIndex: 'age_days',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                return (
                    <div className="flex items-center justify-end gap-3 pe-4" onClick={(e) => e.stopPropagation()}>
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editRmaWarehouse(row.rma_no))}
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

            },
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        setData(inboundDatas)
    }, [inboundDatas])
    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this rma warehouse?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Returns (RMA / Reverse Logistics)
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
                        label='Add RMA'
                        link={routes.eCommerce.createRmaWarehouse}
                    />
                </div>

            </div>
            <Content className="mb-0">
                <div className='p-6 min-h-[360px'>
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
                        dataSource={rmaDummyData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        detailRoutes={(slug) => routes.eCommerce.detailRmaWarehouse(slug)}
                        getRowValue={(record) => record.rma_no}
                    />
                    <Pagination
                        current={currentPage}
                        total={rmaDummyData?.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
