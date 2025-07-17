// components/SettingsDrawer.tsx
import React from 'react';
import { Drawer, Button, Space } from 'antd';
import { useTheme } from '@/context/ThemeContext';
import { CloseOutlined } from '@ant-design/icons';

type SettingsDrawerProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const colors = ['Default', 'Blue', 'Black', 'Teal', 'Violet', 'Rose', 'Yellow'];

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, onClose }) => {
    const { mode, setMode, color, setColor } = useTheme();

    return (
        <Drawer
            title="Settings"
            placement="right"
            closable
            closeIcon={<CloseOutlined style={{ color: mode == 'dark' ? '#fff' : '#000' }} />}
            onClose={onClose}
            open={open}
            width={320}
            styles={{
                header: {
                    backgroundColor: mode == 'dark' ? '#001529' : '#fff',
                    color: mode == 'dark' ? '#fff' : '#000'
                },
                body: {
                    backgroundColor: mode == 'dark' ? '#001529' : '#fff',
                    color: mode == 'dark' ? '#fff' : '#000'
                }
            }}
        >
            <div className="mb-6">
                <h4 className="text-base font-semibold mb-3">Appearance</h4>
                <div className="flex gap-4">
                    {['light', 'dark'].map((m) => {
                        const isSelected = mode === m;
                        return (
                            <div
                                key={m}
                                onClick={() => setMode(m as 'light' | 'dark')}
                                className={`
                                    w-16 h-16 rounded-md cursor-pointer transition-all duration-200
                                    flex items-center justify-center text-xs font-medium uppercase
                                    border-2
                                    ${isSelected ? 'border-[var(--primary-color)]' : 'border-gray-300'}
                                `}
                                style={{
                                    backgroundColor: m === 'dark' ? '#1e293b' : '#f1f5f9',
                                    color: m === 'dark' ? '#fff' : '#000'
                                }}
                            >
                                {m}
                            </div>
                        );
                    })}
                </div>
            </div>



            <div className="mb-6">
                <h4 className="text-base font-semibold mb-3">Colors</h4>
                <div className="grid grid-cols-3 gap-4">
                    {colors.map((c) => {
                        const isSelected = (!color && c === 'Default') || (color === c.toLowerCase() && c !== 'Default');
                        const colorMap: Record<string, string> = {
                            Default: '#103654',
                            Blue: '#3b82f6',
                            Black: '#000000',
                            Teal: '#14b8a6',
                            Violet: 'rgb(124, 58, 237)',
                            Rose: 'rgb(225, 29, 72)',
                            Yellow: 'rgb(202, 138, 4)',
                        };

                        return (
                            <div
                                key={c}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() =>
                                    c === 'Default' ? setColor('') : setColor(c.toLowerCase() as any)
                                }
                            >
                                <div
                                    className={`w-12 h-12 rounded-md relative transition-all duration-200`}
                                    style={{
                                        backgroundColor: colorMap[c],
                                        border: isSelected ? '3px solid white' : '2px solid transparent',
                                    }}
                                >
                                    {isSelected && (
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
                                            ✓
                                        </div>
                                    )}
                                </div>
                                <span className="mt-1 text-sm">{c}</span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </Drawer>
    );
};

export default SettingsDrawer;
