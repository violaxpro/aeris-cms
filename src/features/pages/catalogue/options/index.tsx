'use client'
import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import Table from "@/components/table"
import type { TableColumnsType, MenuProps } from 'antd'
import { Dropdown, Menu } from 'antd'
import { optionsData, OptionsType } from '@/data/options-data'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
import { AddIcon, TrashIconRed, MoreIcon } from '@public/icon'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useNotificationAntd } from '@/components/toast'
import { getOptions, deleteOptions } from '@/services/options-service'
import { notificationAtom } from '@/store/NotificationAtom'

const index = ({ optionsData }: { optionsData?: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useState(optionsData?.data || [])
    const [currentPage, setCurrentPage] = useState(optionsData?.page || 1)
    const [pageSize, setPageSize] = useState(optionsData?.perPage || 10)
    const [total, setTotal] = useState(optionsData?.count || 0)
    const [notification, setNotification] = useAtom(notificationAtom);
    const [search, setSearch] = useState('')
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = async (id: any) => {
        if (!deletedData) return;
        try {
            const res = await deleteOptions(deletedData)
            if (res.success) {
                notifySuccess(res.message);
                fetchPage(currentPage, pageSize)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOpenModalDelete(false)
            setDeletedData(null)
        }
    }

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Options',
        },
    ]
    const columns: TableColumnsType<OptionsType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.option_name?.localeCompare(b?.option_name)
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a: any, b: any) => {
                return a?.type.localeCompare(b?.type)
            },
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            render: (created_at: string) => {
                const date = dayjs(created_at).format('DD/MM/YYYY')
                return date
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: OptionsType) => {
                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        label: <Link href={routes.eCommerce.editOptions(row.id)}>
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

                )
            },
        },

    ]

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
            const res = await getOptions({ page, perPage })
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
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this option?'
            />
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Options
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

                        label='Add Option'
                        link={routes.eCommerce.createOptions}

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
                                    setPageSize(newPageSize)
                                    setCurrentPage(1)
                                    fetchPage(1, newPageSize)
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
