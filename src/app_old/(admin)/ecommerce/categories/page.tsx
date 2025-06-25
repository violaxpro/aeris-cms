import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import CategoriesTable from '@/app_old/shared/ecommerce/categories/categories-list/table';
import PageHeader from '@/app_old/shared/page-header';
import Link from 'next/link';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';

export const metadata = {
  ...metaObject('Categories'),
};

const pageHeader = {
  title: 'Categories',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.categories,
      name: 'Categories',
    },
    {
      name: 'List',
    },
  ],
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.eCommerce.createCategory}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              Add Categories
            </Button>
          </Link>
        </div>
      </PageHeader>

      <CategoriesTable />
    </>
  );
}
