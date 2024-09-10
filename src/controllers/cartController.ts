import { Request, Response } from 'express';
import { Product } from '../entities/Product';
import { User } from '../entities/User';
import { MainDataSource } from '../databases/main-data-source';
import Exceptions from '../exceptions';
import { ShoppingCart } from '../entities/ShoppingCart';
import asyncHandler from '../middlewares/asyncHandler';

const userRepo = MainDataSource.getRepository(User);
const productRepo = MainDataSource.getRepository(Product);
const cartRepo = MainDataSource.getRepository(ShoppingCart);

const getAll = async (req: Request, res: Response) => {
    return res.json(await cartRepo.find({
        relations: ['user', 'product']
    })).status(200);
}

const create = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    
    const user = await userRepo.findOneBy({ id: +userId });
    if (!user) {
        throw Exceptions.notFound('User');
    }


    const product = await productRepo.findOneBy({ id: String(productId) });
    console.log(product);
    
    if (!product) {
        throw Exceptions.notFound('Product');
    }

    const cart = new ShoppingCart();
    cart.user = user;
    cart.product = product;
    cart.quantity = quantity;

    await MainDataSource.getRepository(ShoppingCart).save(cart);

    return res.status(201).send('Product added to cart');
}

export default {
    getAll,
    create: asyncHandler(create)
};