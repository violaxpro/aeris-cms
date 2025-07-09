import React from 'react';
import { Tag } from 'antd';

type StatusTagProps = {
    status: string;
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
    const colorMap: Record<string, string> = {
        Draft: '#9CA3AF',
        Approved: '#3B82F6',
        Processing: '#6366F1',
        'Awaiting Stock': '#F59E0B',
        Packed: '#06B6D4',
        'Ready for Pickup': '#14B8A6',
        Shipped: '#8B5CF6',
        'In Transit': '#0EA5E9',
        'Out of Delivery': '#10B981',
        Delivered: '#22C55E',
        Invoiced: '#22C55E',
    };

    const color = colorMap[status] || 'gray';

    return <Tag color={color}>{status}</Tag>;
};

export default StatusTag;
