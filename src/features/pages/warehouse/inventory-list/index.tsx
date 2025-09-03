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
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue, PencilYellowIcon, EyeIcon } from '@public/icon'

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
            title: 'Inventory Managements',
        },
    ]
    const columns: TableColumnsType<BrandType> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => a?.sku.localeCompare(b?.sku)
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a?.name.localeCompare(b?.name)
        },
        {
            title: 'Warehouse / Zone / Bin',
            dataIndex: 'warehouses',
            width: 200,
            sorter: (a: any, b: any) => a?.warehouses.localeCompare(b?.warehouses),
            render: (_: any, row: any) => {
                const warehouse = row.warehouses.warehouse || '-'
                const zone = row.warehouses.zone || '-'
                const bin = row.warehouses.bin || '-'
                return <span>{warehouse} / {zone} / {bin}</span>
            }
        },
        // {
        //     title: 'Image',
        //     dataIndex: 'image',
        //     render: (url: string) => {
        //         if (!url) return null;
        //         return (
        //             <Image
        //                 src={url}
        //                 alt="product-img"
        //                 width={50}
        //                 height={50}
        //                 className='object-cover rounded-xl'
        //             />
        //         )
        //     },
        // },
        {
            title: 'In Stock',
            dataIndex: 'in_stock',
            sorter: (a: any, b: any) => a?.in_stock - b?.in_stock
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            sorter: (a: any, b: any) => a?.sold - b?.sold
        },
        {
            title: 'Returned',
            dataIndex: 'returned',
            sorter: (a: any, b: any) => a?.returned - b?.returned
        },
        {
            title: 'Added',
            dataIndex: 'added',
            sorter: (a: any, b: any) => a?.added - b?.added

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
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={EyeIcon}
                            width={15}
                            onClick={() => router.push(routes.eCommerce.inventoryListHistory(row.sku))}
                        />
                        <ButtonIcon
                            color='yellow'
                            variant='filled'
                            size="small"
                            icon={PencilYellowIcon}
                            width={15}
                            onClick={() => router.push(routes.eCommerce.editInventoryList(row.id))}
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
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this inventory management?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Inventory Managements
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
                        label='Add Inventory Management'
                        link={routes.eCommerce.createInventoryList}
                    />
                </div>

            </div>
            <Content className="mb-0">
                <div className=' bg-[#fff] p-6 min-h-[360px]'>
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
                        detailRoutes={(slug: string) => routes.eCommerce.detailInventoryList(slug)}
                        getRowValue={(record: any) => record.id}
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
