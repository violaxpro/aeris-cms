import React from 'react';
import { Badge } from 'antd';

export type StatusBadgeProps = {
    status: 'Pending' | 'Draft' | 'Publish' | 'Yes' | 'No' | 1;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusMap: Record<string, { color: string; text: string }> = {
        Pending: { color: 'processing', text: 'Pending' },
        Draft: { color: 'default', text: 'Draft' },
        Publish: { color: 'success', text: 'Published' },
        Yes: { color: 'success', text: 'Yes' },
        No: { color: 'error', text: 'No' },
        1: { color: 'success', text: 'Enabled' },
    };

    const config = statusMap[status] || { color: 'default', text: status };

    return <Badge status={config.color as any} text={config.text} />;
};

export default StatusBadge;
