import React from 'react';

export const Button = ({ children, onClick, variant = "primary", size = "md", className = "", icon: IconComponent }) => {
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        success: "bg-green-500 hover:bg-green-600 text-white"
    };

    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <button
            onClick={onClick}
            className={`rounded-lg font-medium transition-colors flex items-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {IconComponent && <IconComponent size={16} />}
            {children}
        </button>
    );
};
