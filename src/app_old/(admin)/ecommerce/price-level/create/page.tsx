import { metaObject } from '@/config/site.config';
import PageHeader from '@/app_old/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditPriceLevel from '@/app_old/shared/ecommerce/price-level/create-edit';

export const metadata = {
  ...metaObject('Create Price Level'),
};

const pageHeader = {
  title: 'Create Price Level',
  breadcrumb: [
    {
      name: 'Catalogue',
    },
    {
      href: routes.eCommerce.priceLevel,
      name: 'Price Level',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreatePriceLevelPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditPriceLevel />
    </>
  );
}
