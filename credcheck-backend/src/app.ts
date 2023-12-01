import express, { Express } from 'express';
import errorHandler  from './middlewares/error-handler.middleware';
import bodyParser from 'body-parser';
import cors from  'cors';
import dotenv from 'dotenv';
import {connectDb} from "./db/db";
import * as UserRoutes from './routes/user.routes';
import * as AuthRoutes from './routes/auth.routes';
import * as CardRoutes from './routes/cards.routes';
import * as TransactionRoutes from './routes/transaction.routes';
import * as ExpenditureRoutes from './routes/expenditure.routes';
import * as PaymentRoutes from './routes/payment.routes';
import { authenticateToken } from './middlewares/verify-jwt-token.middleware';
import {sendEmail} from './email/email';

dotenv.config();

const app:Express = express();
app.use(cors({
  exposedHeaders: ['Content-Length', 'authorization'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT;
connectDb();
sendEmail();


app.use('/users',UserRoutes.router);
app.use('/login', AuthRoutes.router);
app.use('/card',authenticateToken, CardRoutes.router);
app.use('/transaction', authenticateToken, TransactionRoutes.router);
app.use('/expenditure', authenticateToken, ExpenditureRoutes.router);

// add custom error handler middleware as the last middleware
app.use(errorHandler);
app.use('/payment',authenticateToken,PaymentRoutes.router);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});