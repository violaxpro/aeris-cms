import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { TreeNode } from '@/plugins/types/treeTypes';

export const RenderMenu = ({
  node,
  onCreateSubcategory,
  onEditCategory,
  onDeleteCategory
}: {
  node: TreeNode;
  onCreateSubcategory: (node: TreeNode) => void;
  onEditCategory: (node: TreeNode) => void;
  onDeleteCategory: (node: TreeNode) => void;
}) => {
  const menuItems = [
    {
      key: 'create-subcategory',
      label: 'Create Subcategory',
      onClick: () => onCreateSubcategory(node)
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => onEditCategory(node)
    },
    {
      key: 'delete',
      label: <span style={{ color: 'red' }}>Delete</span>,
      danger: true,
      onClick: () => onDeleteCategory(node)
    }
  ];

  return (
    <div className="inline-flex w-full items-center justify-between">
      <span>{node.text}</span>
      <Dropdown menu={{ items: menuItems }} trigger={['click']}>
        <MoreOutlined className="ml-2 cursor-pointer" />
      </Dropdown>
    </div>
  );
};
