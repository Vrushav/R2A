# R2A – Functional Requirements

Version: 1.0

Status: Approved

---

# Purpose

This document defines the core functionalities of the R2A platform.

Each requirement is grouped by module and will guide frontend, backend, database, and API development.

---

# 1. Public Portal

The system shall:

- Display information about R2A.
- Display hospital information.
- Display department information.
- Display doctor profiles.
- Allow users to contact the hospital.
- Support multiple languages (future enhancement).

---

# 2. Authentication

The system shall:

- Allow patient registration.
- Allow secure login.
- Allow password reset.
- Allow logout.
- Support role-based access.

Roles:

- Patient
- Doctor
- Hospital Administrator
- ASHA Worker (Future)

---

# 3. Patient Module

The system shall:

- Display patient dashboard.
- Allow appointment booking.
- Allow appointment cancellation.
- Display appointment history.
- Manage patient profile.
- Manage Family Health Card.

---

# 4. Doctor Module

The system shall:

- Display doctor's dashboard.
- Display today's appointments.
- View patient details.
- Update appointment status.
- Manage availability.

---

# 5. Hospital Administration

The system shall:

- Manage departments.
- Manage doctors.
- Manage appointments.
- View reports.

---

# 6. Notifications

The system shall:

- Send appointment confirmation.
- Send appointment reminders.
- Notify appointment cancellation.
- Notify schedule updates.

---

# 7. AI Services (Version 2)

The system shall:

- Guide patients to the correct department.
- Recommend nearby hospitals.
- Provide basic healthcare guidance.

---

# 8. Future Features

The system shall eventually support:

- Voice assistance.
- Offline synchronization.
- Health camp management.
- Government healthcare integration.
- Medicine availability.
- Queue prediction.

---

# Functional Requirement Rules

Every feature must:

- Solve a real healthcare accessibility problem.
- Be easy to use.
- Support future scalability.
- Align with the R2A vision.