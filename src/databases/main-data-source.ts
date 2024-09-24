import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { ShoppingCart } from '../entities/ShoppingCart';

export const MainDataSource = new DataSource({
  type: 'postgres',
  host: process.env.MAIN_DB_HOST || 'localhost',
  port: +(process.env.MAIN_DB_PORT || 5432),
  username: process.env.MAIN_DB_USER || 'postgres',
  password: process.env.MAIN_DB_PASS || '',
  database: process.env.MAIN_DB_NAME || '',
  synchronize: true,
  // logging: true,
  entities: [User, Product, ShoppingCart],
  subscribers: [],
  migrations: [],
});
