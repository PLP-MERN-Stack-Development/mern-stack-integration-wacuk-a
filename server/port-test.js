import net from 'net';

const PORT = 5000;
const server = net.createServer();

server.on('error', (err) => {
  console.log('Port binding ERROR:', err.message);
  process.exit(1);
});

server.on('listening', () => {
  console.log('✅ Successfully bound to port', PORT);
  console.log('Port is available and can be bound to');
  server.close();
});

server.listen(PORT, 'localhost', () => {
  console.log('Testing port binding...');
});
