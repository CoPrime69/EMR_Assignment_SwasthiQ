import React from 'react';

export const Tab = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`
            px-4 py-2 text-sm font-medium rounded-full transition-all
            ${isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }
        `}
    >
        {label}
    </button>
);
