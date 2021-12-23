import { Options } from '@mikro-orm/core';
import * as path from 'path';

const config: Options = {
  type: 'mysql',
  host: process.env.MIKRO_ORM_HOST,
  port: +process.env.MIKRO_ORM_PORT,
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: path.join(__dirname, './migrarions'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};

export default config;
