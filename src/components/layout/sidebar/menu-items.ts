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
    ControlOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UsergroupAddOutlined,
    CreditCardOutlined,
    ScheduleOutlined,
    TrophyOutlined,
    FileTextOutlined,
    GiftOutlined,
    ApartmentOutlined,
    UnlockOutlined,
    CarOutlined,
    DashboardOutlined,
    SnippetsOutlined
} from '@ant-design/icons';
import { DashboardIcon } from '@/components/icon';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
    // label start
    {
        key: 'group-overview',
        label: 'Overview',
        type: 'group',
        children: [
            {
                key: 'dashboard',
                label: 'Dashboard',
                href: routes.eCommerce.dashboard,
                icon: DashboardOutlined,
            },
            {
                key: 'sales',
                label: 'Sales',
                href: '#',
                icon: ShoppingCartOutlined,
                children: [
                    {
                        key: 'order',
                        label: 'Order',
                        href: routes.eCommerce.order,
                    },
                    {
                        key: 'quote',
                        label: 'Quote',
                        href: routes.eCommerce.quote,
                    },
                    {
                        key: 'transaction',
                        label: 'Transaction',
                        href: routes.eCommerce.transaction,
                    },
                    {
                        key: 'rma',
                        label: 'RMA',
                        href: routes.eCommerce.returnSales,
                    },
                    {
                        key: 'credit',
                        label: 'Credit',
                        href: routes.eCommerce.creditSalesList,
                    },
                ],
            },
            {
                key: 'catalogue',
                label: 'Catalogue',
                href: '#',
                icon: AppstoreOutlined,
                children: [
                    {
                        key: 'products',
                        label: 'Products',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'services',
                        label: 'Services',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'price-level',
                        label: 'Price Level',
                        href: routes.eCommerce.priceLevel,
                    },
                    {
                        key: 'categories',
                        label: 'Categories',
                        href: routes.eCommerce.categories,
                    },
                    {
                        key: 'brand',
                        label: 'Brands',
                        href: routes.eCommerce.brands,
                    },
                    {
                        key: 'attributes',
                        label: 'Attributes',
                        href: routes.eCommerce.attributes,
                    },
                    {
                        key: 'options',
                        label: 'Options',
                        href: routes.eCommerce.options,
                    },
                    {
                        key: 'tags',
                        label: 'Tags',
                        href: routes.eCommerce.tags,
                    },
                    {
                        key: 'reviews',
                        label: 'Reviews',
                        href: routes.eCommerce.reviews,
                    },
                ],
            },
            {
                key: 'supplier',
                label: 'Supplier',
                href: '#',
                icon: ShoppingOutlined,
                children: [
                    {
                        key: 'billed',
                        label: 'Billed',
                        href: routes.eCommerce.bill,
                    },
                    {
                        key: 'purchase',
                        label: 'Purchase',
                        href: routes.eCommerce.purchases,
                    },
                    {
                        key: 'rma-supplier',
                        label: 'RMA Supplier',
                        href: routes.eCommerce.returnSupplier,
                    },
                    {
                        key: 'credit-supplier',
                        label: 'Credit Supplier',
                        href: routes.eCommerce.creditSupplierList,
                    },
                    {
                        key: 'supplier-list',
                        label: 'Supplier List',
                        href: routes.eCommerce.supplierList,
                    },
                ],
            },
            {
                key: 'warehouse',
                label: 'Warehouse',
                href: '#',
                icon: DropboxOutlined,
                children: [
                    {
                        key: 'inventory-list',
                        label: 'Inventory List',
                        href: routes.eCommerce.inventoryList,
                    },
                    {
                        key: 'warehouse-branch-list',
                        label: 'Warehouse Branch List',
                        href: routes.eCommerce.warehouseBranchList,
                    },
                ],
            },
            {
                key: 'customer',
                label: 'Customers',
                href: '#',
                icon: TeamOutlined,
            },
            {
                key: 'management',
                label: 'Management',
                href: '#',
                icon: ControlOutlined,
                children: [
                    {
                        key: 'stock-update',
                        label: 'Stock Update',
                        href: routes.eCommerce.stockUpdate,
                    },
                    {
                        key: 'tools',
                        label: 'Tools',
                        href: routes.eCommerce.products,
                        children: [
                            {
                                key: 'importer',
                                label: 'Importer',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'scrape',
                                label: 'Scrape',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'scrape-url-list',
                                label: 'Scrape URL List',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'scrape-trade',
                                label: 'Scrape Trade',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'scrape-trade-url-list',
                                label: 'Scrape Trade URL List',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'scrape-buy-price',
                                label: 'Scrape Buy Price',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'scrape-buy-price-url-list',
                                label: 'Scrape Buy URL List',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'google-merchant',
                                label: 'Google Merchant',
                                href: routes.eCommerce.products,
                            }
                        ]
                    },
                    {
                        key: 'report-management',
                        label: 'Report',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'appearance',
                        label: 'Appearance',
                        href: '#',
                        children: [
                            {
                                key: 'sliders',
                                label: 'Sliders',
                                href: routes.eCommerce.slider,
                            },
                            {
                                key: 'storefront',
                                label: 'Storefront',
                                href: routes.eCommerce.storeFront,
                            }
                        ]
                    },
                    {
                        key: 'blog',
                        label: 'Blog',
                        href: routes.eCommerce.products,
                        children: [
                            {
                                key: 'blogs',
                                label: 'Blogs',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'blog-categories',
                                label: 'Blog Categories',
                                href: routes.eCommerce.products,
                            }
                        ]
                    },
                    {
                        key: 'pages',
                        label: 'Pages',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'media',
                        label: 'Media',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'faq',
                        label: 'FAQ',
                        href: routes.eCommerce.products,
                        children: [
                            {
                                key: 'faq-categories',
                                label: 'FAQ Categories',
                                href: routes.eCommerce.products,
                            },
                            {
                                key: 'faq-child',
                                label: 'FAQ',
                                href: routes.eCommerce.products,
                            }
                        ]

                    },
                ],
            },
            {
                key: 'users-parent',
                label: 'Users',
                href: '#',
                icon: UserOutlined,
                children: [
                    {
                        key: 'users',
                        label: 'Users',
                        href: routes.eCommerce.users,
                    },
                    {
                        key: 'roles',
                        label: 'Roles',
                        href: routes.eCommerce.roles,
                    },
                    {
                        key: 'subscribe',
                        label: 'Subscribe',
                        href: routes.eCommerce.subscribe,
                    },
                ],
            },
        ]
    },
    {
        key: 'group-marketing',
        label: 'Marketing',
        type: 'group',
        children: [
            {
                key: 'marketing',
                label: 'Marketing',
                href: '#',
                icon: ShopOutlined,
                children: [
                    {
                        key: 'flash-sale',
                        label: 'Flash Sale',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'coupon',
                        label: 'Coupon',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'email-marketing',
                        label: 'Email Marketing',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'sms-marketing',
                        label: 'SMS Marketing',
                        href: routes.eCommerce.products,
                    },
                ]
            },
        ]
    },
    {
        key: 'group-accounting',
        label: 'Accounting (Coming Soon)',
        type: 'group',
        children: [
            {
                key: 'chart-of-account',
                label: 'Chart of Account (Comming Soon)',
                href: '#',
                icon: ScheduleOutlined
            }
        ]
    },
    {
        key: 'group-employee-management',
        label: 'Employee Management',
        type: 'group',
        children: [
            {
                key: 'time-attendance',
                label: 'Time & Attendance',
                href: '#',
                icon: ScheduleOutlined,
                children: [
                    {
                        key: 'attendance',
                        label: 'Attendance',
                        href: routes.eCommerce.attendance,
                    },
                    {
                        key: 'timesheet',
                        label: 'Timesheet',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'shift-management',
                        label: 'Shif Management',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'leave-permit',
                        label: 'Leave & Permit',
                        href: routes.eCommerce.products,
                    },
                    {
                        key: 'overtime',
                        label: 'Overtime',
                        href: routes.eCommerce.overtime,
                    }
                ]
            },
            {
                key: 'employee',
                label: 'Employee',
                href: routes.eCommerce.products,
                icon: UsergroupAddOutlined
            },
            {
                key: 'performance',
                label: 'Performance',
                href: routes.eCommerce.products,
                icon: TrophyOutlined
            },
            {
                key: 'report',
                label: 'Report',
                href: routes.eCommerce.categories,
                icon: FileTextOutlined
            },
            {
                key: 'benefit',
                label: 'Benefit',
                href: routes.eCommerce.brands,
                icon: GiftOutlined
            },
            {
                key: 'organizational',
                label: 'Organizational',
                href: routes.eCommerce.attributes,
                icon: ApartmentOutlined
            },

        ]
    },
    {
        key: 'group-setting',
        label: 'Settings',
        type: 'group',
        children: [

            {
                key: 'general-settings',
                label: 'General Settings',
                href: routes.eCommerce.generalSettings,
                icon: SettingOutlined
            },
            {
                key: 'social-logins',
                label: 'Social Logins',
                href: routes.eCommerce.socialLogins,
                icon: UnlockOutlined
            },
            {
                key: 'shipping-methods',
                label: 'Shipping Methods',
                href: routes.eCommerce.shippingMethods,
                icon: CarOutlined
            },
            // {
            //     key: 'payment-methods',
            //     label: 'Payment Methods',
            //     href: routes.eCommerce.products,
            //     icon: CreditCardOutlined
            // },
            {
                key: 'templates',
                label: 'Template Settings',
                href: routes.eCommerce.template,
                icon: SnippetsOutlined
            },
        ]
    },


];
