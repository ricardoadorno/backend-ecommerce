import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../common/constants';
import asyncHandler from '../middlewares/asyncHandler';
import { User } from '../entities/User';
import { MainDataSource } from '../databases/main-data-source';
import { comparePassword } from '../utils/crypto';
import { LoginDto } from '../dtos/user';
import Exceptions from '../exceptions';
import { confirmEmail } from '../modules/email/emailModule';

const userRepo = MainDataSource.getRepository(User);

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginDto;

  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    throw Exceptions.unauthorized();
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    throw Exceptions.unauthorized();
  }

  jwt.sign({ email }, jwtSecret, { expiresIn: '1h' }, async (err, token) => {
    if (err) {
      throw Exceptions.internalServerError();
    }

    return res.json({ token }).status(200);
  });
};

export default {
  login: asyncHandler(login),
};
