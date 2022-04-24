import { config } from '@config';

import { join } from 'path';

module.exports = {
  type: 'postgres',
  host: config.PG_HOST,
  port: config.PG_PORT,
  username: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_DATABASE,
  logging: true,
  autoLoadEntities: true,
  entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
};
