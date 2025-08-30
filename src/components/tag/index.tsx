import React from 'react';
import { Tag, TagProps } from 'antd';
import { statusMap } from '@/config/colors-status';

type StatusTagProps = {
    status: string;
    type?: string
} & TagProps;

const StatusTag: React.FC<StatusTagProps> = ({ status, type = 'quote', ...props }) => {
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
    // if (status === 'Draft' && (type)) {
    //     config = statusMap['Draft Orange'];
    // } 
    if (status === 'Sent' && type === 'supplier') {
        config = statusMap['Sent Email'];
    } else if (status === 'Approved' && type === 'time') {
        config = statusMap['Approved Permit'];
    } else if (status === 'Picking' && type === 'stock-transfer') {
        config = statusMap['Picking Stock Transfer'];
    }
    else {
        config = statusMap[status] || { color: '#D9D9D980', text: status, textColor: '#505050' };
    }

    return <Tag color={config.color} bordered={false} {...props}>
        <span style={{ color: config.textColor }} className='font-semibold text-sm'>{config.text}</span>
    </Tag>;
};

export default StatusTag;
