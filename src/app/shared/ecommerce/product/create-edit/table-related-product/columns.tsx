import { Text, Badge, Checkbox } from 'rizzui';
import { HeaderCell } from '@/app/shared/table';
import { IRelatedProductType } from '@/data/related-products';
import ThumbnailCard from '@/core/ui/thumbnail';

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
    title: (
      <HeaderCell
        title="ID"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'id'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('id'),
    dataIndex: 'id',
    key: 'id',
    width: 30,
    render: (id: string) => id,
  },
  {
    title: (
      <HeaderCell
        title="SKU"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'sku'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('sku'),
    dataIndex: 'sku',
    key: 'sku',
    width: 30,
    render: (sku: string) => <Text className="text-sm">{sku}</Text>,
  },
  {
    title: <HeaderCell title="thumbnail" />,
    dataIndex: 'thumbnail',
    key: 'thumbnail',
    width: 30,
    render: (_: string, row: IRelatedProductType) => (
      <ThumbnailCard src={row.thumbnail} name={row.name} />
    ),
  },
  {
    title: (
      <HeaderCell
        title="name"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('name'),
    dataIndex: 'name',
    key: 'name',
    width: 30,
    render: (name: string) => <Text className="text-sm">{name}</Text>,
  },
  {
    title: (
      <HeaderCell
        title="buyPrice"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'buyPrice'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('buyPrice'),
    dataIndex: 'buyPrice',
    key: 'buyPrice',
    width: 30,
    render: (buyPrice: string) => <Text className="text-sm">{buyPrice}</Text>,
  },
  {
    title: (
      <HeaderCell
        title="status"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    width: 30,
    render: (status: string) => getStatusBadge(status),
  },
  {
    title: (
      <HeaderCell
        title="created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'created'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('created'),
    dataIndex: 'created',
    key: 'created',
    width: 30,
    render: (created: string) => <Text className="text-sm">{created}</Text>,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'inactive':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    case 'active':
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
