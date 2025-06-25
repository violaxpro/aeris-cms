'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app_old/shared/table';
import { Text, Checkbox, Tooltip, ActionIcon } from 'rizzui';
import { routes } from '@/config/routes';
import PencilIcon from '@/core/components/icons/pencil';
import DeletePopover from '@/app_old/shared/delete-popover';

import GetStatusBadge from '@/core/ui/get-status-badge';
import DateCell from '@/core/ui/date-cell';
import { AttributesType } from '@/data/attributes-data';

type Columns = {
  data: AttributesType[];
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
      width: 100,
      render: (value: string) => <Text className="text-sm">{value}</Text>,
    },
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'attributeName',
      key: 'attributeName',
      width: 100,
      render: (value: string) => <Text className="text-sm">{value}</Text>,
    },
    {
      title: (
        <HeaderCell
          title="Attribute Set"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'attributeSet'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('attributeSet'),
      dataIndex: 'attributeSet',
      key: 'attributeSet',
      width: 150,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: <HeaderCell title="Filterable" />,
      dataIndex: 'filterable',
      key: 'filterable',
      width: 120,
      render: (value: string) => <GetStatusBadge status={value} />,
    },
    {
      title: <HeaderCell title="Created At" />,
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (value: string) => <DateCell date={new Date(value)} />,
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: AttributesType) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={'Edit Attributes'}
            placement="top"
            color="invert"
          >
            <Link href={routes.eCommerce.editAttributes(row.id)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Edit Attributes'}
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the attribute`}
            description={`Are you sure you want to delete this #${row.id} attribute?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        </div>
      ),
    },
  ];
