import React from 'react';
import { Badge } from 'antd';

export type StatusBadgeProps = {
    status: string
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusMap: Record<string, { color: string; text: string }> = {
        Pending: { color: 'processing', text: 'Pending' },
        Draft: { color: 'default', text: 'Draft' },
        Publish: { color: 'success', text: 'Published' },
        Yes: { color: 'success', text: 'Yes' },
        No: { color: 'error', text: 'No' },
        1: { color: 'success', text: 'Enabled' },
        0: { color: 'default', text: 'Disabled' },
        Paid: { color: '#01933B', text: 'Paid' },
        Unpaid: { color: '#828282', text: 'Unpaid' },
        'Partially Paid': { color: '#FBBC0E', text: 'Partially Paid' },
        'Waiting for Payment': { color: '#FF6A00', text: 'Waiting for Payment' },
        'Verification': { color: '#FF7601', text: 'Verification' },
        'Refunded': { color: '#A32904', text: 'Refunded' },
        'Not Yet Issued': { color: '#4E4E4ECC', text: 'Not Yet Issued' },
        Enabled: { color: '#01933B', text: 'Enabled' },

    };


    const config = statusMap[status] || { color: '#4E4E4ECC', text: status };

    return (
        <span className="inline-flex items-center gap-1">
            <Badge color={config.color as any} />
            <span style={{ color: config.color }}>{config.text}</span>
        </span>
    );

};

export default StatusBadge;
