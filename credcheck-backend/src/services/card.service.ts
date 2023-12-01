import { ICardsModel,ICards,ICardsDocument } from "../types/cards.types";
import cardModel from "../models/cards/cards.schema";
import { Types } from "mongoose";

export const createCard = async(card: ICards): Promise<ICardsDocument> => {
 try { 
        const new_cards = await cardModel.findOneOrCreate(card);
        return new_cards
    } catch (err) {
        console.log(err);
        throw err;
    }

}

export const getCards = async (id:string) :Promise<(ICardsDocument & { _id: Types.ObjectId }[]) | null> => {
    try{
        const cards = await cardModel.findByUserId(id);
        return cards
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

export const updateCards = async (id:String, payload: any) :Promise<any> => {
    try{
        const updatedCard = await cardModel.findByIdAndUpdate(id, payload);
        console.log("inside update",updatedCard);
        return updatedCard
       } catch (err) {
        console.log(err);
        throw err;
       }
}
export const getCardDetail = async (id:String): Promise<any> => {
    try  {
        const cardDetail = await cardModel.findById(id);    
        return cardDetail;

    } catch (err) {
        console.log(err);
        throw err;
    }
}
    
export const getAllCards = async():Promise<(ICardsDocument[]) | null> => {
    try{
        const cards = await cardModel.find();
        return cards
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}



/* 
export function blockCards(arg0: string) {
    try{
        const new_cards = await cardModel.findByIdAndUpdate();
        return new_cards
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
} */
// export function updateCards(arg0: string) {
//     throw new Error("Function not implemented.");
// }

