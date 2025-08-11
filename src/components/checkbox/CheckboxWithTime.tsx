import React from 'react';
import { Checkbox, TimePicker } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { BlockIcon, AddOutlineIcon, CopyIcon } from '@public/icon';
import { defaultTimes } from '@/plugins/utils/utils';

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
    onChangeAllTimes?: (dayValue: string, newTimes: TimeRange[]) => void;
};

const CheckboxGroupWithTime: React.FC<CheckboxGroupProps> = ({
    options,
    value = [],
    times = {},
    onChangeDays,
    onChangeTimes,
    label,
    required,
    format = 'h:mma',
    onChangeAllTimes
}) => {
    const handleCheck = (dayValue: string, checked: boolean) => {
        if (checked) {
            onChangeDays?.([...value, dayValue]);
        } else {
            onChangeDays?.(value.filter(v => v !== dayValue));
        }
    };

    const handleAddTime = (dayValue: string) => {
        const defaults = defaultTimes[dayValue.toLowerCase()] || [];
        const currentTimes = times[dayValue] && times[dayValue].length > 0
            ? [...times[dayValue]]
            : [];

        let newTime = { start: '', end: '' };

        // kalau masih ada default yang belum dipakai, ambil sesuai urutan
        if (defaults[currentTimes.length]) {
            newTime = defaults[currentTimes.length];
        }

        currentTimes.push(newTime);

        // onChangeDays?.([...new Set([...value, dayValue])]);
        onChangeAllTimes?.(dayValue, currentTimes);
    };

    const handleDeleteTime = (dayValue: string, idx: number) => {
        const currentTimes = [...(times[dayValue] || [])];
        currentTimes.splice(idx, 1);
        onChangeAllTimes?.(dayValue, currentTimes);
    };

    console.log(times)


    const handleCopy = (dayValue: string) => {
        if (!defaultTimes[dayValue.toLowerCase()]) return;
        const text = defaultTimes[dayValue.toLowerCase()]
            .map(t => `${t.start} - ${t.end}`)
            .join('\n');
        navigator.clipboard.writeText(text);
        alert(`Copied: ${text}`);
    };


    return (
        <div className="grid grid-cols-2 gap-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 col-span-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {options.map(day => {
                const currentTimes =
                    times[day.value] === undefined
                        ? (defaultTimes[day.value.toLowerCase()] || []) // awal → default
                        : times[day.value]; // kalau sudah ada → pakai data
                return (
                    <div key={day.value} className="flex flex-col w-full items-start">
                        <div className="grid grid-cols-[60px_1fr]  w-full">
                            <div className='mt-2'>
                                <Checkbox
                                    checked={value.includes(day.value)}
                                    onChange={e => handleCheck(day.value, e.target.checked)}
                                >
                                    {day.label.slice(0, 3)}
                                </Checkbox>
                            </div>

                            {/* TimePicker SELALU render */}
                            <div className="mt-1 flex flex-col gap-1 w-55">
                                {currentTimes.length === 0 ? (
                                    // Kalau kosong → cuma tombol Add
                                    <div className="flex items-center justify-end gap-2 mt-1">
                                        <Image
                                            src={AddOutlineIcon}
                                            alt="add-icon"
                                            width={15}
                                            height={15}
                                            className="cursor-pointer"
                                            onClick={() => handleAddTime(day.value)}
                                        />
                                    </div>
                                ) : (
                                    // Kalau ada isi → render semua times
                                    currentTimes.map((time, idx) => (
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
                                            <div className="flex gap-2  w-30">
                                                <Image
                                                    src={BlockIcon}
                                                    alt="delete-icon"
                                                    width={15}
                                                    height={15}
                                                    className="cursor-pointer"
                                                    onClick={() => handleDeleteTime(day.value, idx)}
                                                />
                                                {idx === 0 && (
                                                    <>
                                                        <Image
                                                            src={AddOutlineIcon}
                                                            alt="add-icon"
                                                            width={15}
                                                            height={15}
                                                            className="cursor-pointer"
                                                            onClick={() => handleAddTime(day.value)}
                                                        />
                                                        <Image
                                                            src={CopyIcon}
                                                            alt="copy-paste"
                                                            width={15}
                                                            height={15}
                                                            className="cursor-pointer"
                                                            onClick={() => handleCopy(day.value)}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default CheckboxGroupWithTime;
