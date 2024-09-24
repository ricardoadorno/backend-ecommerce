import { Router } from 'express';
import userController from '../controllers/userController';
import { validationHandler } from '../middlewares/validationHandler';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user';
import productController from '../controllers/productController';
import { CreateProductDto } from '../dtos/product';
import cartController from '../controllers/cartController';
import authMiddleware from '../middlewares/authMiddleware';
import formController from '../controllers/formController';

const apiRouter = Router();

apiRouter.post(
  '/users',
  validationHandler(CreateUserDTO),
  userController.create,
);

apiRouter.get('/form', formController.getAll);
apiRouter.post('/form', formController.create);
apiRouter.get('/form/:id', formController.getById);
apiRouter.put('/form/:id', formController.update);
apiRouter.delete('/form/:id', formController.remove);

apiRouter.use(authMiddleware);

apiRouter.get('/users', userController.get);
apiRouter.get('/users/:id', userController.getById);
apiRouter.put(
  '/users/:id',
  validationHandler(UpdateUserDTO),
  userController.update,
);
apiRouter.delete('/users/:id', userController.remove);

apiRouter.get('/products', productController.getAll);
apiRouter.get('/products/:id', productController.getById);
apiRouter.post(
  '/products',
  validationHandler(CreateProductDto),
  productController.create,
);

apiRouter.get('/carts', cartController.getAll);
apiRouter.post('/carts', cartController.create);

export default apiRouter;
