# EMR Frontend - Refactored Structure

## Overview

This refactored structure organizes the EMR appointment management system into a clean, modular architecture following the Atomic Design pattern.

## Directory Structure

```
swasthiq/
├── shared/
│   └── mockData.json                    # Unified mock data (appointments & doctors)
│
├── backend/
│   └── appointment_service.py           # Backend service (loads from mockData.json)
│
└── frontend/
    └── src/
        ├── components/
        │   ├── atoms/                   # Basic building blocks
        │   │   ├── Badge.jsx
        │   │   ├── Button.jsx
        │   │   ├── Icon.jsx
        │   │   ├── Input.jsx
        │   │   ├── Select.jsx
        │   │   └── index.js
        │   │
        │   ├── molecules/               # Simple component combinations
        │   │   ├── CalendarDay.jsx
        │   │   ├── StatCard.jsx
        │   │   ├── StatusLegend.jsx
        │   │   ├── Tab.jsx
        │   │   └── index.js
        │   │
        │   ├── organisms/               # Complex UI sections
        │   │   ├── AppointmentCard.jsx
        │   │   ├── CalendarWidget.jsx
        │   │   └── index.js
        │   │
        │   └── calendar/                # Calendar-specific components
        │       ├── CalendarHeader.jsx
        │       ├── EventBlock.jsx
        │       ├── EventPanel.jsx
        │       ├── TimeSlot.jsx
        │       └── index.js
        │
        ├── services/
        │   └── appointmentService.js    # Backend integration layer
        │
        ├── utils/
        │   └── calendarUtils.js         # Calendar utility functions
        │
        ├── EMR_Frontend_Assignment_Refactored.jsx  # Main application
        └── index.js                     # Entry point
```

## Component Architecture

### Atomic Design Pattern

**Atoms** - Basic UI elements:

- Badge: Status indicators
- Button: Interactive buttons with variants
- Icon: Icon wrapper
- Input: Form inputs with icons
- Select: Dropdown selects

**Molecules** - Simple combinations:

- CalendarDay: Individual calendar day cell
- StatCard: Dashboard metric cards
- StatusLegend: Legend items for calendar
- Tab: Navigation tabs

**Organisms** - Complex sections:

- AppointmentCard: Full appointment display with actions
- CalendarWidget: Month calendar with date selection

**Calendar Components** - Specialized for calendar view:

- CalendarHeader: Calendar navigation header
- EventBlock: Event display in timeline
- EventPanel: Side panel for event details
- TimeSlot: Time slot in day view

## Data Flow

### Unified Mock Data (`shared/mockData.json`)

```json
{
  "appointments": [...],
  "doctors": [...]
}
```

Both frontend and backend import from this single source of truth.

### Backend Integration

```javascript
// services/appointmentService.js
import mockData from "../shared/mockData.json";

export const get_appointments = (date, status) => {
  // Simulates backend API call
  // Filters and returns appointments
};
```

### Python Backend

```python
# backend/appointment_service.py
def load_mock_data():
    # Loads from shared/mockData.json
    return data['appointments'], data['doctors']
```

## Benefits of This Structure

1. **Maintainability**: Small, focused components are easy to update
2. **Reusability**: Atomic components can be used throughout the app
3. **Testability**: Isolated components are simple to test
4. **Scalability**: Easy to add new features without affecting existing code
5. **Single Source of Truth**: Unified mock data prevents inconsistencies
6. **Clear Separation**: Business logic, UI components, and data are separated

## Usage

The main application file (`EMR_Frontend_Assignment_Refactored.jsx`) is now clean and focused on:

- View logic (Calendar Day View & Appointment Management View)
- State management
- Event handlers
- Component composition

All visual components and utilities are imported from their respective modules.

## Original File

The original monolithic file (`EMR_Frontend_Assignment.jsx`) is preserved for reference but is no longer used in the application.
