import React from 'react';
import { Tag } from 'antd';
import { statusMap } from '@/config/colors-status';

type StatusTagProps = {
    status: string;
    type?: string
};

const StatusTag: React.FC<StatusTagProps> = ({ status, type = 'quote' }) => {
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

    // const config = statusMap[status] || { color: 'default', text: status };
    let config;

    // Kondisi khusus untuk status 'Draft'
    if (status === 'Draft' && type === 'order') {
        config = statusMap['Draft Order'];
    } else {
        config = statusMap[status] || { color: 'default', text: status, textColor: 'inherit' };
    }

    return <Tag color={config.color} bordered={false}>
        <span style={{ color: config.textColor }} className='font-semibold'>{config.text}</span>
    </Tag>;
};

export default StatusTag;
