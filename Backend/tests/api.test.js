const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('stores appointments and exposes dashboard summary', async () => {
  const tempDataDir = path.join(__dirname, '..', 'tmp-test-data');
  if (fs.existsSync(tempDataDir)) {
    fs.rmSync(tempDataDir, { recursive: true, force: true });
  }

  process.env.R2A_DATA_DIR = tempDataDir;
  const { startServer } = require('../../server');

  const server = startServer(0);
  await new Promise((resolve) => server.once('listening', resolve));

  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const createRes = await fetch(`${baseUrl}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Patient',
        hospital: 'District Hospital',
        department: 'General Medicine',
        doctor: 'Dr. Amit Patel',
        status: 'Confirmed',
        token: 'A101'
      })
    });

    assert.equal(createRes.status, 201);
    const created = await createRes.json();
    assert.equal(created.name, 'Test Patient');

    const summaryRes = await fetch(`${baseUrl}/api/dashboard-summary`);
    assert.equal(summaryRes.status, 200);
    const summary = await summaryRes.json();

    assert.equal(summary.totalAppointments, 1);
    assert.equal(summary.completedAppointments, 0);
  } finally {
    server.close();
    delete process.env.R2A_DATA_DIR;
    if (fs.existsSync(tempDataDir)) {
      fs.rmSync(tempDataDir, { recursive: true, force: true });
    }
  }
});

test('rejects incomplete appointment payloads', async () => {
  const tempDataDir = path.join(__dirname, '..', 'tmp-test-data-invalid');
  if (fs.existsSync(tempDataDir)) {
    fs.rmSync(tempDataDir, { recursive: true, force: true });
  }

  process.env.R2A_DATA_DIR = tempDataDir;
  const { startServer } = require('../../server');

  const server = startServer(0);
  await new Promise((resolve) => server.once('listening', resolve));

  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const createRes = await fetch(`${baseUrl}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        hospital: '',
        department: 'General Medicine'
      })
    });

    assert.equal(createRes.status, 400);
    const body = await createRes.json();
    assert.match(body.error, /required/i);
  } finally {
    server.close();
    delete process.env.R2A_DATA_DIR;
    if (fs.existsSync(tempDataDir)) {
      fs.rmSync(tempDataDir, { recursive: true, force: true });
    }
  }
});
