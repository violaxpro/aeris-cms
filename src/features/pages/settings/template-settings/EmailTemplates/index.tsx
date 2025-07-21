'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { PlusCircleOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import { Content } from 'antd/es/layout/layout'
import Button from "@/components/button"
import SearchInput from '@/components/search';
import { getTaxes, deleteTaxes } from '@/services/settings-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { emailAtom } from '@/store/SettingsAtom'
import { TaxType, TemplateType, emailTemplateData } from '@/plugins/types/settings-type'
import dayjs from 'dayjs';
import FormEmail from './FormEmail'

const index = ({ emailTemplatesData }: { emailTemplatesData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(emailAtom)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [filteredData, setFilteredData] = useState<TemplateType[]>([])
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentEmail, setCurrentEmail] = useState<any>(null)

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

    const columns: TableColumnsType<TemplateType> = [
        {
            title: 'Template Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
            render: (val: string) => {
                return val
            }
        },
        {
            title: 'Created At',
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
            title: 'Updated At',
            dataIndex: 'updated_at',
            sorter: (a: any, b: any) => {
                return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
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
                            setCurrentEmail(row)
                            setIsOpenModal(true)
                        }}>
                            Edit
                        </Menu.Item>
                        <Menu.Item key="delete">
                            <Popover
                                title='Delete Email'
                                description='Are you sure to delete this data?'
                                onDelete={() => handleDelete(row.id)}
                                label='Delete'
                            />
                        </Menu.Item>
                    </Menu >
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
            const formattedDate = dayjs(item?.created_at).format('DD MMMM, YYYY').toLowerCase();
            return item?.name.toLowerCase().includes(search) ||
                formattedDate.includes(search);
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(emailTemplateData)
        if (!search) {
            setFilteredData(emailTemplateData)
        }
    }, [emailTemplateData, search])

    const fetchEmail = async () => {
        const res = await getTaxes();
        setData(res.data);
    };

    console.log(currentEmail)

    return (
        <>
            {contextHolder}
            <Content className="mt-6 mx-4 mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
                        <div>
                            <h1 className='text-xl font-bold'>
                                Email Templates
                            </h1>
                        </div>
                        <div className='flex items-center gap-2'>
                            <SearchInput onSearch={handleSearch} />
                            <Button

                                icon={<PlusCircleOutlined />}
                                label='Add Template'
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
                <FormEmail
                    open={isOpenModal}
                    handleCancel={() => {
                        setIsOpenModal(false)
                        setCurrentEmail(null)
                    }}
                    onSuccess={(msg: any) => {
                        notifySuccess(msg);
                        setIsOpenModal(false);
                        setCurrentEmail(null)

                        fetchEmail()
                    }}
                    databyId={currentEmail}
                />
            </Content>

        </>
    )
}

export default index
