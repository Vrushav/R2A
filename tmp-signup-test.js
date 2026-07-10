const { startServer } = require('./server');
const http = require('http');

const server = startServer(0);
server.once('listening', () => {
  const port = server.address().port;
  const data = JSON.stringify({ name: "Test", email: "test@example.com", password: "abc123" });
  const options = {
    hostname: '127.0.0.1',
    port,
    path: '/api/auth/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  const req = http.request(options, (res) => {
    console.log('STATUS', res.statusCode);
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      console.log(body);
      server.close();
    });
  });

  req.on('error', (e) => {
    console.error('ERR', e);
    server.close();
  });

  req.write(data);
  req.end();
});
