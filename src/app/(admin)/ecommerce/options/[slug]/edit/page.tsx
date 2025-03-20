import Link from 'next/link';
import { Metadata } from 'next';
import { PiPlusBold } from 'react-icons/pi';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import CreateEditOptions from '@/app/shared/ecommerce/options/create-edit';

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return metaObject(`Edit ${slug}`);
}

const pageHeader = {
  title: 'Edit Options',
  breadcrumb: [
    {
      name: 'Catalogue',
    },
    {
      href: routes.eCommerce.options,
      name: 'Options',
    },
    {
      name: 'Edit',
    },
  ],
};
export default function EditPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.options}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Option
          </Button>
        </Link>
      </PageHeader>

      <CreateEditOptions slug={params.slug} />
    </>
  );
}
