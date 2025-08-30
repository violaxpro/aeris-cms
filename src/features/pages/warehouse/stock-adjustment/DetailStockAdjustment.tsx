'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Divider } from 'antd'
import { routes } from '@/config/routes'
import { Content } from 'antd/es/layout/layout'
import ButtonAction from '@/components/button/ButtonAction'
import ButtonIcon from '@/components/button/ButtonIcon'
import Image from 'next/image'
import {
    PencilIconBlack,
    PrintIconBlack,
    ExportIcon,
    SentEmailIcon,
    ConvertIcon,
    ApproveIcon,
    DownloadIcon,
    TrackingIcon,
    SendIcon,
    CloudDownloadIcon,
    ArrowPreviewIcon
} from '@public/icon'
import Button from '@/components/button'
import Table from '@/components/table'
import { QuoteType } from '@/plugins/types/sales-type'
import type { TableColumnsType } from 'antd'
import { statusMap } from '@/config/colors-status'
import dayjs from 'dayjs'
import { Card } from '@/components/card'
import { InfoItem } from '@/components/card/InfoItem'
import { useRouter } from 'next/navigation'
import { downloadInvoicePDF, previewAndPrintPDF } from '@/services/invoice-service'
import Modal from '@/components/modal'
import HoverPopover from '@/components/popover/HoverPopover'
import CheckboxInput from '@/components/checkbox'
import Input from '@/components/input'
import Pagination from '@/components/pagination'
import SearchTable from '@/components/search/SearchTable'
import ShowPageSize from '@/components/pagination/ShowPageSize'
import { useNotificationAntd } from '@/components/toast'
import StatusTag from '@/components/tag'
import exampleImage from '@public/image/Payment Remittance Example.png';
import StepComponent from '@/components/step'
import { toCapitalize } from '@/plugins/utils/utils'

