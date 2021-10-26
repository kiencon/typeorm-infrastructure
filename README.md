# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

# Very important configuration
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "123456",
  "database": "test",
  "synchronize": true,
  "logging": false,
  "entities": ["build/entity/*.js"],
  "migrations": [
    "src/migration/*.js"
  ],
  "cli": {
    "entitiesDir": "build/entity",
    "migrationsDir": "src/migration"
  }
}

## Will fail migrate when change configutaion at here
"migrations": [
  "src/migration/*.ts"
]
They should be an *.js