import knex from 'knex';
import settings from '../config/settings';

const db = knex({
  client: 'pg',
  connection: settings.pgConnectionString,
});

export default db;
