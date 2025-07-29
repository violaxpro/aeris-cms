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
    DownloadIcon
} from '@public/icon'
import Button from '@/components/button'
import Table from '@/components/table'
import { QuoteType } from '@/plugins/types/sales-type'
import type { TableColumnsType } from 'antd'
import OrderSummary from '../OrderSummary'
import { statusMap } from '@/config/colors-status'
import dayjs from 'dayjs'
import { Card } from '@/components/card'
import { InfoItem } from '@/components/card/InfoItem'
import { useRouter } from 'next/navigation'
import { downloadInvoicePDF, previewAndPrintPDF } from '@/services/invoice-service'
import Modal from '@/components/modal'
import HoverPopover from '@/components/popover/HoverPopover'

const DetailOrder = ({ slug, data }: { slug?: any, data: any }) => {
    const router = useRouter()
    const [profitHidden, setProfitHidden] = useState(true)
    const [buyPriceHidden, setBuyPriceHidden] = useState(true)
    const [isOpenModalSupplier, setIsOpenModalSupplier] = useState(false)

    const breadcrumb = [
        { title: 'Sales' },
        {
            title: 'Order', url: routes.eCommerce.order
        },
        { title: 'Detail' },
    ];

    const columns: TableColumnsType<QuoteType> = [
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
                        {/* <span>{row.status !== 'Draft' ? row.po_number : '-'}</span> */}
                    </div>
                </div>
            }
        },
        {
            title: 'Description',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name.localeCompare(b?.name)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.name}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Unit Price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => {
                return a?.price - b?.price
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>${row.price}</span>
                    </div>
                    <div className="flex justify-start gap-1">
                        {
                            buyPriceHidden ? <button onClick={() => setBuyPriceHidden(false)} className="text-[#3666AA] font-medium cursor-pointer">
                                Reveal
                            </button> : <span onClick={() => setBuyPriceHidden(true)} className='cursor-pointer'>Buy Price : {row?.price?.buying_price || 100}</span>
                        }
                    </div>
                </div>
            }
        },
        {
            title: 'Quantity',
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
            title: 'Line Total',
            dataIndex: 'total',
            sorter: (a: any, b: any) => {
                return a?.total - b?.total
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>${row.total}</span>
                    </div>
                </div>
            }
        },

    ]

    const columnsSerialNumber: TableColumnsType<any> = [
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
                        {/* <span>{row.status !== 'Draft' ? row.po_number : '-'}</span> */}
                    </div>
                </div>
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name.localeCompare(b?.name)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.name}</span>
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
            title: 'Stock',
            dataIndex: 'stock',
            sorter: (a: any, b: any) => {
                return a?.stock - b?.stock
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.stock}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Pick',
            dataIndex: 'pick',
            sorter: (a: any, b: any) => {
                return a?.pick - b?.pick
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.pick}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Pack',
            dataIndex: 'pack',
            sorter: (a: any, b: any) => {
                return a?.pack - b?.pack
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.pack}</span>
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
            title: 'Description',
            dataIndex: 'name',
            sorter: (a: any, b: any) => {
                return a?.name.localeCompare(b?.name)
            },
            render: (_: any, row: any) => {
                return <div className="flex flex-col w-full">
                    <div className="flex justify-start gap-1">
                        <span>{row.name}</span>
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
    const handlePrint = async (data: any) => {
        await downloadInvoicePDF(data, 'order');
    }

    const handlePreview = async (data: any) => {
        await previewAndPrintPDF(data, 'order');
    }
    return (
        <>
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
            <div className="mt-6 mx-5 mb-0">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Order Detail
                        </h1>
                        <Breadcrumb
                            items={breadcrumb}
                        />
                    </div>
                    <div className='flex gap-3'>
                        {
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
                            data?.status && data?.status?.toLowerCase() == 'approved' && <ButtonAction
                                icon={<Image
                                    src={ConvertIcon}
                                    alt='convert-icon'
                                    width={15}
                                    height={15}
                                />}
                                label='Convert to Invoice'
                            // link={routes.eCommerce.editQuote}
                            />
                        }

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
                        <ButtonAction
                            icon={<Image
                                src={DownloadIcon}
                                alt='download-icon'
                                width={15}
                                height={15}
                            />}
                            label='Download PDF'
                            onClick={() => handlePrint(invoiceData)}
                        />
                        <Button
                            icon={<Image
                                src={ExportIcon}
                                alt='export-icon'
                                width={15}
                                height={15}
                            />}
                            label='Export'
                        // link={routes.eCommerce.editQuote}
                        />
                    </div>

                </div>
            </div>
            <Content className="mb-5">
                <div style={{ padding: 24, minHeight: 360, background: '#fff' }} className='flex flex-col gap-6'>
                    <div className='grid grid-cols-12 gap-4'>
                        <Card title='Order Information' gridcols='grid-cols-4' className='col-span-8'>
                            <InfoItem label='Order Date' value='June 30, 2025' />
                            <InfoItem label='Shipping Method' value='Local Pickup' />
                            <InfoItem label='Order Reference' value='ORD-0925' />
                            <InfoItem label='Payment Method' value='Bank Transfer' />
                            <InfoItem label='PO Number' value='PO-2025-0034' />
                            <InfoItem label='Sales Person' value='Sales A' />
                            <InfoItem label='Order Status' value={data.status} textColor={statusMap[data?.status].textColor} />
                            <InfoItem label='Payment Status' value='Unpaid' />
                        </Card>

                        <Card title='Account Information' className='col-span-4'>
                            <InfoItem label='Customer Name' value='Customer A' />
                            <InfoItem label='Customer Email' value='customer@gmail.com' />
                            <InfoItem label='Customer Phone' value='+628 63 8765 5589' />
                            <InfoItem label='Customer Group' value='Distributor' />
                        </Card>
                    </div>
                    <div className='grid gap-4'>
                        <Card title='Address Information'>
                            <Card title='Billing Address'>
                                <InfoItem label='Customer Name' value='James Smith' />
                                <InfoItem label='Country' value='Australia' />
                                <InfoItem label='Billing Address' value='12 Garden Street, Carlton VIC 3053' />
                                <InfoItem label='City, State, Post Code' value='Carlton, Victoria, 3053' />
                            </Card>
                            <Card title='Shipping Address'>
                                <InfoItem label='Customer Name' value='James Smith' />
                                <InfoItem label='Country' value='Australia' />
                                <InfoItem label='Billing Address' value='22 Oakridge Avenue, Glen Waverley VIC 3150' />
                                <InfoItem label='City, State, Post Code' value='Glen Waverley, Victoria, 3150' />
                            </Card>
                        </Card>
                    </div>
                    <div>
                        <div className='flex justify-between my-2'>
                            <h4 className='text-xl font-semibold'>Item Ordered</h4>
                            <Button
                                label='View Supplier'
                                onClick={() => setIsOpenModalSupplier(true)}
                            />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data?.product}
                        />
                    </div>

                    <div className='grid grid-cols-12 gap-4'>
                        <Card title='Notes' className='col-span-9 flex flex-col justify-center'>
                            <InfoItem label='Delivery Notes' value='Picked 1 U-Prox Keyflo for Order #9821' />
                            <InfoItem label='Internal Notes' value='Picked 1 U-Prox Keyflo for Order #9821' />
                        </Card>
                        <div className='col-span-3 my-4'>
                            <OrderSummary
                                profitHidden={profitHidden}
                                onReveal={() => setProfitHidden(false)}
                                profit={100}
                                subtotal={1130.4}
                                shippingFee={50}
                                discount={5}
                                gstRate={0.1}
                            />
                        </div>
                    </div>
                    <Divider />
                    <div className='grid gap-4'>
                        <div>
                            <h4 className='text-xl font-semibold'> Serial Number</h4>
                            <Table
                                columns={columnsSerialNumber}
                                dataSource={[
                                    {
                                        sku: '0317-8471',
                                        name: 'U-Prox Keyfob - White SMART9412',
                                        serial_number: 'SN-UPX-0001',
                                        stock: 200,
                                        pick: 3,
                                        pack: 3
                                    },
                                    {
                                        sku: '0317-8471',
                                        name: 'U-Prox Keyfob - White SMART9412',
                                        serial_number: 'SN-UPX-0002',
                                        stock: 48,
                                        pick: 3,
                                        pack: 3
                                    }
                                ]}
                            />
                        </div>
                        <div>
                            <h4 className='text-xl font-semibold'>Last 5 Order Log</h4>
                            <Table
                                columns={columnLogs}
                                dataSource={[
                                    {
                                        staff: 'Rina',
                                        internal_notes: 'Picked 2 U-Prox Keyflo for Order #9821',
                                        update: '17/07/2025 08:00 AM',
                                        action: 'Pick'
                                    },
                                    {
                                        staff: 'Budi',
                                        internal_notes: 'Picked 2 U-Prox Keyflo for Order #9821',
                                        update: '17/07/2025 08:20 AM',
                                        action: 'Pack'
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default DetailOrder
