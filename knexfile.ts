import path from 'path';
import settings from './src/config/settings';

module.exports = {
    client: 'pg',
    connection: settings.pgConnectionString,
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
}