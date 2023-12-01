import { Model, Document, Types} from "mongoose";

export interface IExpenditure {
    
    card_id: String;
    expenditure_type: String;
    expenditure_location: String;
    expenditure_amount: number;
    expenditure_trasaction_date: Date;
    expenditure_month:number;
    status: String,
    
}

export interface IExpenditureDocument extends IExpenditure, Document {

}

export interface IExpenditureModel extends Model<IExpenditureDocument> {

}