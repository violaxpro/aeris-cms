// components/SettingsDrawer.tsx
import React from 'react';
import { Drawer, Button, Space } from 'antd';
import { useTheme } from '@/context/ThemeContext';

type SettingsDrawerProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const colors = ['Blue', 'Black', 'Teal', 'Violet', 'Rose', 'Yellow'];

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, onClose }) => {
    const { mode, setMode, color, setColor } = useTheme();

    return (
        <Drawer
            title="Settings"
            placement="right"
            closable
            onClose={onClose}
            open={open}
            width={320}
        >
            <div className="mb-6">
                <h4 className="text-base font-semibold mb-3">Appearance</h4>
                <div className="flex gap-2">
                    <Button
                        type={mode === 'light' ? 'primary' : 'default'}
                        onClick={() => setMode('light')}
                    >
                        Light
                    </Button>
                    <Button
                        type={mode === 'dark' ? 'primary' : 'default'}
                        onClick={() => setMode('dark')}
                    >
                        Dark
                    </Button>
                </div>
            </div>


            <div className="mb-6">
                <h4 className="text-base font-semibold mb-3">Colors</h4>
                <div className="flex flex-wrap gap-2">
                    {colors.map(c => (
                        <Button
                            key={c}
                            type={color === c.toLowerCase() ? 'primary' : 'default'}
                            onClick={() => setColor(c.toLowerCase() as any)}
                        >
                            {c}
                        </Button>
                    ))}
                </div>
            </div>

            {/* <Button type="primary" block className="mt-4">
        🔥 Purchase for $24
      </Button> */}
        </Drawer>
    );
};

export default SettingsDrawer;
