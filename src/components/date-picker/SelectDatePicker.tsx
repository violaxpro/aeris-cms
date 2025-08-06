'use client';

import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { CalenderBlueIcon } from '@public/icon';

type Props = {
    value?: Dayjs;
    onChange: (val: Dayjs | null) => void;
    width?: string;
    picker?: any
    format?: any
};

const SelectDatePicker: React.FC<Props> = ({ value, onChange, width = '!w-35', picker = 'month',
    format = 'MMMM', }) => {
    return (
        <div className="flex items-center gap-2">
            <DatePicker
                size="middle"
                className={`${width} !h-10 !text-[#3666AA] [&>input]:!text-[#3666AA] !border !border-[#3666AA] !rounded-lg`}
                value={value}
                onChange={onChange}
                suffixIcon={
                    <Image src={CalenderBlueIcon} alt="calendar" width={16} height={16} />
                }
                format={format}
                picker={picker}
            />
        </div>
    );
};

export default SelectDatePicker;
