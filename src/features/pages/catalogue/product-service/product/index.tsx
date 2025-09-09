'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType, MenuProps } from 'antd'
import { Dropdown, Menu } from 'antd'
import { ProductDataType } from '@/data/products-data'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined, MoreOutlined } from '@ant-design/icons'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import StatusBadge from '@/components/badge/badge-status'
import Popover from '@/components/popover'
import { getProduct, deleteProduct } from '@/services/products-service'
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
import { notificationAtom } from '@/store/NotificationAtom'

const index = ({ products }: { products?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useState(products?.data || [])
    const [currentPage, setCurrentPage] = useState(products?.page || 1)
    const [pageSize, setPageSize] = useState(products?.perPage || 10)
    const [total, setTotal] = useState(products?.count || 0)
    const [notification, setNotification] = useAtom(notificationAtom);
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = async (id?: any) => {
        if (!deletedData) return;
        try {
            const res = await deleteProduct(deletedData);
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

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }
    const columnProducts: TableColumnsType<ProductDataType> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => {
                return a?.sku?.localeCompare(b?.sku)
            }
        },
        {
            title: 'Image',
            dataIndex: 'images',
            render: (_: any, row: any) => {
                const url = row && row.images.length > 0 ? row?.images[0]?.url : null
                return <Image
                    src={url}
                    alt="product-img"
                    width={50}
                    height={50}
                    className='object-cover rounded-xl'
                />
            }
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name?.localeCompare(b?.name)
            }
        },
        {
            title: 'RRP Price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => {
                return a.price - b.price
            },
            render: (val: any) => {
                return <span>${val}</span>
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
        //         if (!value.length) return '-'
        //         const average = value.reduce((a, b) => a + b, 0);
        //         return (
        //             <>
        //                 <Rate disabled allowHalf defaultValue={average} />
        //                 <span className='ms-6 text-sm'>({average.toFixed(1)})</span>
        //             </>
        //         );
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
                        label: <Link href={routes.eCommerce.editProduct(row.id)}>
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
            const res = await getProduct({ page, perPage })
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
                text='Are you sure you want to delete this product?'
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Products
                        </h1>
                    </div>
                    <Button
                        icon={<Image
                            src={AddIcon}
                            alt='add-icon'
                            width={15}
                            height={15}
                        />}
                        label='Add Product'
                        link={routes.eCommerce.createProduct}
                    />
                </div>
            </div>
            <Content className="mb-0 ">
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
                        columns={columnProducts}
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
