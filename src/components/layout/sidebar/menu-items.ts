import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { DatabaseOutlined, PieChartOutlined, AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
    // label start
    {
        key: 'overview',
        name: 'Overview',
    },
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
        key: 'setting',
        name: 'Settings',
        href: '#',
        icon: SettingOutlined,
    },
];
