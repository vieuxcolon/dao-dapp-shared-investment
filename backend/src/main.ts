import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { startListeners } from './blockchain/eventListener';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function bootstrap() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.send('DAO Backend is running 🚀');
  });

  const server = app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });

  // Start blockchain listeners AFTER server is ready
  startListeners();

  // Graceful shutdown (Docker / SIGTERM)
  const shutdown = () => {
    console.log('Shutting down backend...');
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((err) => {
  console.error('Failed to start backend:', err);
  process.exit(1);
});
