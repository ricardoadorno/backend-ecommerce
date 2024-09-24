import { Router } from 'express';
import authController from '../controllers/authController';
import { validationHandler } from '../middlewares/validationHandler';
import { LoginDto } from '../dtos/user';

const authRouter = Router();

authRouter.post('/login', validationHandler(LoginDto), authController.login);

export default authRouter;
