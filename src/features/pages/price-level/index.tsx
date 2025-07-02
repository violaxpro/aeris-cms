'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { priceLevelsData, PriceLevelType } from '@/data/price-level-data'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import DeletePopover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { getPriceLevel } from '@/services/price-level-service'
import { getCategories } from '@/services/category-service'
import { getBrands } from '@/services/brands-service'

const index = () => {
    const [priceLevelData, setPriceLevelData] = useState([])

    console.log(priceLevelData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resPriceLevel = await getPriceLevel();
                if (resPriceLevel.data) {
                    const categoriesId = resPriceLevel.data.map((item: any) => item.categoriesId)
                    const categoriesIdArray = Array.from(new Set(categoriesId))
                    const resCategories = await Promise.all(
                        categoriesIdArray.map((id: any) =>
                            getCategories(id)
                        )
                    );
                    const categories = resCategories.map((res: any) => {
                        return res.data
                    });

                    const brandsId = resPriceLevel.data.map((item: any) => item.brandId)
                    const brandsidArray = Array.from(new Set(brandsId))
                    const resBrands = await Promise.all(
                        brandsidArray.map((id: any) => getBrands(id))
                    )
                    const brands = resBrands.map((res: any) => res.data)

                    const priceLevels = resPriceLevel.data.map((price: any) => {
                        const matchedCategory = categories.flat().find(cat => {
                            return cat.id === price.categoryId
                        });
                        const matchedBrand = brands.find((brand) => {
                            return brand.id === price.brandId
                        })
                        return {
                            ...price,
                            category: matchedCategory || null,
                            brand: matchedBrand || null
                        };
                    });

                    setPriceLevelData(priceLevels)
                }
            } catch (error) {
                console.error('Error Message : ', error)
            }
        }

        fetchData()

    }, [])

    const handleDelete = (id: any) => {
        console.log('delete', id)
    }

    const breadcrumb = [
        {
            title: 'Catalogue',
        },
        {
            title: 'Price Level',
        },
    ]
    const columns: TableColumnsType<PriceLevelType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        // },
        {
            title: 'Brand',
            dataIndex: 'brand',
            render: (brand: { id: number; name: string } | null) => {
                return brand?.name || '-';
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category: { id: number; name: string } | null) => {
                return category?.name || '-';
            },
        },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: PriceLevelType) => (

                <div className="flex items-center justify-end gap-3 pe-4">
                    <Link href={routes.eCommerce.editPriceLevel(row.id)}>
                        <EditOutlined />
                    </Link>
                    <DeletePopover
                        title='Delete Price Level'
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
                    Price Level
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
                                label='Add Price Level'
                                link={routes.eCommerce.createPriceLevel}
                            />
                        </div>

                    </div>
                    <TableProduct
                        columns={columns}
                        dataSource={priceLevelData}
                        withSelectableRows
                    />
                </div>
            </Content>
        </>
    )
}

export default index
