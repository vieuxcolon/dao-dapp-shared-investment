// backend/src/main.ts
import 'dotenv/config'; // Load .env variables
import express from 'express';
import cors from 'cors';
import { startListeners } from './blockchain/eventListener';
import treasuryRoutes from './modules/treasury/treasury.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Start blockchain event listeners
startListeners();

// Mount treasury API routes
app.use('/treasury', treasuryRoutes);

// Health check / root endpoint
app.get('/', (req, res) => {
  res.send('DAO Backend is running 🚀');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

