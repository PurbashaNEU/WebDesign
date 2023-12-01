import express from 'express';
import * as UserController from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/verify-jwt-token.middleware';

export const router = express.Router();

router.post('/', UserController.createUserController);
router.put('/', authenticateToken, UserController.updateUserController);
