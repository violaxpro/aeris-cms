import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
    DatabaseOutlined,
    PieChartOutlined,
    AppstoreOutlined,
    UserOutlined,
    SettingOutlined,
    ShoppingOutlined,
    DropboxOutlined,
    TeamOutlined,
    IdcardOutlined,
    ControlOutlined
} from '@ant-design/icons';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
    // label start
    {
        key: 'overview',
        name: 'Overview',
    }, ,

    {
        key: 'dashboard',
        name: 'Dashboard',
        href: routes.eCommerce.dashboard,
        icon: DatabaseOutlined,
    },
    {
        key: 'catalogue',
        name: 'Catalogue',
        href: '#',
        icon: AppstoreOutlined,
        dropdownItems: [
            {
                key: 'product',
                name: 'Product',
                href: routes.eCommerce.products,
            },
            {
                key: 'price-level',
                name: 'Price Level',
                href: routes.eCommerce.priceLevel,
            },
            {
                key: 'categories',
                name: 'Categories',
                href: routes.eCommerce.categories,
            },
            {
                key: 'brand',
                name: 'Brands',
                href: routes.eCommerce.brands,
            },
            {
                key: 'attributes',
                name: 'Attributes',
                href: routes.eCommerce.attributes,
            },
            {
                key: 'options',
                name: 'Options',
                href: routes.eCommerce.options,
            },
            {
                key: 'tags',
                name: 'Tags',
                href: routes.eCommerce.tags,
            },
            {
                key: 'reviews',
                name: 'Reviews',
                href: routes.eCommerce.reviews,
            },
        ],
    },
    {
        key: 'sales',
        name: 'Sales',
        href: '#',
        icon: PieChartOutlined,
        dropdownItems: [
            {
                key: 'order',
                name: 'Order',
                href: routes.eCommerce.products,
            },
            {
                key: 'quote',
                name: 'Quote',
                href: routes.eCommerce.priceLevel,
            },
            {
                key: 'transaction',
                name: 'Transaction',
                href: routes.eCommerce.categories,
            },
            {
                key: 'rma',
                name: 'RMA',
                href: routes.eCommerce.brands,
            },
            {
                key: 'credit',
                name: 'Credit',
                href: routes.eCommerce.categories,
            },
        ],
    },
    {
        key: 'employee-management',
        name: 'Employee Management',
        href: '#',
        icon: IdcardOutlined,
        dropdownItems: [
            {
                key: 'time-attendance',
                name: 'Time & Attendance',
                href: routes.eCommerce.products,
                dropdownItems: [
                    {
                        key: 'attendance',
                        name: 'Attendance',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'timesheet',
                        name: 'Timesheet',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'shift-management',
                        name: 'Shif Management',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'leave-permit',
                        name: 'Leave & Permit',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'overtime',
                        name: 'Overtime',
                        href: routes.eCommerce.products,
                    }
                ]
            },
            {
                key: 'employee',
                name: 'Employee',
                href: routes.eCommerce.products,
            },
            {
                key: 'performance',
                name: 'Performance',
                href: routes.eCommerce.products,
            },
            {
                key: 'report',
                name: 'Report',
                href: routes.eCommerce.categories,
            },
            {
                key: 'benefit',
                name: 'Benefit',
                href: routes.eCommerce.brands,
            },
            {
                key: 'organizational',
                name: 'Organizational',
                href: routes.eCommerce.attributes,
            },

        ],
    },
    {
        key: 'supplier',
        name: 'Supplier',
        href: '#',
        icon: ShoppingOutlined,
        dropdownItems: [
            {
                key: 'purchase',
                name: 'Purchase',
                href: routes.eCommerce.products,
            },
            {
                key: 'rma-supplier',
                name: 'RMA Supplier',
                href: routes.eCommerce.priceLevel,
            },
            {
                key: 'credit-supplier',
                name: 'Credit Supplier',
                href: routes.eCommerce.categories,
            },
            {
                key: 'supplier-list',
                name: 'Supplier List',
                href: routes.eCommerce.categories,
            },
        ],
    },
    {
        key: 'warehouse',
        name: 'Warehouse',
        href: '#',
        icon: DropboxOutlined,
        dropdownItems: [
            {
                key: 'inventory-list',
                name: 'Inventory List',
                href: routes.eCommerce.products,
            },
        ],
    },

    {
        key: 'users',
        name: 'Users',
        href: '#',
        icon: UserOutlined,
        dropdownItems: [
            {
                key: 'users-product',
                name: 'Users',
                href: routes.eCommerce.products,
            },
            {
                key: 'roles',
                name: 'Roles',
                href: routes.eCommerce.priceLevel,
            },
            {
                key: 'subcribe',
                name: 'Subscribe',
                href: routes.eCommerce.categories,
            },
        ],
    },
    {
        key: 'customer',
        name: 'Customers',
        href: '#',
        icon: TeamOutlined,
    },

    {
        key: 'management',
        name: 'Management',
        href: '#',
        icon: ControlOutlined,
        dropdownItems: [
            {
                key: 'stock-update',
                name: 'Stock Update',
                href: routes.eCommerce.products,
                dropdownItems: [
                    {
                        key: 'leader-system',
                        name: 'Leader System',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'alloys',
                        name: 'Alloys',
                        href: routes.eCommerce.products,
                    }
                ]
            },
            {
                key: 'tools',
                name: 'Tools',
                href: routes.eCommerce.products,
                dropdownItems: [
                    {
                        key: 'importer',
                        name: 'Importer',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'scrape',
                        name: 'Scrape',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'scrape-url-list',
                        name: 'Scrape URL List',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'scrape-trade',
                        name: 'Scrape Trade',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'scrape-trade-url-list',
                        name: 'Scrape Trade URL List',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'scrape-buy-price',
                        name: 'Scrape Buy Price',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'scrape-buy-price-url-list',
                        name: 'Scrape Buy URL List',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'google-merchant',
                        name: 'Google Merchant',
                        href: routes.eCommerce.products,
                    }
                ]
            },
            {
                key: 'report-management',
                name: 'Report',
                href: routes.eCommerce.products,
            },
            {
                key: 'appearance',
                name: 'Appearence',
                href: routes.eCommerce.products,
                dropdownItems: [
                    {
                        key: 'sliders',
                        name: 'Sliders',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'storefront',
                        name: 'Storefront',
                        href: routes.eCommerce.products,
                    }
                ]
            },
            {
                key: 'blog',
                name: 'Blog',
                href: routes.eCommerce.products,
                dropdownItems: [
                    {
                        key: 'blogs',
                        name: 'Blogs',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'blog-categories',
                        name: 'Blog Categories',
                        href: routes.eCommerce.products,
                    }
                ]
            },
            {
                key: 'pages',
                name: 'Pages',
                href: routes.eCommerce.products,
            },
            {
                key: 'media',
                name: 'Media',
                href: routes.eCommerce.products,
            },
            {
                key: 'faq',
                name: 'FAQ',
                href: routes.eCommerce.products,
                dropdownItems: [
                    {
                        key: 'faq-categories',
                        name: 'FAQ Categories',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'faq-child',
                        name: 'FAQ',
                        href: routes.eCommerce.products,
                    }
                ]

            },
        ],
    },
    {
        key: 'setting',
        name: 'Settings',
        href: '#',
        icon: SettingOutlined,
        dropdownItems: [
            {
                key: 'general-settings',
                name: 'General Settings',
                href: routes.eCommerce.products,
            },
            {
                key: 'social-logins',
                name: 'Social Logins',
                href: routes.eCommerce.products,
            },
            {
                key: 'shipping-methods',
                name: 'Shipping Methods',
                href: routes.eCommerce.products,
            },
            {
                key: 'payment-methods',
                name: 'Payment Methods',
                href: routes.eCommerce.products,
            },
        ]
    },
];
