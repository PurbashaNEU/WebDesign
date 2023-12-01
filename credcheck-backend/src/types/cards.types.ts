import { Model,Document,Types} from "mongoose";

export interface ICards {
  card_name: String;
  card_no: String;
  card_type: String;
  card_bank_name: String;
  card_expiry: Date;
  card_cvv: Number;
  card_billing_date: Date;
  card_status: string;
  user_id:Types.ObjectId;
}

export interface ICardsDocument extends ICards, Document {

}

export interface ICardsModel extends Model<ICardsDocument> {
  findOneOrCreate: (
    this: ICardsModel,
    {
      card_name,
      card_no,
      card_type,
      card_bank_name,
      card_expiry,
      card_cvv,
      card_billing_date,
      card_status,
    }: ICards
  ) => Promise<ICardsDocument>;

  findByUserId(id:string):Promise<ICardsDocument & { _id: Types.ObjectId}[]>;

  findAll():Promise<ICardsDocument[]>;
 
}
