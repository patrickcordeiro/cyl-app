import { DataSource, DataSourceOptions } from 'typeorm';
import { readFileSync } from 'fs';
import env from '@infra/config/env';
import { Logger } from '@infra/logging';
import { CreateTableIncome1762785242565 } from './migrations/1762785242565-CreateTableIncome';
import { ExpenseModel, IncomeModel } from './models';
import { CreateTableExpense1763028688902 } from './migrations/1763028688902-CreateTableExpense';

export const dataSourceFinanceOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: env.NODE_ENV === 'development' ? true : false,
  entities: [IncomeModel, ExpenseModel],
  migrations: [CreateTableIncome1762785242565, CreateTableExpense1763028688902],
  ssl: env.DB_CA ? { ca: readFileSync(env.DB_CA) } : false,
};

function connectionFinance(): DataSource {
  return new DataSource(dataSourceFinanceOptions);
}

export const DatabaseFinanceConnection = connectionFinance();

export async function verifyDatabaseExists() {
  const query = `SELECT 1 FROM pg_database WHERE datname='${env.DB_NAME}';`;
  try {
    const result = await DatabaseFinanceConnection.query(query);
    return result.length > 0;
  } catch (error) {
    Logger.error(
      `Error verifying database existence for : ${env.DB_NAME} - ${
        (error as Error).message
      }`
    );
    return false;
  }
}

export async function testConnection() {
  try {
    Logger.debug('Testing Database connection...');
    await DatabaseFinanceConnection.query('SELECT 1');
    Logger.success('Database connection test succeeded');
    return;
  } catch (error) {
    Logger.error(`Error to connect on Database: ${(error as Error).message}`);
  }
}

export async function runMigrations() {
  try {
    Logger.debug('Running Database migrations...');
    await DatabaseFinanceConnection.runMigrations({
      transaction: 'none',
    });
    Logger.success('Database migrations executed');
  } catch (error) {
    Logger.error(
      `Error to run migrations on Database: ${(error as Error).message}`
    );
  }
}

export async function initializeConnection(): Promise<DataSource> {
  try {
    Logger.debug('Initializing Database connection...');
    const connection = await DatabaseFinanceConnection.initialize();
    await testConnection();

    const hasPendingMigrations = await connection.showMigrations();

    if (hasPendingMigrations) {
      Logger.debug('Pending migrations found for Database ');
      await runMigrations();
    } else {
      Logger.debug('No pending migrations for Database ');
    }

    Logger.success('Database connection initialized');
    return connection;
  } catch (error) {
    Logger.error(
      `Error to initialize connection on Database : ${(error as Error).message}`
    );
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}

export async function destroyConnection() {
  try {
    Logger.debug('Closing Database connection...');
    await DatabaseFinanceConnection.destroy();
    Logger.success('Database connection closed');
  } catch (error) {
    Logger.error(
      `Error to disconnect on Database: ${(error as Error).message}`
    );
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}
