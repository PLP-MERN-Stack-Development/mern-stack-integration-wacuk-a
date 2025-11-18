import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: 'Test server is working',
    timestamp: new Date().toISOString()
  }));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('Try accessing: http://localhost:3001');
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});
