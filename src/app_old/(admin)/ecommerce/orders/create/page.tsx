import { routes } from '@/config/routes';
import PageHeader from '@/app_old/shared/page-header';
import CreateOrder from '@/app_old/shared/ecommerce/order/create-order';
import ImportButton from '@/app_old/shared/import-button';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Create Order'),
};

const pageHeader = {
  title: 'Order',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.options,
      name: 'Orders',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateOrderPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton
          title="Upload Order"
          modalBtnLabel="Import Order"
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        />
      </PageHeader>
      <CreateOrder />
    </>
  );
}
