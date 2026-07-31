import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Application routes
app.use('/api', router);

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to FixItNow API');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
