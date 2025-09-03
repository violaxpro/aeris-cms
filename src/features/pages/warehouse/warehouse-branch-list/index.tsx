'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu, Tooltip } from 'antd'
import { WarehouseBranchListType, dummyBranchManagement } from '@/plugins/types/warehouse-type'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined, MoreOutlined } from '@ant-design/icons'
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
import { branchListAtom } from '@/store/WarehouseAtom'
import ButtonAction from '@/components/button/ButtonAction'
import ButtonIcon from '@/components/button/ButtonIcon'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/modal/ConfirmModal'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue } from '@public/icon'
import StatusTag from '@/components/tag'

const index = ({ warehouseBranchList }: { warehouseBranchList?: any }) => {
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
            title: 'Branch Managements',
        },
    ]
    const columns: TableColumnsType<WarehouseBranchListType> = [
        {
            title: 'Warehouse Name',
            dataIndex: 'warehouse_name',
            sorter: (a: any, b: any) => a.warehouse_name.localeCompare(b?.warehouse_name),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a: any, b: any) => a.address.localeCompare(b?.address),
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            sorter: (a: any, b: any) => a.phone_number.localeCompare(b?.phone_number),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => a.status.localeCompare(b?.status),
            render: (val: any) => {
                return <StatusTag status={val} />
            }
        },
        {
            title: 'Default Fulfillment',
            dataIndex: 'default_fulfilment',
            sorter: (a: any, b: any) => a.default_fulfilment.localeCompare(b?.default_fulfilment),
            render: (val: any) => {
                return val == true ? 'Y' : 'N'
            }
        },
        {
            title: 'Zones / Bins Count',
            width: 100,
            dataIndex: 'zone_counts',
            sorter: (a: any, b: any) => a.zone_counts - b?.zone_counts,
            render: (_: any, row: any) => {
                const zones_count = row.zones_count
                const bins_count = row.bins_count
                return <span>{`${zones_count} / ${bins_count}`}</span>
            }
        },
        {
            title: 'Cut-off Profiles',
            dataIndex: 'cutoff_profiles',
            sorter: (a: any, b: any) => a.cutoff_profiles.localeCompare(b?.cutoff_profiles),
            render: (data: any[]) => {
                if (!data || data.length === 0) return '-'

                const first = data[0]
                const moreCount = data.length - 1

                return (
                    <span>
                        Carrier : {first.carrier}, Service : {first.service}
                        {moreCount > 0 && (
                            <Tooltip
                                title={data.slice(1).map((item, i) => (
                                    <div key={i}>
                                        Carrier : {item.carrier} <br />
                                        Service : {item.service}
                                    </div>
                                ))}
                            >
                                <Link href='#' className='ml-2'>+{moreCount} more</Link>
                            </Tooltip>
                        )}
                    </span>
                )
            }
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
                            onClick={() => router.push(routes.eCommerce.editWarehouseBranchList(row.warehouse_code))}
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
        setData(warehouseBranchList)
    }, [warehouseBranchList])
    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this branch management?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Branch Managements
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
                        label='Add Branch Management'
                        link={routes.eCommerce.createWarehouseBranchList}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div className='p-6 min-h-[360px]'>
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
                        dataSource={dummyBranchManagement}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        detailRoutes={(slug) => routes.eCommerce.detailWarehouseBranchList(slug)}
                        getRowValue={(record) => record.warehouse_code}
                    />
                    <Pagination
                        current={currentPage}
                        total={dummyBranchManagement?.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
