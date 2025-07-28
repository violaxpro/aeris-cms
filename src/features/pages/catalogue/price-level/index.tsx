'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { PriceLevelType } from '@/data/price-level-data'
import { Dropdown, Menu } from 'antd'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined, MoreOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { useNotificationAntd } from '@/components/toast'
import { deletePriceLevel } from '@/services/price-level-service'
import { priceLevelsAtom } from '@/store/PriceLevelAtomStore'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue } from '@public/icon'
import ButtonFilter from '@/components/button/ButtonAction'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ModalDelete from '@/components/modal/ModalDelete'
import { useRouter } from 'next/navigation'

const index = ({ priceLevels }: { priceLevels?: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(priceLevelsAtom)
    const [filteredData, setFilteredData] = useState<PriceLevelType[]>([]);
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = async (id?: any) => {
        if (!deletedData) return;
        try {
            const res = await deletePriceLevel(deletedData);
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
            title: 'ID',
            dataIndex: 'id',
        },
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
                return (
                    <div className="flex items-center justify-end gap-3 pe-4">
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editPriceLevel(row.id))}
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

    const handleSearch = (value: string) => {
        const search = value.toLowerCase();
        setSearch(search)
        const result = data.filter((item: any) => {
            return item?.name?.toLowerCase().includes(search) ||
                item?.brand?.name?.toLowerCase().includes(search) ||
                item?.category?.name?.toLowerCase().includes(search)
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(priceLevels)
        if (!search) {
            setFilteredData(priceLevels)
        }
    }, [priceLevels, search])

    return (
        <>
            {contextHolder}
            <ModalDelete
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onDelete={handleDelete}
                item='price level'
            />
            <div className="mt-6 mx-4 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
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
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
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
                        columns={columns}
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
