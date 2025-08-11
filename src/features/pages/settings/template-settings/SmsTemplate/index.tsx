'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { AddIcon, FilterIcon, TrashIconRed, PencilIconBlue } from '@public/icon'
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
import { smsAtom } from '@/store/SettingsAtom'
import { TemplateType, smsTemplateData } from '@/plugins/types/settings-type'
import dayjs from 'dayjs';
import FormSms from './FormSms'
import ButtonIcon from '@/components/button/ButtonIcon'
import Image from 'next/image'
import ConfirmModal from '@/components/modal/ConfirmModal'

const index = ({ smsData }: { smsData?: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const router = useRouter()
    const [data, setData] = useAtom(smsAtom)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [filteredData, setFilteredData] = useState<TemplateType[]>([])
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currenData, setCurrenData] = useState<any>(null)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [deletedData, setDeletedData] = useState<any>(null)

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

                return (
                    <div className="flex items-center justify-end gap-3 pe-4">
                        <ButtonIcon
                            color='primary'
                            variant='filled'
                            size="small"
                            icon={PencilIconBlue}
                            onClick={() => router.push(routes.eCommerce.editPriceLevel(row.id))}
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
            const formattedDate = dayjs(item?.created_at).format('DD MMMM, YYYY').toLowerCase();
            return item?.name.toLowerCase().includes(search) ||
                formattedDate.includes(search);
        });
        setFilteredData(result);
    };

    useEffect(() => {
        setData(smsTemplateData)
        if (!search) {
            setFilteredData(smsTemplateData)
        }
    }, [smsTemplateData, search])

    const fetchData = async () => {
        const res = await getTaxes();
        setData(res.data);
    };

    console.log(currenData)

    return (
        <>
            {contextHolder}
            <ConfirmModal
                open={openModalDelete}
                onCancel={() => setOpenModalDelete(false)}
                onSave={handleDelete}
                action='Delete'
                text='Are you sure you want to delete this sms template?'
            />
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                    <div className='flex justify-between mb-4'>
                        <div>
                            <h1 className='text-2xl font-bold'>
                                SMS Templates
                            </h1>
                        </div>
                        <div className='flex items-center gap-2 w-auto'>
                            <SearchTable
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={() => console.log('Searching for:', search)}
                            />
                            <Button
                                icon={<Image
                                    src={AddIcon}
                                    alt='add-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Add Sms Template'
                                onClick={() => setIsOpenModal(true)}
                                hasWidth={true}
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
                <FormSms
                    open={isOpenModal}
                    handleCancel={() => {
                        setIsOpenModal(false)
                        setCurrenData(null)
                    }}
                    onSuccess={(msg: any) => {
                        notifySuccess(msg);
                        setIsOpenModal(false);
                        setCurrenData(null)

                        fetchData()
                    }}
                    databyId={currenData}
                />
            </Content>

        </>
    )
}

export default index
