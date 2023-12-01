import { IUsersDocument,IUsersModel,IUsers } from "../types/user.types";
import userModel from "../models/users/user.schema";



export const createUser = async(user:IUsers):Promise<IUsersDocument> => {
    try{
     const new_user = await userModel.findOneOrCreate(user); 
     return new_user 
    }
    catch(e){
       console.log(e);
       throw e;
    }
}

export const updateUserData = async(userId: String, updatedReq: any): Promise<any> => {
    try {
        const updateUser = await userModel.findByIdAndUpdate(userId, updatedReq);
        return updateUser;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUser =async (id:String) => {
    try{
        const user = await userModel.findUser(id); 
        return user 
       }
       catch(e){
          console.log(e);
          throw e;
       } 
}