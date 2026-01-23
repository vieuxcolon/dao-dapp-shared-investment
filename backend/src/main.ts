// backend/src/main.ts
import { App } from './app';
import { config } from './config/env';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const prisma = new PrismaClient();

  try {
    // Connect to the database
    await prisma.$connect();
    console.log('Database connected');

    // Initialize the app
    const app = new App(prisma);
    await app.init();

    console.log(`🚀 Server running on http://localhost:${config.port}`);
  } catch (error) {
    console.error(' Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
