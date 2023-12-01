import express from 'express';
import * as expenditureController from '../controllers/expenditure.controller';

export const router = express.Router();

router.post('/', expenditureController.addExpenditureDetail);
router.get('/:id', expenditureController.getExpenditureByCardId);
router.get('/totalBill/:id', expenditureController.getbillingAmount);
