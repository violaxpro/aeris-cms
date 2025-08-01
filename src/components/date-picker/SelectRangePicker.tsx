'use client'
import React from 'react';
import { DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const SelectRangePicker = () => {
    return (
        <div className="flex items-center bg-[#f5f7f9] px-4 py-2 rounded-lg text-[#3666AA] text-sm gap-2 w-fit">
            <CalendarOutlined />
            <RangePicker
                picker="month"
                format="MMMM"
                separator=" - "
                bordered={false}
                className="!bg-transparent !text-[#3666AA] [&>input]:!text-[#3666AA]"
            />
        </div>
    );
};

export default SelectRangePicker;
