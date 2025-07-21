'use client'
import React from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { optionsData, OptionsType } from '@/data/options-data'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'

const index = ({ optionsData }: { optionsData?: any }) => {

    const handleDelete = (id: any) => {
        console.log('delete', id)
    }

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Options',
        },
    ]
    const columns: TableColumnsType<OptionsType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'optionName',
            sorter: (a: any, b: any) => {
                return a?.option_name?.localeCompare(b?.option_name)
            }
        },
        {
            title: 'Type',
            dataIndex: 'optionType',
            sorter: (a: any, b: any) => {
                return a?.type - b?.type
            },
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            render: (created_at: string) => {
                const date = dayjs(created_at).format('DD/MM/YYYY')
                return date
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: OptionsType) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editOptions(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Options'
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
                    Options
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
                                label='Add Options'
                                link={routes.eCommerce.createOptions}
                            />
                        </div>

                    </div>
                    <TableProduct
                        columns={columns}
                        dataSource={optionsData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
