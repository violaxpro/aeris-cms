'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import Image from 'next/image'
import { tagsType } from '@/plugins/types/tags-type'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import { getTags } from '@/services/tags-service'
import { AddIcon, TrashIconRed, PencilIconBlue } from '@public/icon'
import ButtonDelete from '@/components/button/ButtonAction'
import Pagination from '@/components/pagination'
import ButtonIcon from '@/components/button/ButtonIcon'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import ModalDelete from '@/components/modal/ModalDelete'
import { useRouter } from 'next/navigation'
import { useNotificationAntd } from '@/components/toast'
import dayjs from 'dayjs'


const index = () => {
    const [tagsData, setTagsData] = useState([])
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [filteredData, setFilteredData] = useState<tagsType[]>([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)
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

    const handleOpenModalDelete = (data: any) => {
        setOpenModalDelete(true)
        setDeletedData(data)
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
                    <ButtonIcon
                        color='primary'
                        variant='filled'
                        size="small"
                        icon={PencilIconBlue}
                        onClick={() => router.push(routes.eCommerce.editTags(row.id))}
                    />
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
            <ModalDelete
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onDelete={handleDelete}
                item='tag'
            />
            {contextHolder}
            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Tags
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

                        label='Add Tag'
                        link={routes.eCommerce.createTags}

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
                        dataSource={tagsData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                    <Pagination
                        current={currentPage}
                        total={tagsData?.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
