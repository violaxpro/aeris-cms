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

const DetailReportingAnalytics = ({ slug, data }: { slug?: any, data: any }) => {
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
            title: 'Reporting & Analytics', url: routes.eCommerce.reportingAnalytics,
        },
        { title: 'Detail' },

    ]

    const columns: TableColumnsType<any> = [
        {
            title: 'Run Date',
            dataIndex: 'run_date',
            sorter: (a: any, b: any) => {
                return a?.run_date.localeCompare(b?.run_date)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.run_date}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Parameters',
            dataIndex: 'parameters',
            sorter: (a: any, b: any) => {
                return a?.parameters.localeCompare(b?.parameters)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.parameters}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a: any, b: any) => {
                return a?.duration.localeCompare(b?.duration)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.duration}s</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Row Count',
            dataIndex: 'row_count',
            sorter: (a: any, b: any) => {
                return a?.row_count - b?.row_count
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.row_count} rows</span>
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
                            Reporting & Analytics Detail
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
                        <Card title='Report Information' gridcols='md:grid-cols-4' >
                            <InfoItem label='Report Name' value={data.report_name || '-'} />
                            <InfoItem label='Report Type' value={data.type || '-'} />
                            {/* <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} /> */}
                            <InfoItem label='Owner' value={data.owner || '-'} />
                            <InfoItem label='Schedule' value={data.schedule || '-'} />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Filters' gridcols='md:grid-cols-4' >
                            <InfoItem label='SKU' value={data.sku || '-'} />
                            <InfoItem label='Warehouse' value={data.warehouse || '-'} />
                            <InfoItem label='Date Range' value={data.date_range || '-'} />
                            <InfoItem label='Status' value={toCapitalize(data.status) || 'Published'} textColor={statusMap[toCapitalize(data?.status)]?.textColor} />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Definitions' gridcols='md:grid-cols-3' >
                            <InfoItem label='Columns/Metrics' value={
                                <div>
                                    <ul className='list-disc px-5 grid md:grid-cols-2'>
                                        <li>SKU</li>
                                        <li>Warehouse</li>
                                        <li>QTY Expected</li>
                                        <li>QTY Actual</li>
                                        <li>Discrepancy Value</li>
                                        <li>Date</li>
                                    </ul>
                                </div>
                            } />
                            <InfoItem label='Grouping' value={
                                <div>
                                    <ul className='list-disc px-5'>
                                        <li>By SKU</li>
                                        <li>By Warehouse</li>
                                    </ul>
                                </div>
                            } />
                            <InfoItem label='Aggregation' value={
                                <div>
                                    <ul className='list-disc px-5'>
                                        <li>SUM(Discrepancy Value)</li>
                                        <li>AVG(Discrepancy %)</li>
                                    </ul>
                                </div>
                            } />
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Runs</h4>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={[
                                {
                                    id: 1,
                                    run_date: '23 August, 2025',
                                    parameters: 'Sydney_DC, Aug-01→23',
                                    duration: '00:12',
                                    row_count: 30,
                                }
                            ]}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <Card title='Export / Snapshot' gridcols='md:grid-cols-2 grid-cols-1'>
                            <InfoItem label='File Links' value={
                                <div>
                                    <ButtonAction
                                        label='weekly_stock_discrepancy.xslx'
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
                        <Card title='Sharing' gridcols='md:grid-cols-3'>
                            <InfoItem label='Visibility' value={data?.visibility || '-'} />
                            <InfoItem label='Recipients' value='warehouse-team@alexp.com' />
                        </Card>

                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailReportingAnalytics
