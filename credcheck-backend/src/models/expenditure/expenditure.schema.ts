import mongoose, * as Mongoose from "mongoose";
import { IExpenditureDocument, IExpenditureModel } from "../../types/expenditure.types";

const expenditureSchema = new Mongoose.Schema<IExpenditureDocument, IExpenditureModel>({
    card_id: {
        type: String,
        required: true
    },
    expenditure_type: {
        type: String,
        required: true
    },
    expenditure_location: {
        type: String,
        required: true
    },
    expenditure_amount: {
        type: Number,
        required: true
    },
    expenditure_trasaction_date: {
        type:Date,
        required: true
    },
    expenditure_month: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const expenditureModel = mongoose.model<IExpenditureDocument, IExpenditureModel>(
    "expenditure",
    expenditureSchema
);

export default expenditureModel;