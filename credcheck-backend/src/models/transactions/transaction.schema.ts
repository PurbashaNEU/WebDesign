import mongoose, * as Mongoose from "mongoose";
import { ITrasactionDocument, ITrasactionsModel } from "../../types/transaction.types";

const transactionSchema = new Mongoose.Schema<ITrasactionDocument, ITrasactionsModel>({
    card_no: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    amount_paid: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    transaction_date: {
        type:Date,
        required: true
    },
    card_id: {
        type: String,
        required: true
    }
});

transactionSchema.statics.findByCardId = async function (
    id: String
  ): Promise<(ITrasactionDocument & { _id: mongoose.Types.ObjectId})[]>  {
    const transactionRecord = await this.find({
        card_id:{$gte:id},
    });
   
      return transactionRecord;
    
  };

const transactionModel = mongoose.model<ITrasactionDocument, ITrasactionsModel>(
    "trasaction",
    transactionSchema
);

export default transactionModel;