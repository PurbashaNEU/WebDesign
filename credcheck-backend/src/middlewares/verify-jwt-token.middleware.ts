import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  
    const token = req.headers['authorization']
    // const  = authHeader && authHeader.split(' ')[1]
  console.log(req.headers['authorization'])
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
     // req.user = user
  
      next()
    })
  }