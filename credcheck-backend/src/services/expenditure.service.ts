import { IExpenditure, IExpenditureDocument } from "../types/expenditure.types";
import expenditureModel from "../models/expenditure/expenditure.schema";

export const addExpenditureDetail = async (expenditure: IExpenditure): Promise<IExpenditureDocument> => {
    try {
        const newExpenditure = await expenditureModel.create(expenditure);
        return newExpenditure;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const fetchExpenditureByCardId = async (cardId: String): Promise<any> => {
    try {
        const expenditureDetails = await expenditureModel.find({card_id: cardId});
        return expenditureDetails;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const fetchExpenditureByCardIdDate = async (cardId: String, currMonth: Date): Promise<any> => {
    try {
        const expenditureList = await expenditureModel.find({card_id: cardId, expenditure_trasaction_date: {$gte: currMonth}});
        return expenditureList;
    } catch (err) {
        console.log(err);
        throw err;
    } 
}