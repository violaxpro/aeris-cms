'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { dummyReportingAnalytics } from '@/plugins/types/warehouse-type'
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
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue, MoreIcon } from '@public/icon'
import dayjs from 'dayjs'
import { toCapitalize } from '@/plugins/utils/utils'

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
            title: 'Reporting & Analytics',
        },
    ]
    const columns: TableColumnsType<any> = [
        {
            title: 'Report Name',
            dataIndex: 'report_name',
            sorter: (a: any, b: any) => a?.report_name.localeCompare(b?.report_name)
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a: any, b: any) => a?.type.localeCompare(b?.type),
            render: (_: any, row: any) => {
                return row.type
            }
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            width: 200,
            sorter: (a: any, b: any) => a?.owner.localeCompare(b?.owner),
            render: (_: any, row: any) => {
                return row.owner
            }
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            sorter: (a: any, b: any) => {
                return a?.schedule.localeCompare(b?.schedule)
            },
            render: (val: any) => {
                return <StatusTag status={val} />
            }
        },
        {
            title: 'Last Run',
            dataIndex: 'last_run',
            sorter: (a: any, b: any) => dayjs(a?.last_run).valueOf() - dayjs(b?.last_run).valueOf(),
            render: (_: any, row: any) => {
                return row.last_run
            }

        },
        {
            title: 'Next Run',
            dataIndex: 'next_run',
            sorter: (a: any, b: any) => dayjs(a?.next_run).valueOf() - dayjs(b?.next_run).valueOf(),
            render: (_: any, row: any) => {
                return row.next_run
            }

        },
        {
            title: 'Visibility',
            dataIndex: 'visibility',
            sorter: (a: any, b: any) => {
                return a?.visibility.localeCompare(b?.visibility)
            },
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editReportingAnalytics(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete" onClick={() => handleOpenModalDelete(row.id)}>
                            Delete
                        </Menu.Item>
                        <Menu.Item key="run-now">
                            Run Now
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <div className="flex gap-3 pe-4" onClick={(e) => e.stopPropagation()}>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <ButtonIcon
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                        {/* <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editReportingAnalytics(row.id))}
                        />
                        <ButtonIcon
                            color='danger'
                            variant='filled'
                            size="small"
                            icon={TrashIconRed}
                            onClick={() => handleOpenModalDelete(row.id)}
                        /> */}
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
                text='Are you sure you want to delete this reporting & analytic?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Reporting & Analytics
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
                        label='Add Report'
                        link={routes.eCommerce.createReportingAnalytics}
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
                        dataSource={dummyReportingAnalytics}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        detailRoutes={(slug) => routes.eCommerce.detailReportingAnalytics(slug)}
                        getRowValue={(record) => record.id}
                    />
                    <Pagination
                        current={currentPage}
                        total={dummyReportingAnalytics?.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
