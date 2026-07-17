const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const authenticateUser = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = process.env.R2A_DATA_DIR || path.join(__dirname, 'data');
const appointmentsFile = path.join(dataDir, 'appointments.json');
const usersFile = path.join(dataDir, 'users.json');
const appointmentRoutes = require("./routes/appointmentRoutes");
let doctorRoutes;
try {
  doctorRoutes = require("./routes/doctorRoutes");
  console.log("✅ doctorRoutes imported successfully");
} catch (err) {
  console.error("❌ Error importing doctorRoutes:", err.message);
  doctorRoutes = null;
}

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    console.log(`➡️ API request ${req.method} ${req.originalUrl}`);
  }
  next();
});

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, '..', 'Frontend')));
app.use("/api/appointments", appointmentRoutes);
if (doctorRoutes) {
  app.use("/api/doctors", doctorRoutes);
  console.log("✅ Doctor routes mounted at /api/doctors");
} else {
  console.warn("⚠️  Doctor routes NOT mounted - module failed to load");
}

function ensureDataFile(filePath, defaultValue) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
  }
}

function readJson(filePath, defaultValue) {
  ensureDataFile(filePath, defaultValue);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  ensureDataFile(filePath, []);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

let appointments = readJson(appointmentsFile, []);
let users = readJson(usersFile, []);
const healthCamps = [
  { id: 1, name: 'Free Eye Camp', date: '15 July 2026', location: 'Village A PHC', seats: 20 },
  { id: 2, name: 'Vaccination Camp', date: '18 July 2026', location: 'Village B CHC', seats: 30 },
  { id: 3, name: 'Dental Camp', date: '20 July 2026', location: 'Village C PHC', seats: 15 }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'R2A API', timestamp: new Date().toISOString() });
});

app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.get('/api/dashboard-summary', (req, res) => {
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter((item) => item.status === 'Completed').length;

  res.json({
    totalAppointments,
    completedAppointments,
    pendingAppointments: totalAppointments - completedAppointments,
    latestAppointment: appointments[appointments.length - 1] || null
  });
});

app.get("/api/profile", authenticateUser, (req, res) => {

    res.json({

        success: true,

        message: "Protected route accessed successfully.",

        user: req.user

    });

});

app.put('/api/appointments/:token/complete', (req, res) => {
  const appointment = appointments.find((item) => item.token === req.params.token);

  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found.' });
  }

  appointment.status = 'Completed';
  writeJson(appointmentsFile, appointments);
  res.json(appointment);
});

/*
                OLD JSON SIGNUP

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, role = 'patient' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const user = {
    id: `user-${Date.now()}`,
    name,
    email,
    role,
    password
  };

  users.push(user);
  writeJson(usersFile, users);
  res.status(201).json({ user: { id: user.id, name, email, role }, token: `token-${user.id}` });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.find((entry) => entry.email === email && entry.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token: `token-${user.id}` });
});*/

app.post('/api/appointments', (req, res) => {
  const appointment = {
    id: `APT-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };

  appointments.push(appointment);
  writeJson(appointmentsFile, appointments);
  res.status(201).json(appointment);
});

app.get('/api/health-camps', (req, res) => {
  res.json(healthCamps);
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'public', 'index.html'));
});

function startServer(port = PORT) {
  return app.listen(port, () => {
    console.log(`R2A server running on http://localhost:${port}`);
  });
}

if (require.main === module) {
    connectDB()
        .then(() => {
            startServer();
        })
        .catch((err) => {
            console.error("Failed to start server:", err);
        });
}

module.exports = { app, startServer };
