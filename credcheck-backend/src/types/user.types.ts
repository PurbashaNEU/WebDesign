import { Types } from "mongoose";
import { Document,Model } from "mongoose";
import { ICards,ICardsDocument } from "./cards.types";

export interface IUsers{
    firstname:string,
    lastname:string,
    username:string,
    email: string,
    password:string,
    gender:string,
    phone_number:number,
    address:string,
    status:string,
    dob:Date,
    
 }

 export interface IUserLoginCred {
    username: String,
    password: String
 }

export interface IUsersDocument extends IUsers, Document {
    sameLastName: (this: IUsersDocument) => Promise<Document[]>;
}

export interface IUsersModel extends Model<IUsersDocument> {
    findOneOrCreate:(
        this:IUsersModel,
        {
            firstname,
            lastname,
            username,
            email,
            password,
            gender,
            phone_number,
            address,
            status,
            dob  
        }:IUsers
    ) => Promise<IUsersDocument>;

    findUser:(_id:String) => Promise<IUsersDocument>

}

