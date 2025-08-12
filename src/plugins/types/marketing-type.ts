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
    status: number;
    start_date: string;
    end_date: string;
    product: any[];
    created: any;
};

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
