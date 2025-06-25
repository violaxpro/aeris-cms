import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import WelcomeBanner from '@/core/components/banners/welcome';
import StatCards from '@/app_old/shared/ecommerce/dashboard/stat-cards';
import SalesReport from '@/app_old/shared/ecommerce/dashboard/sales-report';
import RecentOrder from '@/app_old/shared/ecommerce/dashboard/recent-order';
import LatestSearch from '@/app_old/shared/ecommerce/dashboard/latest-search';
import { PiPlusBold } from 'react-icons/pi';
import welcomeImg from '@public/shop-illustration.png';
import HandWaveIcon from '@/core/components/icons/hand-wave';
import LatestReview from './latest-review';
import QuoteHistory from './quote-history';
import OrderHistory from './order-history';

export default function EcommerceDashboard() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-8">
        <WelcomeBanner
          title={
            <>
              Good Morning, <br /> Cameron{' '}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            'Here’s What happening on your store today. See the statistics at once.'
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-8 dark:bg-gray-100/30 lg:pb-9"
        >
          <Link href={routes.eCommerce.createProduct} className="inline-flex">
            <Button as="span" className="h-[38px] shadow md:h-10">
              <PiPlusBold className="me-1 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </WelcomeBanner>

        <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />

        {/* <SalesWidget className="h-[464px] @sm:h-[520px] @4xl:col-span-2 @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-full" /> */}

        <SalesReport className="@4xl:col-span-2 @7xl:col-span-8" />

        <RecentOrder className="relative @4xl:col-span-2 @7xl:col-span-12" />

        <section className="flex flex-col gap-x-2 gap-y-8 @4xl:flex-row">
          <LatestSearch className="w-full @4xl:w-1/2" />

          <LatestReview className="w-full @4xl:w-1/2" />
        </section>

        <section className="flex flex-col gap-2 @4xl:flex-row">
          <QuoteHistory className="w-full @4xl:w-1/2" />

          <OrderHistory className="w-full @4xl:w-1/2" />
        </section>
      </div>
    </div>
  );
}
