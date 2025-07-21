'use client'
import React from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { reviewsType } from '@/plugins/types/reviews-type'
import { EditOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import SearchInput from '@/components/search';
import dayjs from 'dayjs'

const index = ({ reviewsData }: { reviewsData?: any }) => {
    const handleDelete = (id: any) => {
        console.log('delete', id)
    }

    console.log(reviewsData)
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
            title: 'Review Name',
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
                    <Link href={routes.eCommerce.editTags(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Tags'
                        description='Are you sure to delete this data?'
                        onDelete={() => handleDelete(row.id)}
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
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Reviews
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-end mb-4'>
                        <div className='flex items-center gap-2'>
                            <SearchInput onSearch={handleSearch} />
                            {/* <Button
                                
                                icon={<PlusCircleOutlined />}
                                label='Add Reviews'
                                link={routes.eCommerce.reviews}
                            /> */}
                        </div>

                    </div>
                    <TableProduct
                        columns={columns}
                        dataSource={reviewsData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
