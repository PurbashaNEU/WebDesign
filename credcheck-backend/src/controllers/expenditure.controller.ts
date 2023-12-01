import {  Request, Response, NextFunction } from "express";
import { IExpenditure } from "../types/expenditure.types";
import * as expenditureService from './../services/expenditure.service';

export const addExpenditureDetail = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const expenditureDetails = await expenditureService.addExpenditureDetail(req.body as IExpenditure);
        res.send({"expenditureDetails": expenditureDetails});
    } catch (err) {
        next(err);
    }
}

export const getExpenditureByCardId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const expenditureDetails = await expenditureService.fetchExpenditureByCardId(req.params.id as string);
        res.send({"expenditure": expenditureDetails});
    } catch (err) {
        next(err);
    }
}

export const getbillingAmount = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const date = new Date();
        let totalAmnt = 0;
        const currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const expenditureList = await expenditureService.fetchExpenditureByCardIdDate(req.params.id,currentMonth);
        if (expenditureList && expenditureList.length > 0 ) {
            expenditureList.forEach( (exp: { status: string; expenditure_amount: number; }) => {
                if (exp.status === 'Sucess') {
                    totalAmnt += exp.expenditure_amount;
                }
            });
        }
        res.send({"totalAMt": totalAmnt});
    } catch (err) {
        next(err);
    }
}