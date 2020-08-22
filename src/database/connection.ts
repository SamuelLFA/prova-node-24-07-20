import knex from 'knex';
import configuration from '../../knexfile';

const config = () => {
  if (process.env.NODE_ENV === 'test') {
    return configuration.test;
  }
  if (process.env.NODE_ENV === 'development') {
    return configuration.development;
  }
  return configuration.production;
};

export default knex(config());
