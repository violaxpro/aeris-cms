'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { dummyEmailCampaigns } from '@/plugins/types/marketing-type'
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
import dayjs from 'dayjs'

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
            title: 'Marketing',
        },
        {
            title: 'Email Campaigns',
        },
    ]
    const columns: TableColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a?.name.localeCompare(b?.name)
        },
        {
            title: 'Audience',
            dataIndex: 'audience',
            sorter: (a: any, b: any) => a?.audience.localeCompare(b?.audience)

        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            sorter: (a: any, b: any) => dayjs(a?.audience).valueOf() - dayjs(b?.audience).valueOf()
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => a?.status.localeCompare(b?.status),
            render: (val: any) => {
                return <StatusTag status={val} />
            }
        },
        {
            title: 'Sent / Delivered',
            width: 200,
            dataIndex: 'sent_delivered',
            sorter: (a: any, b: any) => a?.sent - b?.sent
        },
        {
            title: 'Open / Click',
            width: 200,
            dataIndex: 'open_click',
            sorter: (a: any, b: any) => a?.open - b?.open
        },
        {
            title: 'Conversions',
            dataIndex: 'conversions',
            sorter: (a: any, b: any) => a?.conversions - b?.conversions
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            sorter: (a: any, b: any) => a?.revenue - b?.revenue
        },
        {
            title: 'Updated',
            dataIndex: 'updated_at',
            sorter: (a: any, b: any) => dayjs(a?.updated_at).valueOf() - dayjs(b?.updated_at).valueOf(),
            render: (_: any, row: any) => {
                const date = dayjs(row.updated_at).format('DD/MM/YYYY')
                const user = row.user
                return <div className='flex flex-col'>
                    <span>{date}</span>
                    <span>by {user || 'User'}</span>
                </div>
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
                            onClick={() => router.push(routes.eCommerce.editEmailCampaigns(row.id))}
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
                text='Are you sure you want to delete this warehouse branch list?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Email Campaigns
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
                        label='Add Email Campaign'
                        link={routes.eCommerce.createEmailCampaigns}
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
                        dataSource={dummyEmailCampaigns}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                        detailRoutes={(slug) => routes.eCommerce.detailEmailCampaigns(slug)}
                        getRowValue={(record) => record.id}
                    />
                    <Pagination
                        current={currentPage}
                        total={dummyEmailCampaigns?.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
