import env from 'env-var';
import dotenv from 'dotenv';

dotenv.config();

const getEnvConnection = () => {
  if (process.env.NODE_ENV === 'test') return 'PG_CONNECTION_STRING_TEST';
  if (process.env.NODE_ENV === 'production') return 'PG_CONNECTION_STRING_PROD';
  return 'PG_CONNECTION_STRING_DEV';
};

const settings = {
  port: env.get('PORT').default('3000').asPortNumber(),
  pgConnectionString: env.get(getEnvConnection()).required().asString(),
};

export default settings;
