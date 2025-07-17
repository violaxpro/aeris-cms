import React from 'react';
import { Switch } from 'antd';

type SwitchInputProps = {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'default' | 'small';
};

const SwitchInput: React.FC<SwitchInputProps> = ({
    label,
    checked,
    onChange,
    disabled = false,
    size = 'default',
}) => {
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                size={size}
            />
            {label && <label className="text-sm">{label}</label>}
        </div>
    );
};

export default SwitchInput;
