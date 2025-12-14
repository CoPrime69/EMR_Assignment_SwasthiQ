from typing import List, Dict, Optional, Any
import json
import os

def load_mock_data():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    mock_data_path = os.path.join(
        base_dir,
        'frontend',
        'src',
        'data',
        'mockData.json'
    )

    if not os.path.exists(mock_data_path):
        raise FileNotFoundError(f"Mock data not found at {mock_data_path}")

    with open(mock_data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    return data['appointments'], data['doctors']

MOCK_APPOINTMENTS, MOCK_DOCTORS = load_mock_data()

def get_appointments(date: str = None, status: str = None) -> List[Dict[str, Any]]:
    """
    Query Function: Retrieves appointments with optional filtering.
    
    This function simulates a GraphQL query that would fetch data from Aurora database
    via AppSync. It accepts optional arguments for filtering by date and status.
    
    Args:
        date (str, optional): Filter appointments by date (format: YYYY-MM-DD)
        status (str, optional): Filter appointments by status 
                              (Confirmed, Scheduled, Upcoming, Cancelled)
    
    Returns:
        List[Dict[str, Any]]: Filtered list of appointment dictionaries
    
    GraphQL Query Structure:
        query GetAppointments($date: String, $status: String) {
            getAppointments(date: $date, status: $status) {
                id
                name
                date
                time
                duration
                doctorName
                status
                mode
            }
        }
    """
    # Start with all mock appointments (simulating Aurora fetch)
    filtered_appointments = MOCK_APPOINTMENTS.copy()
    
    # Apply date filter if provided
    if date is not None:
        filtered_appointments = [
            apt for apt in filtered_appointments 
            if apt["date"] == date
        ]
    
    # Apply status filter if provided
    if status is not None:
        filtered_appointments = [
            apt for apt in filtered_appointments 
            if apt["status"] == status
        ]
    
    return filtered_appointments


def update_appointment_status(id: str, new_status: str) -> Optional[Dict[str, Any]]:
    """
    Mutation Function: Updates the status of an appointment.
    
    This function simulates a GraphQL mutation that would update the appointment status
    in the Aurora database via AppSync.
    
    Args:
        id (str): The unique identifier of the appointment to update
        new_status (str): The new status value (Confirmed, Scheduled, Upcoming, Cancelled)
    
    Returns:
        Dict[str, Any]: The updated appointment object with new status, or None if invalid
    
    GraphQL Mutation Structure:
        mutation UpdateAppointmentStatus($id: ID!, $newStatus: String!) {
            updateAppointmentStatus(id: $id, newStatus: $newStatus) {
                id
                name
                date
                time
                duration
                doctorName
                status
                mode
            }
        }
    """
    # Validate status value
    valid_statuses = ["Confirmed", "Scheduled", "Upcoming", "Cancelled"]
    if new_status not in valid_statuses:
        return None
    
    # Find the appointment by id
    appointment = None
    for apt in MOCK_APPOINTMENTS:
        if apt["id"] == id:
            appointment = apt
            break
    
    if appointment is None:
        return None
    
    # AURORA TRANSACTIONAL WRITE:
    # In production, this update would be executed within a PostgreSQL transaction:
    # BEGIN TRANSACTION;
    # UPDATE appointments SET status = new_status, updated_at = CURRENT_TIMESTAMP WHERE id = id;
    # COMMIT;
    # If any error occurs, ROLLBACK TRANSACTION ensures data consistency.
    appointment["status"] = new_status
    
    # APPSYNC SUBSCRIPTION TRIGGER:
    # After the successful database update, AppSync automatically publishes this change
    # to all subscribed clients via the onAppointmentUpdate subscription.
    # Clients receive real-time notification with the updated appointment data.
    print(f"[SIMULATED] AppSync Subscription triggered for appointment {id}")
    print(f"[SIMULATED] Aurora transactional write completed for appointment {id}")
    
    return appointment


# Additional helper function for demonstration
def get_appointment_by_id(id: str) -> Optional[Dict[str, Any]]:
    """
    Helper function to retrieve a single appointment by ID.
    
    Args:
        id (str): The unique identifier of the appointment
    
    Returns:
        Optional[Dict[str, Any]]: The appointment object if found, None otherwise
    """
    for apt in MOCK_APPOINTMENTS:
        if apt["id"] == id:
            return apt
    return None


# Example usage and testing
if __name__ == "__main__":
    print("=" * 80)
    print("Appointment Scheduling & Queue Management Microservice Demo")
    print("=" * 80)
    
    # Test 1: Get all appointments
    print("\n1. Get all appointments:")
    all_appointments = get_appointments()
    print(f"Total appointments: {len(all_appointments)}")
    
    # Test 2: Filter by date
    print("\n2. Get appointments for 2025-12-15:")
    date_filtered = get_appointments(date="2025-12-15")
    for apt in date_filtered:
        print(f"  - {apt['name']} at {apt['time']} with {apt['doctorName']} ({apt['status']})")
    
    # Test 3: Filter by status
    print("\n3. Get all Confirmed appointments:")
    confirmed = get_appointments(status="Confirmed")
    for apt in confirmed:
        print(f"  - {apt['name']} on {apt['date']} ({apt['mode']})")
    
    # Test 4: Filter by both date and status
    print("\n4. Get Confirmed appointments for 2025-12-15:")
    filtered = get_appointments(date="2025-12-15", status="Confirmed")
    for apt in filtered:
        print(f"  - {apt['name']} at {apt['time']} with {apt['doctorName']}")
    
    # Test 5: Update appointment status
    print("\n5. Update appointment status:")
    print(f"  Before: {get_appointment_by_id('apt-002')['status']}")
    updated = update_appointment_status("apt-002", "Confirmed")
    print(f"  After: {updated['status']}")
    
    # Test 6: Error handling - invalid status
    print("\n6. Test error handling (invalid status):")
    try:
        update_appointment_status("apt-001", "InvalidStatus")
    except ValueError as e:
        print(f"  Error caught: {e}")
    
    # Test 7: Error handling - invalid id
    print("\n7. Test error handling (invalid id):")
    try:
        update_appointment_status("apt-999", "Confirmed")
    except ValueError as e:
        print(f"  Error caught: {e}")
    
    print("\n" + "=" * 80)
    print("Demo completed successfully!")
    print("=" * 80)
    # Test 6: Error handling - invalid status
    print("\n6. Test error handling (invalid status):")
    result = update_appointment_status("apt-001", "InvalidStatus")
    if result is None:
        print(f"  Invalid status rejected (returned None)")
    
    # Test 7: Error handling - invalid id
    print("\n7. Test error handling (invalid id):")
    result = update_appointment_status("apt-999", "Confirmed")
    if result is None:
        print(f"  Invalid ID rejected (returned None)")