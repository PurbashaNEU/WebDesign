import express from 'express';
import * as paymentController from '../controllers/payment.controller';

export const router = express.Router();

router.post('/stripe/charge', paymentController.createPaymentController);