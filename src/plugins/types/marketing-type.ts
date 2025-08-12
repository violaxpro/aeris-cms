export type ProductType = {
    product_name: string;
    buy_price: number;
    rrp_price: number;
    trade_price: number;
    silver_price: number;
    gold_price: number;
    platinum_price: number;
    diamond_price: number;
    flash_sale_price: number;
    quantity: number;
};

export type flashSaleType = {
    id: string;
    campaign_name: string;
    status: number | boolean | string;
    start_date: string;
    end_date: string;
    product: any[];
    created: any;
};

export type couponType = {
    id: string;
    coupon_name: string
    code: string
    discount_type: string
    discount_value: string
    is_free_shipping: boolean
    start_date: string
    end_date: string
    minimum_spend: number
    maximum_spend: number
    image: any[]
    product: string[]
    category: string[]
    exclude_product: string[]
    exclude_category: string[]
    exclude_price: number
    usage_limit_per_coupon: number
    usage_limit_per_customer: number
    status: number | boolean | string;
}

export const flashSaleData: flashSaleType[] = [
    {
        id: "fs_001",
        campaign_name: "Summer Mega Sale 2025",
        status: 1,
        start_date: "2025-08-15T00:00:00Z",
        end_date: "2025-08-20T23:59:59Z",
        product: [
            {
                product_name: "Wireless Headphones",
                buy_price: 50,
                rrp_price: 80,
                trade_price: 70,
                silver_price: 68,
                gold_price: 65,
                platinum_price: 60,
                diamond_price: 58,
                flash_sale_price: 55,
                quantity: 100
            },
            {
                product_name: "Smartwatch",
                buy_price: 120,
                rrp_price: 180,
                trade_price: 160,
                silver_price: 155,
                gold_price: 150,
                platinum_price: 140,
                diamond_price: 135,
                flash_sale_price: 125,
                quantity: 50
            }
        ],
        created: new Date("2025-08-10T08:00:00Z")
    },
    {
        id: "fs_002",
        campaign_name: "Summer Mega Sale 2024",
        status: 0,
        start_date: "2025-08-15T00:00:00Z",
        end_date: "2025-08-20T23:59:59Z",
        product: [
            {
                product_name: "Wireless Headphones",
                buy_price: 50,
                rrp_price: 80,
                trade_price: 70,
                silver_price: 68,
                gold_price: 65,
                platinum_price: 60,
                diamond_price: 58,
                flash_sale_price: 55,
                quantity: 100
            },
            {
                product_name: "Smartwatch",
                buy_price: 120,
                rrp_price: 180,
                trade_price: 160,
                silver_price: 155,
                gold_price: 150,
                platinum_price: 140,
                diamond_price: 135,
                flash_sale_price: 125,
                quantity: 50
            }
        ],
        created: new Date("2025-08-10T08:00:00Z")
    }
];

export const dummyCoupon: couponType[] = [
    {
        id: "coup-001",
        coupon_name: "Summer Sale",
        code: "SUMMER2025",
        discount_type: "percentage", // could be "percentage" or "fixed"
        discount_value: "15", // percentage or fixed amount in string
        is_free_shipping: true,
        start_date: "2025-08-15",
        end_date: "2025-08-31",
        minimum_spend: 100000, // Rp 100,000
        maximum_spend: 1000000, // Rp 1,000,000
        image: [
            { url: "https://example.com/images/coupons/summer-sale.jpg", alt: "Summer Sale Banner" }
        ],
        product: ["prod-101", "prod-102", "prod-103"],
        category: ["cat-01", "cat-02"],
        exclude_product: ["prod-201"],
        exclude_category: ["cat-05"],
        exclude_price: 500000, // Rp 500,000
        usage_limit_per_coupon: 50,
        usage_limit_per_customer: 2,
        status: 1
    },
    {
        id: "coup-002",
        coupon_name: "August17",
        code: "AUG17",
        discount_type: "fixed", // could be "percentage" or "fixed"
        discount_value: "30", // percentage or fixed amount in string
        is_free_shipping: true,
        start_date: "2025-08-15",
        end_date: "2025-08-31",
        minimum_spend: 100000, // Rp 100,000
        maximum_spend: 1000000, // Rp 1,000,000
        image: [
            { url: "https://example.com/images/coupons/summer-sale.jpg", alt: "Summer Sale Banner" }
        ],
        product: ["prod-101", "prod-102", "prod-103"],
        category: ["cat-01", "cat-02"],
        exclude_product: ["prod-201"],
        exclude_category: ["cat-05"],
        exclude_price: 500000, // Rp 500,000
        usage_limit_per_coupon: 50,
        usage_limit_per_customer: 2,
        status: 0
    }
]
