import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const TypeormDatasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'leanytest',
  synchronize: process.env.DB_SYNC === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
});
