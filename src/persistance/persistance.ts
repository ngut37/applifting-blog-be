import { createConnection, getManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from '@config';

const createDBIfNotExists = async (
  options: TypeOrmModuleOptions,
): Promise<void> => {
  const connection = await createConnection(
    options as PostgresConnectionOptions,
  );
  const manager = getManager();
  const result = await manager.query(
    `SELECT 1 FROM pg_database WHERE datname = '${config.PG_DATABASE}'`,
  );

  if (result.length === 0)
    await manager.query(`CREATE DATABASE ${config.PG_DATABASE}`);

  connection.close();
};

export const CustomTypeOrmModule = async (): Promise<DynamicModule> => {
  console.log(config.NODE_ENV);
  let options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: config.PG_HOST,
    port: config.PG_PORT,
    username: config.PG_USER,
    password: config.PG_PASSWORD,
    autoLoadEntities: true,
    synchronize: config.NODE_ENV !== 'production',
  };

  await createDBIfNotExists(options);

  options = { ...options, database: config.PG_DATABASE };

  return TypeOrmModule.forRoot(options);
};
