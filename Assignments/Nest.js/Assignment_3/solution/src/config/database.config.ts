import * as path from 'path';

const projectDir = path.relative(process.cwd(), path.join(__dirname, '..'));

export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'techxpress',
  entities: [path.join(projectDir, '**', '*.entity.{ts,js}')],
  migrations: [path.join(projectDir, 'database', 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
};
