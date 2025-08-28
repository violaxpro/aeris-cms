export type InventoryListType = {
    id?: number | string | undefined
    sku: string
    image: string
    name: string
    in_stock: number
    return?: number
    sold?: number
    added?: number;
    activity_history: any[]
};

export type WarehouseBranchListType = {
    id?: number | string | undefined
    name: string
    address: string
    phone_number: string
    email: string
};

export const inventoryListDummyData = [
    {
        id: 1,
        sku: 'BA246-M',
        image: '/apple-icon.png',
        name: 'Hikvision 5MP Bullet Camera',
        in_stock: 100,
        sold: 200,
        returned: 0,
        added: 20,
        activity_history: [
            {
                id: 1,
                location: 'Seadan Parramatta',
                serial_number: 'SN-43768',
                old_serial_number: 'SN-4321',
                order_id: '1111',
                po_number: 'PO-9898',
                purchase_date: '2025-08-13 19:00:00',
                sold_date: '2025-08-20 18:00:00',
                warranty_start: '2025-08-20 18:00:00',
                warranty_end: '2028-08-20 18:00:00',
                status: 'Available',
                last_updated: {
                    date: '2025-07-10',
                    name: 'Marcella'
                },
                history_detail: [
                    {
                        id: 1,
                        type: 'stock_in',
                        title: 'Stock In',
                        user: 'By user ID',
                        location: '5/142 James Ruse Dr, Parramatta NSW',
                        comment: 'Waiting to arrive',
                        time: '07:00:00'
                    },
                    {
                        id: 2,
                        type: 'stock_out',
                        title: 'Stock Out to Order 1111',
                        user: 'By user ID',
                        location: '5/142 James Ruse Dr, Parramatta NSW',
                        comment: 'No Comment',
                        time: '12:00:00'
                    },
                    {
                        id: 3,
                        type: 'transfer',
                        title: 'Stock Transfer to Warehouse',
                        user: 'By user ID',
                        location: 'Jl. Merpati, Sidoarjo, Jawa Timur',
                        comment: 'Transferred to regional warehouse',
                        time: '13:00:00'
                    },
                    {
                        id: 4,
                        type: 'reservation',
                        title: 'Stock Reservation',
                        user: 'By user ID',
                        location: 'Jl. Merpati, Sidoarjo, Jawa Timur',
                        comment: 'Reserved for upcoming order',
                        time: '15:00:00'
                    },
                    {
                        id: 5,
                        type: 'rma',
                        title: 'RMA / Return',
                        user: 'By user ID',
                        location: 'Jl. Merpati, Sidoarjo, Jawa Timur',
                        comment: 'Reserved for upcoming order',
                        time: '15:00:00'
                    },

                    {
                        id: 6,
                        type: 'rma_replace',
                        title: 'RMA - Replace to SN-43768',
                        user: 'By user ID',
                        location: 'Jl. Merpati, Sidoarjo, Jawa Timur',
                        comment: 'Reserved for upcoming order',
                        time: '15:00:00'
                    },
                    {
                        id: 7,
                        type: 'stock_out',
                        title: ' Stock Out to Order 1111',
                        user: 'By user ID',
                        location: 'Jl. Merpati, Sidoarjo, Jawa Timur',
                        comment: 'Reserved for upcoming order',
                        time: '15:00:00'
                    },
                ]
            }
        ]
    },
    {
        id: 2,
        sku: 'BA247-M',
        image: '/apple-icon.png',
        name: 'IP Module for Bosch 3000',
        in_stock: 100,
        sold: 200,
        returned: 0,
        added: 20,
        activity_history: [
            {
                id: 1,
                location: 'Seadan Parramatta',
                serial_number: 'SN-88888',
                old_serial_number: 'SN-7777',
                order_id: '2222',
                po_number: 'PO-1234',
                purchase_date: '2025-07-15 10:00:00',
                sold_date: '2025-07-20 18:00:00',
                warranty_start: '2025-07-20 18:00:00',
                warranty_end: '2028-07-20 18:00:00',
                status: 'Available',
                last_updated: {
                    date: '2025-07-11',
                    name: 'User'
                },
                history_detail: [
                    {
                        id: 1,
                        type: 'stock_in',
                        title: 'Stock In',
                        user: 'By user ID',
                        location: 'Jl. Kenangan No. 12, Jakarta',
                        comment: 'Waiting to arrive',
                        time: '08:00:00'
                    },
                    {
                        id: 2,
                        type: 'stock_out',
                        title: 'Stock Out to Order 2222',
                        user: 'By user ID',
                        location: 'Jl. Kenangan No. 12, Jakarta',
                        comment: 'No Comment',
                        time: '14:00:00'
                    }
                ]
            }
        ]
    }
]

export const dummyOutbound = [
    {
        id: 1,
        order_number: 'B426-M',
        customer: 'John',
        warehouse: 'Seaden Paramatta',
        status: 'Draft',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        shipped_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 2,
        order_number: 'B427-M',
        customer: 'Smith',
        warehouse: 'Seaden Paramatta',
        status: 'Allocated',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        shipped_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 3,
        order_number: 'B428-M',
        customer: 'Ahmad',
        warehouse: 'Seaden Paramatta',
        status: 'Picking',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        shipped_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 4,
        order_number: 'B429-M',
        customer: 'Alex',
        warehouse: 'Seaden Paramatta',
        status: 'Packed',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        shipped_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 5,
        order_number: 'B430-M',
        customer: 'Louis',
        warehouse: 'Seaden Paramatta',
        status: 'Shipped',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        shipped_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 6,
        order_number: 'B431-M',
        customer: 'John',
        warehouse: 'Seaden Paramatta',
        status: 'Cancelled',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        shipped_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 7,
        order_number: 'B432-M',
        customer: 'John',
        warehouse: 'Seaden Paramatta',
        status: 'Returned',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        shipped_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
]
