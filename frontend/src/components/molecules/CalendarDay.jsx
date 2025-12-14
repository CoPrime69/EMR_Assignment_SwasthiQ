import React from 'react';

export const CalendarDay = ({ day, isToday, isSelected, hasAppointments, onClick }) => {
    if (!day) return <div className="aspect-square" />;

    return (
        <button
            onClick={() => onClick(day)}
            className={`aspect-square w-full rounded-lg text-sm font-medium transition-all ${isToday ? 'bg-gray-900 text-white' : ''
                } ${isSelected && !isToday ? 'bg-blue-500 text-white' : ''} ${!isToday && !isSelected ? 'hover:bg-gray-100 text-gray-700' : ''
                } ${hasAppointments && !isToday && !isSelected ? 'font-bold' : ''}`}
        >
            {day}
            {hasAppointments && !isToday && !isSelected && (
                <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1" />
            )}
        </button>
    );
};
