import mongoose, * as Mongoose from "mongoose";
import { IUsersDocument,IUsersModel,IUsers, IUserLoginCred } from "../../types/user.types";
import { CustomError } from '../../models/custom-error.model';


const userSchema = new Mongoose.Schema<IUsersDocument,IUsersModel>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type:String
    },
    phone_number: {
        type:Number
    },
    address: {
        type: String
    },
    status: { 
        type: String
    },
    dob: { 
        type: Date
    },
    
});


userSchema.statics.findOneOrCreate = async function (
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
): Promise<IUsersDocument | String> {
    const userRecord = await this.findOne({
        username,email
    });
    if(userRecord)
    {
        throw 'User Exists'
    }
    else{
        return this.create({
           
            firstname,
            lastname,
            username,
            email,
            password,
            gender,
            phone_number,
            address,
            status : 'ACTIVE',
            dob 
        })
    }
}

userSchema.statics.findUser =async (_id) => {
    const user_record = await userModel.findOne({
            _id
    });
    return user_record;

}



const userModel = mongoose.model<IUsersDocument,IUsersModel>('user',userSchema)

export default userModel;