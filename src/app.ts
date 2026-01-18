import express, { type Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/NotFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

const corsOptions = {
  origin: [ 'http://localhost:3000'],
  methods: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// parsers
app.use(express.json());
app.use(cors(corsOptions));

app.use(cookieParser());
 app.use('/', router);
 app.use(globalErrorHandler);
 app.use(notFound);

export default app;
