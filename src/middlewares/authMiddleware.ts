import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../common/constants';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const splitToken = token.split('Bearer ')[1];

    jwt.verify(splitToken, jwtSecret);

    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
