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

const DetailInventoryManagement = ({ slug, data }: { slug?: any, data: any }) => {
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
            title: 'Inventory Managements', url: routes.eCommerce.inventoryList,
        },
        { title: 'Detail' },

    ]

    const columnsWarehouseLocation: TableColumnsType<any> = [
        {
            title: 'Location',
            dataIndex: 'location',
            sorter: (a: any, b: any) => {
                return a?.location.localeCompare(b?.location)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.location}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Zone',
            dataIndex: 'zone',
            sorter: (a: any, b: any) => {
                return a?.zone.localeCompare(b?.zone)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.zone}</span>
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
            title: 'On Hand',
            dataIndex: 'on_hand',
            sorter: (a: any, b: any) => {
                return a?.on_hand - b?.on_hand
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.on_hand}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Allocated',
            dataIndex: 'allocated',
            sorter: (a: any, b: any) => {
                return a?.allocated - b?.allocated
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.allocated}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Available',
            dataIndex: 'available',
            sorter: (a: any, b: any) => {
                return a?.available - b?.available
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.available}</span>
                    </div>
                </div>
            }
        },

    ]

    const columnsSerial: TableColumnsType<any> = [
        {
            title: 'Lots / Serials',
            dataIndex: 'serial',
            sorter: (a: any, b: any) => {
                return a?.serial.localeCompare(b?.serial)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.serial}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => {
                return a?.status.localeCompare(b?.status)
            },
            render: (_: any, row: any) => {
                return <StatusTag status={row?.status || '-'} />
            }
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry_date',
            sorter: (a: any, b: any) => {
                return a?.expiry_date.localeCompare(b?.expiry_date)
            },
            render: (_: any, row: any) => {
                return row.expiry_date
            }
        },

    ]

    const columnsMovementLog: TableColumnsType<any> = [
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => {
                return a?.date.localeCompare(b?.date)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.date}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'QTY (+/-)',
            dataIndex: 'qty',
            sorter: (a: any, b: any) => {
                return a?.qty - b?.qty
            },
            render: (_: any, row: any) => {
                return row.qty
            }
        },
        {
            title: 'Reason Code',
            dataIndex: 'reason',
            sorter: (a: any, b: any) => {
                return a?.reason.localeCompare(b?.reason)
            },
            render: (_: any, row: any) => {
                return row.reason
            }
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
            sorter: (a: any, b: any) => {
                return a?.reference.localeCompare(b?.reference)
            },
            render: (_: any, row: any) => {
                return row.reference
            }
        },

    ]

    const columnsHoldQuarantine: TableColumnsType<any> = [
        {
            title: 'Reason Code',
            dataIndex: 'reason',
            sorter: (a: any, b: any) => {
                return a?.reason.localeCompare(b?.reason)
            },
            render: (_: any, row: any) => {
                return row.reason
            }
        },
        {
            title: 'QTY',
            dataIndex: 'qty',
            sorter: (a: any, b: any) => {
                return a?.qty - b?.qty
            },
            render: (_: any, row: any) => {
                return row.qty
            }
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry_date',
            sorter: (a: any, b: any) => {
                return a?.expiry_date.localeCompare(b?.expiry_date)
            },
            render: (_: any, row: any) => {
                return row.expiry_date
            }
        },

    ]

    const columnsReorderSettings: TableColumnsType<any> = [
        {
            title: 'ReorderPoint',
            dataIndex: 'reorder_point',
            sorter: (a: any, b: any) => {
                return a?.reorder_point.localeCompare(b?.reorder_point)
            },
            render: (_: any, row: any) => {
                return row.reorder_point
            }
        },
        {
            title: 'Reorder QTY',
            dataIndex: 'reorder_qty',
            sorter: (a: any, b: any) => {
                return a?.reorder_qty - b?.reorder_qty
            },
            render: (_: any, row: any) => {
                return row.reorder_qty
            }
        },
        {
            title: 'Preferred Supplier',
            dataIndex: 'preferred_supplier',
            sorter: (a: any, b: any) => {
                return a?.preferred_supplier.localeCompare(b?.preferred_supplier)
            },
            render: (_: any, row: any) => {
                return row.preferred_supplier
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
                            Inventory Management Detail
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
                        <Card title='Inventory Management Information' gridcols='md:grid-cols-4' >
                            <InfoItem label='SKU' value={data.sku || 'ALM-123'} />
                            <InfoItem label='Product Name' value={data.name || 'IP Module for Bosch 3000'} />
                            {/* <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} /> */}
                            <InfoItem label='UoM' value={data.uom || 'pcs'} />
                            <InfoItem label='Barcodes' value={data.barcodes || 'BARCODE-165365'} />
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Location Tabs</h4>
                        </div>
                        <Table
                            columns={columnsWarehouseLocation}
                            dataSource={[
                                {
                                    id: 1,
                                    location: 'Seaden Paramatta',
                                    zone: 'ZO23',
                                    bin: 'B05',
                                    on_hand: 300,
                                    allocated: 100,
                                    available: 50
                                },
                                {
                                    id: 2,
                                    location: 'Seaden Paramatta',
                                    zone: 'ZO22',
                                    bin: 'B01',
                                    on_hand: 200,
                                    allocated: 100,
                                    available: 50
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Lots / Serials</h4>
                        </div>
                        <Table
                            columns={columnsSerial}
                            dataSource={[
                                {
                                    id: 1,
                                    serial: 'SERIAL-0193',
                                    status: 'Active',
                                    expiry_date: '02 September, 2025'
                                },
                                {
                                    id: 2,
                                    serial: 'SERIAL-0191',
                                    status: 'Quarantine',
                                    expiry_date: '02 September, 2025'
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Movement Log</h4>
                        </div>
                        <Table
                            columns={columnsMovementLog}
                            dataSource={[
                                {
                                    id: 1,
                                    date: '01 September, 2025',
                                    qty: '+50',
                                    reason: 'Adjustment Opening',
                                    reference: 'Initial Stock',
                                },
                                {
                                    id: 2,
                                    date: '01 September, 2025',
                                    qty: '-20',
                                    reason: 'Order',
                                    reference: 'SO-20250905-01',
                                },
                                {
                                    id: 3,
                                    date: '01 September, 2025',
                                    qty: '+50',
                                    reason: 'GRN',
                                    reference: 'PO-20250907-01',
                                },

                            ]}
                        />
                    </div>
                    <div className='grid md:grid-cols-2 gap-3'>
                        <div>
                            <div className='flex justify-between my-2'>
                                <h4 className='text-xl font-semibold'>Holds/Quarantine</h4>
                            </div>
                            <Table
                                columns={columnsHoldQuarantine}
                                dataSource={[
                                    {
                                        id: 1,
                                        reason: 'Quality Check',
                                        qty: '50',
                                        expiry_date: '01 September, 2025',
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <div className='flex justify-between my-2'>
                                <h4 className='text-xl font-semibold'>Reorder Settings</h4>
                            </div>
                            <Table
                                columns={columnsHoldQuarantine}
                                dataSource={[
                                    {
                                        id: 1,
                                        reorder_point: 'Quality Check',
                                        reorder_qty: '50',
                                        preferred_supplier: 'SafeAlarm Pty Ltd',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailInventoryManagement
