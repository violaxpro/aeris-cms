'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { PlusCircleOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { MoreIcon, AddIcon } from '@public/icon'
import ButtonIcon from '@/components/button/ButtonIcon'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import SearchTable from '@/components/search/SearchTable'
import { getTaxes, deleteTaxes } from '@/services/settings-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { taxAtom } from '@/store/SettingsAtom'
import { TaxType } from '@/plugins/types/settings-type'
import dayjs from 'dayjs';
import FormTaxes from './FormTaxes'

const index = ({ taxesData }: { taxesData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(taxAtom)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [filteredData, setFilteredData] = useState<TaxType[]>([])
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentTax, setCurrentTax] = useState<any>(null)

    const handleDelete = async (id: any) => {
        try {
            const res = await deleteTaxes(id)
            if (res.success == true) {
                notifySuccess(res.message)
                setData(prev => prev.filter(item => item.id !== id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const breadcrumb = [
        {
            title: 'Settings',
        },
        {
            title: 'General Settings',
        },
    ]
    const columns: TableColumnsType<TaxType> = [
        {
            title: 'Tax Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a: any, b: any) => a?.description.localeCompare(b?.description),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Value',
            dataIndex: 'value',
            sorter: (a: any, b: any) => a?.value.localeCompare(b?.value),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            sorter: (a: any, b: any) => {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            },
            render: (val: any) => {
                const date = dayjs(val).format("DD/MM/YYYY")
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{date}</span>
                    </div>
                </div>
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
                        <Menu.Item key="edit" onClick={() => {
                            setCurrentTax(row)
                            setIsOpenModal(true)
                        }}>
                            Edit
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
                                title='Delete Tax'
                                description='Are you sure to delete this data?'
                                onDelete={() => handleDelete(row.id)}
                                label='Delete'
                            />
                        </Menu.Item>
                    </Menu >
                );

                return (
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <ButtonIcon
                                color='primary'
                                variant='filled'
                                size="small"
                                icon={MoreIcon}
                            />
                        </Dropdown >
                    </div>

                );
            }
        },
    ]

    const handleSearch = (value: string) => {
        const search = value.toLowerCase()
        setSearch(search)
        const result = data.filter((item: any) => {
            const formattedDate = dayjs(item?.created_at).format('DD MMMM, YYYY').toLowerCase();
            return item?.name.toLowerCase().includes(search) ||
                formattedDate.includes(search);
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(taxesData)
        if (!search) {
            setFilteredData(taxesData)
        }
    }, [taxesData, search])

    const fetchTaxes = async () => {
        const res = await getTaxes();
        setData(res.data);
    };

    console.log(data)

    return (
        <>
            {contextHolder}
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
                        <div>
                            <h1 className='text-2xl font-bold'>
                                Tax Setting
                            </h1>
                        </div>
                        <div className='flex items-center gap-2'>
                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={() => console.log('Searching for:', search)}
                            />
                            <Button

                                icon={<PlusCircleOutlined />}
                                label='Add Tax'
                                onClick={() => setIsOpenModal(true)}
                            />
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        withSelectableRows
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={setSelectedRowKeys}
                    />
                </div>
                <FormTaxes
                    open={isOpenModal}
                    handleCancel={() => {
                        setIsOpenModal(false)
                        setCurrentTax(null)
                    }}
                    onSuccess={(msg: any) => {
                        notifySuccess(msg);
                        setIsOpenModal(false);
                        setCurrentTax(null)

                        fetchTaxes()
                    }}
                    databyId={currentTax}
                />
            </Content>

        </>
    )
}

export default index
