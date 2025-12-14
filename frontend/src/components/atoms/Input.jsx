import React from 'react';

export const Input = ({ placeholder, value, onChange, icon: IconComponent, className = "", label, type = "text" }) => (
    <div className={`${label ? 'space-y-2' : ''} ${className}`}>
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
            {IconComponent && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <IconComponent size={18} />
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${IconComponent ? 'pl-10' : ''}`}
            />
        </div>
    </div>
);
