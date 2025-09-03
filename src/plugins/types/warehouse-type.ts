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
    warehouse_code: string
    warehouse_name: string
    address: string
    contact: string
    status: string
    default_fulfilment: boolean
    zones_count: number
    bins_count: number
    cutoff_profiles: any[]
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
        ],
        warehouses: {
            warehouse: 'Seadan Pranatta',
            zone: 'Z001',
            bin: 'B01'
        }
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
        ],
        warehouses: {
            warehouse: 'Seadan Pranatta',
            zone: 'Z002',
            bin: 'B02'
        }
    }
]

export const dummyBranchManagement = [
    {
        "id": 1,
        "warehouse_code": "WH001",
        "warehouse_name": "Jakarta Main Warehouse",
        "address": "Jl. Sudirman No. 123, Jakarta",
        "contact": "+62 812-3456-7890",
        "status": "Active",
        "default_fulfilment": true,
        "zones_count": 5,
        "bins_count": 120,
        "cutoff_profiles": [
            {
                "id": 101,
                "carrier": "JNE",
                "service": "Reguler",
                "cutoff_time": "16:00"
            },
            {
                "id": 102,
                "carrier": "SiCepat",
                "service": "Best",
                "cutoff_time": "15:30"
            }
        ],
        "zones": [
            {
                "code": "Z001",
                "name": "Storage Zone A",
                "type": "Storage",
                "bins": [
                    {
                        "code": "BIN-001",
                        "zone": "Z001",
                        "pick_sequence": 1,
                        "pickable": true,
                        "putawayable": true,
                        "capacity": {
                            "units": 100,
                            "volume": 500,
                            "weight": 2000
                        }
                    },
                    {
                        "code": "BIN-002",
                        "zone": "Z001",
                        "pick_sequence": 2,
                        "pickable": true,
                        "putawayable": false,
                        "capacity": {
                            "units": 50,
                            "volume": 200,
                            "weight": 800
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "warehouse_code": "WH002",
        "warehouse_name": "Bandung Fulfilment Center",
        "address": "Jl. Asia Afrika No. 45, Bandung",
        "contact": "+62 812-9876-5432",
        "status": "Active",
        "default_fulfilment": false,
        "zones_count": 3,
        "bins_count": 75,
        "cutoff_profiles": [
            {
                "id": 103,
                "carrier": "J&T",
                "service": "EZ",
                "cutoff_time": "17:00"
            }
        ],
        "zones": [
            {
                "code": "Z001",
                "name": "Storage Zone A",
                "type": "Storage",
                "bins": [
                    {
                        "code": "BIN-001",
                        "zone": "Z001",
                        "pick_sequence": 1,
                        "pickable": true,
                        "putawayable": true,
                        "capacity": {
                            "units": 100,
                            "volume": 500,
                            "weight": 2000
                        }
                    },
                    {
                        "code": "BIN-002",
                        "zone": "Z001",
                        "pick_sequence": 2,
                        "pickable": true,
                        "putawayable": false,
                        "capacity": {
                            "units": 50,
                            "volume": 200,
                            "weight": 800
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "warehouse_code": "WH003",
        "warehouse_name": "Surabaya Secondary Warehouse",
        "address": "Jl. Pemuda No. 88, Surabaya",
        "contact": "+62 813-5555-7777",
        "status": "Disabled",
        "default_fulfilment": false,
        "zones_count": 2,
        "bins_count": 30,
        "cutoff_profiles": [],
        "zones": [
            {
                "code": "Z001",
                "name": "Storage Zone A",
                "type": "Storage",
                "bins": [
                    {
                        "code": "BIN-001",
                        "zone": "Z001",
                        "pick_sequence": 1,
                        "pickable": true,
                        "putawayable": true,
                        "capacity": {
                            "units": 100,
                            "volume": 500,
                            "weight": 2000
                        }
                    },
                    {
                        "code": "BIN-002",
                        "zone": "Z001",
                        "pick_sequence": 2,
                        "pickable": true,
                        "putawayable": false,
                        "capacity": {
                            "units": 50,
                            "volume": 200,
                            "weight": 800
                        }
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

export const dummyInbound = [
    {
        id: 1,
        po_number: 'B426-M',
        supplier: 'John',
        warehouse: 'Seaden Paramatta',
        status: 'Draft',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        received_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 2,
        po_number: 'B427-M',
        supplier: 'Smith',
        warehouse: 'Seaden Paramatta',
        status: 'Sent',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        received_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 6,
        po_number: 'B432-M',
        supplier: 'Smith',
        warehouse: 'Seaden Paramatta',
        status: 'Receiving',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        received_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 3,
        po_number: 'B428-M',
        supplier: 'Ahmad',
        warehouse: 'Seaden Paramatta',
        status: 'Partially Received',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        received_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 4,
        po_number: 'B429-M',
        supplier: 'Alex',
        warehouse: 'Seaden Paramatta',
        status: 'Received',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        received_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },
    {
        id: 5,
        po_number: 'B430-M',
        supplier: 'Louis',
        warehouse: 'Seaden Paramatta',
        status: 'Cancelled',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        received_date: '25 Aug, 2025',
        age: 4,
        total: 400
    },

]

export const dummyStockTransfer = [
    {
        id: 1,
        transfer_number: 'ST-001',
        from_warehouse: 'Seaden Paramatta',
        supplier: 'John',
        to_warehouse: 'Melbourne Central',
        status: 'Draft',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        ship_date: '25 Aug, 2025',
        received_date: '25 Aug, 2025',
        age: 4,
    },
    {
        id: 2,
        transfer_number: 'ST-002',
        from_warehouse: 'Seaden Paramatta',
        supplier: 'John',
        to_warehouse: 'Melbourne Central',
        status: 'Approved',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        ship_date: '25 Aug, 2025',
        received_date: '25 Aug, 2025',
        age: 4,
    },
    {
        id: 3,
        transfer_number: 'ST-003',
        from_warehouse: 'Seaden Paramatta',
        supplier: 'John',
        to_warehouse: 'Melbourne Central',
        status: 'Picking',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        ship_date: '25 Aug, 2025',
        received_date: '25 Aug, 2025',
        age: 4,
    },
    {
        id: 4,
        transfer_number: 'ST-004',
        from_warehouse: 'Seaden Paramatta',
        supplier: 'John',
        to_warehouse: 'Melbourne Central',
        status: 'In Transit',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        ship_date: '25 Aug, 2025',
        received_date: '25 Aug, 2025',
        age: 4,
    },
    {
        id: 5,
        transfer_number: 'ST-005',
        from_warehouse: 'Seaden Paramatta',
        supplier: 'John',
        to_warehouse: 'Melbourne Central',
        status: 'Received',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        ship_date: '25 Aug, 2025',
        received_date: '25 Aug, 2025',
        age: 4,
    },
    {
        id: 6,
        transfer_number: 'ST-006',
        from_warehouse: 'Seaden Paramatta',
        supplier: 'John',
        to_warehouse: 'Melbourne Central',
        status: 'Cancelled',
        lines: '378-01/100',
        carrier: 'DHL Express',
        tracking_number: '3AA1111110A',
        ship_date: '25 Aug, 2025',
        received_date: '25 Aug, 2025',
        age: 4,
    },


]

export const dummyStockAdjustment = [
    {
        id: 1,
        adjustment_number: 'ADJ-101',
        warehouse: {
            warehouse: 'WH-A',
            zone: 'Z1',
            bin: 'B05'
        },
        reason_code: 'Damage',
        status: 'Draft',
        lines: '3/-45',
        requested_by: 'Rudi',
        approved_by: 'Lisa',
        age: 4,
    },
    {
        id: 2,
        adjustment_number: 'ADJ-102',
        warehouse: {
            warehouse: 'WH-B',
            zone: 'Z2',
            bin: 'B05'
        },
        reason_code: 'Shrinkage',
        status: 'Submitted',
        lines: '30/-145',
        requested_by: 'Lili',
        approved_by: '',
        age: 10,
    },
    {
        id: 3,
        adjustment_number: 'ADJ-103',
        warehouse: {
            warehouse: 'WH-A',
            zone: 'Z1',
            bin: 'B06'
        },
        reason_code: 'Found',
        status: 'Approved',
        lines: '2/+45',
        requested_by: 'Tuti',
        approved_by: 'Mona',
        age: 10,
    },
    {
        id: 4,
        adjustment_number: 'ADJ-104',
        warehouse: {
            warehouse: 'WH-C',
            zone: 'Z2',
            bin: 'B05'
        },
        reason_code: 'Reclass',
        status: 'Posted',
        lines: '2/-125',
        requested_by: 'Fla',
        approved_by: '',
        age: 6,
    },
    {
        id: 5,
        adjustment_number: 'ADJ-105',
        warehouse: {
            warehouse: 'WH-D',
            zone: 'Z5',
            bin: 'B05'
        },
        reason_code: 'Reopening',
        status: 'Cancelled',
        lines: '3/-45',
        requested_by: 'Lala',
        approved_by: 'Lisa',
        age: 10,
    },


]

export const rmaDummyData = [
    {
        id: 1,
        rma_no: "RMA-101",
        customer: "Wira Pandu",
        origin_doc: "ORD-321/SHP-889",
        reason_code: "Damage",
        qty: 5,
        status: "Requested",
        disposition: "Restock",
        age_days: 5,
    },
    {
        id: 2,
        rma_no: "RMA-102",
        customer: "John Smith",
        origin_doc: "ORD-321/SHP-889",
        reason_code: "Wrong Item",
        qty: 15,
        status: "Authorized",
        disposition: "Replace",
        age_days: 14,
    },
    {
        id: 3,
        rma_no: "RMA-103",
        customer: "Lauren",
        origin_doc: "ORD-321/SHP-889",
        reason_code: "Missing Part",
        qty: 20,
        status: "Received",
        disposition: "Refund",
        age_days: 7,
    },
    {
        id: 4,
        rma_no: "RMA-104",
        customer: "Jason",
        origin_doc: "ORD-321/SHP-889",
        reason_code: "Expired",
        qty: 2,
        status: "Inspected",
        disposition: "Scrap",
        age_days: 2,
    },
    {
        id: 5,
        rma_no: "RMA-105",
        customer: "Yuyun",
        origin_doc: "ORD-321/SHP-889",
        reason_code: "Defective",
        qty: 17,
        status: "Closed",
        disposition: "Return to Vendor",
        age_days: 5,
    },
    {
        id: 6,
        rma_no: "RMA-105",
        customer: "Louis",
        origin_doc: "ORD-321/SHP-889",
        reason_code: "Wrong Size",
        qty: 25,
        status: "Closed",
        disposition: "Restock",
        age_days: 4,
    },
];

export const dummyReportingAnalytics = [
    {
        "id": 1,
        "report_name": "Monthly Inventory Summary",
        "type": "Inventory",
        "owner": "James Carter",
        "schedule": "None",
        "last_run": "23 Aug, 2025 10:00",
        "next_run": "-",
        "visibility": "Private"
    },
    {
        "id": 2,
        "report_name": "Warehouse Stock Valuation",
        "type": "Valuation",
        "owner": "Sarah Johnson",
        "schedule": "Daily",
        "last_run": "23 Aug, 2025 10:00",
        "next_run": "24 Aug, 2025 10:00",
        "visibility": "Team"
    },
    {
        "id": 3,
        "report_name": "Picking KPI Report",
        "type": "KPI",
        "owner": "Emily Brown",
        "schedule": "Weekly",
        "last_run": "23 Aug, 2025 10:00",
        "next_run": "30 Aug, 2025 10:00",
        "visibility": "Org"
    },
    {
        "id": 4,
        "report_name": "Discrepancy Audit – Site A",
        "type": "Discrepancy",
        "owner": "Olivia White",
        "schedule": "Monthly",
        "last_run": "23 Aug, 2025 10:00",
        "next_run": "23 Sep, 2025 10:00",
        "visibility": "Team"
    }
]


