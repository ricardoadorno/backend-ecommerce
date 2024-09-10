import BaseError from './baseError';


const Exceptions = {
    invalidField: (field: string[]) => {
        return new BaseError(`Invalid field(s): ${field.join(', ')}`, 400);
    },
    notFound: (resource: string) => {
        return new BaseError(`${resource} not found`, 404);
    },
    conflict: (resource: string) => {
        return new BaseError(`${resource} already exists`, 409);
    }
}

export default Exceptions;
