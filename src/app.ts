import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './common/db';
import router from './core/routes';
import { errorHandler } from './infrastructure/middleware/index.middleware';

config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use(router);

async function start() {
	await connectDB();
	app.listen(3000);
}

start();
