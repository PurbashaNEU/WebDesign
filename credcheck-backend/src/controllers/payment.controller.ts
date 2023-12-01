import * as paymentService from '../services/payment.service';
import { NextFunction, Request,Response } from 'express';


export const createPaymentController = async(req:Request,res:Response, next: NextFunction): Promise<void> => {
    try{
       const userPayment = await paymentService.payment(req.body);
       res.send({"payment":userPayment});
    }
    catch(e)
    {
      next(e);
    }
}