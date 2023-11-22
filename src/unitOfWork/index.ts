import {
  Connection, EntityManager, QueryRunner, Repository,
} from 'typeorm';
import getConnection from '../typeOrmConnection';

class UnitOfWork {
  private queryRunner: QueryRunner;

  private transactionManager: EntityManager;

  static connectionDB: Connection;

  private async init(): Promise<void> {
    UnitOfWork.connectionDB = await getConnection();
    this.queryRunner = UnitOfWork.connectionDB.createQueryRunner();
  }

  setTransactionManager(): void {
    this.transactionManager = this.queryRunner.manager;
  }

  async startTransaction(): Promise<void> {
    await this.init();
    await this.queryRunner.startTransaction();
    this.setTransactionManager();
  }

  async complete<T>(work: () => Promise<T>): Promise<T> {
    let result: T;
    try {
      result = await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      console.log('release queryRunner');
      await this.queryRunner.release();
    }

    return result;
  }

  getRepository<T>(IEntity: new () => T): Repository<T> {
    if (!this.transactionManager) {
      throw new Error('Unit of work is not started. Call the start() method');
    }
    return this.transactionManager.getRepository(IEntity);
  }

  getCustomRepository<T>(
    ICustomRepository: new () => Repository<T>,
  ): Repository<T> {
    return this.transactionManager.getCustomRepository(ICustomRepository);
  }
}

export { UnitOfWork };

