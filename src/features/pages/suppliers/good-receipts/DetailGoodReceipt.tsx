'use client'
import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Divider } from 'antd'
import { routes } from '@/config/routes'
import { Content } from 'antd/es/layout/layout'
import ButtonAction from '@/components/button/ButtonAction'
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
    SendIcon
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
import exampleImage from '@public/apple-icon.png';
import StepComponent from '@/components/step'

const DetailGoodReceipt = ({ slug, data }: { slug?: any, data: any }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess } = useNotificationAntd()
    const [profitHidden, setProfitHidden] = useState(true)
    const [buyPriceHidden, setBuyPriceHidden] = useState(true)
    const [isOpenModalSupplier, setIsOpenModalSupplier] = useState(false)
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
            title: 'Good Receipts', url: routes.eCommerce.goodReceipt
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

    const serialNumberDataTable = data?.product?.map((item: any, index: number) => {
        console.log(item)
        const dataPerQuantity = Array.from({ length: item.qty }).map((_, index) => ({
            ...item,
            key: `${item.id}-${index}`, // unique key
            rowNumber: index + 1,       // nomor urut
        }));

        return dataPerQuantity
    })

    const openSerialNumberModal = (row: any) => {
        setModalSerialNumber({ open: true, row });
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
                open={modalSerialNumber.open}
                handleCancel={() => setModalSerialNumber({ open: false, row: null })}
                title='Choose Serial Number'
                subtitle='Please choose serial number.'
            >
                <div className='flex justify-between mb-3'>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold'>{modalSerialNumber?.row?.sku}</span>
                        <span>{modalSerialNumber?.row?.name}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <SearchTable
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onSearch={() => {
                                console.log('Searching for:', search)
                            }}
                        />
                        <ShowPageSize
                            pageSize={pageSizeWarehouse}
                            onChange={setPageSizeWarehouse}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <Table
                        columns={columnWarehouse}
                        dataSource={modalSerialNumber?.row?.warehouses || []}
                    />
                    <Pagination
                        current={currentPageWarehouse}
                        total={modalSerialNumber?.row?.warehouses?.length || 0}
                        pageSize={pageSizeWarehouse}
                        onChange={(page) => setCurrentPageWarehouse(page)}
                    />
                </div>
            </Modal>
            <Modal
                open={isOpenModalSupplier}
                title='Supplier'
                handleCancel={() => setIsOpenModalSupplier(false)}
            >
                <Table
                    columns={columnSuppliers}
                    dataSource={data?.product}
                />
            </Modal>

            <div className="mt-6 mx-6 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Good Receipt Detail
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
                        <Card title='Good Receipt Information' gridcols='grid-cols-5' >
                            <InfoItem label='GRN No' value={data.grnNo} />
                            <InfoItem label='PO No' value={data.poNo} />
                            <InfoItem label='Supplier' value={data.supplier} />
                            <InfoItem label='Dock/Ref' value={data.dockRef} />
                            <InfoItem label='Receiver' value={data.receivedBy} />
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Product Lists</h4>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data?.products}
                        />
                    </div>
                    <div className='grid md:grid-cols-12 gap-4'>
                        <Card title='Attachment' gridcols='grid-cols-2' className='col-span-5'>
                            <InfoItem label='Photos' value={
                                <div className='max-w-100'>
                                    <Image
                                        src={exampleImage}
                                        alt='image'
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            } />
                            <InfoItem label='Delivery Notes' value='33AA1111111111111' />
                        </Card>
                        <Card title='Inventory Movements' gridcols='grid-cols-1' className='col-span-7'>
                            <StepComponent items={stepItems} current={stepItems.length} size="small" />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Links' className='flex flex-col justify-center' gridcols='grid-cols-3'>
                            <InfoItem label='Related PO' value={data?.links?.relatedPO} />
                            <InfoItem label='Related Bills (3-way match)' value='BILL-5002' />
                            <InfoItem label='Any Supplier RMA Created' value={data?.links?.supplierRMA} />
                        </Card>
                    </div>

                </div>
            </Content>
        </>
    )
}

export default DetailGoodReceipt
