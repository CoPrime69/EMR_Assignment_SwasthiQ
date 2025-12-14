import React from 'react';

export const Icon = ({ children, className = "" }) => (
    <div className={`flex items-center justify-center ${className}`}>
        {children}
    </div>
);
