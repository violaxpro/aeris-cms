import { HeaderCell } from '@/app/shared/table';
import DateCell from '@/core/ui/date-cell';

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
  //     <div className="ps-2">
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
  //     <div className="inline-flex ps-2">
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
      <HeaderCell
        title="Buy Price"
        // sortable
        // ascending={
        //   sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
        // }
      />
    ),
    // onHeaderCell: () => onHeaderCellClick('name'),
    dataIndex: 'buyPrice',
    key: 'buyPrice',
    width: 30,
    render: (buyPrice: string) => buyPrice,
  },
  // {
  //   title: (
  //     <HeaderCell
  //       title="Created By"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'createdBy'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('createdBy'),
  //   dataIndex: 'createdBy',
  //   key: 'createdBy',
  //   width: 30,
  //   render: (_: string, row: SnippetOrTemplate) => (
  //     <AvatarCard
  //       src={row.avatar}
  //       name={row.name}
  //       avatarProps={{
  //         name: row.name,
  //         size: 'sm',
  //       }}
  //     />
  //   ),
  // },
  {
    title: <HeaderCell title="Price 1" />,
    dataIndex: 'price1',
    key: 'price1',
    width: 30,
    render: (price1: string) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{price1}</span>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Price 2" />,
    dataIndex: 'price2',
    key: 'price2',
    width: 30,
    render: (price2: string) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{price2}</span>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Price 3" />,
    dataIndex: 'price3',
    key: 'price3',
    width: 30,
    render: (price3: string) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{price3}</span>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Price 4" />,
    dataIndex: 'price4',
    key: 'price4',
    width: 30,
    render: (price4: string) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{price4}</span>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Price 5" />,
    dataIndex: 'price5',
    key: 'price5',
    width: 30,
    render: (price5: string) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{price5}</span>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Updated At" />,
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 30,
    render: (value: Date) => <DateCell date={value} />,
  },
  // {
  //   title: <></>,
  //   dataIndex: 'action',
  //   key: 'action',
  //   render: (_: string, row: any) => (
  //     <RenderAction row={row} onDeleteItem={onDeleteItem} />
  //   ),
  // },
];

// function RenderAction({
//   row,
//   onDeleteItem,
// }: {
//   row: SnippetType;
//   onDeleteItem: (id: string) => void;
// }) {
//   const { openModal } = useModal();
//   return (
//     <>
//       <div className="flex items-center justify-end gap-3 pe-4">
//         <Tooltip
//           size="sm"
//           content={'View/Edit snippet'}
//           placement="top"
//           color="invert"
//         >
//           <ActionIcon
//             size="sm"
//             variant="outline"
//             onClick={() =>
//               openModal({
//                 view: (
//                   <CreateSnippetTemplateForm
//                     type="Edit"
//                     title="snippet"
//                     data={row}
//                   />
//                 ),
//                 customSize: '850px',
//               })
//             }
//           >
//             <PencilIcon className="h-4 w-4" />
//           </ActionIcon>
//         </Tooltip>
//         <Popover placement="left">
//           <Popover.Trigger>
//             <ActionIcon size="sm" variant="outline">
//               <TrashIcon className="h-4 w-4" />
//             </ActionIcon>
//           </Popover.Trigger>
//           <Popover.Content className="!z-0">
//             {({ setOpen }) => (
//               <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
//                 <Title
//                   as="h6"
//                   className="mb-0.5 flex items-start text-sm sm:items-center"
//                 >
//                   <PiWarning className="text me-2 h-6 w-6" /> Delete snippet!
//                 </Title>
//                 <Text className="mt-2 leading-relaxed">
//                   Are you sure you want to delete this snippet?
//                 </Text>
//                 <div className="mt-2 flex items-center justify-end gap-1.5">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="h-7"
//                     onClick={() => setOpen(false)}
//                   >
//                     No
//                   </Button>
//                   <Button
//                     size="sm"
//                     className="h-7"
//                     onClick={() => onDeleteItem(row.id)}
//                   >
//                     Yes
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </Popover.Content>
//         </Popover>
//       </div>
//     </>
//   );
// }