const DetailStockAdjustment = ({ slug, data }: { slug?: any, data: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [profitHidden, setProfitHidden] = useState(true)
    const [buyPriceHidden, setBuyPriceHidden] = useState(true)
    const [openModalPreview, setOpenModalPreview] = useState(false)
    const [isOpenModalTracking, setIsOpenModalTracking] = useState(false)
    const [serialNumberData, setSerialNumberData] = useState<any>({
        pickId: [],
        packId: [],
        serialNumber: {},
        productFrom: ''
    })
    const [trackingNumberData, setTrackingNumberData] = useState<any>({
        courier: '',
        tracking_number: [{ value: '' }],
    })
    const [isSendTrackingNumber, setIsSendTrackingNumber] = useState(false)
    const [modalSerialNumber, setModalSerialNumber] = useState<{ open: boolean; row: any }>({ open: false, row: null })
    const [currentOrder, setCurrentOrder] = useState<any>(null)
    const [currentPageWarehouse, setCurrentPageWarehouse] = useState(1);
    const [pageSizeWarehouse, setPageSizeWarehouse] = useState(10);
    const [search, setSearch] = useState('')
    const [revealedRows, setRevealedRows] = useState<number[]>([]);


    const breadcrumb = [
        {
            title: 'Warehouse',
        },
        {
            title: 'Stock Adjustment', url: routes.eCommerce.stockAdjustment,
        },
        { title: 'Detail' },

    ]

    const columns: TableColumnsType<any> = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            sorter: (a: any, b: any) => {
                return a?.sku.localeCompare(b?.sku)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.sku}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Bin',
            dataIndex: 'bin',
            sorter: (a: any, b: any) => {
                return a?.bin.localeCompare(b?.bin)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.bin}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'System QTY',
            dataIndex: 'qty',
            sorter: (a: any, b: any) => {
                return a?.qty - b?.qty
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qty}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Counted / Delta',
            dataIndex: 'counted',
            sorter: (a: any, b: any) => {
                return a?.counted - b?.counted
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.counted}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Serial / Lots',
            dataIndex: 'serialsLots',
            sorter: (a: any, b: any) => {
                return a?.serialsLots.localeCompare(b?.serialsLots)
            },
            render: (_: any, row: any) => {
                const serialLot = row.serialsLots.map((item: any, index: number) => item).join(', ')
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{serialLot}</span>
                    </div>
                </div>
            }
        },

    ]

    const invoiceData = {
        invoiceNumber: 'INV-2025-001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
            { sku: '0317-8471', name: 'U-Prox Keyfob - White SMART9412', quantity: 2, unit_price: 141.44 },
            { sku: '0317-8471', name: 'Hikvision Wireless Repeater DS-PR1-WB', quantity: 3, unit_price: 235.36 },
        ],
        total: 250,
        subtotal: 879.98,
        gst: 56.00,
        freight: 15.00,
        unitPrice: 200,
        quantity: 10
    };

    // Saat user pilih serial number di modal:
    const handleSelectSerialNumber = (rowId: string, serial: string, warehouseName: string, poNumber: string) => {
        setSerialNumberData((prev: any) => ({
            ...prev,
            serialNumber: {
                ...prev.serialNumber,
                [rowId]: serial
            },
            productFrom: {
                ...prev.productFrom,
                [rowId]: `${warehouseName} - ${poNumber}`
            }
        }));

        // Tutup modal
        setModalSerialNumber({ open: false, row: null });
    };

    const handleTrackingChange = (field: string, value: any) => {
        setTrackingNumberData((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmitTracking = () => {
        console.log("Tracking data dikirim:", trackingNumberData);
        setIsSendTrackingNumber(true)
        setIsOpenModalTracking(false)
        // TODO: kirim ke API di sini
    };

    const handlePrint = async (data: any) => {
        await downloadInvoicePDF(data, 'order');
    }

    const handlePreview = async (data: any) => {
        await previewAndPrintPDF(data, 'order');
    }

    const handleSendTrackingNumber = () => {
        notifySuccess('Tracking Number has succesfully send!')
    }

    // console.log(modalSerialNumber, serialNumberData)
    return (
        <>
            {contextHolder}
            <Modal
                open={openModalPreview}
                handleCancel={() => setOpenModalPreview(false)}
                title='Remittance Advice'
                rightButton={<Button
                    icon={<Image
                        src={ExportIcon}
                        alt='export-icon'
                        width={15}
                        height={15}
                    />}
                    label='Download PDF'
                    onClick={() => console.log('download pdf')}
                />}
            >
                <div className='max-w-700 max-h-100'>
                    <Image
                        src={exampleImage}
                        alt="image"
                        width={700}
                        height={100}
                        className="block rounded-xl border !border-gray-300"
                    />
                </div>
            </Modal>
            <div className="mt-6 mx-6 mb-0">
                <div className='flex flex-col justify-start md:flex-row md:justify-between md:items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Stock Adjustment Detail
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-3'>
                        <ButtonAction
                            icon={<Image
                                src={PencilIconBlack}
                                alt='pencil-icon'
                                width={15}
                                height={15}
                            />}
                            label='Edit'
                        // link={routes.eCommerce.editQuote}
                        />
                        <ButtonAction
                            icon={<Image
                                src={PrintIconBlack}
                                alt='print-icon'
                                width={15}
                                height={15}
                            />}
                            label='Print'
                            onClick={() => handlePreview(invoiceData)}
                        />
                        <Button
                            icon={<Image
                                src={ExportIcon}
                                alt='export-icon'
                                width={15}
                                height={15}
                            />}
                            label='Download PDF'
                            onClick={() => handlePrint(invoiceData)}
                        />
                        {/* <ButtonAction
                            icon={<Image
                                src={DownloadIcon}
                                alt='download-icon'
                                width={15}
                                height={15}
                            />}
                            label='Download PDF'
                            onClick={() => handlePrint(invoiceData)}
                        /> */}
                        {/* <Button
                            icon={<Image
                                src={ExportIcon}
                                alt='export-icon'
                                width={15}
                                height={15}
                            />}
                            label='Export'
                        // link={routes.eCommerce.editQuote}
                        /> */}
                    </div>

                </div>
            </div>
            <Content className="mb-5">
                <div className='flex flex-col gap-6 min-h-[360px] p-6'>
                    <div className='grid gap-4'>
                        <Card title='Stock Adjustment Information' gridcols='md:grid-cols-6' >
                            <InfoItem label='Adjustment Number' value={data.adjustment_number} />
                            <InfoItem label='Reason' value={data.reason_code} />
                            <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} />
                            <InfoItem label='Created Date' value='20 August, 2025' />
                            <InfoItem label='Submitted Date' value='21 August, 2025' />
                            <InfoItem label='Approved Date' value='22 August, 2025' />
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Product Lists</h4>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={[
                                {
                                    id: 1,
                                    sku: '0317-8471',
                                    bin: 'B05',
                                    qty: 30,
                                    counted: 30,
                                    serialsLots: ['LOT-KEYW-20250801']
                                }
                            ]}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <Card title='Approval' gridcols='md:grid-cols-3'>
                            <InfoItem label='Approver' value='Rudi Santoso' />
                            <InfoItem label='Timestamp' value='22 August, 2025 08:20' />
                            <InfoItem label='Comments' value='Adjustment verified, approved for posting.' />
                        </Card>
                        <Card title='Posting Result' gridcols='grid-cols-1'>
                            <InfoItem label='Stock Movement Refs' value={
                                <div className='grid md:grid-cols-2 gap-3'>
                                    <ButtonAction
                                        label='MOV-2025-08121.pdf'
                                        icon={<Image
                                            src={CloudDownloadIcon}
                                            alt='download-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        position='end'
                                        btnClassname='w-full'
                                        labelClassname='truncate block'
                                    />
                                    <ButtonAction
                                        label='MOV-2025-08122.pdf'
                                        icon={<Image
                                            src={CloudDownloadIcon}
                                            alt='download-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        position='end'
                                        btnClassname='w-full'
                                        labelClassname='truncate block'
                                    />

                                </div>
                            } />
                        </Card>
                    </div>

                    <div className=''>
                        <Card title='Attachments & Thread' gridcols='md:grid-cols-2 grid-cols-1'>
                            <InfoItem label='Attachments' value={
                                <div className='flex flex-col gap-2 max-w-lg'>
                                    <ButtonAction
                                        label='photo_damage1.jpg.pdf'
                                        icon={<Image
                                            src={CloudDownloadIcon}
                                            alt='download-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        position='end'
                                        btnClassname='w-full'
                                        labelClassname='truncate block'
                                    />
                                    <ButtonAction
                                        label='photo_damage2.jpg.pdf'
                                        icon={<Image
                                            src={CloudDownloadIcon}
                                            alt='download-icon'
                                            width={15}
                                            height={15}
                                        />}
                                        position='end'
                                        btnClassname='w-full'
                                        labelClassname='truncate block'
                                    />
                                </div>

                            } />
                            <InfoItem label='Thread / Notes' value={
                                <div>
                                    <ul className='list-disc px-5'>
                                        <li >23 Aug 2025, 10:45</li>
                                        <p>Customer requested express shipping via DHL.</p>
                                    </ul>
                                </div>
                            } />
                        </Card>

                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailStockAdjustment
