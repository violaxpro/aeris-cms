'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app_old/shared/table';
import { Text, Checkbox, Tooltip, ActionIcon, Accordion } from 'rizzui';
import { routes } from '@/config/routes';
import PencilIcon from '@/core/components/icons/pencil';
import DeletePopover from '@/app_old/shared/delete-popover';
import ThumbnailCard from '@/core/ui/thumbnail';
import { CategoriesType } from '@/data/categories-data';
import { FaChevronUp } from 'react-icons/fa';

import cn from '@/core/utils/class-names';
import GetStatusBadge from '@/core/ui/get-status-badge';

type Columns = {
  data: CategoriesType[];
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
      title: <HeaderCell title="Sub Category" />,
      dataIndex: 'subCategory',
      key: 'subCategory',
      width: 200,
      render: (_: any, categories: CategoriesType) => {
        const subCategories = categories.subCategories;
        return (
          <Accordion className="mx-8 border-b last-of-type:border-b-0">
            <Accordion.Header>
              {({ open }) => (
                <div className="flex w-full cursor-pointer items-center justify-between py-5">
                  <Text className="font-semibold">Sub Categories</Text>
                  <FaChevronUp
                    className={cn(
                      'h-5 w-5 transform transition-transform duration-300',
                      open && '-rotate-180'
                    )}
                  />
                </div>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <div className="flex items-center gap-4">
                <div className="">
                  <ThumbnailCard src={subCategories?.images} name={''} />
                </div>
                <div className="">
                  <Text className="text-sm">{subCategories.id}</Text>
                  <Text className="text-sm">{subCategories.categoriesName}</Text>
                  <GetStatusBadge status={subCategories.status} />
                </div>
              </div>
            </Accordion.Body>
          </Accordion>
        );
      },
    },
    {
      title: <HeaderCell title="ID" />,
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (value: string) => <Text className="text-sm">{value}</Text>,
    },
    {
      title: <HeaderCell title="Thumbnail" />,
      dataIndex: 'images',
      key: 'images',
      width: 100,
      render: (value: string) => <ThumbnailCard src={value} name={''} />,
    },
    {
      title: (
        <HeaderCell
          title="Categories Name"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'categories'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('categoriesName'),
      dataIndex: 'categoriesName',
      key: 'categoriesName',
      width: 150,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Description" />,
      dataIndex: 'description',
      key: 'description',
      width: 150,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: string) => <GetStatusBadge status={value} />,
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: CategoriesType) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={'Edit Categories'}
            placement="top"
            color="invert"
          >
            <Link href={routes.eCommerce.editCategory(row.id)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Edit Categories'}
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the categories`}
            description={`Are you sure you want to delete this #${row.id} categories?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        </div>
      ),
    },
  ];
