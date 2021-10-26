import { Connection, QueryRunner, Repository } from 'typeorm';
import getConnection from '../typeOrmConnection';

export default class QueryableDatabase {
  private connection: Connection;

  private queryRunner: QueryRunner;

  protected async init(): Promise<void> {
    this.connection = await getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  public async getCustomRepository<T>(
    ICustomRepository: new () => Repository<T>,
  ): Promise<Repository<T>> {
    await this.init();
    return this.queryRunner.manager.getCustomRepository(ICustomRepository);
  }

  public async handle(work: any): Promise<any> {
    let result;
    let isError = false;
    try {
      result = await work();
    } catch (error) {
      result = error;
      isError = true;
    } finally {
      await this.queryRunner.release();
    }
    if (isError) {
      throw result;
    }
    return result;
  }
}
