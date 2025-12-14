import React from 'react';
import { Badge } from '../atoms';

export const StatCard = ({ icon: IconComponent, title, count, variant, iconBg }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
            <div className={`${iconBg} p-3 rounded-lg`}>
                <IconComponent className="text-white" size={24} />
            </div>
            <Badge variant={variant}>{title}</Badge>
        </div>
        <div className="text-3xl font-bold text-gray-900">{count}</div>
        <div className="text-sm text-gray-500 mt-1">{title}</div>
    </div>
);
