# R2A – System Architecture

Version: 1.0

Status: Draft

---

# Purpose

This document describes the high-level architecture of the R2A platform.

The architecture is designed to be modular, scalable, and maintainable.

---

# High-Level Architecture

Patient / Doctor / ASHA Worker / Admin

↓

Frontend (React)

↓

REST API (Node.js + Express)

↓

Business Logic

↓

MongoDB Database

---

# Frontend

Technology:
- React
- Vite
- CSS

Responsibilities:

- User Interface
- Form Validation
- API Communication
- Authentication
- Dashboard Rendering

---

# Backend

Technology:

- Node.js
- Express.js

Responsibilities:

- Business Logic
- Authentication
- Appointment Processing
- Notification Handling
- AI Integration (Future)

---

# Database

Technology:

- MongoDB

Collections:

- Users
- Patients
- Doctors
- Hospitals
- Departments
- Appointments
- FamilyMembers
- Notifications

---

# User Roles

Patient

↓

Patient Dashboard

Doctor

↓

Doctor Workspace

Hospital Admin

↓

Hospital Dashboard

ASHA Worker (Future)

↓

ASHA Workspace

---

# Communication Flow

User

↓

Frontend

↓

REST API

↓

Business Logic

↓

Database

↓

Response

↓

Frontend

---

# Future Integrations

The architecture should support:

- Google Maps
- ABHA (Future)
- ABDM (Future)
- AI Services
- SMS Gateway
- Email Notifications

---

# Design Principles

- Modular
- Scalable
- Secure
- Maintainable
- API First