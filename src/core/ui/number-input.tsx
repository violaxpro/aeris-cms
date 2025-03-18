import React from 'react';
import { Input, NumberInput } from 'rizzui';

interface CNumberInputProps {
  error?: string;
  label: string;
  placeholder?: string;
  prefix?: string;
  type?: 'text' | 'tel' | 'password' | undefined;
  formatType?: 'pattern' | 'numeric' | 'custom';
  value: 'string' | number | 'null';
  onChange: (value: number | null) => void;
  helperText?: string;
}

export default function CNumberInput({
  error,
  label,
  placeholder,
  prefix,
  type,
  onChange,
  formatType = 'numeric',
  helperText,
  ...rest
}: CNumberInputProps) {
  return (
    <NumberInput
      {...rest}
      {...{ label, placeholder, prefix, type, error, helperText }}
      formatType={formatType}
      thousandSeparator=","
      onValueChange={(value) => onChange(value.floatValue ?? null)}
      customInput={Input as React.ComponentType<unknown>}
      prefix={prefix}
    />
  );
}
