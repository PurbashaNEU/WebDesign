import userModel from "../models/users/user.schema";

export const loginAuth = async(req: any) :Promise<any> => {
    const username = req.body.username;
    const password = req.body.password;
    try{
     const validatedUser = await userModel.findOne( {username: username, password: password}); 
     return validatedUser;
    }
    catch (e) {
        console.log(e);
    }
}