import React from 'react';
import { Badge } from 'antd';

export type StatusBadgeProps = {
    status: 'Pending' | 'Draft' | 'Publish' | 'Yes' | 'No' | 1 | 0 | 'Paid' | 'Unpaid' | 'Partially Paid';
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
        Unpaid: { color: '#FF6A00', text: 'Unpaid' },
        'Partially Paid': { color: '#FF6A00', text: 'Partially Paid' },
    };

    const config = statusMap[status] || { color: 'default', text: status };
    return (
        <span className="inline-flex items-center gap-1">
            <Badge color={config.color as any} />
            <span style={{ color: config.color }}>{config.text}</span>
        </span>
    );

};

export default StatusBadge;
