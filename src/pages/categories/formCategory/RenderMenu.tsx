import { Dropdown, Menu } from 'antd';
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
  const menu = (
    <Menu>
      <Menu.Item onClick={() => onCreateSubcategory(node)}>Create Subcategory</Menu.Item>
      <Menu.Item onClick={() => onEditCategory(node)}>Edit</Menu.Item>
      <Menu.Item danger onClick={() => onDeleteCategory(node)}>Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className="inline-flex w-full items-center justify-between">
      <span>{node.text}</span>
      <Dropdown overlay={menu} trigger={['click']}>
        <MoreOutlined className="ml-2 cursor-pointer" />
      </Dropdown>
    </div>
  );
};

