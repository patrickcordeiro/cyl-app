import { injectable } from 'inversify';
import { DataSource } from 'typeorm';

@injectable()
export class BaseRepository {
  private connection: DataSource;

  constructor(connection: DataSource) {
    this.connection = connection;
  }

  protected getConnection(): DataSource {
    return this.connection;
  }

  protected setConnection(connection: DataSource) {
    this.connection = connection;
  }
}
