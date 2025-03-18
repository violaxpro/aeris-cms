'use client';

import { productsData } from '@/data/products-data';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import { HeaderCell } from '../../table';
import AvatarCard from '@/core/ui/avatar-card';
import { ActionIcon, Badge, Text, Tooltip } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import EyeIcon from '@/core/components/icons/eye';
import PencilIcon from '@/core/components/icons/pencil';
import DeletePopover from '../../delete-popover';

export default function LatestSearch({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title={'Latest Search Term List'}
      data={productsData}
      // @ts-ignore
      getColumns={getColumns}
      pageSize={5}
      enableSearch={false}
      enablePagination
      noGutter
      searchPlaceholder="Search keyword..."
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

const getColumns = ({
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
    title: (
      <HeaderCell title="Keyword" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'product',
    key: 'product',
    width: 30,
    render: (_: string, row: any) => (
      <Text className="ps-4 font-medium text-gray-700">{row?.name}</Text>
    ),
  },
  {
    title: <HeaderCell title="Results" />,
    dataIndex: 'sku',
    key: 'sku',
    width: 30,
    render: (sku: string) => <Text className="text-sm">{sku}</Text>,
  },
  {
    title: <HeaderCell title="Hits" />,
    dataIndex: 'status',
    key: 'status',
    width: 30,
    render: (value: string) => getStatusHits(value),
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
function getStatusHits(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}
