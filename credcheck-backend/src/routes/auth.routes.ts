import express from 'express';
import * as authController from '../controllers/auth.controller';

export const router = express.Router();

router.post('/', authController.loginAuthController);