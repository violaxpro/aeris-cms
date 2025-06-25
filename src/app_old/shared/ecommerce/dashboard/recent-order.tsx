import { orderData } from '@/data/order-data';
import { getWidgetColumns } from '@/app_old/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/app_old/shared/controlled-table/basic-table-widget';

export default function RecentOrder({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title={'Recent Order List'}
      data={orderData}
      // @ts-ignore
      getColumns={getWidgetColumns}
      className={className}
      enablePagination
      noGutter
      searchPlaceholder="Search order..."
      variant="modern"
    />
  );
}
