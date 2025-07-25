import Image from 'next/image';
import { Select } from 'antd';
import { CalenderBlueIcon } from '@public/icon';

type SelectDatePickerProps = {
    value: any;
    onChange: (val: any) => void;
    options: { value: any; label: string }[];
};

const SelectDatePicker: React.FC<SelectDatePickerProps> = ({
    value,
    onChange,
    options
}) => {
    const formattedOptions = options.map((opt) => ({
        value: opt.value,
        label: (
            <div className="flex items-center gap-2 text-[#3666AA]">
                <Image src={CalenderBlueIcon} alt="calendar" width={16} height={16} />
                <span>{opt.label}</span>
            </div>
        ),
    }));

    return (
        <div className="flex items-center gap-2">
            <Select
                size="middle"
                value={value}
                className="w-auto !h-10"
                options={formattedOptions}
                onChange={onChange}
            />
        </div>
    );
};

export default SelectDatePicker;
