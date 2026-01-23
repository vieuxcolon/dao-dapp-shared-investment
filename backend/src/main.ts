// backend/src/main.ts
import { App } from './app';
import { config } from './config/env';
import { startBlockchainEventListeners } from './blockchain/eventListener';

async function bootstrap() {
  try {
    const appInstance = new App();
    await appInstance.init();

    // Start listening on port
    appInstance.app.listen(config.PORT, () => {
      console.log(` Server running at http://localhost:${config.PORT}`);
    });

    // Start blockchain event listeners
    startBlockchainEventListeners();
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
