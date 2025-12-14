// Convert time string (HH:MM) to minutes from midnight
export const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Calculate position and height for event blocks
export const getEventStyle = (startTime, endTime) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const duration = endMinutes - startMinutes;

    // Calendar starts at 7 AM (420 minutes from midnight)
    const calendarStart = 7 * 60;
    const offsetMinutes = startMinutes - calendarStart;

    // Each hour is 60px, so each minute is 1px
    const top = offsetMinutes;
    const height = duration;

    return { top: `${top}px`, height: `${height}px` };
};

// Format time for display
export const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Generate time slots for the day (7 AM - 5 PM)
export const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 17; hour++) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        slots.push({
            time: `${hour}:00`,
            display: `${displayHour} ${period}`
        });
    }
    return slots;
};
