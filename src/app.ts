import express from 'express';
import "reflect-metadata"
import router from './router';
import { MainDataSource } from './databases/main-data-source';
import exceptionHandler from './exceptions/exceptionHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MainDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((err) => console.error(err));

app.use('/api', router)

app.use(exceptionHandler);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});