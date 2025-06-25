'use client';
import { productsData } from '@/data/products-data';
import BasicTableWidget from '@/app_old/shared/controlled-table/basic-table-widget';
import { HeaderCell } from '../../table';
import { ActionIcon, Text, Tooltip } from 'rizzui';
import { PiStarFill } from 'react-icons/pi';
import Link from 'next/link';
import PencilIcon from '@/core/components/icons/pencil';
import { routes } from '@/config/routes';
import EyeIcon from '@/core/components/icons/eye';
import DeletePopover from '../../delete-popover';

export default function LatestReview({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title={'Latest Reviews List'}
      data={productsData}
      // @ts-ignore
      getColumns={getColumns}
      enableSearch={false}
      pageSize={5}
      enablePagination
      noGutter
      searchPlaceholder="Search product..."
      variant="modern"
      className={className}
    />
  );
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
    // {
    //   title: (
    //     <div className="ps-3.5">
    //       <Checkbox
    //         title={'Select All'}
    //         onChange={handleSelectAll}
    //         checked={checkedItems.length === data.length}
    //         className="cursor-pointer"
    //       />
    //     </div>
    //   ),
    //   dataIndex: 'checked',
    //   key: 'checked',
    //   width: 30,
    //   render: (_: any, row: any) => (
    //     <div className="inline-flex ps-3.5">
    //       <Checkbox
    //         className="cursor-pointer"
    //         checked={checkedItems.includes(row.id)}
    //         {...(onChecked && { onChange: () => onChecked(row.id) })}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: <HeaderCell title="Product" />,
      dataIndex: 'product',
      key: 'product',
      width: 30,
      render: (_: string, row: any) => (
        <Text className="text-sm">{row?.name}</Text>
      ),
    },
    {
      title: <HeaderCell title="Customer" />,
      dataIndex: 'sku',
      key: 'sku',
      width: 30,
      render: (sku: string) => <Text className="text-sm">{sku}</Text>,
    },
    {
      title: <HeaderCell title="Rating" />,
      dataIndex: 'rating',
      key: 'rating',
      width: 30,
      render: (rating: number[]) => getRating(rating),
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 30,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={'Edit Product'}
            placement="top"
            color="invert"
          >
            <Link href={routes.eCommerce.ediProduct(row.id)}>
              <ActionIcon size="sm" variant="outline" aria-label={'Edit Product'}>
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={'View Product'}
            placement="top"
            color="invert"
          >
            <Link href={routes.eCommerce.productDetails(row.id)}>
              <ActionIcon size="sm" variant="outline" aria-label={'View Product'}>
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the product`}
            description={`Are you sure you want to delete this #${row.id} product?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        </div>
      ),
    },
  ];

function getRating(rating: number[]) {
  let totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  let review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      <span className="">{review.toFixed(1)}</span>
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="w-4 fill-orange text-orange" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}{' '}
      <span className="ms-1 shrink-0">({totalRating})</span>
    </div>
  );
}
