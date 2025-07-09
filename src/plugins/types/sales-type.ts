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

export type ProductOrderType = {
    sku: string
    name: string
    price: number
    buying_price: number
    qty: number
    total: number
}

export const orderDummyData = [
    {
        id: 1,
        po_number: '2568231',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Draft',
        payment_status: '',
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
        payment_method: 'Pay',
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
        payment_status: '',
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
        po_number: '2568231',
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
        id: 4,
        po_number: '2568233',
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

