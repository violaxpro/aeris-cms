import { metaObject } from '@/config/site.config';
import PageHeader from '@/app_old/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditBrands from '@/app_old/shared/ecommerce/brands/create-edit';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Product',
  breadcrumb: [
    {
      name: 'Catalogue',
    },
    {
      href: routes.eCommerce.products,
      name: 'Products',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditBrands />
    </>
  );
}
