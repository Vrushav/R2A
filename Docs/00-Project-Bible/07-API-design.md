# R2A – API Design

Version: 1.0

Status: Draft

---

# Purpose

This document defines the REST APIs required for Version 1 of the R2A platform.

The APIs are grouped by module and will serve as the contract between the frontend and backend.

---

# API Design Principles

- RESTful architecture
- JSON request and response
- Stateless communication
- Secure endpoints using JWT authentication
- Consistent naming conventions
- Proper HTTP status codes

---

# Authentication APIs

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password

---

# Patient APIs

GET    /api/patients/profile
PUT    /api/patients/profile

GET    /api/patients/appointments

POST   /api/patients/appointments

DELETE /api/patients/appointments/:id

---

# Doctor APIs

GET    /api/doctors

GET    /api/doctors/:id

GET    /api/doctors/dashboard

PUT    /api/doctors/availability

GET    /api/doctors/appointments

---

# Hospital APIs

GET    /api/hospitals

GET    /api/hospitals/:id

GET    /api/hospitals/:id/departments

---

# Department APIs

GET    /api/departments

GET    /api/departments/:id

---

# Appointment APIs

POST   /api/appointments

GET    /api/appointments/:id

PUT    /api/appointments/:id

DELETE /api/appointments/:id

---

# Family Health APIs

GET    /api/family

POST   /api/family

PUT    /api/family/:id

DELETE /api/family/:id

---

# Notification APIs

GET    /api/notifications

PUT    /api/notifications/:id/read

---

# Future APIs

GET    /api/queue

GET    /api/medicine

POST   /api/ai/chat

GET    /api/health-camps

GET    /api/government-schemes

---

# Response Format

Success

{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}

---

Error

{
  "success": false,
  "message": "Error description",
  "errors": []
}