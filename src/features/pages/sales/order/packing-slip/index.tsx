'use client'
import React, { useState, useEffect } from 'react'
import Table from "@/components/table"
import type { TableColumnsType } from 'antd'
import { Dropdown, Menu } from 'antd'
import { EditOutlined, PlusCircleOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons'
import Popover from '@/components/popover'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Breadcrumb from "@/components/breadcrumb"
import Input from '@/components/input'
import { Content } from 'antd/es/layout/layout'
import Tabs, { Tab } from '@/components/tab'
import Button from "@/components/button"
import SelectInput from '@/components/select'
import SearchInput from '@/components/search';
import Modal from '@/components/modal'
import { deleteSupplierList } from '@/services/supplier-list-service'
import { useNotificationAntd } from '@/components/toast'
import { useAtom } from 'jotai'
import { orderAtom } from '@/store/SalesAtom'
import { OrderType } from '@/plugins/types/sales-type'
import dayjs from 'dayjs';
import DatePickerInput from '@/components/date-picker';
import StatusTag from '@/components/tag'
import StatusBadge from '@/components/badge/badge-status'
import Pagination from '@/components/pagination'
import {
    MoreIcon,
    TrashIconRed,
    FilterIcon,
    AddIcon,
    PrintIconBlack,
    EmailBlackIcon,
    StatusIcon,
    CopyPasteIcon,
    DuplicateIcon,
    WalletIcon,
    ExportIcon,
    PencilIconBlack,
    DownloadIcon
} from '@public/icon'
import Image from 'next/image'
import ButtonIcon from '@/components/button/ButtonIcon'
import ButtonAction from '@/components/button/ButtonAction'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import Checkbox from '@/components/checkbox'
import { downloadPackingSlipPDF, previewAndPrintPDF } from '@/services/packing-slip-service'

const index = ({ slug, detailOrder }: { slug?: any, detailOrder: any }) => {
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [data, setData] = useAtom(orderAtom)
    const [isOpenModalFilter, setisOpenModalFilter] = useState(false)
    const [filteredData, setFilteredData] = useState<OrderType[]>([])
    const [search, setSearch] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pick, setPick] = useState(false)
    const [pack, setPack] = useState(false)

    const breadcrumb = [
        {
            title: 'Sales',
        },
        {
            title: 'Order', url: routes.eCommerce.order,
        },
        {
            title: 'Packing Slip Detail',
        },
    ]
    const columns: TableColumnsType<OrderType> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => a.sku.localeCompare(b.sku),
            render: (_: any, row: any) => {
                return row.sku
            }
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            render: (_: any, row: any) => {
                return <span>{row.name}</span>
            }
        },
        {
            title: 'Serial Number',
            dataIndex: 'serial_number',
            sorter: (a: any, b: any) => a.serial_number.localeCompare(b.serial_number),
            render: (_: any, row: any) => {
                return row.serial_number || 'SN-UPX-0001'
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            sorter: (a: any, b: any) => a.qty - b.qty,
            render: (_: any, row: any) => {
                return row.qty
            }
        },
        {
            title: 'Pick',
            render: (_: any, row: any) => {
                return <Checkbox checked={pick} onChange={(checked) => setPick(checked)} />
            }
        },
        {
            title: 'Pack',
            render: (_: any, row: any) => {
                return <Checkbox checked={pack} onChange={(checked) => setPack(checked)} />
            }
        },

    ]

    const handlePrint = async (dataPrint: any) => {
        console.log(dataPrint)
        await downloadPackingSlipPDF(dataPrint, 'order');
    }

    const handlePreview = async (dataPrint: any) => {
        console.log('masu', dataPrint)
        await previewAndPrintPDF(dataPrint, 'order');
    }


    useEffect(() => {
        setData(detailOrder?.product)
    }, [detailOrder, search])

    console.log(data)

    return (
        <>
            {contextHolder}
            <div className="mt-6 mx-4 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Packing Slip Detail
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex  gap-3'>
                        <ButtonAction
                            icon={<Image
                                src={PencilIconBlack}
                                alt='pencil-icon'
                                width={15}
                                height={15}
                            />}
                            label='Edit'
                            style={{ padding: '1.2rem 1.7rem' }}
                        // link={routes.eCommerce.editQuote}
                        />
                        <ButtonAction
                            icon={<Image
                                src={PrintIconBlack}
                                alt='print-icon'
                                width={15}
                                height={15}
                            />}
                            style={{ padding: '1.2rem 1.7rem' }}
                            label='Print'
                            onClick={() => handlePreview(detailOrder)}
                        />
                        <ButtonAction
                            icon={<Image
                                src={DownloadIcon}
                                alt='download-icon'
                                width={15}
                                height={15}
                            />}
                            label='Download PDF'
                            style={{ padding: '1.2rem 1.7rem' }}
                            onClick={() => handlePrint(detailOrder)}
                        />
                        <Button
                            icon={<Image
                                src={ExportIcon}
                                alt='export-icon'
                                width={15}
                                height={15}
                            />}
                            label='Export'
                            style={{ padding: '1.2rem 1.7rem' }}
                        // link={routes.eCommerce.editQuote}
                        />

                    </div>
                </div>
            </div>
            <Content className="mb-0">
                <div style={{ padding: 24, minHeight: 360 }}>
                    <h4 className='text-lg font-semibold'>Order Lists</h4>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </Content>
        </>
    )
}

export default index
