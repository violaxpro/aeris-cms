'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import Image from 'next/image'
import { tagsType } from '@/plugins/types/tags-type'
import { sliderAtom } from '@/store/ManagementAtom'
import { SliderType } from '@/plugins/types/management-type'
import { EditOutlined, PlusCircleOutlined, MoreOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
import { getTags } from '@/services/tags-service'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'

const index = () => {
    const [tagsData, setTagsData] = useState([])
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


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
            title: 'Management',
        },
        {
            title: 'Appearance'
        },
        {
            title: 'Sliders'
        },
    ]
    const columns: TableColumnsType<SliderType> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Created',
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
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editSlider(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
                                title='Delete Slider'
                                description='Are you sure to delete this data?'
                                onDelete={() => handleDelete(row.id)}
                                label='Delete'
                            />
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={['click']} >
                        <button className="flex items-center justify-center px-2 py-1 border rounded ">
                            Actions <MoreOutlined className="ml-1" />
                        </button>
                    </Dropdown >
                );
            }

        },

    ]

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };
    return (
        <>
            <div className="mt-6 mx-6 mb-0">
                <h1 className='text-2xl font-bold'>
                    Sliders
                </h1>
                <Breadcrumb
                    items={breadcrumb}
                />
            </div>
            <Content className="mb-0">
                <div className='bg-[#fff] min-h-[360px] p-6 flex flex-col gap-2'>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex gap-2'>
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
                        <Button
                            icon={<PlusCircleOutlined />}
                            label='Add Slider'
                            link={routes.eCommerce.createSlider}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Table
                            columns={columns}
                            dataSource={data}
                            withSelectableRows
                            selectedRowKeys={selectedRowKeys}
                            onSelectChange={setSelectedRowKeys}
                        />
                        <Pagination
                            current={currentPage}
                            total={data.length}
                            pageSize={pageSize}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>

                </div>
            </Content>
        </>
    )
}

export default index
