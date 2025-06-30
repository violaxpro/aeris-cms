import React, { useState } from 'react';
import { Button, Popover, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete: () => void;
};

const DeletePopover = ({ title, description, onDelete }: DeletePopoverProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const content = (
    <div className='flex flex-col gap-2'>
      <p>{description}</p>
      <Space>
        <Button danger size="small" onClick={handleDelete}>
          Delete
        </Button>
        <Button size="small" onClick={handleCancel}>
          Cancel
        </Button>
      </Space>
    </div>
  );

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      open={open}
      onOpenChange={(visible) => setOpen(visible)}
    >
      <Button danger size="small" icon={<DeleteOutlined />} />
    </Popover>
  );
};

export default DeletePopover;
