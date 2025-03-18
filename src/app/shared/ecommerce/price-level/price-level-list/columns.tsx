'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app/shared/table';
import { Text, Checkbox, Tooltip, ActionIcon } from 'rizzui';
import { routes } from '@/config/routes';
import PencilIcon from '@/core/components/icons/pencil';
import { ProductType } from '@/data/products-data';
import DeletePopover from '@/app/shared/delete-popover';
import { PriceLevelType } from '@/data/price-level-data';

type Columns = {
  data: PriceLevelType[];
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
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: (name: string) => <Text className="text-sm">{name}</Text>,
  },
  {
    title: <HeaderCell title="Brand" />,
    // onHeaderCell: () => onHeaderCellClick('stock'),
    dataIndex: 'brand',
    key: 'brand',
    width: 100,
    render: (name: string) => (
      <Text className="font-medium text-gray-700">{name}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Categories"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'categories'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('categories'),
    dataIndex: 'categories',
    key: 'categories',
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Sub Category"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'subcategory'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('subcategories'),
    dataIndex: 'subcategories',
    key: 'subcategories',
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Warranty"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'warranty'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('warranty'),
    dataIndex: 'warranty',
    key: 'warranty',
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
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
          content={'Edit Price Level'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editPriceLevel(row.id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Price Level'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the price level`}
          description={`Are you sure you want to delete this #${row.id} price level?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
