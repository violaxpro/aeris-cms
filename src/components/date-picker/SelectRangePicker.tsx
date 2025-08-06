'use client'
import React from 'react';
import { DatePicker } from 'antd';
import Image from 'next/image';
import { CalenderBlueIcon } from '@public/icon';

const { RangePicker } = DatePicker;

type RangePickerProps = {
    picker?: any
    format?: any
    onChange?: any
}

const SelectRangePicker = ({
    picker = 'month',
    format = 'MMMM',
    onChange
}: RangePickerProps) => {
    return (
        <div className="flex items-center bg-[#f5f7f9] px-4 py-2 rounded-lg text-[#3666AA] text-sm gap-2 w-fit">
            <RangePicker
                picker={picker}
                format={format}
                separator=" - "
                bordered={false}
                className="!bg-transparent !text-[#3666AA] [&>input]:!text-[#3666AA]"
                onChange={onChange}
                suffixIcon={
                    <Image src={CalenderBlueIcon} alt="calendar" width={16} height={16} />
                }
            />
        </div>
    );
};

export default SelectRangePicker;
