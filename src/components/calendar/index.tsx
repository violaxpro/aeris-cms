
import React from 'react';
import { Calendar, Badge } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

type LeaveType = 'Annual Leave' | 'Bereavement Leave' | 'Personal Permit' | 'Sick Permit';

interface LeaveData {
    date: string; // format 'YYYY-MM-DD'
    type: LeaveType;
}

const leaveData: LeaveData[] = [
    { date: '2025-07-05', type: 'Annual Leave' },
    { date: '2025-07-06', type: 'Annual Leave' },
    { date: '2025-07-10', type: 'Bereavement Leave' },
    { date: '2025-07-11', type: 'Bereavement Leave' },
    { date: '2025-07-12', type: 'Bereavement Leave' },
    { date: '2025-07-14', type: 'Personal Permit' },
    { date: '2025-07-27', type: 'Sick Permit' },
    { date: '2025-07-28', type: 'Sick Permit' },
    { date: '2025-07-30', type: 'Annual Leave' },
    { date: '2025-07-31', type: 'Annual Leave' },
    { date: '2025-08-01', type: 'Annual Leave' },
    { date: '2025-08-02', type: 'Annual Leave' },
];

const getEmoji = (type: LeaveType) => {
    switch (type) {
        case 'Annual Leave': return '🏖️';
        case 'Bereavement Leave': return '📘';
        case 'Personal Permit': return '📋';
        case 'Sick Permit': return '🤒';
        default: return '❓';
    }
};

const CalendarComponent: React.FC = () => {
    const dateCellRender = (value: Dayjs) => {
        const formatted = value.format('YYYY-MM-DD');
        const leaves = leaveData.filter(leave => leave.date === formatted);

        return (
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {leaves.map((leave, index) => (
                    <li key={index}>
                        <Badge status="default" text={`${getEmoji(leave.type)} ${leave.type}`} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className='rounded-xl bg-[#F8F8F899] p-8'>
            <Calendar dateCellRender={dateCellRender} />
        </div>
    );
};

export default CalendarComponent;
