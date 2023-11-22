import 'dotenv/config';
import {
  Connection,
  EntitySchema,
  createConnection as _createConnection,
  getConnection as _getConnection
} from 'typeorm';
import * as Entities from './entities';
import IEntity from './entities/IEntity';

const getEntities = (): EntitySchema[] => Object.values(Entities) as IEntity[] as EntitySchema[];

const createConnection = (): Promise<Connection> => _createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  migrationsRun: false,
  migrations: [`${__dirname}/migration/*.{ts, js}`],
  logging: false,
  entities: getEntities()
});

const getConnection = async (): Promise<Connection> => {
  const action = `getConnection-${new Date().getTime().toString()}`;
  console.time(action);
  let cnn: Connection;
  try {
    cnn = await createConnection();
  } catch (e) {
    console.log('reuse connection');
    cnn = _getConnection();
  }
  console.timeEnd(action);
  return cnn;
};

export default getConnection;
