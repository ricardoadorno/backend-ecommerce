import { Router } from 'express';
import userController from './controllers/userController';
import { validationHandler } from './middlewares/validationHandler';
import { CreateUserDTO, UpdateUserDTO } from './dtos/user';
import productController from './controllers/productController';
import { CreateProductDto } from './dtos/product';
import cartController from './controllers/cartController';

const router = Router();

router.get('/hello', (req, res) => res.send('Hello World!'));

router.get('/users', userController.get);
router.get('/users/:id', userController.getById);
router.post('/users', validationHandler(CreateUserDTO), userController.create);
router.put('/users/:id', validationHandler(UpdateUserDTO), userController.update);
router.delete('/users/:id', userController.remove);

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.post('/products', validationHandler(CreateProductDto), productController.create);

router.get('/carts', cartController.getAll);
router.post('/carts', cartController.create);

export default router;