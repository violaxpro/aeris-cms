import { metaObject } from '@/config/site.config';
import PageHeader from '@/app_old/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditAttributes from '@/app_old/shared/ecommerce/attributes/create-edit';

export const metadata = {
  ...metaObject('Create Attributes'),
};

const pageHeader = {
  title: 'Create Attribute',
  breadcrumb: [
    {
      name: 'Catalogue',
    },
    {
      href: routes.eCommerce.attributes,
      name: 'Products',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreatePage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditAttributes />
    </>
  );
}
