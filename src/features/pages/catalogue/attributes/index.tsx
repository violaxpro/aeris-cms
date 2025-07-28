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
import { AddIcon, TrashIconRed, PencilIconBlue } from '@public/icon'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ModalDelete from '@/components/modal/ModalDelete'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const index = ({ attributesData }: { attributesData?: any }) => {
    const router = useRouter()

    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(attributeAtom)
    const [filteredData, setFilteredData] = useState<AttributesType[]>([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

    const handleDelete = async (id: any) => {
        if (!deletedData) return;
        try {
            const res = await deleteAttribute(id)
            if (res.success == true) {
                notifySuccess(res.message)
                const updatedData = data.filter(item => item.id !== deletedData);
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
                    <div className="flex items-center justify-end gap-3 pe-4">
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editBrands(row.id))}
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

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
    }

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
            <ModalDelete
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onDelete={handleDelete}
                item='attribute'
            />
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Attributes
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

                        label='Add Attribute'
                        link={routes.eCommerce.createAttributes}

                    />
                </div>
            </div>
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>

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
