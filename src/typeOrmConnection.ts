import {
  Connection,
  createConnection as _createConnection,
  getConnection as _getConnection,
} from 'typeorm';
import * as Entities from './entity';

const getEntities = (): any[] => Object.values(Entities);

const createConnection = (): Promise<Connection> => _createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'test',
  synchronize: false,
  migrationsRun: false,
  migrations: [`${__dirname}/migration/*.{ts, js}`],
  logging: false,
  entities: getEntities(),
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
