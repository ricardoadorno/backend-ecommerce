import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
import { User } from './User';


@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('int')
    quantity: number;
  
    @ManyToOne(() => User, (user) => user.shoppingCarts)
    user: User;
  
    @ManyToOne(() => Product, (product) => product.shoppingCarts)
    product: Product;
  }