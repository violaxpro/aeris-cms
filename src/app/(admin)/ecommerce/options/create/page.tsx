import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditOptions from '@/app/shared/ecommerce/options/create-edit';

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

      <CreateEditOptions />
    </>
  );
}
