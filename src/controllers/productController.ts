import { Request, Response } from 'express';
import { Product } from '../entities/Product';
import { MainDataSource } from '../databases/main-data-source';
import asyncHandler from '../middlewares/asyncHandler';
import Exceptions from '../exceptions';
import { CreateProductDto } from '../dtos/product';

const productRepo = MainDataSource.getRepository(Product);

export const getAll = async (req: Request, res: Response) => {
  return res.json(await productRepo.find()).status(200);
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const product = await productRepo.findOneBy({
    id,
  });

  if (!product) {
    throw Exceptions.notFound('Product');
  }

  return res.json(product).status(200);
};

export const create = async (req: Request, res: Response) => {
  const { name, description, price, quantity } = req.body;

  const product = new Product();

  product.name = name;
  product.description = description;
  product.price = price;
  product.quantity = quantity;

  await productRepo.save(product);

  return res.status(201).send('Product created');
};

export default {
  getAll: asyncHandler(getAll),
  getById: asyncHandler(getById),
  create: asyncHandler(create),
};
