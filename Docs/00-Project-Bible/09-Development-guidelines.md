# R2A – Development Guidelines

Version: 1.0

Status: Approved

---

# Purpose

This document defines the development standards for the R2A platform.

These guidelines ensure that every developer follows the same coding, documentation, and Git practices.

---

# Project Principles

- Build with scalability in mind.
- Keep the code simple and readable.
- Avoid duplicate code.
- Every feature should solve a real healthcare problem.
- Documentation should be updated whenever features change.

---

# Folder Structure

Frontend

- Components
- Pages
- Assets
- Hooks
- Services
- Utils

Backend

- Controllers
- Routes
- Models
- Middleware
- Services
- Config

---

# Naming Conventions

Files

- kebab-case

Examples

patient-dashboard.jsx

doctor-card.jsx

appointment-service.js

Variables

camelCase

Functions

camelCase

Components

PascalCase

Constants

UPPER_CASE

---

# Git Workflow

Feature Branch

↓

Development

↓

Main

Branch Naming

feature/patient-dashboard

feature/appointment-booking

feature/doctor-portal

fix/login-validation

---

# Commit Messages

Examples

feat: add patient dashboard

feat: implement appointment booking

fix: resolve login validation bug

docs: update API design

style: improve landing page layout

---

# Coding Standards

- Write reusable components.
- Keep functions small.
- Use meaningful names.
- Comment only when necessary.
- Remove unused code before committing.

---

# CSS Guidelines

- Avoid inline styles.
- Use reusable utility classes.
- Keep spacing consistent.
- Use CSS variables for colors.
- Mobile-first approach.

---

# Documentation Rules

Every completed feature should update:

- Functional Requirements (if needed)
- API Design (if changed)
- Sprint Log

---

# Code Review Checklist

Before every commit:

- Code works correctly.
- No console errors.
- Responsive layout checked.
- No unused files.
- Meaningful commit message.
- Documentation updated if required.

---

# Development Philosophy

The goal is not only to write working code.

The goal is to build software that is maintainable, scalable, and easy for future contributors to understand.