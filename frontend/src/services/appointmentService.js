import mockData from '../data/mockData.json';

/**
 * Backend Integration Layer
 * Simulates Python backend appointment_service.py
 * 
 * In production, these would be API calls to the Python backend
 * Backend provides:
 * - get_appointments(date: str | None, status: str | None) -> List[Dict]
 * - update_appointment_status(id: str, new_status: str) -> Dict | None
 */

export const get_appointments = (date = null, status = null) => {
    console.log(`[SIMULATED IMPORT] backend/appointment_service.py::get_appointments(date=${date}, status=${status})`);

    // In production, this would be fetched via API call to the Python backend
    let filtered = mockData.appointments;

    if (date !== null) {
        filtered = filtered.filter(apt => apt.date === date);
    }

    if (status !== null) {
        filtered = filtered.filter(apt => apt.status === status);
    }

    return filtered;
};

export const update_appointment_status = (id, new_status) => {
    console.log(`[SIMULATED IMPORT] backend/appointment_service.py::update_appointment_status(id=${id}, new_status=${new_status})`);
    console.log(`[SIMULATED] AppSync Subscription triggered for appointment ${id}`);
    console.log(`[SIMULATED] Aurora transactional write completed for appointment ${id}`);

    // In production, this would update the Python backend and return the updated appointment
    return { id, status: new_status };
};
