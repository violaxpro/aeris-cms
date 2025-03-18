import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { PiChartBar, PiDatabase, PiGear, PiPerson } from 'react-icons/pi';
import { GrCatalogOption } from 'react-icons/gr';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  {
    name: 'Dashboard',
    href: routes.eCommerce.dashboard,
    icon: <PiDatabase />,
  },
  {
    name: 'Catalogue',
    href: '#',
    icon: <GrCatalogOption />,
    dropdownItems: [
      {
        name: 'Product',
        href: routes.eCommerce.products,
      },
      {
        name: 'Price Level',
        href: routes.eCommerce.priceLevel,
      },
      {
        name: 'Categories',
        href: routes.eCommerce.categories,
      },
      {
        name: 'Brand',
        href: routes.eCommerce.brands,
      },
      {
        name: 'Attributes',
        href: routes.eCommerce.categories,
      },
      {
        name: 'Options',
        href: routes.eCommerce.createCategory,
      },
      {
        name: 'Tags',
        href: routes.eCommerce.editCategory(DUMMY_ID),
      },
      {
        name: 'Reviews',
        href: routes.eCommerce.reviews,
      },
    ],
  },
  {
    name: 'Sales',
    href: '#',
    icon: <PiChartBar />,
    dropdownItems: [
      {
        name: 'Order',
        href: routes.eCommerce.products,
      },
      {
        name: 'Quote',
        href: routes.eCommerce.priceLevel,
      },
      {
        name: 'Transaction',
        href: routes.eCommerce.categories,
      },
      {
        name: 'RMA',
        href: routes.eCommerce.brands,
      },
      {
        name: 'Credit',
        href: routes.eCommerce.categories,
      },
    ],
  },
  {
    name: 'Users',
    href: '#',
    icon: <PiPerson />,
    dropdownItems: [
      {
        name: 'Users',
        href: routes.eCommerce.products,
      },
      {
        name: 'Roles',
        href: routes.eCommerce.priceLevel,
      },
      {
        name: 'Subscribe',
        href: routes.eCommerce.categories,
      },
    ],
  },
  {
    name: 'Settings',
    href: '#',
    icon: <PiGear />,
  },
];
