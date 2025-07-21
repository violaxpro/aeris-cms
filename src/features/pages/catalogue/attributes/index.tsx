'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { AttributesType } from '@/data/attributes-data'
import { EditOutlined, PlusCircleOutlined, MoreOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { deleteAttribute } from '@/services/attributes-service'
import { useNotificationAntd } from '@/components/toast'
import { attributeAtom } from '@/store/AttributeAtom'

const index = ({ attributesData }: { attributesData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(attributeAtom)
    const [filteredData, setFilteredData] = useState<AttributesType[]>([])
    const [search, setSearch] = useState('')

    const handleDelete = async (id: any) => {
        try {
            const res = await deleteAttribute(id)
            if (res.success == true) {
                notifySuccess(res.message)
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);

                setFilteredData(updatedData.filter(item =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                ));
            }
        } catch (error) {
            console.error(error)
        }
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
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'Attribute Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Attribute Set',
            dataIndex: 'attribute_set',
            sorter: (a: any, b: any) => a.attribute_set.localeCompare(b.attribute_set)
        },
        {
            title: 'Filterable',
            dataIndex: 'filterable',
            sorter: (a: any, b: any) => {
                return a?.filterable - b?.filterable
            },
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            sorter: (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
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
            render: (_: string, row: any) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit">
                            <Link href={routes.eCommerce.editAttributes(row.id)}>
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
                                title='Delete Attributes'
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

    const handleSearch = (value: string) => {
        const search = value.toLowerCase()
        setSearch(search)
        const result = data.filter((item: any) => {
            const formattedDate = dayjs(item?.createdAt).format('DD MMMM, YYYY').toLowerCase();
            return item?.name.toLowerCase().includes(search) ||
                item?.attribute_set.toLowerCase().includes(search) ||
                formattedDate.includes(search);
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(attributesData)
        if (!search) {
            setFilteredData(attributesData)
        }
    }, [attributesData, search])
    return (
        <>
            {contextHolder}
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
                                icon={<PlusCircleOutlined />}
                                label='Add Attributes'
                                link={routes.eCommerce.createAttributes}
                            />
                        </div>

                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
