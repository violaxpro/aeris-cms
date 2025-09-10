'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType, MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { PriceLevelType } from '@/data/price-level-data'
import { routes } from '@/config/routes'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import Link from 'next/link'
import { useNotificationAntd } from '@/components/toast'
import { useGetPriceLevel, useDeletePriceLevel } from '@/core/hooks/use-price-levels'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { AddIcon, TrashIconRed, MoreIcon } from '@public/icon'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import { notificationAtom } from '@/store/NotificationAtom'
import dayjs from 'dayjs'
import Spinner from '@/components/spin'

const index = () => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const { data, isLoading, refetch } = useGetPriceLevel(currentPage, pageSize)
    const [notification, setNotification] = useAtom(notificationAtom);
    const [search, setSearch] = useState('')
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
    const { mutate: deletePriceLevelMutate } = useDeletePriceLevel()

    const handleDelete = async (id?: any) => {
        if (!deletedData) return;
        try {
            deletePriceLevelMutate(deletedData)
            refetch()
        } catch (error) {
            console.error(error);
        } finally {
            setOpenModalDelete(false)
            setDeletedData(null)
        }
    };

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Price Level',
        },
    ]
    const columns: TableColumnsType<PriceLevelType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name?.localeCompare(b?.name)
            }
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            sorter: (a: any, b: any) => {
                return a?.brand?.name?.localeCompare(b?.brand?.name)
            },
            render: (brand: { id: number; name: string } | null) => {
                return brand?.name || '-';
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            sorter: (a: any, b: any) => {
                return a?.category?.name?.localeCompare(b?.category?.name)
            },
            render: (category: { id: number; name: string } | null) => {
                return category?.name || '-';
            },
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
                        label: <Link href={routes.eCommerce.editPriceLevel(row.id)}>
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

    const filteredData = React.useMemo(() => {
        if (!search) return data?.data || [];
        const keyword = search.toLowerCase();
        return data?.data.filter((item: any) => {
            const formattedDate = dayjs(item?.created_at)
                .format('DD/MM/YYYY')
                .toLowerCase();
            return (
                item?.name.toLowerCase().includes(keyword) ||
                formattedDate.includes(keyword)
            );
        });
    }, [search, data]);


    useEffect(() => {
        if (data) {
            setTotal(data.count)
            setCurrentPage(data.page)
            setPageSize(data.perPage)
        }
    }, [data])

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
                text='Are you sure you want to delete this price level?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Price Level
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

                        label='Add Price Level'
                        link={routes.eCommerce.createPriceLevel}

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
                    {
                        isLoading ? <Spinner /> :
                            <div>
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
                                        refetch()
                                    }}
                                />
                            </div>
                    }


                </div>
            </Content>
        </>
    )
}

export default index
