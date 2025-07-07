'use client'
import React, { useState, useEffect } from 'react'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { BrandType } from '@/data/brands-data'
import Image from 'next/image'
import { EditOutlined, PlusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import dayjs from 'dayjs'
import { deleteBrand } from '@/services/brands-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { brandAtom } from '@/store/BrandAtomStore'

const index = ({ brandsData }: { brandsData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(brandAtom)
    const [filteredData, setFilteredData] = useState<BrandType[]>([]);
    const [search, setSearch] = useState('')

    const handleDelete = async (id: any) => {
        try {
            const res = await deleteBrand(id)
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
            title: 'Brands',
        },
    ]
    const columns: TableColumnsType<BrandType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'Logo',
            dataIndex: 'url_logo',
            render: (url: string) => {
                if (!url) return null;
                return (
                    <Image
                        src={url}
                        alt="product-img"
                        width={50}
                        height={50}
                        className='object-cover rounded-xl'
                    />
                )
            },
        },
        {
            title: 'Brand Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (created_at: string) => {
                const date = dayjs(created_at).format('DD MMMM, YYYY')
                return date
            }
        },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editBrands(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Brands'
                        description='Are you sure to delete this data?'
                        onDelete={() => handleDelete(row.id)}
                    />
                </div >
            ),
        },

    ]

    const handleSearch = (value: string) => {
        const search = value.toLowerCase();
        setSearch(search)
        const result = data.filter((item: any) => {
            const formattedDate = dayjs(item?.createdAt).format('DD MMMM, YYYY').toLowerCase();
            return item?.name.toLowerCase().includes(search) ||
                formattedDate.includes(search);
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(brandsData)
        if (!search) {
            setFilteredData(brandsData)
        }
    }, [brandsData, search])
    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <h1 className='text-xl font-bold'>
                    Brands
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
                                label='Add Brands'
                                link={routes.eCommerce.createBrands}
                            />
                        </div>

                    </div>
                    <TableProduct
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
