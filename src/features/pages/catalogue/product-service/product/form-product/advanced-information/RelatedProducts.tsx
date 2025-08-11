import React, { useState, useEffect } from 'react'
import FormGroup from '@/components/form-group'
import Button from "@/components/button"
import TableProduct from "@/components/table"
import type { TableColumnsType } from 'antd'
import { productsData, ProductType, ProductDataType } from '@/data/products-data'
import Image from 'next/image'
import { Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { routes } from '@/config/routes'
import Link from 'next/link'
import SearchTable from '@/components/search/SearchTable'
import { useAtom } from 'jotai'
import { productAtom } from '@/store/ProductAtom'
import ButtonIcon from '@/components/button/ButtonIcon'
import { PencilIconBlue, TrashIconRed } from '@public/icon'
import { getProduct } from '@/services/products-service'

const RelatedProductInformation = ({ className }: { className?: string }) => {
    const [formData, setFormData] = useState({
        name: '',
        value: ''
    });
    const [data, setData] = useAtom(productAtom)
    const [filteredData, setFilteredData] = useState<ProductDataType[]>([]);
    const [search, setSearch] = useState('')

    const columnProducts: TableColumnsType<ProductDataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (_: any, row: any) => {
                const url = row && row.images.length > 0 ? row?.images[0]?.url : null
                return <Image
                    src={url}
                    alt="product-img"
                    width={50}
                    height={50}
                    className='object-cover rounded-xl'
                />
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Qty',
            dataIndex: 'stock',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (_: string, row: any) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <ButtonIcon
                        color='primary'
                        variant='filled'
                        size="small"
                        icon={PencilIconBlue}
                    // onClick={() => setOpenModalEdit(true)}
                    />
                    <ButtonIcon
                        color='danger'
                        variant='filled'
                        size="small"
                        icon={TrashIconRed}
                    // onClick={() => setOpenModalDelete(true)}
                    />
                </div >
            ),
        },

    ]

    const handleChange = (values: { name: string; price: string }[]) => {
        console.log('Updated List:', values);
    };

    const handleSearch = (query: string) => {
        console.log('User mencari:', query);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProduct()
                if (res.data) {
                    setData(res.data)
                }
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, []);

    console.log(productAtom)

    useEffect(() => {
        if (!search) {
            setFilteredData(data);
        } else {
            const searchLower = search.toLowerCase();
            const result = data.filter((item: any) =>
                item?.name?.toLowerCase().includes(searchLower) ||
                item?.sku?.toLowerCase().includes(searchLower) ||
                item?.price?.toString().toLowerCase().includes(searchLower)
            );
            setFilteredData(result);
        }
    }, [data, search]);
    return (
        <div>
            <FormGroup
                title="Related Product"
                description="Related Product information about the product"
            >
                <div className="overflow-x-auto col-span-full">
                    <div className='flex justify-end mb-2'>
                        <SearchTable
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onSearch={() => console.log('Searching for:', search)}
                        />
                    </div>
                    <TableProduct
                        columns={columnProducts}
                        dataSource={filteredData}
                        withSelectableRows
                    />
                </div>
            </FormGroup>
            <div className='flex justify-end gap-3 mt-2'>
                <Button
                    label='Save'

                />
            </div>

        </div>
    )
}

export default RelatedProductInformation
