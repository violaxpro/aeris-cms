import PageHeader from '@/app_old/shared/page-header';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { metaObject } from '@/config/site.config';
import CreateEditCategories from '@/app_old/shared/ecommerce/categories/create-edit';

export const metadata = {
  ...metaObject('Create a Category'),
};

const pageHeader = {
  title: 'Create A Category',
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
      name: 'Create',
    },
  ],
};

export default function CreateCategoriesPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.categories}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      <CreateEditCategories />
    </>
  );
}
