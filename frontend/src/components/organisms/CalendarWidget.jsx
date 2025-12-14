import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay, StatusLegend } from '../molecules';

export const CalendarWidget = ({ selectedDate, onDateSelect, appointments }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const getAppointmentDates = () => {
        const dates = new Set();
        appointments.forEach(apt => {
            dates.add(apt.date);
        });
        return dates;
    };

    const hasAppointmentsOnDay = (day) => {
        if (!day) return false;
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return getAppointmentDates().has(dateStr);
    };

    const isToday = (day) => {
        if (!day) return false;
        const today = new Date();
        return day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear();
    };

    const isSelected = (day) => {
        if (!day || !selectedDate) return false;
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return dateStr === selectedDate;
    };

    const handleDayClick = (day) => {
        if (!day) return;
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onDateSelect(dateStr);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const days = getDaysInMonth(currentMonth);

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-xs font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, i) => (
                    <CalendarDay
                        key={i}
                        day={day}
                        isToday={isToday(day)}
                        isSelected={isSelected(day)}
                        hasAppointments={hasAppointmentsOnDay(day)}
                        onClick={handleDayClick}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex gap-4">
                <StatusLegend color="bg-gray-900" label="Today" />
                <StatusLegend color="bg-blue-500" label="Has appointments" />
            </div>
        </div>
    );
};
