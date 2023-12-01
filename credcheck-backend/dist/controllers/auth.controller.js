"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthController = void 0;
const authService = __importStar(require("../services/auth.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_model_1 = require("../models/custom-error.model");
const loginAuthController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    try {
        if (!username || username.trim() === '') {
            throw new custom_error_model_1.CustomError('Invalid JSON received', 400, 'Username field absent');
        }
        else if (!password || password.trim() === '') {
            throw new custom_error_model_1.CustomError('Invalid JSON received', 400, 'Password field absent');
        }
        const userData = yield authService.loginAuth(req);
        if (userData) {
            const token = jsonwebtoken_1.default.sign({ _id: userData._id }, process.env.TOKEN_SECRET);
            res.set('authorization', token);
            const resPayload = {
                'id': userData['_id'] || '',
                'firstname': userData['firstname'] || '',
                'lastname': userData['lastname'] || '',
                'email': userData['email'] || '',
                'status': userData['status'],
                'username': userData['username']
            };
            res.send({ resPayload });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.loginAuthController = loginAuthController;
