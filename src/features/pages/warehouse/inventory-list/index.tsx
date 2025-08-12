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
import { brandAtom } from '@/store/BrandAtomStore'
import ButtonAction from '@/components/button/ButtonAction'
import ButtonIcon from '@/components/button/ButtonIcon'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/modal/ConfirmModal'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue } from '@public/icon'

const index = ({ inventoryLists }: { inventoryLists?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()
    const [data, setData] = useAtom(brandAtom)
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
            title: 'Inventory Lists',
        },
    ]
    const columns: TableColumnsType<BrandType> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'url_logo',
            render: (url: string) => {
                if (!url) return null;
                return (
                    <Image
                        src={url}
                        alt="product-img"
                        width={50}
                        height={50}
                        className='object-cover rounded-xl'
                    />
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'In Stock',
            dataIndex: 'in_stock',
        },
        {
            title: 'Waiting',
            dataIndex: 'waiting',
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
        },
        {
            title: 'Added',
            dataIndex: 'added',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                return (
                    <div className="flex items-center justify-end gap-3 pe-4">
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
        setData(inventoryLists)
    }, [inventoryLists])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    Inventory Lists
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
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

export default index
