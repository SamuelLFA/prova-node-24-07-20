import env from 'env-var';
import dotenv = require('dotenv');

dotenv.config();

const settings = {
  port: env.get('PORT').default('3000').asPortNumber(),
  pgConnectionString: env.get('PG_CONNECTION_STRING').required().asString(),
};

export default settings;
