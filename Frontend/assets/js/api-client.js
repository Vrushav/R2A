const API_BASE = (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:')
  ? 'http://localhost:3000'
  : '';

async function fetchJson(url, options = {}) {
  const requestUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
  const response = await fetch(requestUrl, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    let errorText = `Request failed: ${response.status}`;
    try {
      const bodyText = await response.text();
      if (bodyText) errorText += ` ${bodyText}`;
    } catch (e) {
      // ignore
    }
    throw new Error(errorText);
  }

  return response.json();
}

async function saveAppointmentToBackend(payload) {
  return fetchJson('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

async function loadHealthCamps() {
  return fetchJson('/api/health-camps');
}
