# R2A – Database Design

Version: 1.0

Status: Draft

---

# Purpose

This document defines the core database entities of the R2A platform.

The design focuses on scalability, maintainability, and supporting future features without major redesign.

---

# Database Technology

Database:
MongoDB

Reason:
- Flexible document structure
- Easy scalability
- Well suited for modern web applications
- Good integration with Node.js

---

# Core Collections

## Users

Stores authentication information.

Related Roles:

- Patient
- Doctor
- Hospital Administrator
- ASHA Worker

---

## Patients

Stores patient profile information.

Examples:

- Personal details
- Contact information
- Emergency contact
- Linked family members

---

## Doctors

Stores doctor information.

Examples:

- Name
- Specialization
- Experience
- Availability
- Hospital

---

## Hospitals

Stores hospital information.

Examples:

- Name
- Address
- Contact
- Departments
- Location

---

## Departments

Examples:

- General Medicine
- Orthopedics
- Pediatrics
- Ayurveda
- Cardiology

---

## Appointments

Stores appointment records.

Examples:

- Patient
- Doctor
- Hospital
- Date
- Time
- Status

---

## Family Members

Allows one account to manage multiple family members.

Examples:

- Relationship
- Age
- Linked Patient

---

## Notifications

Stores reminders and important updates.

Examples:

- Appointment Reminder
- Cancellation
- Health Camp Notice

---

# Entity Relationships

User

↓

Patient

↓

Appointments

↓

Doctor

↓

Hospital

↓

Department

Patient

↓

Family Members

Patient

↓

Notifications

---

# Future Collections

Version 2 may include:

- Medicines
- AI Conversations
- Queue Information
- Health Camps
- Government Schemes
- Ambulance Requests

---

# Database Principles

- Avoid duplicate information.
- Keep collections independent where possible.
- Design for future expansion.
- Support multiple hospitals.
- Maintain secure storage of sensitive information.