import React from 'react';
import { getEventStyle } from '../../utils/calendarUtils';

export const EventBlock = ({ event, onClick }) => {
    // Calculate end time properly from start time + duration
    const [hours, minutes] = event.time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + event.duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;

    const style = getEventStyle(event.time, endTime);

    // Assign colors based on status
    const getEventColor = () => {
        switch (event.status) {
            case 'Confirmed':
                return 'bg-green-500';
            case 'Scheduled':
                return 'bg-blue-500';
            case 'Upcoming':
                return 'bg-purple-500';
            case 'Cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            onClick={() => onClick(event)}
            style={{
                position: 'absolute',
                top: style.top,
                height: style.height,
                left: '80px',
                right: '0',
                zIndex: 1
            }}
            className={`${getEventColor()} rounded-lg p-3 text-white cursor-pointer hover:opacity-90 transition-opacity shadow-sm flex flex-col justify-center`}
        >
            <div className="font-medium text-sm">{event.reason}</div>
            <div className="text-xs opacity-90 mt-0.5">{event.name}</div>
        </div>
    );
};
