import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware only
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test basic route first
app.get('/api/health', (req, res) => {
  console.log('Health check received');
  res.json({ 
    success: true, 
    message: 'Simple server is working',
    timestamp: new Date().toISOString()
  });
});

// Test posts route with simple handler
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    message: 'Posts route is working',
    data: []
  });
});

app.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
  console.log('Test routes:');
  console.log('  GET /api/health');
  console.log('  GET /api/posts');
});
