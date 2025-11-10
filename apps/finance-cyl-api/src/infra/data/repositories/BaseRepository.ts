import { injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { DatabaseFinanceConnection } from '../DatabaseConnection';

@injectable()
export class BaseRepository {
  private connection: DataSource;

  constructor() {
    this.connection = DatabaseFinanceConnection;
  }

  protected getConnection(): DataSource {
    return this.connection;
  }

  protected setConnection(connection: DataSource) {
    this.connection = connection;
  }
}
