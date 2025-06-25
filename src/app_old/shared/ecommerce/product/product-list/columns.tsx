'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app_old/shared/table';
import { Badge, Text, Checkbox, Tooltip, ActionIcon } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@/core/components/icons/eye';
import PencilIcon from '@/core/components/icons/pencil';
import { ProductType } from '@/data/products-data';
import DeletePopover from '@/app_old/shared/delete-popover';
import ThumbnailCard from '@/core/ui/thumbnail';
import DateCell from '@/core/ui/date-cell';

// get status badge
function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
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

type ProductsDataType = {
  id: string;
  name: string;
  category: string;
  image: string;
  sku: string;
  stock: number;
  price: string;
  status: string;
  rating: number[];
}[];
type Columns = {
  data: ProductsDataType;
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
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="ID" />,
      dataIndex: 'id',
      key: 'id',
      width: 30,
      render: (id: string) => <Text className="text-sm">{id}</Text>,
    },
    {
      title: <HeaderCell title="SKU" />,
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
      render: (sku: string) => <Text className="text-sm">SKU-{sku}</Text>,
    },
    {
      title: <HeaderCell title="Thumbnail" />,
      dataIndex: 'product',
      key: 'product',
      width: 100,
      render: (_: string, row: ProductType) => (
        <ThumbnailCard src={row.image} name={''} />
      ),
    },
    {
      title: <HeaderCell title="Name" />,
      // onHeaderCell: () => onHeaderCellClick('stock'),
      dataIndex: 'product',
      key: 'product',
      width: 200,
      render: (_: string, row: ProductType) => (
        <Text className="font-medium text-gray-700">{row.name}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Qty"
        // sortable
        // ascending={
        //   sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        // }
        />
      ),
      // onHeaderCell: () => onHeaderCellClick('price'),
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Price"
        // sortable
        // ascending={
        //   sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        // }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('price'),
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">${value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: string) => getStatusBadge(value),
    },
    {
      title: (
        <HeaderCell
          title="CreatedAt"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (createdAt: Date) => <DateCell date={createdAt} />,
    },
    {
      title: (
        <HeaderCell
          title="updatedAt"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 100,
      render: (value: Date) => <DateCell date={value} />,
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: ProductType) => (
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
          <DeletePopover
            title={`Delete the product`}
            description={`Are you sure you want to delete this #${row.id} product?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        </div>
      ),
    },
  ];
