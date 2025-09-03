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

const DetailBranchManagement = ({ slug, data }: { slug?: any, data: any }) => {
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
            title: 'Branch Managements', url: routes.eCommerce.warehouseBranchList,
        },
        { title: 'Detail' },

    ]


    const columnsZone: TableColumnsType<any> = [
        {
            title: 'Zone Code',
            dataIndex: 'zone_code',
            sorter: (a: any, b: any) => {
                return a?.zone_code.localeCompare(b?.zone_code)
            },
            render: (_: any, row: any) => {
                return row.zone_code
            }
        },
        {
            title: 'Zone Name',
            dataIndex: 'zone_name',
            sorter: (a: any, b: any) => {
                return a?.zone_name.localeCompare(b?.zone_name)
            },
            render: (_: any, row: any) => {
                return row.zone_name
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a: any, b: any) => {
                return a?.type.localeCompare(b?.type)
            },
            render: (_: any, row: any) => {
                return row.type
            }
        },

    ]
    const columnsBin: TableColumnsType<any> = [
        {
            title: 'Bin Code',
            dataIndex: 'bin_code',
            sorter: (a: any, b: any) => {
                return a?.bin_code.localeCompare(b?.bin_code)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.bin_code}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Zone Code',
            dataIndex: 'zone_code',
            sorter: (a: any, b: any) => {
                return a?.zone_code.localeCompare(b?.zone_code)
            },
            render: (_: any, row: any) => {
                return row.zone_code
            }
        },
        {
            title: 'Pick Sequence',
            dataIndex: 'pick_sequence',
            sorter: (a: any, b: any) => {
                return a?.pick_sequence - b?.pick_sequence
            },
            render: (_: any, row: any) => {
                return row.pick_sequence
            }
        },
        {
            title: 'Pickable',
            dataIndex: 'pickable',
            sorter: (a: any, b: any) => {
                return a?.pickable.localeCompare(b?.pickable)
            },
            render: (_: any, row: any) => {
                const pickable = row.pickable == true ? 'Yes' : 'No'
                return pickable
            }
        },
        {
            title: 'Putawayable',
            dataIndex: 'putawayable',
            sorter: (a: any, b: any) => {
                return a?.putawayable.localeCompare(b?.putawayable)
            },
            render: (_: any, row: any) => {
                const putawayable = row.putawayable == true ? 'Yes' : 'No'
                return putawayable
            }
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            sorter: (a: any, b: any) => {
                return a?.capacity.localeCompare(b?.capacity)
            },
            render: (_: any, row: any) => {
                return row.capacity
            }
        },

    ]

    const columnsCutOffs: TableColumnsType<any> = [
        {
            title: 'Carrier',
            dataIndex: 'carrier',
            sorter: (a: any, b: any) => {
                return a?.carrier.localeCompare(b?.carrier)
            },
            render: (_: any, row: any) => {
                return row.carrier
            }
        },
        {
            title: 'Service',
            dataIndex: 'service',
            sorter: (a: any, b: any) => {
                return a?.service.localeCompare(b?.service)
            },
            render: (_: any, row: any) => {
                return row.service
            }
        },
        {
            title: 'Cut Off',
            dataIndex: 'cut_off_time',
            sorter: (a: any, b: any) => {
                return a?.cut_off_time - b?.cut_off_time
            },
            render: (_: any, row: any) => {
                return row.cut_off_time
            }
        },

    ]

    const columnsCourierAccount: TableColumnsType<any> = [
        {
            title: 'Carrier',
            dataIndex: 'carrier',
            sorter: (a: any, b: any) => {
                return a?.carrier.localeCompare(b?.carrier)
            },
            render: (_: any, row: any) => {
                return row.carrier
            }
        },
        {
            title: 'Account Number',
            dataIndex: 'account_number',
            sorter: (a: any, b: any) => {
                return a?.account_number.localeCompare(b?.account_number)
            },
            render: (_: any, row: any) => {
                return row.account_number
            }
        },
        {
            title: 'Service',
            dataIndex: 'service',
            sorter: (a: any, b: any) => {
                return a?.service.localeCompare(b?.service)
            },
            render: (_: any, row: any) => {
                return row.service
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
                            Branch Management Detail
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
                        <Card title='Branch Management Information' gridcols='md:grid-cols-4' >
                            <InfoItem label='Warehouse Code' value={data.warehouse_code || 'WRH-388785'} />
                            <InfoItem label='Warehouse Name' value={data.warehouse_name || 'Seadan Pranatta'} />
                            <InfoItem label='Status' value={toCapitalize(data.status)} textColor={statusMap[toCapitalize(data?.status)]?.textColor} />
                            <InfoItem label='Default Fullfillment' value={data.default_fullfillment || 'Yes'} />
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Zones</h4>
                        </div>
                        <Table
                            columns={columnsZone}
                            dataSource={[
                                {
                                    id: 1,
                                    zone_code: 'ZO23',
                                    zone_name: 'Zone Fast Pick Zone',
                                    type: 'Fast',
                                },
                                {
                                    id: 2,
                                    zone_code: 'ZO24',
                                    zone_name: 'Zone Bulk Pick Zone',
                                    type: 'Bulk',
                                },

                            ]}
                        />
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Bins</h4>
                        </div>
                        <Table
                            columns={columnsBin}
                            dataSource={[
                                {
                                    id: 1,
                                    bin_code: 'BIN-0193',
                                    zone_code: 'ZONE-934',
                                    pick_sequence: '1',
                                    pickable: false,
                                    putawayable: true,
                                    capacity: 100
                                },
                                {
                                    id: 2,
                                    bin_code: 'BIN-0194',
                                    zone_code: 'ZONE-902',
                                    pick_sequence: '1',
                                    pickable: true,
                                    putawayable: false,
                                    capacity: 100
                                },
                            ]}
                        />
                    </div>
                    <div className='grid md:grid-cols-2 gap-3'>
                        <div>
                            <div className='flex justify-between my-2'>
                                <h4 className='text-xl font-semibold'>Cut-offs</h4>
                            </div>
                            <Table
                                columns={columnsCutOffs}
                                dataSource={[
                                    {
                                        id: 1,
                                        carrier: 'Aust Post',
                                        service: 'Ecom',
                                        cut_off_time: '17:00',
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <div className='flex justify-between my-2'>
                                <h4 className='text-xl font-semibold'>Courier Accounts</h4>
                            </div>
                            <Table
                                columns={columnsCourierAccount}
                                dataSource={[
                                    {
                                        id: 1,
                                        carrier: 'Aust Post',
                                        service: 'Ecom',
                                        account_number: '1238387',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div>
                        <Card title='Attachments & Thread' gridcols='md:grid-cols-2 grid-cols-1'>
                            <InfoItem label='Attachments' value={
                                <div className='flex flex-col gap-2 max-w-sm'>
                                    <ButtonAction
                                        label='Floor Map – Parramatta.pdf'
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
                                        label='SOP Receiving – v2.docx'
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
                            <InfoItem label='Thread' value={
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

export default DetailBranchManagement
