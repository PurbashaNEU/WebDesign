import * as authService from '../services/auth.service';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../models/custom-error.model';


export const loginAuthController = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username,password)
    try {
        if (!username || username.trim() === '') {
            throw new CustomError('Invalid JSON received', 400, 'Username field absent');
            
        } else if (!password || password.trim() === '') {
            throw new CustomError('Invalid JSON received', 400, 'Password field absent');
        }
        const userData = await authService.loginAuth(req);
        if (userData) {
            const token = jwt.sign({_id: userData._id}, process.env.TOKEN_SECRET!);
            res.set('authorization',token);
            const resPayload = {
                'id':userData['_id'] || '',
                'firstname': userData['firstname'] || '',
                'lastname': userData['lastname'] || '',
                'email': userData['email'] || '',
                'status': userData['status'],
                'username': userData['username']
            }
            res.send ({resPayload});
          

        }     
    } catch (err) {
        next(err);
    }
}