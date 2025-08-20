'use client'
import React, { useState } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { reviewsType } from '@/plugins/types/reviews-type'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import dayjs from 'dayjs'
import { AddIcon, TrashIconRed, PencilIconBlue } from '@public/icon'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ConfirmModal from '@/components/modal/ConfirmModal'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useNotificationAntd } from '@/components/toast'

const index = ({ reviewsData }: { reviewsData?: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [filteredData, setFilteredData] = useState<reviewsType[]>([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = (id: any) => {
        console.log('delete', id)
    }

    console.log(reviewsData)
    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }
    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Reviews',
        },
    ]
    const columns: TableColumnsType<reviewsType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Product',
            dataIndex: 'product',
        },
        {
            title: 'Reviewer Name',
            dataIndex: 'reviewName',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Approve',
            dataIndex: 'approve',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (created_at: string) => {
                const date = dayjs(created_at).format('DD MMMM, YYYY')
                return date
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: reviewsType) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    {/* <ButtonIcon
                        color='primary'
                        variant='filled'
                        size="small"
                        icon={PencilIconBlue}
                        onClick={() => router.push(routes.eCommerce.editBrands(row.id))}
                    /> */}
                    <ButtonIcon
                        color='danger'
                        variant='filled'
                        size="small"
                        icon={TrashIconRed}
                        onClick={() => handleOpenModalDelete(row.id)}
                    />
                </div >
            ),
        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };
    return (
        <>
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this review?'
            />
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Reviews
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
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
                        dataSource={reviewsData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                    <Pagination
                        current={currentPage}
                        total={reviewsData?.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
