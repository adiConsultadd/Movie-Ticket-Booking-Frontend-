import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const id = props.id || props.name;
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  return (
    <div className={`mb-4 ${widthClass}`}>
      {label && (
        <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
    )}
    <input
      id={id}
      className={`input ${errorClass} ${className}`}
      {...props}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);
};

export default Input;
