import { NextFunction, Request, Response } from 'express';
import BaseError from './baseError';

const exceptionHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    
    res.status(err.status).json({ message: err.message });
}

export default exceptionHandler;