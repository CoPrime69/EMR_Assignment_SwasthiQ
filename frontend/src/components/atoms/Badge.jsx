import React from 'react';

export const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
        confirmed: "bg-green-100 text-green-700 border-green-200",
        scheduled: "bg-blue-100 text-blue-700 border-blue-200",
        upcoming: "bg-purple-100 text-purple-700 border-purple-200",
        cancelled: "bg-red-100 text-red-700 border-red-200",
        virtual: "bg-pink-100 text-pink-700 border-pink-200",
        default: "bg-gray-100 text-gray-700 border-gray-200"
    };

    return (
        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${variants[variant] || variants.default} ${className}`}>
            {children}
        </span>
    );
};
