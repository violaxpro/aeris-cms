import React from 'react';
import { Tag } from 'antd';

type StatusTagProps = {
    status: string;
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
    // const colorMap: Record<string, string> = {
    //     // DRFAT: '#9CA3AF',
    //     // DRAFT: '#FF6A00',
    //     DRAFT: '#FF6A001A',
    //     APPROVED: '#3B82F6',
    //     PROCESSING: '#6366F1',
    //     'AWAITING STOCK': '#F59E0B',
    //     PACKED: '#06B6D4',
    //     'READY FOR PICKUP': '#14B8A6',
    //     SHIPPED: '#8B5CF6',
    //     'IN TRANSIT': '#0EA5E9',
    //     'OUT OF DELIVERY': '#10B981',
    //     DELIVERED: '#22C55E',
    //     INVOICED: '#22C55E',
    //     BILLED: '#22C55E',
    //     'WAITING FOR APPROVAL': '#F59E0B',
    //     PAID: '#22C55E',
    //     COMPLETED: '#22C55E'
    // };

    // const color = colorMap[status] || 'gray';
    const statusMap: Record<string, { color: string; text: string, textColor: string }> = {
        Draft: { color: '#FF6A001A', text: 'Draft', textColor: '#FF6A00' },
        Approved: { color: '#3666AA1A', text: 'Approved', textColor: '#3666AA' },
        Cancelled: { color: '#EA00001A', text: 'Cancelled', textColor: '#EA0000' },
        Invoiced: { color: '#00B3061A', text: 'Invoiced', textColor: '#00B306' },


    };
    const config = statusMap[status] || { color: 'default', text: status };

    return <Tag color={config.color} bordered={false}>
        <span style={{ color: config.textColor }}>{config.text}</span>
    </Tag>;
};

export default StatusTag;
