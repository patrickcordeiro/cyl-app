import app from './app';
import { Logger } from '@infra/logging';
import env from '@infra/config/env';
import { initializeConnection } from '@infra/data/DatabaseConnection';

const serverPort = String(env.SERVER_PORT);

async function startServer() {
  Logger.debug('🚧 Server is starting');

  try {
    await initializeConnection();

    app.listen(serverPort, () => {
      Logger.systemStarted(serverPort);
    });

    process.on('SIGINT', async () => {
      Logger.debug('Closing server...');
      Logger.success('Server closed');
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      Logger.debug('Closing server...');
      Logger.success('Server closed');
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    });
  } catch (error) {
    Logger.error(`Failed to start server: ${(error as Error).message}`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}

startServer();
