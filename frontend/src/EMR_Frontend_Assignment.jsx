import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Users, Search, Download, Plus, Check, X } from 'lucide-react';
import { Button, Input, Select } from './components/atoms';
import { StatCard, Tab } from './components/molecules';
import { CalendarWidget, AppointmentCard } from './components/organisms';
import { CalendarHeader, TimeSlot, EventBlock, EventPanel } from './components/calendar';
import { generateTimeSlots } from './utils/calendarUtils';
import { get_appointments, update_appointment_status } from './services/appointmentService';

// ============================================================================
// CALENDAR DAY VIEW
// ============================================================================

const CalendarDayView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const timeSlots = generateTimeSlots();

    useEffect(() => {
        // Fetch appointments for the current date
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        const fetchedAppointments = get_appointments(dateStr, null);
        setAppointments(fetchedAppointments);
    }, [currentDate]);

    const handlePrevDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        setCurrentDate(newDate);
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setIsPanelOpen(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsPanelOpen(true);
    };

    const handleSaveEvent = (formData) => {
        console.log('Saving event:', formData);
        setIsPanelOpen(false);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setSelectedEvent(null);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <CalendarHeader
                currentDate={currentDate}
                onPrevDay={handlePrevDay}
                onNextDay={handleNextDay}
                onToday={handleToday}
                onCreateEvent={handleCreateEvent}
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Main Calendar Area */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="px-6 py-4">
                        <div className="text-xs text-gray-500 mb-2">GMT+05:30</div>

                        {/* Timeline Container */}
                        <div className="relative">
                            {/* Time slots */}
                            {timeSlots.map((slot) => (
                                <TimeSlot key={slot.time} time={slot.display} />
                            ))}

                            {/* Event blocks */}
                            {appointments.map((event) => (
                                <EventBlock
                                    key={event.id}
                                    event={event}
                                    onClick={handleEventClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Event Panel */}
                <EventPanel
                    isOpen={isPanelOpen}
                    onClose={handleClosePanel}
                    event={selectedEvent}
                    onSave={handleSaveEvent}
                />
            </div>
        </div>
    );
};

// ============================================================================
// APPOINTMENT MANAGEMENT VIEW
// ============================================================================

const AppointmentManagementView = () => {
    // State Management
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [doctorFilter, setDoctorFilter] = useState('');

    useEffect(() => {
        const data = get_appointments(null, null);
        setAppointments(data);
    }, []);

    useEffect(() => {
        let dateFilter = null;
        let statusFilterParam = statusFilter || null;

        const today = new Date().toISOString().slice(0, 10);

        if (activeTab === 'today') {
            dateFilter = today;
        } else if (selectedDate) {
            dateFilter = selectedDate;
        }

        let filtered = get_appointments(dateFilter, statusFilterParam);

        if (activeTab === 'upcoming') {
            filtered = filtered.filter(apt => apt.date > today);
        } else if (activeTab === 'past') {
            filtered = filtered.filter(apt => apt.date < today);
        }

        if (doctorFilter) {
            filtered = filtered.filter(apt => apt.doctorName === doctorFilter);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(apt =>
                apt.name.toLowerCase().includes(query) ||
                apt.doctorName.toLowerCase().includes(query)
            );
        }

        setFilteredAppointments(filtered);
    }, [appointments, activeTab, selectedDate, statusFilter, doctorFilter, searchQuery]);

    // Calculate dashboard stats
    const today = new Date().toISOString().slice(0, 10);
    const stats = {
        today: appointments.filter(apt => apt.date === today).length,
        confirmed: appointments.filter(apt => apt.status === 'Confirmed').length,
        upcoming: appointments.filter(apt => apt.date > today).length,
        virtual: appointments.filter(apt => apt.mode === 'Virtual').length,
    };

    // Get unique doctors for filter dropdown
    const doctors = [...new Set(appointments.map(apt => apt.doctorName))];

    // Handlers
    const handleDateSelect = (date) => {
        setSelectedDate(date === selectedDate ? null : date);
    };

    const handleStatusUpdate = (id, newStatus) => {
        update_appointment_status(id, newStatus);
        const data = get_appointments(null, null);
        setAppointments(data);
    };

    const handleEdit = (appointment) => {
        alert(`Edit functionality for ${appointment.name}!`);
    };

    const handleDelete = (appointment) => {
        if (confirm(`Are you sure you want to delete appointment for ${appointment.name}?`)) {
            alert(`Delete functionality!`);
        }
    };

    const handleNewAppointment = () => {
        alert('New Appointment!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
                        <p className="text-gray-600 text-sm mt-1">Schedule and manage patient appointments</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" icon={Download}>
                            Export
                        </Button>
                        <Button variant="primary" icon={Plus} onClick={handleNewAppointment}>
                            New Appointment
                        </Button>
                    </div>
                </div>
            </header>

            {/* Stats Dashboard */}
            <div className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Calendar}
                        title="Today"
                        count={stats.today}
                        variant="default"
                        iconBg="bg-blue-500"
                    />
                    <StatCard
                        icon={Check}
                        title="Confirmed"
                        count={stats.confirmed}
                        variant="confirmed"
                        iconBg="bg-green-500"
                    />
                    <StatCard
                        icon={Clock}
                        title="Upcoming"
                        count={stats.upcoming}
                        variant="upcoming"
                        iconBg="bg-purple-500"
                    />
                    <StatCard
                        icon={Video}
                        title="Virtual"
                        count={stats.virtual}
                        variant="virtual"
                        iconBg="bg-pink-500"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar - Calendar */}
                    <div className="lg:col-span-1">
                        <CalendarWidget
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                            appointments={appointments}
                        />
                    </div>

                    {/* Right Content - Appointments List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            {/* Tabs */}
                            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-6">
                                <Tab
                                    label="Upcoming"
                                    isActive={activeTab === 'upcoming'}
                                    onClick={() => setActiveTab('upcoming')}
                                />
                                <Tab
                                    label="Today"
                                    isActive={activeTab === 'today'}
                                    onClick={() => setActiveTab('today')}
                                />
                                <Tab
                                    label="Past"
                                    isActive={activeTab === 'past'}
                                    onClick={() => setActiveTab('past')}
                                />
                                <Tab
                                    label="All"
                                    isActive={activeTab === 'all'}
                                    onClick={() => setActiveTab('all')}
                                />
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Input
                                    placeholder="Search appointments..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    icon={Search}
                                />
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    options={[
                                        { value: 'Confirmed', label: 'Confirmed' },
                                        { value: 'Scheduled', label: 'Scheduled' },
                                        { value: 'Upcoming', label: 'Upcoming' },
                                        { value: 'Cancelled', label: 'Cancelled' }
                                    ]}
                                    placeholder="All Status"
                                />
                                <Select
                                    value={doctorFilter}
                                    onChange={(e) => setDoctorFilter(e.target.value)}
                                    options={doctors.map(doc => ({ value: doc, label: doc }))}
                                    placeholder="All Doctors"
                                />
                            </div>

                            {/* Appointments List */}
                            <div className="space-y-4">
                                {filteredAppointments.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                                        <p className="text-gray-500">Try adjusting your filters or create a new appointment</p>
                                    </div>
                                ) : (
                                    filteredAppointments.map(appointment => (
                                        <AppointmentCard
                                            key={appointment.id}
                                            appointment={appointment}
                                            onStatusUpdate={handleStatusUpdate}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// MAIN APP COMPONENT WITH ROUTING
// ============================================================================

const EMRApp = ({ currentView = 'appointments' }) => {
    return (
        <>
            {currentView === 'appointments' && <AppointmentManagementView />}
            {currentView === 'calendar' && <CalendarDayView />}
        </>
    );
};

export default EMRApp;
