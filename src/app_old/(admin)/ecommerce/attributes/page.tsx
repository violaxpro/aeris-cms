import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app_old/shared/page-header';
import { metaObject } from '@/config/site.config';
import AttributesTable from '@/app_old/shared/ecommerce/attributes/attributes-list/table';

export const metadata = {
  ...metaObject('Attributes'),
};

const pageHeader = {
  title: 'Attributes',
  breadcrumb: [
    {
      name: 'Catalogue',
    },
    {
      href: routes.eCommerce.attributes,
      name: 'Attributes',
    },
    {
      name: 'List',
    },
  ],
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.eCommerce.createAttributes}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Attribute
            </Button>
          </Link>
        </div>
      </PageHeader>

      <AttributesTable />
    </>
  );
}
