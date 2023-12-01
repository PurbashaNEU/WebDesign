import * as userService from '../services/user.service';
import { IUsers } from '../types/user.types';
import { NextFunction, Request,Response } from 'express';


export const createUserController = async(req:Request,res:Response, next: NextFunction): Promise<void> => {
    try{
       const userData = await userService.createUser(req.body as IUsers);
      
      res.send({"data":userData});
    }
    catch(e)
    {
      next(e);
    }
}

export const updateUserController = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let userId, payload = {...req.body};
    if (req && req.body) {
      userId = req.body.id;
      delete payload['id'];
    }
    const userData = await userService.updateUserData(userId, payload);
    res.send({"data":userData});
  }
  catch(e)
  {
    next(e);
  }
}