import 'reflect-metadata';
import 'dotenv/config';
import 'dotenv-expand';
import App from './app';
import { container } from 'tsyringe';

import BookMarkRoute from './routes/bookmark';


const bookmark = container.resolve(BookMarkRoute);
const app = new App([bookmark]);
app.listen()