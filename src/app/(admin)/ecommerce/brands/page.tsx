import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import BransTable from '@/app/shared/ecommerce/brands/brand-list/table';

export const metadata = {
  ...metaObject('Brands'),
};

const pageHeader = {
  title: 'Brands',
  breadcrumb: [
    {
      name: 'Catalogue',
    },
    {
      href: routes.eCommerce.brands,
      name: 'Brands',
    },
    {
      name: 'List',
    },
  ],
};

export default function BrandsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.eCommerce.createBrands}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Brand
            </Button>
          </Link>
        </div>
      </PageHeader>

      <BransTable />
    </>
  );
}
