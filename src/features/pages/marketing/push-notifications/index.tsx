'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType, MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { BrandType } from '@/data/brands-data'
import Image from 'next/image'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import dayjs from 'dayjs'
import { deleteBrand, getBrands } from '@/services/brands-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import StatusBadge from '@/components/badge/badge-status'
import { AddIcon, TrashIconRed, MoreIcon } from '@public/icon'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import { notificationAtom } from '@/store/NotificationAtom'

const index = ({ brandsData }: { brandsData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useState(brandsData?.data || [])
    const [currentPage, setCurrentPage] = useState(brandsData?.page || 1)
    const [pageSize, setPageSize] = useState(brandsData?.perPage || 10)
    const [total, setTotal] = useState(brandsData?.count || 0)
    const [notification, setNotification] = useAtom(notificationAtom);
    const [search, setSearch] = useState('')
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = async () => {
        if (!deletedData) return
        try {
            const res = await deleteBrand(deletedData)
            if (res.success) {
                notifySuccess(res.message)
                fetchPage(currentPage, pageSize)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOpenModalDelete(false)
            setDeletedData(null)
        }
    }


    const breadcrumb = [
        {
            title: 'Campaigns Management',
        },
        {
            title: 'Push Notifications',
        },
    ]

    const columns: TableColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            sorter: (a, b) => a.platform.localeCompare(b.platform)
        },
        {
            title: 'Audience',
            dataIndex: 'audience_segment',
            sorter: (a, b) => a.audience_segment.localeCompare(b.audience_segment)
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule_at',
            sorter: (a: any, b: any) => dayjs(a.schedule_at).valueOf() - dayjs(b.schedule_at).valueOf(),
            render: (schedule_at: string) => {
                const date = dayjs(schedule_at).format('DD/MM/YYYY')
                return date
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                return a?.status - b?.status
            },
            render: (value: any) => {
                const status = value == true ? 'Enabled' : 'Disabled'
                return <StatusBadge status={status} />;
            }
        },
        {
            title: 'Send / Delivered',
            dataIndex: 'send',
            sorter: (a, b) => a.send.localeCompare(b.send),
            render: (_: any, row: any) => {
                return `${row.send}/${row.delivered}`
            }
        },

        {
            title: 'Click',
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        label: <Link href={routes.eCommerce.editBrands(row.id)}>
                            Edit
                        </Link>
                    },
                    {
                        key: 'delete',
                        label: <div className='cursor-pointer' onClick={() => handleOpenModalDelete(row.id)}>
                            Delete
                        </div>
                    }
                ]
                return (
                    <div className="flex  gap-3 pe-4" onClick={(e) => e.stopPropagation()}>
                        <Dropdown menu={{ items }} trigger={['click']} >
                            <ButtonIcon
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                    </div >
                );
            }
        },

    ]

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const filteredData = React.useMemo(() => {
        if (!search) return data;
        const keyword = search.toLowerCase();
        return data.filter((item: any) => {
            const formattedDate = dayjs(item?.created_at)
                .format('DD/MM/YYYY')
                .toLowerCase();
            return (
                item?.name.toLowerCase().includes(keyword) ||
                formattedDate.includes(keyword)
            );
        });
    }, [search, data]);

    const fetchPage = async (page: number, perPage: number) => {
        try {
            const res = await getBrands({ page, perPage })
            setData(res.data)
            setTotal(res.count)
            setCurrentPage(res.page)
            setPageSize(res.perPage)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (notification) {
            notifySuccess(notification);
            setNotification(null);
        }
    }, [notification]);

    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this push notification?'
            />

            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Push Notifications
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

                        label='Add Push Notification'
                        link={routes.eCommerce.createBrands}

                    />
                </div>
            </div>
            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
                    <div className='flex justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            <ShowPageSize
                                pageSize={pageSize}
                                onChange={(newPageSize) => {
                                    setPageSize(newPageSize);
                                    setCurrentPage(1);
                                    fetchPage(1, newPageSize);
                                }}
                            />
                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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
                                onClick={() => setisOpenModalFilter(true)}
                                position='start'
                                btnClassname='btn-delete-all'
                            />
                        }


                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                    <Pagination
                        current={currentPage}
                        total={total}
                        pageSize={pageSize}
                        onChange={(page) => {
                            setCurrentPage(page);
                            fetchPage(page, pageSize);
                        }}
                    />

                </div>
            </Content>
        </>
    )
}

export default index
