'use client'
import React from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { AttributesType } from '@/data/attributes-data'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'

const index = ({ attributesData }: { attributesData?: any }) => {
    const handleDelete = (id: any) => {
        console.log('delete', id)
    }

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Attribute',
        },
    ]
    const columns: TableColumnsType<AttributesType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Attribute Name',
            dataIndex: 'attributeName',
        },
        {
            title: 'Attribute Set',
            dataIndex: 'attributeSet',
        },
        {
            title: 'Filterable',
            dataIndex: 'filterable',
        },
        {
            title: 'Created At',
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
            render: (_: string, row: AttributesType) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editAttributes(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Attribute'
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
                    Attributes
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
                                btnClassname="!bg-[#86A788] !text-white hover:!bg-white hover:!text-[#86A788] hover:!border-[#86A788]"
                                icon={<PlusCircleOutlined />}
                                label='Add Attributes'
                                link={routes.eCommerce.createAttributes}
                            />
                        </div>

                    </div>
                    <Table
                        columns={columns}
                        dataSource={attributesData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
