export type SupplierListType = {
    id?: number | string | undefined
    name: string
    email: string
    mobile_number: string
    telephone: string
    sales_person?: string
    company_name?: string
    website?: string;
    city?: string
    state?: string;
    post_code?: number
    address?: string;
    abn?: string;
    url_sync_stock?: string
}

export type CreditSupplierType = {
    id?: number | string | undefined
    purchase_id: number
    customer_name: string
    credit: string
    status: string
}

export type ReturnSupplierType = {
    id?: number | string | undefined
    order_id: string
    supplier_name: string
    sales_person: string
    total: string
    status: string
    created_at: string
}

export type PurchasesType = {
    id: string
    po_number: string
    supplier: {
        supplier_id: string
        supplier_name: string
        supplier_code: string
    }
    buyer: string
    order_date: string
    eta_date: string
    currency: string
    subtotal: number
    tax: number
    total: number
    status: string
    tags: string[]
    payment_terms: string
    ship_to: {
        warehouse: string
        address: string
    }
    lines: any[]
    detail_view?: any
}

export type BillType = {
    id?: number | string | undefined
    order_id: number
    supplier_name: string
    created: {
        name: string
        date: string
    }
    total: number
    status: string
    email_status: string
}

// export type GoodReceiptType = {
//      id?: number | string | undefined
// }

export const creditSupplierData = [
    {
        id: 2,
        purchase_id: 12,
        supplier_id: 45,
        credit: "$45.45",
        status: "<span class=\"\">Completed</span>",
        created_at: "2024-01-04T08:55:44.000000Z",
        updated_at: "2024-01-04T08:56:38.000000Z",
        deleted_at: null,
        checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"2\" id=\"xuSwLril1ihDVinL\">\n    <label for=\"xuSwLril1ihDVinL\"></label>\n</div>\n",
        customer_name: "Alloys",
        created: "<span data-toggle=\"tooltip\" title=\"Jan 4, 2024\">\n    1 year ago\n</span>\n"
    },
    {
        id: 1,
        purchase_id: 12,
        supplier_id: 45,
        credit: "$45.45",
        status: "<span class=\"\">Completed</span>",
        created_at: "2023-12-27T09:32:26.000000Z",
        updated_at: "2024-01-04T08:56:38.000000Z",
        deleted_at: null,
        checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"1\" id=\"iMNDboEYSUjjjKIm\">\n    <label for=\"iMNDboEYSUjjjKIm\"></label>\n</div>\n",
        customer_name: "Alloys",
        created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    }
]

