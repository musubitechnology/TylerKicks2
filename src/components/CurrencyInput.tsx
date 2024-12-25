import React from 'react';
import { formatCurrency, parseCurrency } from '../lib/formatters';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  value,
  onChange,
  className = '',
  placeholder = '$0.00',
  disabled = false,
}: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseCurrency(e.target.value);
    if (parsed !== null) {
      onChange(formatCurrency(parsed));
    } else if (!e.target.value) {
      onChange('');
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}