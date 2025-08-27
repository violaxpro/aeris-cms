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

const DetailPayment = ({ slug, data }: { slug?: any, data: any }) => {
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
    // const stepItems = data?.inventoryMovements?.map((movement: any) => ({
    //     title: `${movement.from} → ${movement.to}`,
    //     description: new Date(movement.date).toLocaleString(), // optional kalau mau tampilkan tanggal
    // }));
    const stepItems = [
        { title: "Inbound Dock" },
        { title: "QA/Quarantine" },
        { title: "Sellable" },
    ];

    const breadcrumb = [
        { title: 'Suppliers' },
        {
            title: 'Payments', url: routes.eCommerce.payments
        },
        { title: 'Detail' },
    ];

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
            title: 'Description',
            dataIndex: 'description',
            sorter: (a: any, b: any) => {
                return a?.description.localeCompare(b?.description)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.description}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'PO Qty',
            dataIndex: 'poQty',
            sorter: (a: any, b: any) => {
                return a?.poQty - b?.poQty
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.poQty}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Received Qty',
            dataIndex: 'qtyReceived',
            sorter: (a: any, b: any) => {
                return a?.qtyReceived - b?.qtyReceived
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qtyReceived}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Rejected Qty',
            dataIndex: 'qtyRejected',
            sorter: (a: any, b: any) => {
                return a?.qtyRejected - b?.qtyRejected
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.qtyRejected}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Variance',
            dataIndex: 'variance',
            sorter: (a: any, b: any) => {
                return a?.variance - b?.variance
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.variance}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'QC Result',
            dataIndex: 'qcResult',
            sorter: (a: any, b: any) => {
                const status = ['Pending', 'Accepted', 'Rejected', 'Short'];
                return status.indexOf(a.status) - status.indexOf(b.status)
            },
            render: (val) => {
                return <StatusTag status={val} />
            }
        },
        {
            title: 'Serial / Lots',
            dataIndex: 'serialsLots',
            sorter: (a: any, b: any) => {
                return a?.serialsLots.localeCompare(b?.serialsLots)
            },
            render: (_: any, row: any) => {
                const serialLot = row.serialsLots.map((item: any, index: number) => item.lotNo).join(', ')
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{serialLot}</span>
                    </div>
                </div>
            }
        },

    ]

    const columnLogs: TableColumnsType<any> = [
        {
            title: 'Staff',
            dataIndex: 'staff',
            sorter: (a: any, b: any) => {
                return a?.staff.localeCompare(b?.staff)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.staff}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Internal Notes',
            dataIndex: 'internal_notes',
            sorter: (a: any, b: any) => {
                return a?.internal_notes.localeCompare(b?.internal_notes)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.internal_notes}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Update',
            dataIndex: 'update',
            sorter: (a: any, b: any) => {
                return a?.update.localeCompare(b?.update)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.update}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            sorter: (a: any, b: any) => {
                return a?.action.localeCompare(b?.action)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.action}</span>
                    </div>
                </div>
            }
        },
    ]

    const columnSuppliers: TableColumnsType<any> = [
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
            title: 'Desc',
            dataIndex: 'description',
            sorter: (a: any, b: any) => {
                return a?.description.localeCompare(b?.description)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.description}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Supplier & Buying Price',
            dataIndex: 'supplier',
            sorter: (a: any, b: any) => {
                const aName = a?.supplier?.[0]?.name || '';
                const bName = b?.supplier?.[0]?.name || '';
                return aName.localeCompare(bName);
            },
            render: (_: any, row: any) => {
                const suppliers = row?.supplier || []
                return <div className="flex flex-col w-full">
                    {
                        suppliers?.map((item: any, index: number) => (
                            <div key={index} className="flex justify-start gap-1">
                                {/* <HoverPopover
                                    key={index}
                                    content={<p>Buying Price : {item?.buying_price}</p>}
                                >
                                    <span>{item?.name}</span>
                                </HoverPopover> */}
                                <div className="flex justify-between w-full">
                                    <span className='w-25'>{item.name}</span>
                                    <span>:</span>
                                    <span className="whitespace-nowrap">${item.buying_price}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
            }
        },
    ]

    const columnWarehouse: TableColumnsType<any> = [
        {
            title: 'Warehouse Location',
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
            title: 'Serial Number',
            dataIndex: 'serial_number',
            sorter: (a: any, b: any) => {
                return a?.serial_number.localeCompare(b?.serial_number)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.serial_number}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'PO Number',
            dataIndex: 'po_number',
            sorter: (a: any, b: any) => {
                const aName = a?.supplier?.[0]?.name || '';
                const bName = b?.supplier?.[0]?.name || '';
                return a?.po_number.localeCompare(b?.po_number);
            },
            render: (_: any, row: any) => {
                return row.po_number
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => {
                return dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf();
            },
            render: (_: any, row: any) => {
                return row.date
            }
        },
        {
            render: (_: any, row: any) => {
                return <Button
                    label='Choose'
                    onClick={() => handleSelectSerialNumber(
                        modalSerialNumber?.row?.key,
                        row.serial_number,
                        row.location,
                        row.po_number
                    )}
                    shape='round'
                    hasHeight={false}
                />
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
                            Payment Detail
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-3'>
                        {/* {
                            data?.status && data?.status?.toLowerCase() == 'draft' && <ButtonAction
                                icon={<Image
                                    src={SentEmailIcon}
                                    alt='sent-email-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Sent Email'
                            // link={routes.eCommerce.editQuote}
                            />
                        }
                        {
                            data?.status && data?.status?.toLowerCase() == 'sent' && <ButtonAction
                                icon={<Image
                                    src={ApproveIcon}
                                    alt='approve-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Approved'
                            // link={routes.eCommerce.editQuote}
                            />
                        }
                        {
                            isSendTrackingNumber &&
                            <ButtonAction
                                icon={<Image
                                    src={SendIcon}
                                    alt='send-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Send Tracking Number'
                                onClick={handleSendTrackingNumber}
                            />
                        }
                        {
                            data?.status && data?.status?.toLowerCase() == 'approved' &&
                            <div className='flex gap-3'>
                                <ButtonAction
                                    icon={<Image
                                        src={TrackingIcon}
                                        alt='tracking-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Tracking Number'
                                    onClick={() => setIsOpenModalTracking(true)}
                                />
                                <ButtonAction
                                    icon={<Image
                                        src={ConvertIcon}
                                        alt='convert-icon'
                                        width={15}
                                        height={15}
                                    />}
                                    label='Convert to Invoice'
                                // link={routes.eCommerce.editQuote}
                                />
                            </div>
                        } */}
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
                        <Card title='Payment Information' gridcols='md:grid-cols-5 grid-cols-2' >
                            <InfoItem label='Payment Number' value={data.paymentNo} />
                            <InfoItem label='Supplier' value={data.supplierName} />
                            <InfoItem label='Method' value={data.method} />
                            <InfoItem label='Funding Account' value={data.fundingAccount} />
                            <InfoItem label='Value' value={data.valueDate} />
                        </Card>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-full grid md:grid-cols-[1fr_3fr] gap-4'>
                            <Card title='Remittance Advice' gridcols='grid-cols-1'>
                                <InfoItem label='Attachment' value={
                                    <div className='w-full'>
                                        <ButtonAction
                                            label='remittance_PAY-23134-2025.pdf'
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
                                <InfoItem label='Preview' value={
                                    <div className="relative inline-block">
                                        <Image
                                            src={exampleImage}
                                            alt="image"
                                            width={400}
                                            height={50}
                                            className="block rounded-xl border !border-gray-300"
                                        />
                                        <ButtonIcon
                                            icon={ArrowPreviewIcon}
                                            shape="circle"
                                            color="default"
                                            variant="filled"
                                            className="!absolute !top-2 !right-2"
                                            onClick={() => setOpenModalPreview(true)}
                                        />
                                    </div>
                                } />
                            </Card>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <Card title='Applied Bills'>
                                    <InfoItem label='Bill Number' value='INV-AXA-101' />
                                    <InfoItem label='Original Amount' value='$12.800' />
                                    <InfoItem label='Paid Amount' value='$12.800' />
                                    <InfoItem label='Remaining' value='$0.00' />
                                </Card>
                                <Card title='Total'>
                                    <InfoItem label='Payment Amount' value={`$${data?.totals?.paymentAmount}`} />
                                    <InfoItem label='Fees' value={`$${data?.totals?.fees}`} />
                                </Card>
                                <div className='col-span-full grid md:grid-cols-2 gap-4'>
                                    <Card title='Bank Information' className='max-h-50' gridcols='grid-cols-1'>
                                        <InfoItem label='Bank Reference' value={data?.bankReference} />
                                    </Card>
                                    <Card title='Reconciliation Information' className='max-h-50' gridcols='grid-cols-1'>
                                        <InfoItem label='Reconciliation Info' value='Matched with Bank Statement ID: CBA-2025-188' />
                                    </Card>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailPayment
