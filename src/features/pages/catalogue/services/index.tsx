'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { ProductDataType } from '@/data/products-data'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import StatusBadge from '@/components/badge/badge-status'
import Popover from '@/components/popover'
import { deleteProduct } from '@/services/products-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { productAtom } from '@/store/ProductAtom'
import dayjs from 'dayjs'
import Image from 'next/image'
import { TrashIconRed, FilterIcon, AddIcon, PencilIconBlue } from '@public/icon'
import StatusTag from '@/components/tag'
import ButtonFilter from '@/components/button/ButtonAction'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonAction from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ModalDelete from '@/components/modal/ModalDelete'
import FormService from './FormService'

const index = ({ services }: { services?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(productAtom)
    const [filteredData, setFilteredData] = useState<ProductDataType[]>([]);
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalForm, setOpenModalForm] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
    const [modalType, setModalType] = useState('create')

    const handleDelete = async (id?: any) => {
        if (!deletedData) return;
        try {
            const res = await deleteProduct(deletedData);
            if (res.success) {
                notifySuccess(res.message);
                setData(prev => prev.filter(item => item.id !== deletedData));
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
    const columnProducts: TableColumnsType<ProductDataType> = [
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
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
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
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editProduct(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
                                title='Delete Product'
                                description='Are you sure to delete this data?'
                                onDelete={() => handleDelete(row.id)}
                                label='Delete'
                            />
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <div className='flex items-center gap-2'>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <ButtonAction
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={PencilIconBlue}
                                onClick={() => handleOpenModalForm('edit')}

                            />
                        </Dropdown >
                        <ButtonAction
                            color='danger'
                            variant='filled'
                            size="small"
                            icon={TrashIconRed}
                            onClick={() => handleOpenModalDelete(row.id)}
                        />
                    </div>
                );
            }

        },

    ]

    const handleSearch = (value: string) => {
        const search = value.toLowerCase();
        setSearch(search)
        const result = data.filter((item: any) => {
            return item?.name?.toLowerCase().includes(search) ||
                item?.sku?.toLowerCase().includes(search) ||
                item?.price.toLowerCase().includes(search)
        });
        setFilteredData(result);
    };

    const handleOpenModalForm = (type: string) => {
        setModalType(type)
        setOpenModalForm(true)
    }
    // Ambil data dari props saat pertama render
    useEffect(() => {
        setData(services || []);
    }, [services]);

    // Filter data setiap kali data atau search berubah
    useEffect(() => {
        if (!search) {
            setFilteredData(data);
        } else {
            const searchLower = search.toLowerCase();
            const result = data.filter((item: any) =>
                item?.name?.toLowerCase().includes(searchLower) ||
                item?.sku?.toLowerCase().includes(searchLower) ||
                item?.price?.toString().toLowerCase().includes(searchLower)
            );
            setFilteredData(result);
        }
    }, [data, search]);


    return (
        <>
            {contextHolder}
            <ModalDelete
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onDelete={handleDelete}
            />
            <FormService
                openModal={openModalForm}
                handleCancel={() => setOpenModalForm(false)}
                modalType={modalType}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Services
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
                        label='Add Service'
                        onClick={() => handleOpenModalForm('create')}
                    />
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4 gap-2'>
                        {/* <Button
                                       label='Add Payment'
                                       onClick={handleClickModalPaid}
                                   /> */}

                        <div className='flex items-center gap-2'>
                            <ShowPageSize
                                pageSize={pageSize}
                                onChange={setPageSize}
                            />
                            <ButtonFilter
                                label='Filter by'
                                icon={<Image
                                    src={FilterIcon}
                                    alt='filter-icon'
                                    width={15}
                                    height={15}
                                />}
                                onClick={() => setisOpenModalFilter(true)}
                                position='end'
                                style={{ padding: '1.2rem 1.7rem' }}
                            />
                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={() => console.log('Searching for:', search)}
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
                                style={{ padding: '1.2rem 1.7rem' }}
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
                        total={filteredData.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
