import http from 'http';

console.log('Starting debug server...');

const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Debug server is working!');
});

const PORT = 3003;

server.listen(PORT, 'localhost', () => {
  console.log('Server callback executed - should be listening now');
  console.log('Try: curl http://localhost:3003');
});

server.on('error', (err) => {
  console.error('SERVER ERROR:', err.message);
  console.error('Error code:', err.code);
});

console.log('Server setup complete');
