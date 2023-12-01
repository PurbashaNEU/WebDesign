import mongoose, * as Mongoose from "mongoose";
import { ICards, ICardsDocument, ICardsModel } from "../../types/cards.types";

const cardsSchema = new Mongoose.Schema<ICardsDocument, ICardsModel>({
  card_name: {
    type: String,
    required: true,
  },
  card_no: {
    type: String,
    required: true,
  },
  card_type: {
    type: String,
    required: true,
  },
  card_expiry: {
    type: Date,
    required: true,
  },
  card_bank_name: {
    type: String,
    required: true,
  },
  card_cvv: {
    type: String,
    required: true,
  },
  card_billing_date: {
    type: Date,
    required: true,
  },
  card_status: {
    type: String,
    required: true,
  },
  user_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

cardsSchema.statics.findOneOrCreate = async function (
  this: ICardsModel,
  {
    card_name,
    card_no,
    card_type,
    card_expiry,
    card_bank_name,
    card_cvv,
    card_billing_date,
    card_status,
    user_id,
  }: ICards
): Promise<ICardsDocument | String> {
  const cardRecord = await this.findOne({
    card_no,
    card_cvv,
  });
  if (cardRecord) {
    return "Card Already exist";
  } else {
    return this.create({
      card_name,
      card_no,
      card_type,
      card_expiry,
      card_bank_name,
      card_cvv,
      card_billing_date,
      card_status,
      user_id,
    });
  }
};

cardsSchema.statics.findByUserId = async function (
    id: String
  ): Promise<(ICardsDocument & { _id: mongoose.Types.ObjectId})[]>  {
    console.log("inside card model", id)
    const cardRecord = await this.find({
        user_id:{$gte:id},
    });
   
      return cardRecord;
    
  };

  cardsSchema.statics.findAll = async function (): Promise<ICardsDocument[]>  {
    const cardRecord = await this.find();
    return cardRecord;
   };

   


const cardModel = mongoose.model<ICardsDocument, ICardsModel>(
  "card",
  cardsSchema
);

export default cardModel;
