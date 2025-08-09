import React from 'react';
import { Checkbox, TimePicker } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { CopyIcon } from '@public/icon';

type DayOption = {
    label: string;
    value: string;
};

type TimeRange = {
    start: string;
    end: string;
};

type CheckboxGroupProps = {
    options: DayOption[];
    value?: string[]; // checked days
    times?: Record<string, TimeRange[]>; // jam per hari
    onChangeDays?: (checkedValues: string[]) => void;
    onChangeTimes?: (dayValue: string, idx: number, field: 'start' | 'end', val: string) => void;
    label?: string;
    required?: boolean;
    format?: any
};

const CheckboxGroupWithTime: React.FC<CheckboxGroupProps> = ({
    options,
    value = [],
    times = {},
    onChangeDays,
    onChangeTimes,
    label,
    required,
    format = 'h:mma'
}) => {
    const handleCheck = (dayValue: string, checked: boolean) => {
        if (checked) {
            onChangeDays?.([...value, dayValue]);
        } else {
            onChangeDays?.(value.filter(v => v !== dayValue));
        }
    };

    const defaultTimes: Record<string, { start: string; end: string }[]> = {
        monday: [
            { start: '8:00am', end: '12:00pm' },
            { start: '1:00pm', end: '4:00pm' },
        ],
        tuesday: [
            { start: '8:00am', end: '12:00pm' },
            { start: '1:00pm', end: '4:00pm' },
        ],
        wednesday: [
            { start: '8:00am', end: '12:00pm' },
            { start: '1:00pm', end: '4:00pm' },
        ],
        thursday: [
            { start: '8:00am', end: '12:00pm' },
            { start: '1:00pm', end: '4:00pm' },
        ],
        friday: [
            { start: '8:00am', end: '11:45am' },
            { start: '1:15pm', end: '4:00pm' },
        ],
        saturday: [
            { start: '8:00am', end: '12:00pm' },
            { start: '1:00pm', end: '2:00pm' },
        ],
        sunday: [
            { start: '', end: '' },
            { start: '', end: '' },
        ],
    };

    const handleCopy = (dayValue: string) => {
        // contoh: copy text ke clipboard
        navigator.clipboard.writeText(`Data untuk ${dayValue}`)
        console.log(`Copied: ${dayValue}`)
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 col-span-3">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {options.map(day => (
                <div key={day.value} className="flex flex-col">
                    <div className="flex justify-between items-center w-full">
                        <Checkbox
                            checked={value.includes(day.value)}
                            onChange={e => handleCheck(day.value, e.target.checked)}
                        >
                            {day.label}
                        </Checkbox>
                        <Image
                            src={CopyIcon}
                            alt="copy-paste"
                            width={16}
                            height={16}
                            onClick={e => {
                                e.stopPropagation() // supaya klik icon tidak check/uncheck
                                handleCopy(day.value)
                            }}
                            className="cursor-pointer"
                        />
                    </div>


                    {/* TimePicker SELALU render */}
                    <div className="mt-1 flex flex-col gap-1">
                        {(times[day.value] && times[day.value].length > 0
                            ? times[day.value]
                            : defaultTimes[day.value.toLowerCase()] || [{ start: '', end: '' }, { start: '', end: '' }]
                        ).map((time, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <TimePicker
                                    format={format}
                                    value={time.start ? dayjs(time.start, format) : null}
                                    onChange={(t) =>
                                        onChangeTimes?.(day.value, idx, 'start', t ? t.format(format) : '')
                                    }
                                    suffixIcon={null}
                                    allowClear={false}
                                />
                                <span>-</span>
                                <TimePicker
                                    format={format}
                                    value={time.end ? dayjs(time.end, format) : null}
                                    onChange={(t) =>
                                        onChangeTimes?.(day.value, idx, 'end', t ? t.format(format) : '')
                                    }
                                    suffixIcon={null}
                                    allowClear={false}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default CheckboxGroupWithTime;
