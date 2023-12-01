import express from 'express';
import * as transactionController from '../controllers/transaction.controller';

export const router = express.Router();

router.post('/', transactionController.addTransactionDetail);
router.get('/:id', transactionController.getTransactionByCardId);
router.get('/transbymonth/:id', transactionController.getTransactionByMonth);