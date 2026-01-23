import 'reflect-metadata'; // Needed if using NestJS decorators or DI patterns
import { config as envConfig } from './config/env'; // Make sure your env exports a "config" function or object
import { createApp } from './app';

const PORT = envConfig.PORT || 4000;

async function bootstrap() {
  const app = createApp();

  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
