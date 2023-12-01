import {  Request, Response, NextFunction } from "express";
import { ITrasactions } from "../types/transaction.types";
import * as transactionService from './../services/transaction.service';

export const addTransactionDetail = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const transactionDetails = await transactionService.addTransactionDetail(req.body as ITrasactions);
        res.send({"transactionDetails": transactionDetails});
    } catch (err) {
        next(err);
    }
}

export const getTransactionByCardId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const transactionDetails = await transactionService.fetchTransactionByCardId(req.params.id as string);
        res.send({"transactions": transactionDetails});
    } catch (err) {
        next(err);
    }
}

export const getTransactionByMonth = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const date = new Date();
        const currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const transactionHappened = await transactionService.fetchTransactionByMonth(req.params.id as String, currentMonth);
        res.send({"transactionHappened": transactionHappened});
    } catch (err) {
        next(err);
    }
}