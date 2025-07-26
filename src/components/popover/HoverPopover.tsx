import React from 'react';
import { Button, Popover, Space } from 'antd';

type HoverPopoverType = {
    title?: string
    content: any
    children: any
}
const HoverPopover = ({
    content,
    title,
    children
}: HoverPopoverType) => (
    <Space wrap>
        <Popover content={content} title={title} trigger="hover">
            {children}
        </Popover>
    </Space>
);

export default HoverPopover;