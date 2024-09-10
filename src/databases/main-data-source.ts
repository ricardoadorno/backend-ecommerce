import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { ShoppingCart } from '../entities/ShoppingCart';

export const MainDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "ecommerce",
    synchronize: true,
    // logging: true,
    entities: [User, Product, ShoppingCart],
    subscribers: [],
    migrations: [],
})