'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { routes } from '@/config/routes'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import { useNotificationAntd } from '@/components/toast'
import StatusTag from '@/components/tag'
import { useAtom } from 'jotai'
import { FaqCategoriesType, dummyFaqCategories } from '@/plugins/types/management-type'
import { faqCategoryAtom } from '@/store/FaqAtom'
import Image from 'next/image'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue, UploadWhiteIcon, UploadBlackIcon } from '@public/icon'
import ButtonAction from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import ModalFaqCategory from './ModalFaqCategory'

const index = ({ faqCategoryDatas }: { faqCategoryDatas?: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(faqCategoryAtom)
    const [filteredData, setFilteredData] = useState<FaqCategoriesType[]>([]);
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
    const [openModalFaqCategory, setOpenModalFaqCategory] = useState(false)

    const handleDelete = async (id?: any) => {
        if (!deletedData) return;
        try {
            // const res = await deletePriceLevel(deletedData);
            // if (res.success) {
            //     notifySuccess(res.message);
            //     setData(prev => prev.filter(item => item.id !== deletedData));
            // }
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
            title: 'Management',
        },
        {
            title: 'FAQ',
        },
        {
            title: 'FAQ Categories',
        },
    ]
    const columns: TableColumnsType<FaqCategoriesType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name?.localeCompare(b?.name)
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                const status = ['Active', 'Inactive'];
                return status.indexOf(a.status) - status.indexOf(b.status
                )
            },
            render: (val: any) => {
                const status = val
                return (
                    <StatusTag status={status} type='management' />
                );
            }
        },
        {
            title: 'Action',
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
                            onClick={() => router.push(routes.eCommerce.editMenus(row.id))}
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
        setData(faqCategoryDatas)
        if (!search) {
            setFilteredData(faqCategoryDatas)
        }
    }, [faqCategoryDatas, search])

    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this faq category?'
            />
            <ModalFaqCategory
                isModalOpen={openModalFaqCategory}
                handleCancel={() => setOpenModalFaqCategory(false)}
            />
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Faq Categories
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-3'>
                        <Button
                            icon={<Image
                                src={AddIcon}
                                alt='add-icon'
                                width={15}
                                height={15}
                            />}

                            label='Add Faq Category'
                            onClick={() => setOpenModalFaqCategory(true)}
                        />
                    </div>
                </div>
            </div>
            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6'>
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
                        dataSource={dummyFaqCategories}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                    <Pagination
                        current={currentPage}
                        total={dummyFaqCategories.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
