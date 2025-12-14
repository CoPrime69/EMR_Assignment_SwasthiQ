import React from 'react';

export const Select = ({ value, onChange, options, placeholder, className = "" }) => (
    <select
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${className}`}
    >
        <option value="">{placeholder}</option>
        {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
    </select>
);
