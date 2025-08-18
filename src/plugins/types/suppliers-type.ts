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
    id?: number | string | undefined
    order_id: string
    supplier_name: string
    created: {
        name: string
        date: string
    }
    total: number
    status: string
    email_status: string
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
        // "po_number": null,
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
        // "po_number": null,
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
        // "po_number": null,
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
        status: "<span class=\"\">Billed</span>",
        email_status: "Sent",
        // "notes": null,
        // "date": "2023-12-14",
        // "delivery_date": "2023-12-21",
        // "po_number": null,
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
        // "po_number": null,
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
        // "po_number": null,
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
        // "po_number": null,
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
        // "po_number": null,
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