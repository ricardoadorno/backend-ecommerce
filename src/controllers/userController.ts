import { Request, Response } from 'express';
import { MainDataSource } from '../databases/main-data-source';
import { User } from '../entities/User';
import asyncHandler from '../middlewares/asyncHandler';
import Exceptions from '../exceptions';

const userRepo = MainDataSource.getRepository(User);

async function get(req: Request, res: Response) {
   const users = await userRepo.find();
//    const users = (await userRepo.find()).map(({ created_at, updated_at, ...user }) => user);

    res.json(users).status(200);
}

async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userRepo.findOneBy({
            id: +id
    })

    if (!user) {
        throw Exceptions.notFound("User");
    }

    res.json(user).status(200);
}

async function create(req: Request, res: Response) {
    const { name, email, password, role } = req.body

    const emailExists = await userRepo.findOneBy({ email });
    if (emailExists) {
        throw Exceptions.conflict("Email");
    }
    
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;

    await userRepo.save(user);

    res.status(201).send('User created');
}

async function update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const user = await userRepo.findOneBy({
        id: +id
    })

    if (!user) {
        throw Exceptions.notFound("User");
    }

    if(name) {
        user.name = name;
    }

    if(email) {
        user.email = email;
    }

    if(password) {
        user.password = password;
    }

    if(role) {
        user.role = role;
    }

    user.updated_at = new Date();

    await userRepo.save(user);

    res.status(200).send('User updated');
}

async function remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userRepo.findOneBy({
        id: +id
    })

    if (!user) {
        throw Exceptions.notFound("User");
    }

    await userRepo.remove(user);

    res.status(200).send('User removed');
}

export default {
    get,
    getById: asyncHandler(getById),
    create: asyncHandler(create),
    update: asyncHandler(update),
    remove: asyncHandler(remove)
}
