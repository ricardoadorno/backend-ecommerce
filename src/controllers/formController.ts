import { Request, Response } from 'express';
import Form from '../schemas/Form';

const getAll = async (req: Request, res: Response) => {
  const form = await Form.find({});
  res.json(form);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const form = await Form.findById(id);
  res.json(form);
};

const create = async (req: Request, res: Response) => {
  const form = new Form(req.body);
  await form.save();
  res.json(form.toJSON());
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const form = await Form.findByIdAndUpdate(id, req.body);
  res.json(form);
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Form.findByIdAndDelete(id);
  res.json({ message: 'Form deleted' });
};

export default {
  getAll,
  create,
  getById,
  update,
  remove,
};
