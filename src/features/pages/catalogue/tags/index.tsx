'use client'
import React, { useState, useEffect } from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import Image from 'next/image'
import { tagsType } from '@/plugins/types/tags-type'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
import { getTags } from '@/services/tags-service'

const index = () => {
    const [tagsData, setTagsData] = useState([])
    console.log(tagsData)

    useEffect(() => {
        getTags()
            .then((res) => {
                setTagsData(res.data)
            }).catch((error) => {
                console.error(error)
            })

    }, [])

    const handleDelete = (id: any) => {
        console.log('delete', id)
    }

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Tags',
        },
    ]
    const columns: TableColumnsType<tagsType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
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
            render: (_: string, row: tagsType) => (

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
                    Tags
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
                            <Button

                                icon={<PlusCircleOutlined />}
                                label='Add Tags'
                                link={routes.eCommerce.createTags}
                            />
                        </div>

                    </div>
                    <TableProduct
                        columns={columns}
                        dataSource={tagsData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
