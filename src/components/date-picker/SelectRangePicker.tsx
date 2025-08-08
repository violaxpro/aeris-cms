'use client'
import React from 'react';
import { DatePicker } from 'antd';
import Image from 'next/image';
import { CalenderBlueIcon, ChevronLeftIcon, ChevronRightIcon } from '@public/icon';
import ButtonIcon from '../button/ButtonIcon';

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
        <div className='flex gap-4 items-center justify-between'>
            <ButtonIcon
                icon={ChevronLeftIcon}
                className='cursor-pointer !h-10 !w-10'
                width={8}
            />
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
            <ButtonIcon
                icon={ChevronRightIcon}
                className='cursor-pointer !h-10 !w-10'
                width={8}
            />
        </div>

    );
};

export default SelectRangePicker;
