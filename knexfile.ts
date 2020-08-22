import path from 'path';
import settings from './src/config/settings';

export default {
  development: {
    client: 'pg',
    connection: settings.pgConnectionString,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
  },
  test: {
    client: 'pg',
    connection: settings.pgConnectionString,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
  },
  production: {
    client: 'pg',
    connection: settings.pgConnectionString,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
