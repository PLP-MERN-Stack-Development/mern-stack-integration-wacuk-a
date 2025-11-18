import express from 'express';

console.log('Starting lifecycle test server...');

const app = express();
const PORT = 5000;

app.get('/api/test', (req, res) => {
  console.log('Request received at:', new Date().toISOString());
  res.json({ message: 'Server is alive', time: new Date().toISOString() });
});

const server = app.listen(PORT, 'localhost', () => {
  console.log('🚀 Server started successfully on port', PORT);
  console.log('Process PID:', process.pid);
  console.log('Test with: curl http://localhost:5000/api/test');
});

// Log if server closes
server.on('close', () => {
  console.log('❌ Server closed unexpectedly');
});

// Handle process events
process.on('exit', (code) => {
  console.log('Process exiting with code:', code);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at:', promise, 'reason:', reason);
});

// Keep process alive
console.log('Process will stay alive until Ctrl+C');
