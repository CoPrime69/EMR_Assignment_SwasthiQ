import React from 'react';
import { Calendar, Search, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../atoms';

export const CalendarHeader = ({ currentDate, onPrevDay, onNextDay, onToday, onCreateEvent }) => {
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Calendar className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Calendar</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" onClick={onToday}>
                            Today
                        </Button>
                        <button
                            onClick={onPrevDay}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft size={20} className="text-gray-600" />
                        </button>
                        <button
                            onClick={onNextDay}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronRight size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <span className="text-gray-700 font-medium">{formatDate(currentDate)}</span>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Search size={20} className="text-gray-600" />
                    </button>

                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                    </select>

                    <Button variant="primary" size="md" icon={Plus} onClick={onCreateEvent}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
};
