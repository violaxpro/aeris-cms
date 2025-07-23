export type OrderType = {
    id?: string | number | undefined
    po_number: string
    email: string
    mobile_number: string
    payment_method: string
    status: string
    payment_status: string
    paid_amount: number
    total: number
    created_by: {
        date: string
        name: string
    }
    modified: {
        date: string
        name: string
    }
    user: string
    billing_address: string
    shipping_address: string
    order_reference: string
    product: ProductOrderType[]
    delivery_note: string
    internal_note: string
    subtotal: number
    discount: number
    shipping_fee: number
    gst: number
}

export type QuoteType = {
    id?: string | number | undefined
    po_number: string
    email: string
    mobile_number: string
    payment_method: string
    status: string
    payment_status: string
    paid_amount: number
    total: number
    created_by: {
        date: string
        name: string
    }
    modified: {
        date: string
        name: string
    }
    user: string
    billing_address: string
    shipping_address: string
    order_reference: string
    product: ProductOrderType[]
    subtotal: number
    discount: number
    shipping_fee: number
    gst: number
}

export type ReturnSalesType = {
    id?: number | string | undefined
    order_id: number
    product?: string[]
    supplier_name: string
    total: string
    status: string
    created_at: string
}

export type ProductOrderType = {
    sku: string
    name: string
    price: number
    buying_price: number
    qty: number
    total: number
}

export type TransactionType = {
    id?: string | number | undefined
    order_id: string
    transaction_id: string
    payment_method: number
    sales_person: string
    created: {
        date: string
        name: string
    }
}

export type CreditSalesType = {
    id?: number | string | undefined
    purchase_id: number
    customer_name: string
    credit: string
    status: string
}


export const orderDummyData = [
    {
        id: 1,
        po_number: '2568231',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Draft',
        payment_status: 'Verification',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 2,
        po_number: '2568233',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Approved',
        payment_status: 'Waiting for Payment',
        paid_amount: 400,
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 3,
        po_number: '1235467',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Paypal',
        status: 'Processing',
        payment_status: 'Partially Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 4,
        po_number: '2568109',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Awaiting Stock',
        payment_status: 'Partially Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 5,
        po_number: '2568134',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Packed',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 6,
        po_number: '2568109',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Ready for Pickup',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 7,
        po_number: '2568112',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Shipped',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 8,
        po_number: '2568134',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'In Transit',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 9,
        po_number: '2568134',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Out of Delivery',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 10,
        po_number: '2568134',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Delivered',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 11,
        po_number: '123456',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Draft',
        payment_status: 'Refunded',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 12,
        po_number: '2568211',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Approved',
        payment_status: 'Waiting for Payment',
        paid_amount: 200,
        total: 1000,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
]

export const quoteDummyData = [
    {
        id: 1,
        po_number: 'Q8903',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Draft',
        payment_status: '',
        total: 400,
        created_by: {
            date: '2025-02-27T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-27T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 2,
        po_number: 'Q8903',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Approved',
        payment_status: 'Waiting for Payment',
        paid_amount: 400,
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'Marcella Indarwati',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 4,
        po_number: 'Q8904',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Invoiced',
        payment_status: 'Waiting for Payment',
        paid_amount: 400,
        total: 400,
        created_by: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 5,
        po_number: 'Q8905',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Credit Card',
        status: 'Cancelled',
        payment_status: 'Waiting for Payment',
        paid_amount: 200,
        total: 400,
        created_by: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 6,
        po_number: 'Q8908',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Credit Card',
        status: 'Sent',
        payment_status: 'Waiting for Payment',
        paid_amount: 200,
        total: 400,
        created_by: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },

]

export const transactionDUmmy = [
    {
        id: 1,
        order_id: '287878',
        transaction_id: '209903',
        payment_method: 'Bank Transfer',
        created: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
    }
]

export const returnData = [
    {
        id: 8,
        order_id: 12,
        // user_id: 6,
        // notes: null,
        sales_person: 'Ola',
        status: "<span class=\"\">Completed</span>",
        // updated_at: "2024-01-04T08:56:38.000000Z",
        // deleted_at: null,
        total: "$45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"8\" id=\"yXn96GJdaey8awd2\">\n    <label for=\"yXn96GJdaey8awd2\"></label>\n</div>\n",
        supplier_name: "Alloys",
        // created: "<span data-toggle=\"tooltip\" title=\"Jan 4, 2024\">\n    1 year ago\n</span>\n"
    },
    {
        id: 7,
        order_id: 12,
        // user_id: 6,
        // notes: null,
        sales_person: 'Ola',
        status: "<span class=\"\">Completed</span>",
        // updated_at: "2023-12-27T09:32:26.000000Z",
        // deleted_at: null,
        total: "$45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"7\" id=\"0rlNtGQWpEgubc3n\">\n    <label for=\"0rlNtGQWpEgubc3n\"></label>\n</div>\n",
        supplier_name: "Alloys",
        // created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    }
]

export const creditSalesData = [
    {
        id: 2,
        order_id: 12,
        supplier_id: 45,
        credit: "$45.45",
        status: "<span class=\"\">COMPLETED</span>",
        created_at: "2024-01-04T08:55:44.000000Z",
        updated_at: "2024-01-04T08:56:38.000000Z",
        deleted_at: null,
        checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"2\" id=\"xuSwLril1ihDVinL\">\n    <label for=\"xuSwLril1ihDVinL\"></label>\n</div>\n",
        customer_name: "Alloys",
        created: "<span data-toggle=\"tooltip\" title=\"Jan 4, 2024\">\n    1 year ago\n</span>\n"
    },
    {
        id: 1,
        order_id: 12,
        supplier_id: 45,
        credit: "$45.45",
        status: "<span class=\"\">COMPLETED</span>",
        created_at: "2023-12-27T09:32:26.000000Z",
        updated_at: "2024-01-04T08:56:38.000000Z",
        deleted_at: null,
        checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"1\" id=\"iMNDboEYSUjjjKIm\">\n    <label for=\"iMNDboEYSUjjjKIm\"></label>\n</div>\n",
        customer_name: "Alloys",
        created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    }
]

