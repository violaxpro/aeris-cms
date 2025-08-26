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
    SnippetsOutlined,
    TransactionOutlined,
    BuildOutlined,
    AccountBookOutlined,
    NotificationOutlined,
    AreaChartOutlined,
    GlobalOutlined,
    ToolOutlined
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
                // href: routes.eCommerce.dashboard,
                href: '#',
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
                        label: 'Invoice / Order',
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
                        key: 'products-services',
                        label: 'Products / Services',
                        href: routes.eCommerce.products,
                    },
                    // {
                    //     key: 'services',
                    //     label: 'Services',
                    //     href: routes.eCommerce.services,
                    // },
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
                label: 'Suppliers',
                href: '#',
                icon: ShoppingOutlined,
                children: [
                    {
                        key: 'purchase-order',
                        label: 'Purchase Orders',
                        href: routes.eCommerce.purchases,
                    },
                    {
                        key: 'good-receipts',
                        label: 'Good Receipts',
                        href: routes.eCommerce.goodReceipt,
                    },

                    {
                        key: 'bills',
                        label: 'Bills',
                        href: routes.eCommerce.bill,
                    },
                    {
                        key: 'payments',
                        label: 'Payments',
                        href: routes.eCommerce.payments
                    },
                    {
                        key: 'suppliers',
                        label: 'Suppliers',
                        href: routes.eCommerce.supplierList,
                    },
                    {
                        key: 'supplier-rma',
                        label: 'Supplier RMA(s)',
                        href: '#',
                    },
                    // {
                    //     key: 'credit-notes',
                    //     label: 'Credit Notes',
                    //     href: routes.eCommerce.creditSupplierList,
                    // },
                ],
            },
            {
                key: 'warehouse',
                label: 'Warehouse',
                href: '#',
                icon: DropboxOutlined,
                children: [
                    {
                        key: 'outbound',
                        label: 'Outbound',
                        href: '#'
                    },
                    {
                        key: 'inventory-management',
                        label: 'Inventory Management',
                        href: routes.eCommerce.inventoryList,
                    },
                    {
                        key: 'inbound',
                        label: 'Inbound',
                        href: '#'
                    },
                    {
                        key: 'stock-transfers',
                        label: 'Stock Transfers',
                        href: '#'
                    },
                    {
                        key: 'stock-adjusment',
                        label: 'Stock Adjustment',
                        href: '#'
                    },
                    {
                        key: 'rma-warehouse',
                        label: 'Return',
                        href: '#'
                    },
                    {
                        key: 'branch-management',
                        label: 'Branch Management',
                        href: routes.eCommerce.warehouseBranchList,
                    },
                    {
                        key: 'report-analytics',
                        label: 'Reporting & Analytics',
                        href: '#'
                    }
                ],
            },
            // {
            //     key: 'return',
            //     label: 'RMA',
            //     href: routes.eCommerce.customers,
            //     icon: TeamOutlined,
            //     children: [
            //         {
            //             key: 'rma-sales',
            //             label: 'RMA Sales',
            //             href: routes.eCommerce.returnSales,
            //         },
            //         {
            //             key: 'rma-suppliers',
            //             label: 'RMA Suppliers',
            //             href: routes.eCommerce.returnSupplier,
            //         },
            //     ]
            // },
            {
                key: 'customer',
                label: 'Customers',
                href: routes.eCommerce.customers,
                icon: TeamOutlined,
            },
            {
                key: 'website-content',
                label: 'Website Content',
                href: '#',
                icon: GlobalOutlined,
                children: [
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
                        key: 'pages',
                        label: 'Pages',
                        href: routes.eCommerce.managementPages,
                    },
                    {
                        key: 'media',
                        label: 'Media',
                        href: routes.eCommerce.media,
                    },
                    {
                        key: 'menus',
                        label: 'Menus',
                        href: routes.eCommerce.menus,
                    },
                    {
                        key: 'blog',
                        label: 'Blog',
                        href: '#',
                        children: [
                            {
                                key: 'blogs',
                                label: 'Blogs',
                                href: routes.eCommerce.blogs,
                            },
                            {
                                key: 'blog-categories',
                                label: 'Blog Categories',
                                href: routes.eCommerce.blogCategories,
                            }
                        ]
                    },
                    {
                        key: 'faq',
                        label: 'FAQ',
                        href: '#',
                        children: [
                            {
                                key: 'faq-child',
                                label: 'FAQ',
                                href: routes.eCommerce.faq,
                            },
                            {
                                key: 'faq-categories',
                                label: 'FAQ Categories',
                                href: routes.eCommerce.faqCategories,
                            }
                        ]

                    },
                ],
            },
            {
                key: 'reporting-parent',
                label: 'Reporting',
                href: '#',
                icon: FileTextOutlined,
                children: [
                    {
                        key: 'report-management',
                        label: 'Report',
                        href: routes.eCommerce.products,
                    }
                ]
            },
            {
                key: 'tools-integration',
                label: 'Tools & Integration',
                href: '#',
                icon: ToolOutlined,
                children: [
                    {
                        key: 'scrape-parent',
                        label: 'Scrape',
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
                        key: 'stock-update',
                        label: 'Stock Update',
                        href: routes.eCommerce.stockUpdate,
                    },
                ]
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
                key: 'campaign-management',
                label: 'Campaign Management',
                href: '#',
                icon: NotificationOutlined,
                children: [
                    {
                        key: 'email-campaigns,',
                        label: ' Email Campaigns',
                        href: '#'
                    },
                    {
                        key: 'sms-wa-campaigns',
                        label: 'SMS / WhatsApp Campaigns',
                        href: '#'
                    },
                    {
                        key: 'push-notifications',
                        label: 'Push Notifications',
                        href: '#'
                    },
                    {
                        key: 'social-media-campaigns',
                        label: 'Social Media Campaigns',
                        href: '#'
                    },
                    {
                        key: 'flash-sale-campaigns',
                        label: 'Seasonal / Flash Sale Campaigns',
                        href: routes.eCommerce.flashSale,

                    },

                ]

            },
            {
                key: 'customer-engagement',
                label: 'Customer Engagement',
                href: '#',
                icon: TeamOutlined,
                children: [
                    {
                        key: 'loyalty-rewards',
                        label: 'Loyalty & Rewards',
                        href: '#'
                    },
                    {
                        key: 'referral-program',
                        label: 'Referral Program',
                        href: '#'
                    },
                    {
                        key: 'promotion-discount',
                        label: 'Promotions & Discounts',
                        href: '#'
                    },
                    {
                        key: 'gift-cards',
                        label: 'Gift Cards',
                        href: '#'
                    },
                    {
                        key: 'personalized-reccommendations',
                        label: 'Personalized Recommendations',
                        href: '#'
                    },
                ]
            },
            {
                key: 'analytics-insight',
                label: 'Analytics & Insights',
                href: '#',
                icon: AreaChartOutlined,
                children: [
                    {
                        key: 'campaign-performance-tracking',
                        label: 'Campaign Performance Tracking',
                        href: '#'
                    },
                    {
                        key: 'conversation-tracking',
                        label: 'Conversion Tracking',
                        href: '#'
                    },
                    {
                        key: 'customer-segmentation',
                        label: 'Customer Segmentation',
                        href: '#'
                    },
                    {
                        key: 'marketing-funnel-reports',
                        label: 'Marketing Funnel Reports',
                        href: '#'
                    },
                    {
                        key: 'roi-budget-tracking',
                        label: 'ROI & Budget Tracking',
                        href: '#'
                    },
                ]
            }
        ]
    },
    {
        key: 'group-accounting',
        label: 'Accounting',
        type: 'group',
        children: [
            {
                key: 'setup-structure',
                label: 'Setup & Structure',
                href: '#',
                icon: BuildOutlined,
                children: [
                    {
                        key: 'chart-of-account',
                        label: 'Chart of Account',
                        href: '#',
                    },
                    {
                        key: 'taxes',
                        label: 'Taxes',
                        href: '#',
                    },
                    {
                        key: 'fixed-assets',
                        label: 'Fixed Assets',
                        href: '#',
                    },
                ]
            },
            {
                key: 'transactions',
                label: 'Transactions',
                href: '#',
                icon: TransactionOutlined,
                children: [
                    {
                        key: 'account-receivable',
                        label: 'Accounts Receivable',
                        href: '#',
                    },
                    {
                        key: 'account-payable',
                        label: 'Accounts Payable ',
                        href: '#',
                    },
                    {
                        key: 'bank-cash-management',
                        label: 'Bank & Cash Management',
                        href: '#',
                    },
                ]
            },
            {
                key: 'general-ledger',
                label: 'General Ledger',
                href: '#',
                icon: AccountBookOutlined,
                children: [
                    {
                        key: 'general-ledger-child',
                        label: 'General Ledger',
                        href: '#',
                    },
                    {
                        key: 'journal-entries',
                        label: 'Journal Entries',
                        href: '#',
                    },
                ]
            },
            {
                key: 'report-controls',
                label: 'Report & Controls',
                href: '#',
                icon: FileTextOutlined,
                children: [
                    {
                        key: 'financial-reports',
                        label: 'Financial Reports',
                        href: '#',
                    },
                    {
                        key: 'budgeting-forecasting',
                        label: 'Budgeting & Forecasting',
                        href: '#',
                    },
                ]
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
                        href: routes.eCommerce.timesheet,
                    },
                    {
                        key: 'shift-management',
                        label: 'Shift Management',
                        href: routes.eCommerce.shiftManagement,
                    },
                    {
                        key: 'leave-permit',
                        label: 'Leave & Permit',
                        href: routes.eCommerce.leavePermit,
                    },
                    {
                        key: 'overtime',
                        label: 'Overtime',
                        href: routes.eCommerce.overtime,
                    }
                ]
            },
            {
                key: 'employee-management',
                label: 'Employee Management',
                href: routes.eCommerce.employee,
                icon: UsergroupAddOutlined,
                children: [
                    {
                        key: 'employee',
                        label: 'Employee',
                        href: routes.eCommerce.employee,
                    },
                    {
                        key: 'pay-slip',
                        label: 'Pay Slip',
                        href: routes.eCommerce.paySlip,
                    },
                    {
                        key: 'performance',
                        label: 'Performance',
                        href: routes.eCommerce.performance,
                    },
                    {
                        key: 'report',
                        label: 'Report',
                        href: routes.eCommerce.report,
                    },
                    {
                        key: 'benefit',
                        label: 'Benefit',
                        href: routes.eCommerce.benefit,
                    },
                    {
                        key: 'settings',
                        label: 'Settings',
                        href: routes.eCommerce.employeeSettings,
                    },
                ]
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
