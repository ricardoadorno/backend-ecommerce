import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import Exceptions from '../exceptions';


export const validationHandler = (validator: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const objectToValidate = new validator();
            Object.assign(objectToValidate, req.body);

            const errors = await validate(objectToValidate);

            if (errors.length > 0) {
                const validationErrors = errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints,
                }));

                throw Exceptions.invalidField(validationErrors.map((error) => error.property));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};