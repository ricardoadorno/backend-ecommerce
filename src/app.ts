import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import apiRouter from './router/apiRouter';
import { MainDataSource } from './databases/main-data-source';
import exceptionHandler from './exceptions/exceptionHandler';
import morgan from './libs/morgan';
import authRouter from './router/authRouter';
import documentDataSource from './databases/document-data-source';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan);

MainDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => console.error(err));

documentDataSource.initialize();

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use(exceptionHandler);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
