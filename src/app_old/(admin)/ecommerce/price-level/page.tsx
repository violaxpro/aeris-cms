import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app_old/shared/page-header';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app_old/shared/export-button';
import { priceLevelsData } from '@/data/price-level-data';
import PriceLevelTable from '@/app_old/shared/ecommerce/price-level/price-level-list/table';

export const metadata = {
  ...metaObject('Price Level'),
};

const pageHeader = {
  title: 'Price Level',
  breadcrumb: [
    {
      name: 'Catalogue',
    },
    {
      href: routes.eCommerce.priceLevel,
      name: 'Price Level',
    },
    {
      name: 'List',
    },
  ],
};

export default function PriceLevelPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={priceLevelsData}
            fileName="product_data"
            header="ID,Name,Category,Sub Category,Warranty"
          />
          <Link
            href={routes.eCommerce.createPriceLevel}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Price Level
            </Button>
          </Link>
        </div>
      </PageHeader>

      <PriceLevelTable />
    </>
  );
}
