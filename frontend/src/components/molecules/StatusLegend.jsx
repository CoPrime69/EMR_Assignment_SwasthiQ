import React from 'react';

export const StatusLegend = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-xs text-gray-600">{label}</span>
    </div>
);
