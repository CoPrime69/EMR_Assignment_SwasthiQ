# EMR_Assignment_SwasthiQ

## Overview

This project implements a functional **Appointment Scheduling & Queue Management** feature as part of the SDE Intern assignment.
It includes a **Python-based backend service** and a **React + Tailwind frontend**, wired together to simulate a real-world AppSync + Aurora workflow.

The focus is on **data contracts, filtering logic, mutations, and frontend integration**, not on deploying real infrastructure.

---

## Architecture 

```
React UI
  ↓
appointmentService.js (JS service layer)
  ↓
Python backend logic
  ↓
JSON mock data
```

This mirrors a real production flow:

```
React → AppSync → Lambda (Python) → Aurora PostgreSQL
```

---

## Backend (Python)

### What it does

* Maintains 10+ mock appointments
* Supports:

  * Fetching appointments (`get_appointments`)
  * Updating appointment status (`update_appointment_status`)

### Query (Simulated GraphQL)

```graphql
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
```

### Mutation (Simulated GraphQL)

```graphql
mutation UpdateAppointmentStatus($id: ID!, $newStatus: String!) {
  updateAppointmentStatus(id: $id, newStatus: $newStatus) {
    id
    status
  }
}
```

The code clearly documents where **Aurora transactions** and **AppSync subscriptions** would occur in production.

---

## Frontend (React)

### Features

* Calendar-based date filtering
* Tabs: Upcoming / Today / Past / All
* Search by patient or doctor
* Status updates with instant UI refresh
* Calendar day timeline view

State is refreshed after every mutation to **simulate real-time updates**.

---

## Design Decisions

### Why JSON instead of PostgreSQL?

* The assignment requires PostgreSQL to be **simulated**
* JSON keeps the project:

  * Easy to run
  * Reviewer-friendly
  * Focused on logic, not setup
* Filtering and updates behave exactly like SQL queries and transactions
* Code comments clearly explain how this maps to Aurora in production

---

### Why `appointmentService.js` exists?

Frontend JavaScript cannot directly call Python.

So `appointmentService.js`:

* Acts as a **service abstraction**
* Simulates how React would call a backend API
* Keeps UI components clean and backend-agnostic
* Makes it easy to later replace with real GraphQL or REST calls

This mirrors the **Lambda boundary** in real systems.

---

## File Structure

```
backend/
├── appointment_service.py

frontend/
├── src/
│   ├── components/
│   ├── calendar/
│   ├── services/
│   │   └── appointmentService.js
│   ├── data/mockData.json
│   └── EMR_Frontend_Assignment.jsx
```

---

## Assignment Checklist

✅ 10+ mock appointments
✅ Query & mutation implemented
✅ Filtering and status updates work
✅ AppSync & Aurora behavior explained
✅ Frontend fully integrated


