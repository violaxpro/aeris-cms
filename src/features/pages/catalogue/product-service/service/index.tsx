'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType, MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { ProductDataType } from '@/data/products-data'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import StatusBadge from '@/components/badge/badge-status'
import Popover from '@/components/popover'
import { deleteProduct } from '@/services/products-service'
import { getServices, deleteService } from '@/services/services-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { productAtom } from '@/store/ProductAtom'
import dayjs from 'dayjs'
import Image from 'next/image'
import { TrashIconRed, FilterIcon, AddIcon, MoreIcon } from '@public/icon'
import StatusTag from '@/components/tag'
import ButtonFilter from '@/components/button/ButtonAction'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonAction from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import FormService from './FormService'
import { notificationAtom } from '@/store/NotificationAtom'

const index = ({ services }: { services?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useState(services?.data || [])
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(services?.page || 1)
    const [pageSize, setPageSize] = useState(services?.perPage || 10)
    const [total, setTotal] = useState(services?.count || 0)
    const [notification, setNotification] = useAtom(notificationAtom);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalForm, setOpenModalForm] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
    const [modalType, setModalType] = useState('create')
    const [currentService, setCurrentService] = useState<any>(null)

    console.log(services)

    const handleDelete = async (id?: any) => {
        if (!deletedData) return;
        try {
            const res = await deleteService(deletedData);
            if (res.success) {
                notifySuccess(res.message);
                fetchPage(currentPage, pageSize)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setOpenModalDelete(false);
            setDeletedData(null);
        }
    };

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Services',
        },
    ]

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }
    const columns: TableColumnsType<ProductDataType> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => {
                return a?.sku?.localeCompare(b?.sku)
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name?.localeCompare(b?.name)
            }
        },
        {
            title: 'Buying Price',
            dataIndex: 'buy_price',
            sorter: (a: any, b: any) => {
                return a.buy_price - b.buy_price
            },
            render: (val: any) => {
                return <span>${val}</span>
            }
        },
        {
            title: 'Last Updated',
            dataIndex: 'created_at',
            sorter: (a: any, b: any) => {
                return dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf()
            },
            render: (_: any, row: any) => {
                const createdAt = dayjs(row.created_at).format('DD/MM/YYYY')
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{createdAt}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        <span>by</span>
                        <span>:</span>
                        <span>User</span>
                    </div>
                </div>

            }
        },
        // {
        //     title: 'Rating',
        //     dataIndex: 'rating',
        //     render: (value: number[]) => {
        //         // if (!value.length) return '-'
        //         // const average = value.reduce((a, b) => a + b, 0);
        //         // return (
        //         //     <>
        //         //         <Rate disabled allowHalf defaultValue={average} />
        //         //         <span className='ms-6 text-sm'>({average.toFixed(1)})</span>
        //         //     </>
        //         // );
        //         return value

        //     },
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => {
                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        label: <div onClick={() => {
                            setCurrentService(row)
                            setOpenModalForm(true)
                        }}>
                            Edit
                        </div>
                    },
                    {
                        key: 'delete',
                        label: <div className='cursor-pointer' onClick={() => handleOpenModalDelete(row.id)}>
                            Delete
                        </div>
                    }
                ]

                return (
                    <div className='flex items-center gap-2'>
                        <Dropdown menu={{ items }} trigger={['click']} >
                            <ButtonAction
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                    </div>
                );
            }

        },

    ]

    const handleOpenModalForm = (type: string) => {
        setModalType(type)
        setOpenModalForm(true)
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
                item?.sku?.toLowerCase().includes(keyword) ||
                formattedDate.includes(keyword)
            );
        });
    }, [search, data]);

    const fetchPage = async (page: number, perPage: number) => {
        try {
            const res = await getServices({ page, perPage })
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
                text='Are you sure you want to delete this service?'
            />
            <FormService
                openModal={openModalForm}
                handleCancel={() => setOpenModalForm(false)}
                modalType={modalType}
                onSuccess={(msg: any) => {
                    notifySuccess(msg);
                    setCurrentService(null)
                    setOpenModalForm(false);

                    fetchPage(currentPage, pageSize)
                }}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Services
                        </h1>
                    </div>
                    <Button
                        icon={<Image
                            src={AddIcon}
                            alt='add-icon'
                            width={15}
                            height={15}
                        />}
                        label='Add Service'
                        onClick={() => handleOpenModalForm('create')}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex justify-between mb-4 gap-2'>
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
