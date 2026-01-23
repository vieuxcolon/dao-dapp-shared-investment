//backend/src/main.ts
import 'dotenv/config'; // Load environment variables from .env
import { createApp } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

async function bootstrap() {
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
