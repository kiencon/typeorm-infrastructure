import { Connection } from 'typeorm';
import getConnection from './typeOrmConnection';

const migrate = async (): Promise<void> => {
  try {
    const cnn: Connection = await getConnection();
    await cnn.runMigrations();
    // process.exit(0);
  } catch (error) {
    Promise.reject(error);
  }
};

migrate();
