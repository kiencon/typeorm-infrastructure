import { Connection } from 'typeorm';
import getConnection from './typeOrmConnection';

const migrate = async (): Promise<void> => {
  try {
    const cnn: Connection = await getConnection();
    await cnn.runMigrations();
  } catch (error) {
    Promise.reject(error);
  }
};

export default migrate;
