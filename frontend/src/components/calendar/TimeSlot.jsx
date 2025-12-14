import React from 'react';

export const TimeSlot = ({ time }) => (
    <div className="flex h-[60px] border-b border-gray-100">
        <div className="w-20 flex-shrink-0 pr-4 pt-2">
            <span className="text-xs text-gray-500">{time}</span>
        </div>
        <div className="flex-1 relative"></div>
    </div>
);
