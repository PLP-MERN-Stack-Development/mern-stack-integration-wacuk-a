import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Express test server is working',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Express test server running on http://localhost:${PORT}`);
  console.log('Test with: curl http://localhost:3001/api/health');
});
