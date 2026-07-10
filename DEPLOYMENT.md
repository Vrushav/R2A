# Deployment Guide

## Local run
1. Install dependencies:
   npm install
2. Start the app:
   node server.js
3. Open:
   http://localhost:3000

## One-click launch on Windows
- Double-click launch.bat

## Hosting options
### Render
1. Create a new Web Service.
2. Connect this repository.
3. Set the start command to:
   node server.js
4. Deploy.

### Railway
1. Create a new project from the repository.
2. Set the start command to:
   node server.js
3. Deploy.

### Vercel / Netlify
These are better for static frontend-only hosting. For this app, Render or Railway is a better fit because the backend is required.

## Environment variables
- PORT: optional, default 3000
- R2A_DATA_DIR: optional, defaults to Backend/data
