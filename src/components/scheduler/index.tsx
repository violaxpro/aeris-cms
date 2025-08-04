import React from 'react';
import { Avatar, Space } from 'antd';
import type { TableColumnsType } from 'antd';
import Image from 'next/image';
import { PlusFilledIcon } from '@public/icon';
import Table from '@/components/table'
import { colorMap } from '@/config/colors-status';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const ShiftBox = ({ shift }: { shift: any }) => {
    return (
        <div
            style={{
                background: colorMap[shift.type].box,
                borderLeft: `4px solid ${colorMap[shift.type].border}`,
                borderRadius: 6,
                padding: '6px 10px',
                minWidth: 120,
                flexGrow: 1
            }}
        >
            <div style={{ fontSize: 12, color: '#888' }}>{shift.type}</div>
            <div className='text-md font-medium' style={{ color: colorMap[shift.type].border }}>
                {shift.time}
            </div>
        </div>
    );
};


// Fungsi untuk mengonversi apply_on_days menjadi shift map + colSpan
const mapShiftsToDays = (record: any) => {
    const mapped: Record<string, any> = {};
    const { apply_on_days, type, start_time, end_time } = record;

    for (let i = 0; i < days.length; i++) {
        const day = days[i];

        if (apply_on_days.includes(day)) {
            let colSpan = 1;
            // Hitung span jika hari berikutnya juga termasuk
            while (
                i + colSpan < days.length &&
                apply_on_days.includes(days[i + colSpan])
            ) {
                colSpan++;
            }

            mapped[day] = {
                type,
                time: `${start_time[0]} - ${end_time[0]}`, // gunakan jam pertama
                colSpan,
            };

            // tandai hari setelahnya untuk diskip
            for (let j = 1; j < colSpan; j++) {
                mapped[days[i + j]] = { skip: true };
            }

            i += colSpan - 1; // lewati yang sudah masuk span
        }
    }

    return mapped;
};



const ShiftScheduler = ({ data }: { data: any[] }) => {
    const columns: TableColumnsType<any> = [
        {
            title: 'Employee Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 250,
            render: (_: any, record: any) => (
                <Space>
                    <Avatar src={record.avatar} />
                    <div>
                        <strong>{record.name}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>{record.role}</div>
                    </div>
                </Space>
            ),
        },
        ...days.map((day) => ({
            title: day,
            key: day,
            render: (_: any, record: any) => {
                const shift = record.shiftsMapped[day];

                if (shift?.skip) {
                    return { colSpan: 0 }; // supaya tidak render apapun
                }

                if (shift) {
                    return {
                        children: (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <ShiftBox shift={shift} />
                                {/* <Image
                                    src={PlusFilledIcon}
                                    alt='add-icon'
                                    width={15}
                                /> */}
                            </div>
                        ),
                        colSpan: shift.colSpan || 1,
                    };
                }

                // Default cell kosong tapi tetap tampil
                return {
                    children: (
                        <div style={{ minHeight: 40, display: 'flex' }}>
                            <Image
                                src={PlusFilledIcon}
                                alt='add-icon'
                                width={15}
                            />
                        </div>
                    ),
                    colSpan: 1,
                };
            },
            onCell: (record: any) => {
                const shift = record.shiftsMapped[day];
                if (shift?.skip) return { colSpan: 0 };
                return { colSpan: shift?.colSpan || 1 };
            }

        }))


    ];

    // Mapkan setiap data ke shiftsMapped
    const processedData = data.map((item) => ({
        ...item,
        shiftsMapped: mapShiftsToDays(item),
    }));

    return (
        <Table
            columns={columns}
            dataSource={processedData}
            scroll={{ x: 'max-content' }}
        />
    );
};

export default ShiftScheduler;
