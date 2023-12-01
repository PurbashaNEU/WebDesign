import { Model, Document, Types} from "mongoose";

export interface ITrasactions {
    card_no: String;
    status: String,
    amount_paid: String;
    due_date: Date,
    transaction_date: Date,
    card_id: String;
}

export interface ITrasactionDocument extends ITrasactions, Document {

}

export interface ITrasactionsModel extends Model<ITrasactionDocument> {

}