export const returnData = [
    {
        id: 8,
        order_id: 'ORD890342',
        // user_id: 6,
        // notes: null,
        status: "<span class=\"\">Completed</span>",
        created_at: "2024-01-04T08:55:44.000000Z",
        // updated_at: "2024-01-04T08:56:38.000000Z",
        // deleted_at: null,
        total: "45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"8\" id=\"yXn96GJdaey8awd2\">\n    <label for=\"yXn96GJdaey8awd2\"></label>\n</div>\n",
        supplier_name: "Alloys",
        sales_person: 'Cinta',
        // created: "<span data-toggle=\"tooltip\" title=\"Jan 4, 2024\">\n    1 year ago\n</span>\n"
    },
    {
        id: 7,
        order_id: 'ORD890343',
        // user_id: 6,
        // notes: null,
        status: "<span class=\"\">Completed</span>",
        created_at: "2023-12-27T09:32:26.000000Z",
        // updated_at: "2023-12-27T09:32:26.000000Z",
        // deleted_at: null,
        total: "45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"7\" id=\"0rlNtGQWpEgubc3n\">\n    <label for=\"0rlNtGQWpEgubc3n\"></label>\n</div>\n",
        supplier_name: "Alloys",
        sales_person: 'Rara',
        // created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    },
    {
        id: 6,
        order_id: 'ORD890344',
        // user_id: 6,
        // notes: null,
        status: "<span class=\"\">Rejected</span>",
        created_at: "2023-12-27T09:32:26.000000Z",
        // updated_at: "2023-12-27T09:32:26.000000Z",
        // deleted_at: null,
        total: "45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"7\" id=\"0rlNtGQWpEgubc3n\">\n    <label for=\"0rlNtGQWpEgubc3n\"></label>\n</div>\n",
        supplier_name: "Alloys",
        sales_person: 'Muna'
        // created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    },
]

export const purchases = [
    {
        "id": "po_001",
        "po_number": "PO-2025-001",
        "supplier": {
            "supplier_id": "sup_1001",
            "supplier_name": "PT Maju Jaya",
            "supplier_code": "MJ001"
        },
        "buyer": "andi_saputra",
        "order_date": "2025-08-01",
        "eta_date": "2025-08-15",
        "currency": "IDR",
        "subtotal": 5000000,
        "tax": 500000,
        "total": 5500000,
        "status": "Draft",
        "tags": ["urgent", "electronics"],
        "payment_terms": "30 days",
        "ship_to": {
            "warehouse": "wh_01",
            "address": "Jl. Merdeka No. 45, Jakarta"
        },
        "lines": [
            {
                "id": "line_001",
                "sku": "ELEC-001",
                "description": "Monitor LED 24 inch",
                "uom": "pcs",
                "qty": 10,
                "unit_cost": 1500000,
                "tax_code": "PPN11",
                "warehouse": "wh_01",
                "bin": "R1-B2",
                "promised_date": "2025-08-12"
            },
            {
                "id": "line_002",
                "sku": "ELEC-002",
                "description": "Keyboard Mechanical",
                "uom": "pcs",
                "qty": 20,
                "unit_cost": 500000,
                "tax_code": "PPN11",
                "warehouse": "wh_01",
                "bin": "R1-B3",
                "promised_date": "2025-08-12"
            }
        ],
        "detail_view": {
            "header": {
                "po_number": "PO-2025-001",
                "supplier": "PT Maju Jaya (MJ001)",
                "buyer": "andi_saputra",
                "incoterms": "FOB Jakarta",
                "payment_terms": "30 days",
                "currency": "IDR",
                "notes": "Harap dikirim sesuai jadwal."
            },
            "logistics": {
                "ship_to": "WH-01 - Jl. Merdeka No. 45, Jakarta",
                "carrier": "JNE Trucking",
                "freight_terms": "Prepaid",
                "eta": "2025-08-15"
            },
            "lines": [
                {
                    "id": "detail_line_001",
                    "sku": "ELEC-001",
                    "supplier_sku": "SUP-ELEC-01",
                    "desc": "Monitor LED 24 inch",
                    "uom": "pcs",
                    "qty_ordered": 10,
                    "qty_received": 0,
                    "unit_cost": 1500000,
                    "discount": 0,
                    "tax": 165000,
                    "line_total": 15165000
                },
                {
                    "id": "detail_line_002",
                    "sku": "ELEC-002",
                    "supplier_sku": "SUP-ELEC-02",
                    "desc": "Keyboard Mechanical",
                    "uom": "pcs",
                    "qty_ordered": 20,
                    "qty_received": 0,
                    "unit_cost": 500000,
                    "discount": 50000,
                    "tax": 99000,
                    "line_total": 10049000
                }
            ],
            "totals": {
                "subtotal": 25200000,
                "discount": 50000,
                "tax": 264000,
                "freight": 200000,
                "grand_total": 25474000
            },
            "audit": {
                "created_by": "andi_saputra",
                "created_date": "2025-08-01T10:30:00",
                "approved_by": null,
                "approved_date": null,
                "sent_timestamp": null,
                "change_orders": []
            },
            "links": {
                "attachments": [
                    { "id": "att_001", "file_name": "invoice_preview.pdf" },
                    { "id": "att_002", "file_name": "spec_sheet.xlsx" }
                ],
                "related_grns": [],
                "related_bills": []
            }
        }
    },
    {
        "id": "po_002",
        "po_number": "PO-2025-002",
        "supplier": {
            "supplier_id": "sup_1002",
            "supplier_name": "PT Sejahtera Abadi",
            "supplier_code": "SA002"
        },
        "buyer": "budi_santoso",
        "order_date": "2025-08-05",
        "eta_date": "2025-08-20",
        "currency": "USD",
        "subtotal": 2000,
        "tax": 200,
        "total": 2200,
        "status": "PendingApproval",
        "tags": ["import", "office_supplies"],
        "payment_terms": "60 days",
        "ship_to": {
            "warehouse": "wh_02",
            "address": "Jl. Asia Afrika No. 10, Bandung"
        },
        "lines": [
            {
                "id": "line_003",
                "sku": "OFF-101",
                "description": "Office Chair Ergonomic",
                "uom": "pcs",
                "qty": 5,
                "unit_cost": 250,
                "tax_code": "VAT10",
                "warehouse": "wh_02",
                "bin": "R2-C1",
                "promised_date": "2025-08-18"
            }
        ]
    },
    {
        "id": "po_003",
        "po_number": "PO-2025-003",
        "supplier": {
            "supplier_id": "sup_1003",
            "supplier_name": "CV Aneka Tools",
            "supplier_code": "AT003"
        },
        "buyer": "siti_wulandari",
        "order_date": "2025-08-10",
        "eta_date": "2025-08-25",
        "currency": "IDR",
        "subtotal": 1500000,
        "tax": 165000,
        "total": 1665000,
        "status": "Approved",
        "tags": ["maintenance"],
        "payment_terms": "Cash on Delivery",
        "ship_to": {
            "warehouse": "wh_03",
            "address": "Jl. Industri No. 88, Surabaya"
        },
        "lines": [
            {
                "id": "line_004",
                "sku": "TOOL-501",
                "description": "Electric Drill",
                "uom": "pcs",
                "qty": 3,
                "unit_cost": 500000,
                "tax_code": "PPN11",
                "warehouse": "wh_03",
                "bin": "R3-A5",
                "promised_date": "2025-08-22"
            }
        ]
    },
    {
        "id": "po_004",
        "po_number": "PO-2025-004",
        "supplier": {
            "supplier_id": "sup_1003",
            "supplier_name": "CV Aneka Tools",
            "supplier_code": "AT003"
        },
        "buyer": "siti_wulandari",
        "order_date": "2025-08-10",
        "eta_date": "2025-08-25",
        "currency": "IDR",
        "subtotal": 1500000,
        "tax": 165000,
        "total": 1665000,
        "status": "Sent",
        "tags": ["maintenance"],
        "payment_terms": "Cash on Delivery",
        "ship_to": {
            "warehouse": "wh_03",
            "address": "Jl. Industri No. 88, Surabaya"
        },
        "lines": [
            {
                "id": "line_004",
                "sku": "TOOL-501",
                "description": "Electric Drill",
                "uom": "pcs",
                "qty": 3,
                "unit_cost": 500000,
                "tax_code": "PPN11",
                "warehouse": "wh_03",
                "bin": "R3-A5",
                "promised_date": "2025-08-22"
            }
        ]
    },
    {
        "id": "po_005",
        "po_number": "PO-2025-005",
        "supplier": {
            "supplier_id": "sup_1003",
            "supplier_name": "CV Aneka Tools",
            "supplier_code": "AT003"
        },
        "buyer": "siti_wulandari",
        "order_date": "2025-08-10",
        "eta_date": "2025-08-25",
        "currency": "IDR",
        "subtotal": 1500000,
        "tax": 165000,
        "total": 1665000,
        "status": "ParticiallyReceived",
        "tags": ["maintenance"],
        "payment_terms": "Cash on Delivery",
        "ship_to": {
            "warehouse": "wh_03",
            "address": "Jl. Industri No. 88, Surabaya"
        },
        "lines": [
            {
                "id": "line_004",
                "sku": "TOOL-501",
                "description": "Electric Drill",
                "uom": "pcs",
                "qty": 3,
                "unit_cost": 500000,
                "tax_code": "PPN11",
                "warehouse": "wh_03",
                "bin": "R3-A5",
                "promised_date": "2025-08-22"
            }
        ]
    },
    {
        "id": "po_006",
        "po_number": "PO-2025-006",
        "supplier": {
            "supplier_id": "sup_1003",
            "supplier_name": "CV Aneka Tools",
            "supplier_code": "AT003"
        },
        "buyer": "siti_wulandari",
        "order_date": "2025-08-10",
        "eta_date": "2025-08-25",
        "currency": "IDR",
        "subtotal": 1500000,
        "tax": 165000,
        "total": 1665000,
        "status": "Closed",
        "tags": ["maintenance"],
        "payment_terms": "Cash on Delivery",
        "ship_to": {
            "warehouse": "wh_03",
            "address": "Jl. Industri No. 88, Surabaya"
        },
        "lines": [
            {
                "id": "line_004",
                "sku": "TOOL-501",
                "description": "Electric Drill",
                "uom": "pcs",
                "qty": 3,
                "unit_cost": 500000,
                "tax_code": "PPN11",
                "warehouse": "wh_03",
                "bin": "R3-A5",
                "promised_date": "2025-08-22"
            }
        ]
    },
    {
        "id": "po_007",
        "po_number": "PO-2025-007",
        "supplier": {
            "supplier_id": "sup_1003",
            "supplier_name": "CV Aneka Tools",
            "supplier_code": "AT003"
        },
        "buyer": "siti_wulandari",
        "order_date": "2025-08-10",
        "eta_date": "2025-08-25",
        "currency": "IDR",
        "subtotal": 1500000,
        "tax": 165000,
        "total": 1665000,
        "status": "Cancelled",
        "tags": ["maintenance"],
        "payment_terms": "Cash on Delivery",
        "ship_to": {
            "warehouse": "wh_03",
            "address": "Jl. Industri No. 88, Surabaya"
        },
        "lines": [
            {
                "id": "line_004",
                "sku": "TOOL-501",
                "description": "Electric Drill",
                "uom": "pcs",
                "qty": 3,
                "unit_cost": 500000,
                "tax_code": "PPN11",
                "warehouse": "wh_03",
                "bin": "R3-A5",
                "promised_date": "2025-08-22"
            }
        ]
    }
]


export const billedDummy = [
    {
        id: 2286,
        // user_id: 2,
        // supplier: 1,
        order_id: 3893,
        supplier_name: 'Company A',
        // subtotal: 1250.18,
        total: 1250.18,
        // "delivery_method": "Pick Up",
        // "payment_method": "COD",
        status: "<span class=\"\">Draft</span>",
        email_status: "Not yet Sent",
        // "notes": null,
        // "date": "2023-12-14",
        // "delivery_date": "2023-12-21",
        po_number: 'PO-123',
        // "address": "34 Osborne street, NSW, Wollongong, 2500, AU",
        // "attention": null,
        // "phone": "0468561816",
        // "delivery_note": null,
        // "email_count": 0,
        created: {
            name: 'User',
            date: "2023-12-14T11:29:01.000000Z"
        },
        // "updated_at": "2023-12-14T12:02:10.000000Z",
        // "deleted_at": null,
    },
    {
        id: 2287,
        // user_id: 2,
        // supplier: 1,
        order_id: 3894,
        supplier_name: 'Company B',
        // subtotal: 1250.18,
        total: 1250.18,
        // "delivery_method": "Pick Up",
        // "payment_method": "COD",
        status: "<span class=\"\">Waiting for Approval</span>",
        email_status: "Not yet Sent",
        // "notes": null,
        // "date": "2023-12-14",
        // "delivery_date": "2023-12-21",
        po_number: 'PO-124',
        // "address": "34 Osborne street, NSW, Wollongong, 2500, AU",
        // "attention": null,
        // "phone": "0468561816",
        // "delivery_note": null,
        // "email_count": 0,
        created: {
            name: 'User B',
            date: "2023-12-16T11:29:01.000000Z"
        },
        // "updated_at": "2023-12-14T12:02:10.000000Z",
        // "deleted_at": null,
    },
    {
        id: 2288,
        // user_id: 2,
        // supplier: 1,
        order_id: 3895,
        supplier_name: 'Company C',
        // subtotal: 1250.18,
        total: 1250.18,
        // "delivery_method": "Pick Up",
        // "payment_method": "COD",
        status: "<span class=\"\">Approved</span>",
        email_status: "Sent",
        // "notes": null,
        // "date": "2023-12-14",
        // "delivery_date": "2023-12-21",
        po_number: 'PO-125',
        // "address": "34 Osborne street, NSW, Wollongong, 2500, AU",
        // "attention": null,
        // "phone": "0468561816",
        // "delivery_note": null,
        // "email_count": 0,
        created: {
            name: 'User C',
            date: "2023-12-18T11:29:01.000000Z"
        },
        // "updated_at": "2023-12-14T12:02:10.000000Z",
        // "deleted_at": null,
    },
    {
        id: 2289,
        // user_id: 2,
        // supplier: 1,
        order_id: 3896,
        supplier_name: 'Company D',
        // subtotal: 1250.18,
        total: 1250.18,
        // "delivery_method": "Pick Up",
        // "payment_method": "COD",
        status: "<span class=\"\">Paid</span>",
        email_status: "Sent",
        // "notes": null,
        // "date": "2023-12-14",
        // "delivery_date": "2023-12-21",
        po_number: 'PO-126',
        // "address": "34 Osborne street, NSW, Wollongong, 2500, AU",
        // "attention": null,
        // "phone": "0468561816",
        // "delivery_note": null,
        // "email_count": 0,
        created: {
            name: 'User D',
            date: "2023-12-19T11:29:01.000000Z"
        },
        // "updated_at": "2023-12-14T12:02:10.000000Z",
        // "deleted_at": null,
    }
]

export const dummyGoodReceipts = [
    {
        id: 1,
        "grnNo": "GRN-001",
        "poNo": "PO-1001",
        "supplier": "ABC Supplies Ltd",
        "dockRef": "Dock-01",
        "receiptDateTime": "2025-08-20T10:15:00",
        "receivedBy": "John Doe",
        "receivingWarehouse": "Main Warehouse A",
        "qcStatus": "Accepted",
        "putawayStatus": "Completed",
        "qty": 495,
        "products": [
            {
                "sku": "ITEM-100-A",
                "description": "Steel Bolts 10mm",
                "uom": "Box",
                "poQty": 500,
                "qtyReceived": 495,
                "qtyRejected": 5,
                "variance": -5,
                "qcResult": "Accepted",
                "reasonCode": "Damaged Packaging",
                "serialsLots": [
                    { "lotNo": "LOT-001-A" }
                ],
                "expiry": null
            },
            {
                "sku": "ITEM-101-B",
                "description": "Nuts 10mm",
                "uom": "Box",
                "poQty": 200,
                "qtyReceived": 200,
                "qtyRejected": 0,
                "variance": 0,
                "qcResult": "Pending",
                "reasonCode": null,
                "serialsLots": []
            }
        ],
        "attachments": [
            { "type": "Photo", "url": "/apple-icon.png" },
            { "type": "DeliveryNote", "url": "/apple-icon.png" }
        ],
        "inventoryMovements": [
            { "from": "Inbound Dock", "to": "QA/Quarantine", "date": "2025-08-20T10:20:00" },
            { "from": "QA/Quarantine", "to": "Sellable", "date": "2025-08-20T13:30:00" }
        ],
        "links": {
            "relatedPO": "PO-1001",
            "relatedBills": ["BILL-5001"],
            "supplierRMA": 'RMA-9001'
        },
        "updateEditable": {
            "qcPending": {
                "canEdit": true,
                "allowedFields": [
                    "qcResult",
                    "qtyReceived",
                    "qtyRejected",
                    "reasonCode",
                    "serialsLots"
                ]
            },
            "afterPutaway": {
                "canEdit": true,
                "allowedFields": [
                    "notes",
                    "tags"
                ],
                "lockedFields": [
                    "qtyReceived",
                    "qtyRejected"
                ]
            }
        }
    },
    {
        id: 2,
        "grnNo": "GRN-002",
        "poNo": "PO-1002",
        "supplier": "Fresh Foods Ltd",
        "dockRef": "Dock-02",
        "receiptDateTime": "2025-08-21T09:00:00",
        "receivedBy": "Sarah Lee",
        "receivingWarehouse": "Cold Storage B",
        "qcStatus": "Short",
        "qty": 95,
        "putawayStatus": "In Progress",
        "products": [
            {
                "sku": "FOOD-200",
                "description": "Frozen Chicken Breast",
                "uom": "Carton",
                "poQty": 150,
                "qtyReceived": 145,
                "qtyRejected": 5,
                "variance": -5,
                "qcResult": "Short",
                "reasonCode": "Expired on Arrival",
                "serialsLots": [
                    { "lotNo": "LOT-FD-2025-01" }
                ],
                "expiry": "2025-12-31"
            }
        ],
        "attachments": [
            { "type": "Photo", "url": "/apple-icon.png" },
            { "type": "DeliveryNote", "url": "/apple-icon.png" }
        ],
        "inventoryMovements": [
            { "from": "Inbound Dock", "to": "QA/Quarantine", "date": "2025-08-21T09:15:00" }
        ],
        "links": {
            "relatedPO": "PO-1002",
            "relatedBills": ["BILL-5002"],
            "supplierRMA": "RMA-9001"
        },
        "updateEditable": {
            "qcPending": {
                "canEdit": true,
                "allowedFields": [
                    "qcResult",
                    "qtyReceived",
                    "qtyRejected",
                    "reasonCode",
                    "serialsLots"
                ]
            },
            "afterPutaway": {
                "canEdit": false,
                "allowedFields": ["notes", "tags"],
                "lockedFields": ["qtyReceived", "qtyRejected"]
            }
        }
    },
    {
        id: 3,
        "grnNo": "GRN-003",
        "poNo": "PO-1003",
        "supplier": "Global Parts Inc.",
        "dockRef": "Dock-03",
        "receiptDateTime": "2025-08-22T14:30:00",
        "receivedBy": "Michael Chan",
        "receivingWarehouse": "Central Warehouse",
        "qcStatus": "Pending",
        "putawayStatus": "Not Started",
        "products": [
            {
                "sku": "ITEM-202",
                "description": "Hydraulic Pump",
                "uom": "Unit",
                "poQty": 20,
                "qtyReceived": 20,
                "qtyRejected": 0,
                "variance": 0,
                "qcResult": "Pending",
                "reasonCode": null,
                "serialsLots": []
            },
            {
                "sku": "ITEM-203",
                "description": "Pressure Gauge",
                "uom": "Unit",
                "poQty": 50,
                "qtyReceived": 50,
                "qtyRejected": 0,
                "variance": 0,
                "qcResult": "Pending",
                "reasonCode": null,
                "serialsLots": []
            }
        ]
    },
    {
        id: 4,
        "grnNo": "GRN-004",
        "poNo": "PO-1004",
        "supplier": "TechGear Supplies",
        "dockRef": "Dock-04",
        "receiptDateTime": "2025-08-22T16:00:00",
        "receivedBy": "Alex Johnson",
        "receivingWarehouse": "Electronics Warehouse",
        "qcStatus": "Rejected",
        "putawayStatus": "Not Started",
        "products": [
            {
                "sku": "ELEC-501",
                "description": "Smartphone LCD Screen",
                "uom": "Piece",
                "poQty": 100,
                "qtyReceived": 100,
                "qtyRejected": 15,
                "variance": 0,
                "qcResult": "Rejected",
                "reasonCode": "Cracked / Damaged on Arrival",
                "serialsLots": [
                    { "lotNo": "LOT-LCD-2025-01" }
                ],
                "expiry": null
            },
            {
                "sku": "ELEC-502",
                "description": "Battery Pack 5000mAh",
                "uom": "Piece",
                "poQty": 200,
                "qtyReceived": 200,
                "qtyRejected": 20,
                "variance": 0,
                "qcResult": "Rejected",
                "reasonCode": "Swollen Battery / Safety Issue",
                "serialsLots": [
                    { "lotNo": "LOT-BAT-2025-02" }
                ],
                "expiry": "2027-01-01"
            }
        ]
    }


]

export const dummyPayments = [
    {
        id: 1,
        paymentNo: "PAY-001",
        supplierId: 101,
        supplierName: "PT Sumber Makmur",
        fundingAccount: "BCA-123456789",
        paymentDate: "2025-08-20",
        valueDate: "2025-08-20",
        method: "Bank Transfer",
        currency: "IDR",
        amount: 250,
        fxRate: 1,
        status: "Scheduled",
        remittanceSent: false,
        appliedBills: [
            { billId: 501, billNo: "BILL-1001", originalAmount: 15000000, paidAmount: 15000000, remaining: 0 },
            { billId: 502, billNo: "BILL-1002", originalAmount: 10000000, paidAmount: 10000000, remaining: 0 }
        ],
        totals: {
            paymentAmount: 250,
            fees: 50
        },
        remittanceAdvice: {
            preview: "Preview Link PAY-001",
            attachment: "remittance_PAY-001.pdf"
        },
        bankReference: "TRX-001-ABC",
        reconciliationInfo: {
            bankStatementId: "STM-20250820-01",
            matched: false,
            matchDate: null
        },
        notes: null,
        metadata: {
            createdBy: "admin",
            createdAt: "2025-08-18T09:00:00",
            updatedAt: "2025-08-19T10:30:00"
        }
    },
    {
        id: 2,
        paymentNo: "PAY-007",
        supplierId: 102,
        supplierName: "CV Elektronik Jaya",
        fundingAccount: "Mandiri-987654321",
        paymentDate: "2025-08-21",
        valueDate: "2025-08-21",
        method: "Check",
        currency: "USD",
        amount: 3500,
        fxRate: 1,
        status: "PendingApproval",
        remittanceSent: false,
        appliedBills: [
            { billId: 601, billNo: "BILL-2001", originalAmount: 5000, paidAmount: 3500, remaining: 1500 }
        ],
        totals: {
            paymentAmount: 3500,
            fees: 25
        },
        remittanceAdvice: {
            preview: "Preview Link PAY-002",
            attachment: null
        },
        bankReference: "TRX-002-XYZ",
        reconciliationInfo: {
            bankStatementId: null,
            matched: false,
            matchDate: null
        },
        notes: "Waiting CFO approval",
        metadata: {
            createdBy: "finance01",
            createdAt: "2025-08-19T12:00:00",
            updatedAt: "2025-08-20T15:45:00"
        }
    },
    {
        id: 4,
        paymentNo: "PAY-004",
        supplierId: 102,
        supplierName: "CV Elektronik Jaya",
        fundingAccount: "Mandiri-987654321",
        paymentDate: "2025-08-21",
        valueDate: "2025-08-21",
        method: "Check",
        currency: "USD",
        amount: 3500,
        fxRate: 1,
        status: "Released",
        remittanceSent: false,
        appliedBills:
            { billId: 601, billNo: "BILL-2001", originalAmount: 5000, paidAmount: 3500, remaining: 1500 },
        totals: {
            paymentAmount: 3500,
            fees: 25
        },
        remittanceAdvice: {
            preview: "Preview Link PAY-002",
            attachment: null
        },
        bankReference: "TRX-002-XYZ",
        reconciliationInfo: {
            bankStatementId: null,
            matched: false,
            matchDate: null
        },
        notes: "Waiting CFO approval",
        metadata: {
            createdBy: "finance01",
            createdAt: "2025-08-19T12:00:00",
            updatedAt: "2025-08-20T15:45:00"
        }
    },
    {
        id: 5,
        paymentNo: "PAY-005",
        supplierId: 102,
        supplierName: "CV Elektronik Jaya",
        fundingAccount: "Mandiri-987654321",
        paymentDate: "2025-08-21",
        valueDate: "2025-08-21",
        method: "Check",
        currency: "USD",
        amount: 3500,
        fxRate: 1,
        status: "Failed",
        remittanceSent: false,
        appliedBills: [
            { billId: 601, billNo: "BILL-2001", originalAmount: 5000, paidAmount: 3500, remaining: 1500 }
        ],
        totals: {
            paymentAmount: 3500,
            fees: 25
        },
        remittanceAdvice: {
            preview: "Preview Link PAY-002",
            attachment: null
        },
        bankReference: "TRX-002-XYZ",
        reconciliationInfo: {
            bankStatementId: null,
            matched: false,
            matchDate: null
        },
        notes: "Waiting CFO approval",
        metadata: {
            createdBy: "finance01",
            createdAt: "2025-08-19T12:00:00",
            updatedAt: "2025-08-20T15:45:00"
        }
    },
    {
        id: 6,
        paymentNo: "PAY-006",
        supplierId: 103,
        supplierName: "Global Logistics Ltd",
        fundingAccount: "HSBC-44556677",
        paymentDate: "2025-08-22",
        valueDate: "2025-08-22",
        method: "Gateway",
        currency: "EUR",
        amount: 1250,
        fxRate: 0.95,
        status: "Reconciled",
        remittanceSent: true,
        appliedBills: [
            { billId: 701, billNo: "BILL-3001", originalAmount: 2000, paidAmount: 1250, remaining: 750 }
        ],
        totals: {
            paymentAmount: 1250,
            fees: 15
        },
        remittanceAdvice: {
            preview: "Preview Link PAY-003",
            attachment: "remittance_PAY-003.pdf"
        },
        bankReference: "TRX-003-UVW",
        reconciliationInfo: {
            bankStatementId: "STM-20250822-01",
            matched: true,
            matchDate: "2025-08-23"
        },
        notes: "Reconciled successfully",
        metadata: {
            createdBy: "system",
            createdAt: "2025-08-20T08:30:00",
            updatedAt: "2025-08-23T11:20:00"
        }
    },

]


