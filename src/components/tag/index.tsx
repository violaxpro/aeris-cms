import React from 'react';
import { Tag } from 'antd';

type StatusTagProps = {
    status: string;
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
    const colorMap: Record<string, string> = {
        DRFAT: '#9CA3AF',
        APPROVED: '#3B82F6',
        PROCESSING: '#6366F1',
        'AWAITING STOCK': '#F59E0B',
        PACKED: '#06B6D4',
        'READY FOR PICKUP': '#14B8A6',
        SHIPPED: '#8B5CF6',
        'IN TRANSIT': '#0EA5E9',
        'OUT OF DELIVERY': '#10B981',
        DELIVERED: '#22C55E',
        INVOICED: '#22C55E',
        BILLED: '#22C55E',
        'WAITING FOR APPROVAL': '#F59E0B',
        PAID: '#22C55E',
        COMPLETED: '#22C55E'
    };

    const color = colorMap[status] || 'gray';

    return <Tag color={color}>{status}</Tag>;
};

export default StatusTag;
